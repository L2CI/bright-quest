import { createIcons, Shield, Swords, Zap, ArrowLeft, ArrowRight, Volume2, VolumeX, Settings, Pause, Play, X, Check, Lock, RotateCcw, Sparkles, ChevronRight, HelpCircle, Delete, Undo2, BookOpen, Cpu, Trophy, Hammer, Hand, CircleHelp, RefreshCw } from 'lucide';
import { SparkWorld } from './world';
import { GameAudio } from './sound';

const icons = { Shield, Swords, Zap, ArrowLeft, ArrowRight, Volume2, VolumeX, Settings, Pause, Play, X, Check, Lock, RotateCcw, Sparkles, ChevronRight, HelpCircle, Delete, Undo2, BookOpen, Cpu, Trophy, Hammer, Hand, CircleHelp, RefreshCw };
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
const dialog = $('dialog') as HTMLDialogElement;
const pendingKey = () => `bqSparkPending:${profile.id}`;
const draftKey = () => `bqSparkDraft:${profile.id}:${state.match?.id}:${state.match?.questions?.[state.match?.questionIndex]?.id}`;
const currentQuestion = () => state?.match?.questions?.[state.match?.questionIndex];
const decorate = () => createIcons({ icons, attrs: { 'stroke-width': 1.9 } });
const blocked = () => busy || acting || !!pending || !!earnedTask;
const intentData: any = {
  open: ['Open stance', 'Prism is recovering', 'Hand'], guard: ['Shield ready', 'The staff can pierce this guard', 'Shield'],
  strike: ['Quick strike', 'A light hit is coming', 'Swords'], heavy: ['Power strike', 'A heavy hit is coming', 'Zap']
};
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
  const body = { operationId: crypto.randomUUID(), version: state.version, action };
  storage.set(pendingKey(), body);
  try {
    const result = await request(body); state = result.state; storage.remove(pendingKey());
    if (action.type === 'answer' && state.match?.lastEvent?.kind) {
      const attempted = state.match.questions.find((q: any) => q.id === action.questionId);
      audio.play(attempted?.resolved ? 'correct' : 'wrong');
      if (attempted?.resolved) earnedTask = attempted;
    }
    if (action.type === 'move' || (before.match?.phase === 'training' && state.match?.phase === 'player_upgrade')) {
      acting = true; visualMatch = before.match; busy = false; render();
      await world.playEvent(state.match.lastEvent, state.match);
      acting = false; visualMatch = null;
    } else if (state.match?.phase === 'rival_upgrade' && before.match?.phase !== 'rival_upgrade') audio.play('charge');
    else if (state.match?.phase === 'victory' && before.match?.phase !== 'victory') { audio.play('victory'); audio.startMusic('victory'); }
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
  if (!m || view === 'review') return '';
  const roundConfig = state.configuration?.battle?.rounds?.[m.round - 1] || [{ playerHP: 24, rivalHP: 16 }, { playerHP: 26, rivalHP: 28 }, { playerHP: 24, rivalHP: 50 }][m.round - 1];
  const playerMax = m.maxPlayerHP || roundConfig.playerHP, rivalMax = m.maxRivalHP || roundConfig.rivalHP;
  const powerMax = Math.max(m.playerPower, m.rivalPower, 32);
  const hero = (name: string, power: number, hp: number, max: number, rival = false) => `<div class="hero-hud ${rival ? 'rival' : ''}"><div class="hero-title"><strong>${name}</strong><small>${rival ? 'YOUR RIVAL' : 'YOUR HERO'}</small></div><div class="power-readout"><span>POWER</span><b>${power}</b></div><div class="power-track"><span style="width:${Math.max(0, Math.min(100, power / powerMax * 100))}%"></span></div><div class="integrity">${icon('shield')}<span>Suit</span><div class="integrity-track"><i style="width:${Math.max(0, Math.min(100, hp / max * 100))}%"></i></div><b>${hp}/${max}</b></div></div>`;
  return hero('RELAY', m.playerPower, m.playerHP, playerMax) + `<div class="round-chip"><div class="round-dots">${[1, 2, 3].map(n => `<i class="${n <= m.round ? 'done' : ''}"></i>`).join('')}</div>ROUND ${m.round} / 3</div>` + hero('PRISM', m.rivalPower, m.rivalHP, rivalMax, true);
}
function caption(m: any) {
  if (acting) return;
  if (!m || view === 'review') { $('scene-caption').innerHTML = ''; return; }
  if (m.phase === 'battle') { const info = intentData[m.intent] || intentData.open; $('scene-caption').innerHTML = `<div class="intent">${icon(info[2].replace(/[A-Z]/g, (x: string) => '-' + x.toLowerCase()).replace(/^-/, ''))}<div class="intent-detail"><strong>${escape(info[0])}</strong><small>${m.intent === 'guard' && !m.staff ? 'Guard holds. Wait for an opening.' : escape(info[1])}</small></div></div>`; }
  else if (m.phase === 'training') $('scene-caption').innerHTML = `<h2 class="scene-title">${m.trainingStage === 1 ? 'THE BREACH FORGE' : 'AEGIS WORKSHOP'}</h2><p class="scene-subtitle">${m.trainingStage === 1 ? 'Build a way through the guard' : 'Prepare for the final round'}</p>`;
  else $('scene-caption').innerHTML = '';
}
function battle(m: any) {
  const moves = [
    { id: 'strike', name: 'Strike', icon: 'swords', hint: '+1 energy', disabled: false },
    { id: 'guard', name: 'Guard', icon: 'shield', hint: 'Absorb & charge', disabled: false },
    { id: 'break', name: 'Break', icon: m.staff ? 'hammer' : 'lock', hint: m.staff ? '2 energy' : 'Forge unlock', disabled: !m.staff || m.energy < 2 },
    { id: 'special', name: 'Special', icon: m.pad ? 'zap' : 'lock', hint: m.pad ? `${m.energy} / 4 energy` : 'Round 3', disabled: !m.pad || m.energy < 4 }
  ];
  return `<section class="battle-console"><p class="battle-hint">${acting ? 'Exchange in motion' : m.exchange === 0 && m.round === 1 ? 'Strike an opening. Guard a heavy hit.' : m.energy === 4 && m.pad ? 'Full charge. Make it count.' : 'Your move.'}</p><div class="moves">${moves.map(a => `<button type="button" class="move" data-action="move" data-move="${a.id}" ${a.disabled || blocked() ? 'disabled' : ''} title="${escape(a.name + ': ' + a.hint)}" aria-label="${escape(a.name + ', ' + a.hint)}">${icon(a.icon)}<b>${a.name}</b><small>${a.hint}</small>${a.id === 'special' ? `<span class="energy-fill" style="width:${m.energy / 4 * 100}%"></span>` : ''}</button>`).join('')}</div><p class="save-state">${busy ? 'Saving move' : acting ? ' ' : 'Progress saved'}</p></section>`;
}
function evidence(q: any) {
  const e = q.evidence; if (!e) return '';
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
  return `<section class="forge-panel"><div class="forge-top"><span class="eyebrow">${escape(q.title || 'Forge task')}</span><span class="forge-count">${m.questionIndex % 2 + 1} / 2</span></div><div class="forge-brief"><h2 tabindex="-1">${escape(q.prompt)}</h2>${evidence(q)}${feedbackText ? `<div class="feedback ${q.resolved ? '' : 'wrong'}" role="status"><strong>${q.resolved ? 'Ready' : q.hintsUsed >= 2 ? 'Worked support' : 'A useful clue'}</strong>${escape(feedbackText)}</div>` : ''}</div><div class="forge-response">${input}<div class="forge-actions">${button('answer', 'Confirm', 'check', 'primary', blocked() || !canSubmit)}${button('hint', q.hintsUsed >= 1 ? 'Show steps' : 'Clue', 'circle-help', 'quiet', blocked() || q.hintsUsed >= 2)}</div><p class="save-state">${busy ? 'Saving your answer' : 'Take your time. The battle is paused.'}</p></div></section>`;
}
function result(m: any) {
  if (m.phase === 'round_won') return `<section class="result-panel"><span class="eyebrow">${m.round === 3 ? 'Final round' : 'Round ' + m.round}</span><h1>${m.round === 3 ? 'YOU BROKE THROUGH' : 'ROUND COMPLETE'}</h1><p>${m.round === 3 ? 'A worthy rival. A stronger team.' : 'Prism has something new. So will you.'}</p>${button('continue', m.round === 3 ? 'Become a guardian' : 'Meet the next challenge', 'arrow-right', 'primary', blocked())}</section>`;
  if (m.phase === 'rival_upgrade') return `<section class="result-panel"><span class="eyebrow">Prism evolves</span><h1>${m.round === 1 ? 'A GUARD TO BREAK' : 'A STRONGER PULSE'}</h1><p>${m.round === 1 ? 'The forge holds your next move: a staff that pierces the shield.' : 'Build an Aegis module. Keep your shield strong for the final round.'}</p>${button('continue', 'Enter the forge', 'hammer', 'primary', blocked())}</section>`;
  if (m.phase === 'player_upgrade') return `<section class="result-panel"><div class="result-tag">${icon(m.pad ? 'shield' : 'hammer')}${m.pad ? 'Aegis protection + Special charge' : 'Guard-piercing staff unlocked'}</div><h1>${m.pad ? 'BUILT TO HOLD' : 'BUILT TO BREAK THROUGH'}</h1><p>${m.pad ? 'Your protective module is fitted. Overdrive is ready.' : 'Your staff can do what the gauntlets could not.'}</p>${button('continue', `Ready for round ${m.round + 1}`, 'arrow-right', 'primary', blocked())}</section>`;
  if (m.phase === 'defeat') return `<section class="result-panel"><span class="eyebrow">Suit shield depleted</span><h1>RESET. RISE AGAIN.</h1><p>Your equipment and forge progress are safe. Try a different move when Prism winds up.</p><div class="actions">${button('retry', 'Try this round again', 'rotate-ccw', 'primary', blocked())}${button('retry-supported', 'Try with support', 'shield', '', blocked())}</div></section>`;
  return `<section class="result-panel"><div class="tier-medal">${icon('trophy')}CITY GUARDIAN / TIER ${state.tier}</div><h1>STRONGER TOGETHER</h1><p>Relay and Prism rise together. Your new kit is earned.</p><div class="actions">${button('start', 'Rematch', 'swords', 'primary', blocked())}${button('review', 'Review training', 'book-open')}</div><div style="margin-top:13px"><a class="button quiet" href="/">${icon('arrow-left')}Bright Quest</a></div></section>`;
}
function review() {
  const questions = (state.match?.questions || []).filter((q: any) => q.prompt && q.resolved);
  return `<section class="review-panel"><div class="dialog-head"><h1>Your forge work</h1>${button('arena', 'Back to arena', 'arrow-left')}</div><p>Completed equipment tasks in this match.</p>${questions.length ? questions.map((q: any) => `<article class="review-item"><span class="status ${q.completion === 'independent' ? '' : 'supported'}">${escape(q.completion === 'independent' ? 'Independent' : 'Completed with support or retry')}</span><h3>${escape(q.prompt)}</h3><p>${escape(typeof q.feedback === 'string' ? q.feedback : q.feedback?.text || q.feedback?.message || q.outcome || '')}</p></article>`).join('') : '<p>Your completed forge tasks will appear here.</p>'}<p>Parents can see original responses in the Bright Quest Parent review.</p><a class="button" href="/">${icon('arrow-left')}Return to Bright Quest</a></section>`;
}
function render() {
  if (!state || !world) return; const m = visualMatch || state.match;
  if (!acting) world.sync(state.match, state.tier);
  $('game').dataset.phase = m?.phase || 'welcome'; $('game').setAttribute('aria-busy', String(busy || acting));
  $('topbar').innerHTML = `<div class="wordmark"><span class="brand-icon">${icon('zap')}</span><div>SPARKBOUND<small>BRIGHT QUEST / HERO TRIALS</small></div></div><nav class="top-actions" aria-label="Game menu"><span class="profile-name">${escape(profile.name)}</span>${local ? '<span class="preview-tag">LOCAL QA</span>' : ''}${iconButton('sound', prefs.sound ? 'Mute sound' : 'Enable sound', prefs.sound ? 'volume-2' : 'volume-x')}${iconButton('settings', 'Settings', 'settings')}${iconButton('pause', 'Pause game', 'pause')}${iconButton('exit', 'Return to Bright Quest', 'arrow-left')}</nav>`;
  $('hud').innerHTML = hud(m); caption(m);
  $('interface').innerHTML = earnedTask && !acting ? `<section class="forge-panel earned-panel"><span class="result-tag">${icon('check')}COMPONENT READY</span><h2>${escape(earnedTask.outcome)}</h2><div class="feedback"><strong>${earnedTask.completion === 'independent' ? 'Solved independently' : 'Solved with practice'}</strong>${escape(earnedTask.feedback?.message || '')}</div>${button('acknowledge', state.match.phase === 'player_upgrade' ? 'See your upgrade' : 'Next component', 'arrow-right', 'primary full')}</section>` : view === 'review' ? review() : !m
    ? `<section class="welcome"><span class="eyebrow">The guardian trials</span><h1>FORGE YOUR<br>COMEBACK.</h1><p>One rival. Three rounds.<br>Build the power that changes the fight.</p><div class="actions">${button('start', 'Enter the arena', 'swords', 'primary', blocked())}${iconButton('how', 'Meet the controls', 'circle-help')}</div>${state.wins ? `<p class="save-state">${state.wins} matches won / Tier ${state.tier}</p>` : ''}</section>`
    : m.phase === 'battle' ? battle(m) : acting ? `<section class="result-panel"><span class="result-tag">${icon('cpu')}ASSEMBLING YOUR EQUIPMENT</span></section>` : m.phase === 'training' ? training(m) : result(m);
  $('connection').innerHTML = pending ? `<div class="connection-banner">Save pending ${button('reconnect', 'Reconnect', 'refresh-cw', '', busy)}</div>` : '';
  world.reduced = prefs.reduced; world.paused = paused || dialog.open || document.hidden;
  audio.setEnabled(prefs.sound); audio.setVolume(prefs.volume); if (!paused && !dialog.open && !document.hidden && !pending) audio.startMusic(m?.phase === 'training' ? 'forge' : m?.phase === 'victory' ? 'victory' : 'battle');
  decorate();
  if (currentQuestion()?.feedback && !earnedTask) document.querySelector('.forge-brief .feedback')?.scrollIntoView({block:'nearest'});
}
function go(next: string) { view = next; history.pushState({ view }, '', `${location.pathname}${location.search}#${view}`); render(); }
function openDialog(title: string, body: string) { focusReturn = document.activeElement as HTMLElement; dialog.innerHTML = `<div class="dialog-head"><h2 id="dialog-title">${escape(title)}</h2>${iconButton('close-dialog', 'Close dialog', 'x')}</div><div class="dialog-body">${body}</div>`; dialog.setAttribute('aria-labelledby', 'dialog-title'); dialog.showModal(); world.paused = true; audio.stop(); decorate(); }
function closeDialog() { dialog.close(); paused = false; world.paused = document.hidden; focusReturn?.focus(); render(); }
function settings() { openDialog('Arena settings', `<label class="setting">Sound<input type="checkbox" id="sound-setting" ${prefs.sound ? 'checked' : ''}></label><label class="setting">Volume<input type="range" id="volume-setting" min="0" max="1" step=".05" value="${prefs.volume}"></label><label class="setting">Reduced motion<input type="checkbox" id="motion-setting" ${prefs.reduced ? 'checked' : ''}></label><div class="dialog-actions">${button('save-settings', 'Done', 'check', 'primary')}${button('restart', 'Restart match', 'rotate-ccw', '', blocked())}</div>`); }
function how() { openDialog('Your next move', '<p><strong>Strike</strong> an opening to deal damage and charge energy.</p><p><strong>Guard</strong> a heavy hit to protect your suit and charge faster.</p><p>The forge unlocks <strong>Break</strong>, then <strong>Special</strong>. Spend energy now, or save it for a bigger move.</p>' + button('close-dialog', 'Ready', 'check', 'primary full')); }
document.addEventListener('click', async e => {
  const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-action]'); if (!b || b.disabled) return;
  const action = b.dataset.action; if (!world) { if (action === 'reload') location.reload(); return; }
  if (action === 'acknowledge') { earnedTask = null; render(); return; }
  if (action === 'sound') { prefs.sound = !prefs.sound; storage.set('bqSparkSettings', prefs); if (prefs.sound) await audio.unlock(); else audio.stop(); render(); return; }
  if (action === 'settings') return settings(); if (action === 'how') return how();
  if (action === 'close-dialog') return closeDialog();
  if (action === 'save-settings') { prefs.sound = ($('sound-setting') as HTMLInputElement).checked; prefs.volume = Number(($('volume-setting') as HTMLInputElement).value); prefs.reduced = ($('motion-setting') as HTMLInputElement).checked; storage.set('bqSparkSettings', prefs); if (prefs.sound) await audio.unlock(); closeDialog(); return; }
  if (action === 'pause') { paused = true; return openDialog('Match paused', `<p>Your current round and equipment are safe.</p><div class="dialog-actions">${button('close-dialog', 'Resume', 'play', 'primary')}${button('review-dialog', 'Review training', 'book-open')}</div><p><a class="button full" href="/">${icon('arrow-left')}Return to Bright Quest</a></p>`); }
  if (action === 'exit') return openDialog('Leave the arena?', `<p>${pending ? 'A save is waiting to reconnect. Reconnect before leaving.' : 'Your confirmed progress is saved. You can resume this match later.'}</p><div class="dialog-actions">${button('close-dialog', 'Keep playing', 'play', 'primary')}<a class="button" href="/">${icon('arrow-left')}Bright Quest</a></div>`);
  if (action === 'restart') return openDialog('Restart this match?', `<p>This starts over at round 1. Your completed learning evidence and previous wins stay in Parent review.</p><div class="dialog-actions">${button('close-dialog', 'Keep playing', 'arrow-left', 'primary')}${button('confirm-restart', 'Restart match', 'rotate-ccw', 'danger', blocked())}</div>`);
  if (action === 'confirm-restart') { closeDialog(); await perform({ type: 'reset' }); return; }
  if (action === 'review-dialog') { closeDialog(); go('review'); return; }
  if (action === 'arena' || action === 'review') { if (!acting) go(action); return; }
  if (action === 'reload') return location.reload(); if (action === 'reconnect') return reconnect();
  if (blocked()) return;
  if (prefs.sound) await audio.unlock();
  if (['start', 'continue', 'retry'].includes(action!)) return perform({ type: action });
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
window.addEventListener('popstate', e => { if (dialog.open) closeDialog(); view = e.state?.view === 'review' ? 'review' : 'arena'; render(); });
document.addEventListener('visibilitychange', () => { if (!world) return; world.paused = document.hidden || paused || dialog.open; if (document.hidden) { audio.stop(); speechSynthesis.cancel(); } else render(); });
async function boot() {
  try {
    const result = await request(); state = result.state; profile = result.profile; pending = storage.get(pendingKey());
    $('loading-message').textContent = 'Bringing the heroes online'; world = new SparkWorld($('scene') as HTMLCanvasElement);
    world.onCue = name => audio.play(name); world.onBeat = text => { $('scene-caption').innerHTML = text ? `<h2 class="scene-title">${escape(text)}</h2>` : ''; };
    world.onImpact = (event, part) => {
      if (!visualMatch || !state.match) return;
      visualMatch = { ...visualMatch, energy: state.match.energy, ...(part === 'player' ? { rivalHP: state.match.rivalHP } : { playerHP: state.match.playerHP }) };
      $('hud').innerHTML = hud(visualMatch); decorate();
    };
    await world.ready; $('loading').style.display = 'none';
    if (local) (window as any).__SPARK_QA__ = { get state() { return state; }, get world() { return world; }, get audio() { return audio; }, get acting() { return acting; } };
    history.replaceState({ view }, '', `${location.pathname}${location.search}#arena`); render();
  } catch (e: any) {
    $('loading').innerHTML = `<div class="missing-assets"><span class="eyebrow">Bright Quest</span><h1>SPARKBOUND</h1><p>${[401, 403, 409].includes(e.status) ? 'Open Bright Quest and select your child profile to begin.' : 'The arena could not load. Your saved progress is safe.'}</p><div class="actions">${button('reload', 'Try again', 'refresh-cw', 'primary')}<a class="button" href="/">${icon('arrow-left')}Open Bright Quest</a></div></div>`; decorate(); $('game').setAttribute('aria-busy', 'false');
  }
}
boot();
