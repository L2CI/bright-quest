import { Minus, Plus, RotateCcw, type IconNode } from 'lucide';

type Cell = string | number;
type Diagram =
  | { kind: 'sharing'; label: string; total: number; groups: number }
  | { kind: 'groups'; label: string; groups: number; itemsPerGroup: number; reserved: number }
  | { kind: 'table'; label: string; columns: string[]; rows: Cell[][]; controls: string; limitation: string; source: string };

export interface FieldLabQuestion {
  id: string;
  subject?: string;
  diagram?: unknown;
}

interface LabState {
  diagram: Diagram;
  fingerprint: string;
  open: boolean;
  kits: number[];
  history: number[][];
  counted: number[];
  reserved: Set<number>;
  mode: 'count' | 'reserve';
  rows: number[];
  columns: Set<number>;
}

const states = new Map<string, LabState>();
export function clearFieldLabs() { states.clear(); }
const escape = (value: unknown) => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
const integer = (value: unknown, min: number, max: number): value is number => Number.isInteger(value) && Number(value) >= min && Number(value) <= max;
const cell = (value: unknown): value is Cell => typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));

// Copy only public evidence. In particular, never read answer, explanation or options.
function publicDiagram(question: FieldLabQuestion): Diagram | null {
  if (!question || typeof question.id !== 'string' || !question.id) return null;
  const d = question.diagram as Record<string, unknown> | undefined;
  if (!d || typeof d !== 'object') return null;
  const label = typeof d.label === 'string' ? d.label : 'Field lab';
  if (d.kind === 'sharing' && integer(d.total, 1, 120) && integer(d.groups, 2, 12)) {
    return { kind: 'sharing', label, total: d.total, groups: d.groups };
  }
  if (d.kind === 'groups' && integer(d.groups, 1, 12) && integer(d.itemsPerGroup, 1, 12)
    && d.groups * d.itemsPerGroup <= 120 && integer(d.reserved, 0, d.groups * d.itemsPerGroup)) {
    return { kind: 'groups', label, groups: d.groups, itemsPerGroup: d.itemsPerGroup, reserved: d.reserved };
  }
  if (d.kind === 'table' && question.subject !== 'english' && Array.isArray(d.columns)
    && d.columns.length >= 2 && d.columns.length <= 10 && d.columns.every(c => typeof c === 'string')
    && Array.isArray(d.rows) && d.rows.length >= 2 && d.rows.length <= 20
    && d.rows.every(row => Array.isArray(row) && row.length === (d.columns as unknown[]).length && row.every(cell))) {
    return { kind: 'table', label, columns: [...d.columns], rows: d.rows.map(row => [...row]),
      controls: typeof d.controls === 'string' ? d.controls : '',
      limitation: typeof d.limitation === 'string' ? d.limitation : '',
      source: typeof d.source === 'string' ? d.source : '' };
  }
  return null;
}

function fresh(diagram: Diagram): LabState {
  return { diagram, fingerprint: JSON.stringify(diagram), open: false,
    kits: diagram.kind === 'sharing' ? Array(diagram.groups).fill(0) : [], history: [],
    counted: [], reserved: new Set(), mode: 'count', rows: [],
    columns: new Set(diagram.kind === 'table' ? diagram.columns.slice(1).map((_, i) => i + 1) : []) };
}

function icon(node: IconNode): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${node.map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([key, value]) => `${key}="${escape(value)}"`).join(' ')}></${tag}>`).join('')}</svg>`;
}

function command(action: string, label: string, content: string, disabled = false, index?: number): string {
  return `<button type="button" class="fl-command" data-action="field-lab-${action}" ${index === undefined ? '' : `data-fl-index="${index}"`} aria-label="${escape(label)}" title="${escape(label)}" ${disabled ? 'disabled' : ''}>${content}</button>`;
}

const metric = (label: string, value: string | number) => `<span class="fl-metric"><span>${label}</span><strong>${value}</strong></span>`;

