import { createIcons, Shield, Swords, Zap, ArrowLeft, ArrowRight, Volume2, VolumeX, Settings, Pause, Play, X, Check, Lock, RotateCcw, Sparkles, ChevronRight, HelpCircle, Delete, Undo2, BookOpen, Cpu, Trophy, Hammer, Hand, CircleHelp, RefreshCw, Target, ScanLine, Sun, Orbit, Wind, Tornado, Snowflake, Users, Route, Flame, Droplets, Waves, Mountain, Radio, AudioLines, Rocket } from 'lucide';
import { SparkWorld } from './world';
import { GameAudio } from './sound';
import { duelCue, duelMoves, exchangeOutcome, roundReward } from './duel.js';
import { HEROES, getHero, isHeroId, forgeSize, equipmentStage, totalRounds, forgeSubject, STAGE_NAMES, PRISM_KITS, prismStage, upgradeDescription, getHeroTrait } from '../roster.js';

const icons = { Shield, Swords, Zap, ArrowLeft, ArrowRight, Volume2, VolumeX, Settings, Pause, Play, X, Check, Lock, RotateCcw, Sparkles, ChevronRight, HelpCircle, Delete, Undo2, BookOpen, Cpu, Trophy, Hammer, Hand, CircleHelp, RefreshCw, Target, ScanLine, Sun, Orbit, Wind, Tornado, Snowflake, Users, Route, Flame, Droplets, Waves, Mountain, Radio, AudioLines, Rocket };
const $ = (id: string) => document.getElementById(id)!;
const escape = (x: any) => String(x ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const icon = (name: string) => `<i data-lucide="${name}" aria-hidden="true"></i>`;
const button = (action: string, label: string, symbol = '', cls = '', disabled = false, attrs = '') => `<button type="button" class="button ${cls}" data-action="${action}" ${disabled ? 'disabled' : ''} ${attrs}>${symbol ? icon(symbol) : ''}${escape(label)}</button>`;
const iconButton = (action: string, label: string, symbol: string) => `<button type="button" class="icon-button" data-action="${action}" aria-label="${escape(label)}" title="${escape(label)}">${icon(symbol)}</button>`;
const storage = { get(k: string, fallback: any = null) { try { return JSON.parse(localStorage.getItem(k) || 'null') ?? fallback; } catch { return fallback; } }, set(k: string, v: any) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { toast('Device storage is unavailable. Keep this page open while saving.'); } }, remove(k: string) { try { localStorage.removeItem(k); } catch {} } };
const local = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
let state: any, profile: any, world: SparkWorld, audio = new GameAudio();
let busy = false, acting = false, pending: any = null, paused = false, view = 'arena', visualMatch: any = null;
let prefs = storage.get('bqSparkSettings', { sound: false, volume: .55, reduced: matchMedia('(prefers-reduced-motion: reduce)').matches });
let draft: any = '', draftQuestion = '', toastTimer: any, focusReturn: HTMLElement | null = null;
let earnedTask: any = null;
let feedbackVersion = -1;
let selectedHero = 'relay', previewStage = 0, pathReturn = 'hangar';
const heroKey = () => `bqSparkHero:${profile.id}`;
const levelName = (level: number) => ['Foundation', 'Applied', 'Stretch', 'Challenge', 'Master'][level - 1] || 'Foundation';
const nextCampaignLevel = () => Math.min(3, 2 + Math.floor(state.wins / 2));
const learningSteps = () => [
  ['Applied', 'Link two steps and check the result'],
  ['Stretch', 'Compare evidence and solve missing values'],
  ['Challenge', 'Plan a strategy across several steps'],
  ['Master', 'Test explanations and solve unfamiliar problems']
].map(([name, detail], i) => `<li class="${nextCampaignLevel() === i + 2 ? 'current' : ''}"><strong>${name}</strong><span>${detail}</span>${nextCampaignLevel() === i + 2 ? '<b>Next duel starts here</b>' : ''}</li>`).join('');
const browsing = () => !guide && (view === 'hangar' || view === 'path' || view === 'review' || !state.match);
type GuideStep = 'relay' | 'prism' | 'charge' | 'blocked' | 'opening' | 'complete';
let guide: { step: GuideStep, match: any, after?: any } | null = null;
const guideKey = () => `bqSparkGuide:launcher-v1:${profile.id}`;
const dialog = $('dialog') as HTMLDialogElement;
const pendingKey = () => `bqSparkPending:${profile.id}`;
const draftKey = () => `bqSparkDraft:${profile.id}:${state.match?.id}:${state.match?.questions?.[state.match?.questionIndex]?.id}`;
const currentQuestion = () => state?.match?.questions?.[state.match?.questionIndex];
const decorate = () => createIcons({ icons, attrs: { 'stroke-width': 1.9 } });
const blocked = () => busy || acting || !!pending || !!earnedTask || !!guide;
const soundAllowed = () => !paused && !dialog.open && !document.hidden && !pending;
const playSound = (name: string) => { if (soundAllowed()) audio.play(name); };
function startGuide() {
  if (blocked()) return;
  guide = { step: 'relay', match: { id: 'guided-demo', round: 1, phase: 'battle', playerHP: 24, rivalHP: 16, energy: 2, staff: false, pad: false, intent: 'open', exchange: 0 } };
  view = 'arena'; render();
}
async function finishGuide() {
  if (!guide || acting) return;
  storage.set(guideKey(), true); guide = null; world.trainingPreview(null);
  render();
  if (!state.match) await perform({ type: 'start', heroId: selectedHero });
}
async function guideAction(action: string) {
  if (!guide || acting) return;
  if (action === 'guide-skip' || action === 'guide-finish') return finishGuide();
  const next: Partial<Record<GuideStep, GuideStep>> = { relay: 'prism', prism: 'charge', blocked: 'opening' };
  if (action === 'guide-next' && next[guide.step]) {
    guide.step = next[guide.step]!; guide.match.intent = guide.step === 'charge' ? 'heavy' : 'open'; render(); return;
  }
  const guard = action === 'guide-guard' && guide.step === 'charge';
  const attack = action === 'guide-attack' && guide.step === 'opening';
  if (!guard && !attack) return;
  if (prefs.sound) await audio.unlock();
  const event = { id: crypto.randomUUID(), kind: 'exchange', move: guard ? 'guard' : 'strike', intent: guard ? 'heavy' : 'open', damage: guard ? 0 : 4, rivalDamage: guard ? 2 : 0, guardBroken: false, phase: 'battle', exchange: guard ? 1 : 2 };
  const after = { ...guide.match, playerHP: guard ? 22 : guide.match.playerHP, rivalHP: guard ? 16 : 12, energy: 4, intent: 'open', lastEvent: event };
  guide.after = after; acting = true; visualMatch = structuredClone(guide.match); render();
  try { await world.playEvent(event, after); }
  finally { if (guide) { guide.match = after; guide.step = guard ? 'blocked' : 'complete'; guide.after = null; } acting = false; visualMatch = null; render(); }
}
function guidePanel() {
  const step = guide!.step;
  const copy: Record<GuideStep, [string, string, string, string]> = {
    relay: ['YOU ARE RELAY', 'Your amber-and-ivory mech. Keep its shield above zero.', 'Meet Prism', 'guide-next'],
    prism: ['THIS IS PRISM', 'Your training rival. Win a round by emptying its shield.', 'Watch Prism', 'guide-next'],
    charge: ['PRISM IS CHARGING', 'That raised arm and growing light mean a big hit is coming.', 'Raise shield', 'guide-guard'],
    blocked: ['YOU BLOCKED THE BIG HIT', 'Your shield absorbed 8 of 10 damage. The block filled your energy.', 'Look for an opening', 'guide-next'],
    opening: ['NOW PRISM IS OPEN', 'The charge is gone. Prism is recovering and cannot hit back this turn.', 'Attack the opening', 'guide-attack'],
    complete: ['OPENING TAKEN', 'Watch Prism each turn. Block a charge; attack an opening.', state.match ? 'Return to my match' : 'Start my duel', 'guide-finish']
  };
  const [title, detail, label, action] = copy[step];
  return `<section class="battle-console guide-console" aria-label="Practice duel"><div class="guide-heading"><span class="eyebrow">PRACTICE / ${['relay','prism','charge','blocked','opening','complete'].indexOf(step)+1} OF 6</span>${button('guide-skip', 'Skip practice', '', 'quiet', acting)}</div><h2>${escape(title)}</h2><p>${escape(detail)}</p><div class="guide-actions">${button(action, acting ? 'Watch the exchange' : label, step === 'charge' ? 'shield' : step === 'opening' ? 'swords' : 'arrow-right', `primary full ${['charge','opening'].includes(step) ? 'guide-counter' : ''}`, acting)}</div><span class="save-state">${acting ? ' ' : 'Practice only. Your saved match is unchanged.'}</span></section>`;
}
function toast(text: string) { $('toast').textContent = text; $('toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 4800); }
async function request(body?: any) {
  const cap = sessionStorage.getItem('brightQuestChildCapability');
  const response = await fetch('/api/sparkbound', { method: body ? 'POST' : 'GET', credentials: 'same-origin', cache: 'no-store', headers: { accept: 'application/json', ...(cap ? { 'x-bq-child-capability': cap } : {}), ...(body ? { 'content-type': 'application/json', 'x-bq-child-id': profile.id } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) { const e: any = new Error(result.error || `Connection error (${response.status})`); e.status = response.status; e.code = result.code; throw e; } return result;
}
function prepareDraft() {
  const q = currentQuestion(); if (!q) return;
  if (draftQuestion !== q.id) { draftQuestion = q.id; draft = storage.get(draftKey(), q.type === 'order' ? [] : ''); }
}
function saveDraft() { storage.set(draftKey(), draft); }
async function perform(action: any) {
  if (blocked()) return; const before = structuredClone(state); busy = true; render();
  if (action.type === 'move') playSound('select');
  const body = { operationId: crypto.randomUUID(), version: state.version, action };
  storage.set(pendingKey(), body);
  try {
    const result = await request(body); state = result.state; storage.remove(pendingKey());
    if (action.type === 'answer' && state.match?.lastEvent?.kind) {
      const attempted = state.match.questions.find((q: any) => q.id === action.questionId);
      playSound(attempted?.resolved ? 'correct' : 'wrong');
      if (attempted?.resolved) earnedTask = attempted;
    }
    if (action.type === 'move' || (before.match?.phase === 'training' && state.match?.phase === 'player_upgrade')) {
      acting = true; visualMatch = before.match; busy = false; render();
      await world.playEvent(state.match.lastEvent, state.match);
      acting = false; visualMatch = null;
    } else if (state.match?.phase === 'rival_upgrade' && before.match?.phase !== 'rival_upgrade') playSound('charge');
    else if (state.match?.phase === 'victory' && before.match?.phase !== 'victory') { playSound('victory'); if (soundAllowed()) audio.startMusic('victory'); }
    if (state.match?.phase === 'battle' && before.match?.phase !== 'battle') playSound('round');
    if (action.type === 'answer' && currentQuestion()?.id !== action.questionId) draftQuestion = '';
    if (action.type === 'reset' || action.type === 'start') { draftQuestion = ''; view = 'arena'; history.replaceState({ view }, '', `${location.pathname}${location.search}#arena`); }
  } catch (e: any) {
    if (!e.status || e.status >= 500) { pending = body; audio.stop(); toast('Your action is kept on this device. Reconnect to confirm the save.'); }
    else { storage.remove(pendingKey()); if (e.status === 409) { try { state = (await request()).state; } catch {} } toast(e.message); }
  } finally { busy = false; acting = false; visualMatch = null; render(); }
}
async function reconnect() {
  if (!pending || busy) return; busy = true; render();
  try { state = (await request(pending)).state; storage.remove(pendingKey()); pending = null; toast('Saved. Your match is ready.'); }
  catch (e: any) { if (e.status && e.status < 500) { storage.remove(pendingKey()); pending = null; if (e.status === 409) { try { state = (await request()).state; } catch {} } } toast(e.message); }
  finally { busy = false; render(); }
}
function hud(m: any) {
  if (!m || browsing()) return '';
  const roundConfig = state.configuration?.battle?.rounds?.[m.round - 1] || [{ playerHP: 24, rivalHP: 16 }, { playerHP: 26, rivalHP: 28 }, { playerHP: 24, rivalHP: 50 }][m.round - 1];
  const playerMax = m.maxPlayerHP || roundConfig.playerHP, rivalMax = m.maxRivalHP || roundConfig.rivalHP;
  const hero = (name: string, hp: number, max: number, rival = false) => `<div class="hero-hud ${rival ? 'rival' : ''} ${hp <= max * .3 ? 'low-shield' : ''}"><div class="hero-title"><strong>${name}</strong><small>${rival ? 'YOUR RIVAL' : 'YOUR HERO'}</small></div><div class="shield-readout"><span>${icon('shield')}${rival ? 'Rival shield' : 'Your shield'}</span><b>${hp}<small> / ${max}</small></b></div><div class="shield-track" role="progressbar" aria-label="${escape(name)} shield" aria-valuemin="0" aria-valuemax="${max}" aria-valuenow="${hp}"><span style="width:${Math.max(0, Math.min(100, hp / max * 100))}%"></span></div></div>`;
  return hero(getHero(m.heroId).name.toUpperCase(), m.playerHP, playerMax) + `<div class="round-chip"><div class="round-dots">${Array.from({ length: totalRounds(m) }, (_, i) => i + 1).map(n => `<i class="${n <= m.round ? 'done' : ''}"></i>`).join('')}</div><span>ROUND ${m.round} / ${totalRounds(m)}</span><strong>Empty Prism's shield</strong></div>` + hero('PRISM', m.rivalHP, rivalMax, true);
}
function caption(m: any) {
  if (acting) return;
  if (!m || browsing()) { $('scene-caption').innerHTML = ''; return; }
  if (m.phase === 'battle') { const cue = duelCue(m); $('scene-caption').innerHTML = `<div class="intent intent-${cue.tone}">${icon(cue.icon)}<div class="intent-detail"><strong>${escape(cue.title)}</strong>${prefs.cues !== false ? `<small>${escape(cue.detail)}</small>` : ''}</div></div>`; }
  else if (m.phase === 'training') $('scene-caption').innerHTML = `<h2 class="scene-title">${forgeSubject(m.trainingStage).toUpperCase()} FORGE</h2><p class="scene-subtitle">Upgrade ${m.trainingStage} / ${totalRounds(m) - 1}</p>`;
  else $('scene-caption').innerHTML = '';
}
function battle(m: any) {
  const moves = duelMoves(m), cue = duelCue(m), outcome = !acting && !busy ? exchangeOutcome(m.lastEvent) : null;
  return `<section class="battle-console"><div class="exchange-recap ${outcome?.positive ? 'positive' : ''}" role="status">${outcome ? `<strong>${escape(outcome.title)}</strong><span>${escape(outcome.detail)}${outcome.ability ? ` <b class="ability-trigger" title="${escape(outcome.abilityDescription)}">${escape(outcome.ability)}: ${escape(outcome.abilityDescription)}</b>` : ''}</span>` : `<strong>${acting ? 'Duel in motion' : 'Win this round. Keep your shield above zero.'}</strong><span>${acting ? ' ' : escape(roundReward(m))}</span>`}</div><div class="turn-status"><span>${acting ? 'Resolving your move' : 'Your move'} ${!acting ? icon('chevron-right') : ''}</span><div class="energy-meter" aria-label="Energy ${m.energy} of 4"><span>Energy</span><div class="energy-cells">${[1,2,3,4].map(n => `<i class="${n <= m.energy ? 'charged' : ''}"></i>`).join('')}</div><b>${m.energy}/4</b></div></div><div class="moves" style="--move-count:${moves.length}">${moves.map(a => `<button type="button" class="move ${!blocked() && prefs.cues !== false && a.id === cue.suggested ? 'suggested' : ''}" data-action="move" data-move="${a.id}" ${a.disabled || blocked() ? 'disabled' : ''} title="${escape(a.name + ': ' + a.hint)}" aria-label="${escape(a.name + ', ' + a.hint)}">${icon(a.icon)}<b>${a.name}</b><small>${a.hint}</small><span class="move-cue">${prefs.cues !== false && a.id === cue.suggested && !blocked() ? escape(cue.badge) : ''}</span></button>`).join('')}</div><p class="save-state">${busy ? 'Saving move' : acting ? ' ' : 'Progress saved'}</p></section>`;
}
function evidence(q: any) {
  const e = q.evidence; if (!e) return '';
  if (e.kind === 'observation' && e.description && q.prompt.startsWith(e.description)) return '';
  let body = '';
  if (e.kind === 'groups') body = `<div class="cell-packs">${Array.from({ length: e.groups }, (_, i) => `<div class="cell-pack" aria-label="Pack ${i + 1}, ${e.each} cells">${Array.from({ length: e.each }, () => '<i></i>').join('')}<small>${e.each} cells</small></div>`).join('')}</div>`;
  else if (e.kind === 'capacity') body = `<div class="cartridge" aria-label="${e.filled} of ${e.capacity} spaces fitted">${Array.from({length:e.capacity}, (_,i) => `<i class="${i < e.filled ? 'fitted' : ''}"></i>`).join('')}</div><p><strong>${e.filled}</strong> fitted / <strong>${e.capacity}</strong> spaces</p>`;
  else if (e.kind === 'sharing') body = `<p>${e.total} cells / ${e.groups} equal trays</p>`;
  else if (e.readings) body = `<table><thead><tr><th>Pad</th><th>Sensor reading</th></tr></thead><tbody>${e.readings.map((r: any) => `<tr><td>${escape(r.pad)}</td><td>${escape((r.values || []).join(', '))}</td></tr>`).join('')}</tbody></table><p>${escape(e.lowerIs || '')}</p>`;
  else if (e.kind === 'sequence') body = `<p>Each step: +${e.step}</p>`;
  else if (e.kind === 'measurement') body = `<p>All lengths are measured in ${escape(e.unit)}.</p>`;
  else if (e.kind === 'place-value') body = `<p>Smallest ${icon('arrow-right')} largest</p>`;
  else if (e.kind === 'circuit-cards') body = `<div class="wiring-cards">${Object.entries(e.cards).map(([id,wires]) => `<div><strong>Card ${id.toUpperCase()}</strong>${circuit({wires,bulb:e.bulb},`Wiring card ${id.toUpperCase()}`)}</div>`).join('')}</div>`;
  else if (e.kind.startsWith('circuit-')) body = circuit(e, 'Battery and bulb wiring diagram');
  else body = `<p>${escape(e.description || e.note || e.fact || '')}</p>`;
  return body && body !== '<p></p>' ? `<div class="evidence">${body}${e.note ? `<p class="evidence-note">${escape(e.note)}</p>` : ''}</div>` : '';
}
function circuit(e: any, label: string) {
  const switched = e.kind === 'circuit-switch';
  const switchLeft = switched && e.wires.some((w: string[]) => w[0] === '+' && w[1] === 'S');
  const points: any = { '+':[45,120], '-':[205,120], X:[65,38], Y:[185,38], S: switchLeft ? [45,92] : [205,62], T: switchLeft ? [45,62] : [205,92] };
  const wire = (a:string,b:string) => { const p=points[a],r=points[b]; return `<path d="M${p[0]} ${p[1]} L${p[0]} ${r[1]} L${r[0]} ${r[1]}"/>`; };
  return `<svg class="circuit-diagram" viewBox="0 0 250 157" role="img" aria-label="${escape(label)}"><g fill="none" stroke="#50747b" stroke-width="3">${e.wires.map((w:string[])=>wire(w[0],w[1])).join('')}<path d="M65 38 H98 M152 38 H185"/><circle cx="125" cy="38" r="27" fill="#fff9d4"/><path d="M107 20 L143 56 M143 20 L107 56" stroke="#ba9041"/><path d="M45 120 H112 M138 120 H205 M112 103 V137 M122 110 V130 M128 103 V137 M138 110 V130" stroke="#344852"/>${switched ? `<path d="M${points.S[0]} ${points.S[1]} l${switchLeft?17:-17} ${switchLeft?-23:23}" stroke="#ac7940"/>` : ''}</g>${Object.entries(points).filter(([k])=>switched||!['S','T'].includes(k)).map(([name,p]:any)=>`<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#204d56"/><text x="${p[0]+(p[0]<125?-18:10)}" y="${p[1]+5}" fill="#233e48" font-size="14" font-family="Arial" font-weight="700">${escape(name)}</text>`).join('')}<text x="125" y="155" text-anchor="middle" fill="#506671" font-size="12" font-family="Arial">Battery</text></svg>`;
}
function training(m: any) {
  prepareDraft(); const q = currentQuestion(); if (!q?.prompt) return `<div class="result-panel"><p>Loading the next forge task.</p>${button('reload', 'Reload saved match', 'refresh-cw')}</div>`;
  const feedback = q.feedback; const feedbackText = typeof feedback === 'string' ? feedback : feedback?.text || feedback?.message || feedback?.explanation || feedback?.hint || '';
  const input = q.type === 'numeric'
    ? `<div class="numeric-value" role="textbox" aria-label="Your answer" aria-readonly="true" tabindex="0" id="numeric-answer">${escape(draft) || '<span style="opacity:.4">?</span>'}</div><div class="keypad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'clear', 0, 'backspace'].map(n => `<button type="button" data-action="key" data-key="${n}" aria-label="${n === 'clear' ? 'Clear answer' : n === 'backspace' ? 'Delete last digit' : n}" ${blocked() ? 'disabled' : ''}>${n === 'clear' ? icon('x') : n === 'backspace' ? icon('delete') : n}</button>`).join('')}</div>`
    : q.type === 'order'
      ? `<div class="order-slots" aria-label="Your order">${q.choices.map((_: any, i: number) => `<span>${escape(q.choices.find((c: any) => c.id === draft[i])?.label || '')}</span>`).join('')}</div><div class="order-options">${q.choices.map((c: any) => `<button type="button" data-action="order" data-choice="${escape(c.id)}" ${draft.includes(c.id) || blocked() ? 'disabled' : ''}>${escape(c.label)}</button>`).join('')}</div><div class="order-controls">${iconButton('undo-order', 'Undo last choice', 'undo-2')}${iconButton('clear-order', 'Clear order', 'rotate-ccw')}</div>`
      : `<div class="answer-options">${q.choices.map((c: any) => `<button type="button" class="answer-option ${draft === c.id ? 'selected' : ''}" data-action="choose" data-choice="${escape(c.id)}" aria-pressed="${draft === c.id}" ${blocked() ? 'disabled' : ''}>${escape(c.label)}</button>`).join('')}</div>`;
  const canSubmit = q.type === 'order' ? draft.length === q.choices.length : String(draft).length > 0;
  return `<section class="forge-panel" data-question="${escape(q.id)}"><div class="forge-top"><span class="eyebrow">${escape(q.title || 'Forge task')} / ${levelName(q.learningLevel || m.learningLevel || 1)}</span><span class="forge-count">${m.questionIndex % forgeSize(m) + 1} / ${forgeSize(m)}</span></div><div class="forge-brief"><h2 tabindex="-1">${escape(q.prompt)}</h2>${evidence(q)}${feedbackText ? `<div class="feedback ${q.resolved ? '' : 'wrong'}" role="status"><strong>${q.resolved ? 'Ready' : q.hintsUsed >= 2 ? 'Worked support' : 'A useful clue'}</strong>${escape(feedbackText)}</div>` : ''}</div><div class="forge-response">${input}<div class="forge-actions">${button('answer', 'Confirm', 'check', 'primary', blocked() || !canSubmit)}${button('hint', q.hintsUsed >= 1 ? 'Show steps' : 'Clue', 'circle-help', 'quiet', blocked() || q.hintsUsed >= 2)}</div><p class="save-state">${busy ? 'Saving your answer' : 'Take your time. The battle is paused.'}</p></div></section>`;
}
function result(m: any) {
  const h = getHero(m.heroId), count = forgeSize(m);
  const final = m.round === totalRounds(m), stage = equipmentStage(m), weapon = h.weapons[stage];
  if (m.phase === 'round_won') return `<section class="result-panel"><span class="eyebrow">${final ? 'Final round' : 'Round ' + m.round}</span><h1>${final ? 'TRIAL COMPLETE!' : 'YOU WON THIS ROUND!'}</h1><p>${final ? `${totalRounds(m)} rounds won. Your City Guardian badge is ready.` : `Next mission: solve ${count} ${forgeSubject(m.round)} challenges to build your ${h.weapons[m.round].name}.`}</p>${button('continue', final ? 'Claim guardian badge' : 'Build my next upgrade', 'arrow-right', 'primary', blocked())}</section>`;
  if (m.phase === 'rival_upgrade') { const kit = PRISM_KITS[prismStage(m)]; return `<section class="result-panel"><span class="eyebrow">Prism evolves / Round ${m.round + 1}</span><h1>${kit.name.toUpperCase()}</h1><p>${kit.detail}</p><p>Build your ${h.weapons[m.round].name} in the ${forgeSubject(m.round)} forge to meet the challenge.</p>${button('continue', 'Enter the forge', 'hammer', 'primary', blocked())}</section>`; }
  if (m.phase === 'player_upgrade') return `<section class="result-panel"><div class="result-tag">${icon(weapon.icon)}${STAGE_NAMES[stage]} unlocked</div><h1>${weapon.name.toUpperCase()}</h1><p>${upgradeDescription(m)} ${stage === 1 ? `Choose ${weapon.shortName} with ${h.id === 'echo' && m.rulesVersion >= 3 ? 1 : 2} energy.` : stage === 2 ? 'Fill 4 energy for your heavy blast.' : ''}</p>${button('continue', `Ready for round ${m.round + 1}`, 'arrow-right', 'primary', blocked())}</section>`;
  if (m.phase === 'defeat') return `<section class="result-panel"><span class="eyebrow">Suit shield depleted</span><h1>RESET. RISE AGAIN.</h1><p>Your equipment and forge progress are safe. Try a different move when Prism winds up.</p><div class="actions">${button('retry', 'Try this round again', 'rotate-ccw', 'primary', blocked())}${button('retry-supported', 'Try with support', 'shield', '', blocked())}</div></section>`;
  return `<section class="result-panel"><div class="tier-medal">${icon('trophy')}CITY GUARDIAN / TIER ${state.tier}</div><h1>STRONGER TOGETHER</h1><p>${h.name} and Prism rise together. Your Guardian rank is saved.</p><div class="actions">${button('start', 'Rematch', 'swords', 'primary', blocked())}${button('review', 'Review training', 'book-open')}${button('hangar', 'Choose hero', 'users')}</div><div style="margin-top:13px"><a class="button quiet" href="/">${icon('arrow-left')}Bright Quest</a></div></section>`;
}
function review() {
  const questions = (state.match?.questions || []).filter((q: any) => q.prompt && q.resolved);
  return `<section class="review-panel"><div class="dialog-head"><h1>Your forge work</h1>${button('arena', 'Back to arena', 'arrow-left')}</div><p>Completed equipment tasks in this match.</p>${questions.length ? questions.map((q: any) => `<article class="review-item"><span class="status ${q.completion === 'independent' ? '' : 'supported'}">${escape(q.completion === 'independent' ? 'Independent' : 'Completed with support or retry')}</span><h3>${escape(q.prompt)}</h3><p>${escape(typeof q.feedback === 'string' ? q.feedback : q.feedback?.text || q.feedback?.message || q.outcome || '')}</p></article>`).join('') : '<p>Your completed forge tasks will appear here.</p>'}<p>Parents can see original responses in the Bright Quest Parent review.</p><a class="button" href="/">${icon('arrow-left')}Return to Bright Quest</a></section>`;
}
function heroTabs(compact = false) {
  return `<div class="hero-roster ${compact ? 'compact' : ''}" aria-label="Choose hero">${HEROES.map(h => `<button type="button" data-action="select-hero" data-hero="${h.id}" class="hero-tile ${selectedHero === h.id ? 'selected' : ''}" aria-pressed="${selectedHero === h.id}" style="--hero-accent:${h.colour}">${!compact ? `<img src="/sparkbound/assets/heroes/${h.id}-0.jpg" alt="" width="160" height="160">` : icon(h.weapons[1].icon)}<span>${h.name}</span></button>`).join('')}</div>`;
}
function hangar() {
  const h = getHero(selectedHero), active = state.match && state.match.phase !== 'victory';
  return `<section class="hangar-panel" aria-label="Hero hangar"><div class="hangar-heading"><span class="eyebrow">HERO HANGAR</span><span class="hangar-rank">${icon('trophy')}Rank ${state.tier}</span></div><h1>${h.name.toUpperCase()}</h1><p class="hero-role">${h.role}</p>${heroTabs()}<div class="hero-trait">${icon(h.weapons[1].icon)}<div><strong>${h.trait.name}</strong><p>${getHeroTrait({heroId:h.id,rulesVersion:4}).description}</p></div></div><div class="kit-preview" aria-label="Preview equipment">${h.weapons.map((w, i) => `<button type="button" data-action="preview-kit" data-stage="${i}" aria-pressed="${previewStage === i}" class="${previewStage === i ? 'selected' : ''}">${i === 0 ? 'Base' : `Mk ${i + 1}`}</button>`).join('')}</div><p class="preview-name">${previewStage ? 'Preview: ' : ''}${h.weapons[previewStage].name}</p><div class="inspection-controls" role="group" aria-label="Rotate hero">${iconButton('rotate-left', 'Rotate hero left', 'arrow-left')}${iconButton('rotate-reset', 'Reset hero view', 'rotate-ccw')}${iconButton('rotate-right', 'Rotate hero right', 'arrow-right')}</div><div class="hangar-actions">${button(active ? 'arena' : 'start', active ? `Resume ${getHero(state.match.heroId).name}` : `Play as ${h.name}`, 'play', 'primary full', blocked())}${button('path', 'Upgrade path', 'route', '', blocked())}${iconButton('how', 'Guardian mission', 'circle-help')}</div>${active ? `<p class="hangar-note">Your current match stays with ${getHero(state.match.heroId).name}. Choose a new hero for your next duel.</p>` : `<p class="hangar-note">Six rounds. Five earned upgrades. ${levelName(nextCampaignLevel())} challenges.</p>`}</section>`;
}
function upgradePath() {
  const h = getHero(selectedHero), m = state.match, same = m && getHero(m.heroId).id === h.id, stage = same ? equipmentStage(m) : -1;
  const size = same ? forgeSize(m) : 3;
  const legacy = same && (!m.rulesVersion || m.rulesVersion < 3);
  return `<section class="path-panel" aria-label="Upgrade path"><header class="path-heading"><div><span class="eyebrow">HERO DEVELOPMENT</span><h1>Build your guardian</h1></div>${button('path-back', 'Back', 'arrow-left')}</header>${heroTabs(true)}${legacy ? '<p class="legacy-note">Your saved three-round duel keeps its original equipment. Start your next duel for all five upgrades.</p>' : ''}<div class="path-intro"><div><h2>${h.name}</h2><p>${h.trait.name}: ${getHeroTrait({heroId:h.id,rulesVersion:4}).description}</p></div><span class="path-rank">${icon('trophy')}Guardian rank ${state.tier}</span></div><div class="upgrade-stages">${h.weapons.map((w, i) => { const status = stage === i ? 'Equipped' : stage > i ? 'Completed' : i === 0 ? 'Ready at start' : legacy && i >= 3 ? 'Next duel' : 'Locked'; return `<article class="upgrade-stage ${stage === i ? 'equipped' : ''}"><div class="stage-image"><img src="/sparkbound/assets/heroes/${h.id}-${i}.jpg" alt="${escape(h.name + ' with ' + w.name)}" width="320" height="320"><span class="stage-status ${stage >= i ? 'earned' : ''}">${icon(stage >= i ? 'check' : i ? 'lock' : 'play')}${status}</span></div><div class="stage-copy"><span class="eyebrow">${String(i + 1).padStart(2, '0')} / ${STAGE_NAMES[i].toUpperCase()}</span><h3>${w.name}</h3><p>${upgradeDescription(same && m.rulesVersion === 3 ? {...m,upgradeStage:i} : {heroId:h.id,rulesVersion:4,upgradeStage:i})}</p><div class="stage-requirement">${icon(i ? 'hammer' : 'swords')}${i === 0 ? 'Start your duel' : `Win round ${i} + solve ${size} ${forgeSubject(i)} challenges`}</div></div></article>`; }).join('')}</div><section class="prism-path" aria-label="Prism equipment"><div><span class="eyebrow">YOUR RIVAL EVOLVES TOO</span><h2>Prism\'s arsenal</h2></div><ol>${PRISM_KITS.map((kit, i) => `<li class="${m && prismStage(m) === i ? 'current' : ''}"><span>ROUND ${i + 1}</span><strong>${kit.name}</strong><p>${kit.detail}</p></li>`).join('')}</ol></section><section class="learning-path"><div><span class="eyebrow">CHALLENGE PROGRESSION</span><h2>Grow through victories</h2><p>Earn all five upgrades in order. Later forges add more reasoning, with clues available throughout. Your Guardian rank and completed training remain saved.</p></div><ol>${learningSteps()}</ol></section></section>`;
}
function render() {
  if (!state || !world) return; const m = visualMatch || guide?.match || state.match;
  const priorForge = document.querySelector<HTMLElement>('.forge-panel[data-question]');
  const forgeScroll = priorForge?.dataset.question === currentQuestion()?.id ? priorForge?.scrollTop || 0 : 0;
  const hangarScroll = document.querySelector<HTMLElement>('.hangar-panel')?.scrollTop || 0;
  const showHangar = !guide && (view === 'hangar' || (!m && view !== 'path' && view !== 'review'));
  $('game').dataset.view = showHangar ? 'hangar' : view;
  $('game').dataset.guide = guide?.step || '';
  if (!acting) { world.sync(showHangar ? null : guide?.match || state.match, state.tier); world.trainingPreview(guide ? guide.step === 'charge' ? 'charge' : guide.step === 'relay' ? 'relay' : guide.step === 'prism' ? 'prism' : 'opening' : null); if (showHangar) world.previewHero(selectedHero, previewStage); }
  $('game').dataset.phase = m?.phase || 'welcome'; $('game').setAttribute('aria-busy', String(busy || acting));
  $('topbar').innerHTML = `<div class="wordmark"><span class="brand-icon">${icon('zap')}</span><div>SPARKBOUND<small>BRIGHT QUEST / HERO TRIALS</small></div></div><nav class="top-actions" aria-label="Game menu"><span class="profile-name">${escape(profile.name)}</span>${local ? '<span class="preview-tag">LOCAL QA</span>' : ''}${iconButton('sound', prefs.sound ? 'Mute sound' : 'Enable sound', prefs.sound ? 'volume-2' : 'volume-x')}${iconButton('settings', 'Settings', 'settings')}${iconButton('pause', 'Pause game', 'pause')}${iconButton('exit', 'Return to Bright Quest', 'arrow-left')}</nav>`;
  $('hud').innerHTML = hud(m); caption(m);
  if (guide && !acting) $('scene-caption').innerHTML = `<div class="guide-signal ${guide.step === 'charge' ? 'charging' : ''}">${icon(guide.step === 'charge' ? 'zap' : guide.step === 'relay' ? 'shield' : 'target')}<strong>${guide.step === 'relay' ? 'RELAY / YOUR HERO' : guide.step === 'prism' ? 'PRISM / YOUR RIVAL' : guide.step === 'charge' ? 'CHARGING A BIG HIT' : guide.step === 'blocked' ? 'BLOCK SUCCESSFUL' : 'CHARGE GONE / OPENING'}</strong></div>`;
  $('interface').innerHTML = guide ? guidePanel() : earnedTask && !acting ? `<section class="forge-panel earned-panel"><span class="result-tag">${icon('check')}COMPONENT READY</span><h2>${escape(earnedTask.outcome)}</h2><div class="feedback"><strong>${earnedTask.completion === 'independent' ? 'Solved independently' : 'Solved with practice'}</strong>${escape(earnedTask.feedback?.message || '')}</div>${button('acknowledge', state.match.phase === 'player_upgrade' ? 'See your upgrade' : 'Next component', 'arrow-right', 'primary full')}</section>` : view === 'review' ? review() : view === 'path' ? upgradePath() : showHangar ? hangar()
    : m.phase === 'battle' ? battle(m) : acting ? `<section class="result-panel"><span class="result-tag">${icon('cpu')}ASSEMBLING YOUR EQUIPMENT</span></section>` : m.phase === 'training' ? training(m) : result(m);
  $('connection').innerHTML = pending ? `<div class="connection-banner">Save pending ${button('reconnect', 'Reconnect', 'refresh-cw', '', busy)}</div>` : '';
  const nextForge = document.querySelector<HTMLElement>('.forge-panel[data-question]');
  if (nextForge) nextForge.scrollTop = forgeScroll;
  const nextHangar = document.querySelector<HTMLElement>('.hangar-panel');
  if (nextHangar) nextHangar.scrollTop = hangarScroll;
  world.reduced = prefs.reduced; world.paused = paused || dialog.open || document.hidden || view === 'path' || view === 'review';
  $('game').dataset.reduced = String(prefs.reduced);
  audio.setIntensity(m?.phase === 'battle' ? m.intent === 'heavy' || m.playerHP <= 8 ? .85 : m.round >= 3 ? .65 : .35 : .15);
  audio.setHero(showHangar ? selectedHero : getHero(m?.heroId).id); audio.setMusicEnabled(prefs.music !== false); audio.setEffectsEnabled(prefs.effects !== false);
  audio.setEnabled(prefs.sound); audio.setVolume(prefs.volume); if (!paused && !dialog.open && !document.hidden && !pending) audio.startMusic(browsing() || m?.phase === 'training' ? 'forge' : m?.phase === 'victory' ? 'victory' : 'battle');
  decorate();
  if (currentQuestion()?.feedback && !earnedTask && !guide && feedbackVersion !== state.version) {
    const feedback = document.querySelector('.forge-brief .feedback');
    if (feedback) { feedback.scrollIntoView({ block: 'nearest' }); feedbackVersion = state.version; }
  }
}
function go(next: string) { view = next; history.pushState({ view }, '', `${location.pathname}${location.search}#${view}`); render(); }
function openDialog(title: string, body: string) { focusReturn = document.activeElement as HTMLElement; dialog.innerHTML = `<div class="dialog-head"><h2 id="dialog-title">${escape(title)}</h2>${iconButton('close-dialog', 'Close dialog', 'x')}</div><div class="dialog-body">${body}</div>`; dialog.setAttribute('aria-labelledby', 'dialog-title'); dialog.showModal(); world.paused = true; audio.stop(); decorate(); }
function closeDialog() { dialog.close(); paused = false; world.paused = document.hidden; focusReturn?.focus(); render(); }
function settings() { openDialog('Arena settings', `<label class="setting">Sound<input type="checkbox" id="sound-setting" ${prefs.sound ? 'checked' : ''}></label><label class="setting">Background music<input type="checkbox" id="music-setting" ${prefs.music !== false ? 'checked' : ''}></label><label class="setting">Sound effects<input type="checkbox" id="effects-setting" ${prefs.effects !== false ? 'checked' : ''}></label><label class="setting">Volume<input type="range" id="volume-setting" min="0" max="1" step=".05" value="${prefs.volume}"></label><label class="setting">Tactical cues<input type="checkbox" id="cues-setting" ${prefs.cues !== false ? 'checked' : ''}></label><label class="setting">Reduced motion<input type="checkbox" id="motion-setting" ${prefs.reduced ? 'checked' : ''}></label><div class="dialog-actions">${button('hangar', 'Heroes', 'users', '', blocked())}${button('path', 'Upgrade path', 'route', '', blocked())}${button('mission', 'Guardian mission', 'target')}${button('save-settings', 'Done', 'check', 'primary')}${button('restart', 'Restart match', 'rotate-ccw', '', blocked() || !state.match)}</div>`); }
function how() { const rounds = state.match ? totalRounds(state.match) : 6; openDialog('The Guardian Trial', `<p><strong>Mission: win ${rounds} rounds.</strong> Empty Prism's shield while keeping your own above zero.</p><p>Watch Prism's charge. Raise your shield before a big hit; attack when Prism is open.</p><p>Between rounds, solve ${state.match ? forgeSize(state.match) : 3} maths or science challenges to build the next weapon. Your piercing shot breaks through a raised shield. A full four-energy charge powers your special.</p><p>${rounds === 6 ? 'Five earned upgrades take you from a base suit to a complete Guardian arsenal. Prism adds flame jets, rockets and heavier energy weapons as you advance.' : 'This saved duel keeps its original three-round progression. Your next duel includes all five upgrades.'}</p><div class="dialog-actions">` + button('practice', 'Practise with Prism', 'play', 'primary', blocked()) + button('close-dialog', 'Return to arena', 'arrow-left') + '</div>'); }
document.addEventListener('click', async e => {
  const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-action]'); if (!b || b.disabled) return;
  const action = b.dataset.action; if (!world) { if (action === 'reload') location.reload(); return; }
  if (action?.startsWith('guide-')) return guideAction(action);
  if (action === 'practice') { closeDialog(); startGuide(); return; }
  if (action === 'acknowledge') { earnedTask = null; render(); return; }
  if (action === 'sound') { prefs.sound = !prefs.sound; storage.set('bqSparkSettings', prefs); if (prefs.sound) await audio.unlock(); else audio.stop(); render(); return; }
  if (action === 'settings') return settings(); if (action === 'how') return how();
  if (action === 'mission') { dialog.close(); return how(); }
  if (action === 'close-dialog') return closeDialog();
  if (action === 'save-settings') { prefs.sound = ($('sound-setting') as HTMLInputElement).checked; prefs.music = ($('music-setting') as HTMLInputElement).checked; prefs.effects = ($('effects-setting') as HTMLInputElement).checked; prefs.volume = Number(($('volume-setting') as HTMLInputElement).value); prefs.cues = ($('cues-setting') as HTMLInputElement).checked; prefs.reduced = ($('motion-setting') as HTMLInputElement).checked; storage.set('bqSparkSettings', prefs); if (prefs.sound) await audio.unlock(); closeDialog(); return; }
  if (action === 'pause') { paused = true; return openDialog('Match paused', `<p>Your current round and equipment are safe.</p><div class="dialog-actions">${button('close-dialog', 'Resume', 'play', 'primary')}${button('review-dialog', 'Review training', 'book-open', '', !!guide || acting)}</div><p><a class="button full" href="/">${icon('arrow-left')}Return to Bright Quest</a></p>`); }
  if (action === 'exit') return openDialog('Leave the arena?', `<p>${pending ? 'A save is waiting to reconnect. Reconnect before leaving.' : 'Your confirmed progress is saved. You can resume this match later.'}</p><div class="dialog-actions">${button('close-dialog', 'Keep playing', 'play', 'primary')}<a class="button" href="/">${icon('arrow-left')}Bright Quest</a></div>`);
  if (action === 'restart') return openDialog('Restart this match?', `<p>This starts over at round 1. Your completed learning evidence and previous wins stay in Parent review.</p><div class="dialog-actions">${button('close-dialog', 'Keep playing', 'arrow-left', 'primary')}${button('confirm-restart', 'Restart match', 'rotate-ccw', 'danger', blocked())}</div>`);
  if (action === 'confirm-restart') { closeDialog(); await perform({ type: 'reset' }); return; }
  if (action === 'review-dialog') { if (guide) return; closeDialog(); go('review'); return; }
  if (action === 'arena' || action === 'review') { if (!acting) go(action); return; }
  if (action === 'reload') return location.reload(); if (action === 'reconnect') return reconnect();
  if (blocked()) return;
  if (action === 'rotate-left' || action === 'rotate-right' || action === 'rotate-reset') { world.turnPreview(action === 'rotate-reset' ? null : action === 'rotate-left' ? -.5 : .5); return; }
  if (action === 'hangar') { if (dialog.open) closeDialog(); previewStage = 0; go('hangar'); return; }
  if (action === 'path') { pathReturn = view === 'hangar' || !state.match ? 'hangar' : 'arena'; if (dialog.open) closeDialog(); go('path'); return; }
  if (action === 'path-back') { go(pathReturn); return; }
  if (action === 'select-hero' && isHeroId(b.dataset.hero) && (view === 'path' || view === 'hangar' || !state.match)) { if (prefs.sound) await audio.unlock(); selectedHero = b.dataset.hero!; previewStage = 0; storage.set(heroKey(), selectedHero); audio.setHero(selectedHero); playSound('select'); render(); return; }
  if (action === 'preview-kit' && (view === 'hangar' || !state.match)) { const stage = Number(b.dataset.stage); if (Number.isInteger(stage) && stage >= 0 && stage < getHero(selectedHero).weapons.length) { if (prefs.sound) await audio.unlock(); previewStage = stage; playSound('select'); render(); } return; }
  if (prefs.sound) await audio.unlock();
  if (action === 'start' && !state.match && !storage.get(guideKey())) return startGuide();
  if (['start', 'continue', 'retry'].includes(action!)) return perform({ type: action, ...(action === 'start' ? { heroId: selectedHero } : {}) });
  if (action === 'retry-supported') return perform({ type: 'retry', support: true });
  if (action === 'move') return perform({ type: 'move', move: b.dataset.move });
  const q = currentQuestion();
  if (action === 'choose') { draft = b.dataset.choice; saveDraft(); render(); }
  if (action === 'order' && q?.type === 'order' && !draft.includes(b.dataset.choice)) { draft.push(b.dataset.choice); saveDraft(); render(); }
  if (action === 'undo-order') { draft.pop(); saveDraft(); render(); }
  if (action === 'clear-order') { draft = []; saveDraft(); render(); }
  if (action === 'key') { const key = b.dataset.key; draft = key === 'clear' ? '' : key === 'backspace' ? String(draft).slice(0, -1) : (String(draft) + key).replace(/^0+(?=\d)/, '').slice(0, 6); saveDraft(); render(); }
  if (action === 'hint' && q) await perform({ type: 'hint', questionId: q.id });
  if (action === 'answer' && q) await perform({ type: 'answer', questionId: q.id, answer: draft });
});
document.addEventListener('keydown', e => {
  if (dialog.open || blocked() || view !== 'arena' || currentQuestion()?.type !== 'numeric' || state.match.phase !== 'training' || (e.target as HTMLElement).tagName === 'BUTTON' && ['Enter', ' '].includes(e.key)) return;
  if (/^\d$/.test(e.key)) { e.preventDefault(); draft = (String(draft) + e.key).replace(/^0+(?=\d)/, '').slice(0, 6); saveDraft(); render(); }
  else if (e.key === 'Backspace') { e.preventDefault(); draft = String(draft).slice(0, -1); saveDraft(); render(); }
  else if (e.key === 'Enter' && String(draft)) { e.preventDefault(); perform({ type: 'answer', questionId: currentQuestion().id, answer: draft }); }
});
dialog.addEventListener('cancel', e => { e.preventDefault(); closeDialog(); });
window.addEventListener('popstate', e => { if (dialog.open) closeDialog(); view = !guide && !acting && ['review', 'hangar', 'path'].includes(e.state?.view) ? e.state.view : 'arena'; render(); });
document.addEventListener('visibilitychange', () => { if (!world) return; world.paused = document.hidden || paused || dialog.open; if (document.hidden) { audio.stop(); speechSynthesis.cancel(); } else render(); });
async function boot() {
  try {
    const result = await request(); state = result.state; profile = result.profile; pending = storage.get(pendingKey()); const savedHero = storage.get(heroKey()); selectedHero = getHero(isHeroId(savedHero) ? savedHero : state.match?.heroId).id;
    $('loading-message').textContent = 'Bringing the heroes online'; world = new SparkWorld($('scene') as HTMLCanvasElement);
    world.onCue = name => playSound(name); world.onBeat = text => { $('scene-caption').innerHTML = text ? `<h2 class="scene-title">${escape(text)}</h2>` : ''; };
    world.onImpact = (event, part) => {
      const after = guide?.after || state.match;
      if (!visualMatch || !after) return;
      visualMatch = { ...visualMatch, energy: after.energy, ...(part === 'player' ? { rivalHP: after.rivalHP } : { playerHP: after.playerHP }) };
      $('hud').innerHTML = hud(visualMatch); decorate();
    };
    await world.ready; $('loading').style.display = 'none';
    if (local) (window as any).__SPARK_QA__ = { get state() { return state; }, get world() { return world; }, get audio() { return audio; }, get acting() { return acting; }, get guide() { return guide; } };
    history.replaceState({ view }, '', `${location.pathname}${location.search}#arena`); render();
    if (state.match?.phase === 'battle' && !storage.get(guideKey()) && !pending) startGuide();
  } catch (e: any) {
    if(local)console.error('Sparkbound boot failed',e);
    $('loading').innerHTML = `<div class="missing-assets"><span class="eyebrow">Bright Quest</span><h1>SPARKBOUND</h1><p>${[401, 403, 409].includes(e.status) ? 'Open Bright Quest and select your child profile to begin.' : 'The arena could not load. Your saved progress is safe.'}</p><div class="actions">${button('reload', 'Try again', 'refresh-cw', 'primary')}<a class="button" href="/">${icon('arrow-left')}Open Bright Quest</a></div></div>`; decorate(); $('game').setAttribute('aria-busy', 'false');
  }
}
boot();