function sharing(state: LabState, d: Extract<Diagram, { kind: 'sharing' }>): string {
  const remaining = d.total - state.kits.reduce((sum, n) => sum + n, 0);
  const equal = state.kits.every(n => n === state.kits[0]);
  return `<div class="fl-readout">${metric('Washers left', remaining)}${metric('Kits', d.groups)}${metric('Started with', d.total)}</div>
    <div class="fl-toolbar">${command('round', 'Give one washer to every kit', `${icon(Plus)}<span>One to each</span>`, remaining < d.groups)}${command('undo', 'Undo last move', icon(RotateCcw), !state.history.length)}</div>
    <div class="fl-kits">${state.kits.map((count, i) => `<section class="fl-kit" aria-label="Kit ${i + 1}">
      <h4>Kit ${i + 1} <strong>${count}</strong></h4>
      <div class="fl-washers" role="img" aria-label="${count} washers in kit ${i + 1}">${Array.from({ length: count }, () => '<span class="fl-washer" aria-hidden="true"></span>').join('')}</div>
      <div class="fl-kit-actions">${command('take', `Return one washer from kit ${i + 1}`, icon(Minus), count === 0, i)}${command('give', `Give one washer to kit ${i + 1}`, icon(Plus), remaining === 0, i)}</div>
    </section>`).join('')}</div>
    <p class="fl-status">${remaining === d.total ? 'All washers are in the supply tray.' : `${equal ? 'Kits have equal amounts.' : 'Kits have different amounts.'} ${remaining ? `${remaining} still in the supply tray.` : 'The supply tray is empty.'}`}</p>`;
}

function groups(state: LabState, d: Extract<Diagram, { kind: 'groups' }>): string {
  return `<div class="fl-readout">${metric('Counted', state.counted.length)}${metric('Set aside', `${state.reserved.size} / ${d.reserved}`)}${metric('Counted, not set aside', state.counted.filter(i => !state.reserved.has(i)).length)}</div>
    <div class="fl-modes" role="group" aria-label="Piece action">${(['count', 'reserve'] as const).map(mode => `<button type="button" data-action="field-lab-${mode}" aria-pressed="${state.mode === mode}">${mode === 'count' ? 'Count pieces' : 'Set aside'}</button>`).join('')}</div>
    <div class="fl-crates">${Array.from({ length: d.groups }, (_, crate) => `<fieldset class="fl-crate"><legend>Crate ${crate + 1}</legend><div class="fl-pieces">${Array.from({ length: d.itemsPerGroup }, (_, piece) => {
      const index = crate * d.itemsPerGroup + piece;
      const order = state.counted.indexOf(index);
      const reserved = state.reserved.has(index);
      const label = `Crate ${crate + 1}, piece ${piece + 1}: ${order < 0 ? 'not counted' : `counted ${order + 1}`}, ${reserved ? 'set aside' : 'available'}`;
      return `<button type="button" class="fl-piece ${reserved ? 'fl-reserved' : ''} ${order >= 0 ? 'fl-counted' : ''}" data-action="field-lab-piece" data-fl-index="${index}" aria-label="${label}" title="${label}" aria-pressed="${state.mode === 'count' ? order >= 0 : reserved}"><span class="fl-piece-shape" aria-hidden="true">${order < 0 ? '' : order + 1}</span>${reserved ? '<span class="fl-piece-mark" aria-hidden="true">/</span>' : ''}</button>`;
    }).join('')}</div></fieldset>`).join('')}</div>`;
}

function compare(state: LabState, d: Extract<Diagram, { kind: 'table' }>): string {
  const rows = state.rows;
  const selectedColumns = [...state.columns].sort((a, b) => a - b);
  return `<fieldset class="fl-choices"><legend>Compare two: ${escape(d.columns[0])}</legend>${d.rows.map((row, i) => `<label class="fl-choice"><input type="checkbox" data-fl-input="row" data-fl-index="${i}" ${rows.includes(i) ? 'checked' : ''} ${rows.length === 2 && !rows.includes(i) ? 'disabled' : ''}><span>${escape(row[0])}</span></label>`).join('')}</fieldset>
    <fieldset class="fl-choices fl-columns"><legend>Evidence to compare</legend>${d.columns.slice(1).map((column, i) => `<label class="fl-choice"><input type="checkbox" data-fl-input="column" data-fl-index="${i + 1}" ${state.columns.has(i + 1) ? 'checked' : ''}><span>${escape(column)}</span></label>`).join('')}</fieldset>
    <div class="fl-comparison">${rows.length < 2 ? `<p class="fl-status">${rows.length ? 'One chosen. Choose one more.' : 'No rows chosen yet.'}</p>` : !selectedColumns.length ? '<p class="fl-status">No evidence columns selected.</p>' : `<table><caption>${escape(d.label)}</caption><thead><tr><th scope="col">Evidence</th>${rows.map(i => `<th scope="col">${escape(d.rows[i][0])}</th>`).join('')}</tr></thead><tbody>${selectedColumns.map(c => `<tr><th scope="row">${escape(d.columns[c])}<small>${String(d.rows[rows[0]][c]) === String(d.rows[rows[1]][c]) ? 'Same entry' : 'Different entries'}</small></th>${rows.map(i => `<td>${escape(d.rows[i][c])}</td>`).join('')}</tr>`).join('')}</tbody></table>`}</div>
    ${d.controls || d.limitation || d.source ? `<details class="fl-notes"><summary>Test notes</summary>${[d.source, d.controls, d.limitation].filter(Boolean).map(text => `<p>${escape(text)}</p>`).join('')}</details>` : ''}`;
}

function contents(state: LabState): string {
  const d = state.diagram;
  return `<div class="fl-top"><span>${escape(d.label)}</span>${command('reset', 'Reset field lab', icon(RotateCcw))}</div>${d.kind === 'sharing' ? sharing(state, d) : d.kind === 'groups' ? groups(state, d) : compare(state, d)}`;
}

/** Returns an optional native details panel; unsupported evidence returns an empty string. */
export function renderFieldLab(question: FieldLabQuestion): string {
  const d = publicDiagram(question);
  if (!d) return '';
  // Native details toggles need no host listener. Snapshot them before the host replaces its HTML.
  if (typeof document !== 'undefined') {
    document.querySelectorAll<HTMLDetailsElement>('details[data-field-lab]').forEach(lab => {
      const existing = states.get(lab.dataset.fieldLab!);
      if (existing) existing.open = lab.open;
    });
  }
  let state = states.get(question.id);
  if (!state || state.fingerprint !== JSON.stringify(d)) {
    state = fresh(d);
    states.set(question.id, state);
  }
  const title = d.kind === 'sharing' ? 'Share the washers' : d.kind === 'groups' ? 'Count and set aside' : 'Compare the evidence';
  return `<details class="field-lab" data-field-lab="${escape(question.id)}" ${state.open ? 'open' : ''}><summary>${title}<span class="fl-optional">Optional</span></summary><div class="fl-body">${contents(state)}</div></details>`;
}

function context(target: HTMLElement, root: HTMLElement) {
  const lab = target.closest<HTMLDetailsElement>('details[data-field-lab]');
  if (!lab || !(root === lab || root.contains(lab))) return null;
  const state = states.get(lab.dataset.fieldLab!);
  return state ? { lab, state } : null;
}

function repaint(lab: HTMLDetailsElement, state: LabState, target: HTMLElement): void {
  state.open = lab.open;
  const body = lab.querySelector<HTMLElement>('.fl-body')!;
  const focused = lab.ownerDocument.activeElement === target;
  const notesOpen = !!body.querySelector<HTMLDetailsElement>('.fl-notes')?.open;
  const scrolls = [...body.querySelectorAll<HTMLElement>('.fl-washers')].map(well => well.scrollTop);
  body.innerHTML = contents(state);
  const notes = body.querySelector<HTMLDetailsElement>('.fl-notes');
  if (notes) notes.open = notesOpen;
  body.querySelectorAll<HTMLElement>('.fl-washers').forEach((well, i) => { well.scrollTop = scrolls[i] || 0; });
  if (focused) {
    const replacement = [...body.querySelectorAll<HTMLElement>('button,input')].find(el =>
      el.dataset.action === target.dataset.action && el.dataset.flInput === target.dataset.flInput && el.dataset.flIndex === target.dataset.flIndex);
    const next = replacement && !(replacement as HTMLButtonElement).disabled ? replacement : body.querySelector<HTMLElement>('[data-action="field-lab-reset"]');
    next?.focus({ preventScroll: true });
  }
}

/** Dispatch before station actions. True means consumed; this updates only the lab DOM. */
export function handleFieldLabClick(button: HTMLElement, root: HTMLElement): boolean {
  const target = button.closest<HTMLElement>('[data-action^="field-lab-"]');
  if (!target) return false;
  const ctx = context(target, root);
  if (!ctx) return false;
  if ((target as HTMLButtonElement).disabled) return true;
  const { lab, state } = ctx;
  const d = state.diagram;
  const action = target.dataset.action!.slice('field-lab-'.length);
  const index = Number(target.dataset.flIndex);
  if (action === 'reset') {
    const reset = fresh(d);
    states.set(lab.dataset.fieldLab!, reset);
    repaint(lab, reset, target);
    return true;
  }
  if (d.kind === 'sharing') {
    const remaining = d.total - state.kits.reduce((sum, n) => sum + n, 0);
    if (action === 'undo') {
      const previous = state.history.pop();
      if (previous) state.kits = previous;
    } else if ((action === 'round' && remaining >= d.groups)
      || (integer(index, 0, d.groups - 1) && ((action === 'give' && remaining > 0) || (action === 'take' && state.kits[index] > 0)))) {
      state.history.push([...state.kits]);
      if (action === 'round') state.kits = state.kits.map(n => n + 1);
      else state.kits[index] += action === 'give' ? 1 : -1;
    }
  } else if (d.kind === 'groups') {
    if (action === 'count' || action === 'reserve') state.mode = action;
    else if (action === 'piece' && integer(index, 0, d.groups * d.itemsPerGroup - 1)) {
      if (state.mode === 'reserve') {
        if (state.reserved.has(index)) state.reserved.delete(index);
        else state.reserved.add(index);
      } else if (state.counted.includes(index)) state.counted = state.counted.filter(i => i !== index);
      else state.counted.push(index);
    }
  }
  repaint(lab, state, target);
  return true;
}

/** Delegate the native input event (not both input and change) before other inputs. */
export function handleFieldLabInput(target: HTMLElement, root: HTMLElement): boolean {
  if (!target.matches('input[data-fl-input]')) return false;
  const ctx = context(target, root);
  if (!ctx || ctx.state.diagram.kind !== 'table') return false;
  if ((target as HTMLInputElement).disabled) return true;
  const { lab, state } = ctx;
  const d = state.diagram as Extract<Diagram, { kind: 'table' }>;
  const index = Number(target.dataset.flIndex);
  const checked = (target as HTMLInputElement).checked;
  if (target.dataset.flInput === 'row' && integer(index, 0, d.rows.length - 1)) {
    if (!checked) state.rows = state.rows.filter(i => i !== index);
    else if (!state.rows.includes(index) && state.rows.length < 2) state.rows.push(index);
  } else if (target.dataset.flInput === 'column' && integer(index, 1, d.columns.length - 1)) {
    if (checked) state.columns.add(index);
    else state.columns.delete(index);
  }
  repaint(lab, state, target);
  return true;
}
