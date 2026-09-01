import { createIcons, Shield, House, Map, BookOpen, Settings, ArrowLeft, ArrowRight, Plus, Minus, RotateCcw, Volume2, VolumeX, Pause, Play, FlaskConical, Package, Check, X, ChevronRight, Radio, Flag, Wrench, HardHat, RefreshCw, HelpCircle, Eye, Navigation, MapPin, Calculator, Orbit, Sprout } from 'lucide';
import { ExpeditionWorld } from './world';
import { REGIONS, STATION_REWARD } from '../content.js';
import { createState, applyAction, publicState } from '../../functions/_lib/beacon-brigade.js';

const icons = { Shield, House, Map, BookOpen, Settings, ArrowLeft, ArrowRight, Plus, Minus, RotateCcw, Volume2, VolumeX, Pause, Play, FlaskConical, Package, Check, X, ChevronRight, Radio, Flag, Wrench, HardHat, RefreshCw, HelpCircle, Eye, Navigation, MapPin, Calculator, Orbit, Sprout };
const $ = (id: string) => document.getElementById(id)!;
const escape = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const ico = (name: string) => `<i data-lucide="${name}" aria-hidden="true"></i>`;
const button = (action: string, text: string, icon = '', cls = '', disabled = false, attrs = '') => `<button type="button" class="button ${cls}" data-action="${action}" ${disabled ? 'disabled' : ''} ${attrs}>${icon ? ico(icon) : ''}${text}</button>`;
const iconButton = (action: string, title: string, icon: string) => `<button class="icon-btn" type="button" data-action="${action}" title="${title}" aria-label="${title}">${ico(icon)}</button>`;
const params = new URLSearchParams(location.search);
const preview = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname) && params.get('preview') === '1';
const storage = {
  get(key: string, fallback: any = null) { try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; } },
  set(key: string, value: any) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { toast('Device storage is unavailable. Keep this page open until your save is confirmed.'); } },
  remove(key: string) { localStorage.removeItem(key); }
};
let state: any, profile: any, raw: any, world: ExpeditionWorld;
let view = 'hq', regionId = 'harbour', selectedRegionId = '', stationId = '', targetStationId = '', selected = '', busy = false, paused = false;
let lastResult: any = null, reviewId = '', toastTimer: any, pending: any = null;
let prefs = storage.get('bqBeaconSettings', { sound: false, reduced: matchMedia('(prefers-reduced-motion: reduce)').matches });
const previewKey = 'bqBeaconPreviewV1';
const dialog = $('dialog') as HTMLDialogElement;
let dialogReturn: HTMLElement | null = null;
const region = () => REGIONS.find((r: any) => r.id === regionId)!;
const regionCompleted = (id: string) => state?.history?.some((item: any) => item.regionId === id && item.status === 'completed');
const subjectLabel = (r: any) => `${r.subject === 'life-sciences' ? 'Life Sciences' : r.subject[0].toUpperCase() + r.subject.slice(1)} / ${r.resource === 'parts' ? 'Building parts' : 'Research cores'}`;
const activeStation = () => state?.activeExpedition?.stations.find((s: any) => s.id === stationId);
const targetStation = () => state?.activeExpedition?.stations.find((s: any) => s.id === targetStationId);
const stationIndex = (id: string) => state?.activeExpedition?.stations.findIndex((s: any) => s.id === id) ?? -1;
const pendingKey = () => `bqBeaconPending:${profile?.id}`;
const draftKey = () => `bqBeaconDraft:${profile?.id}:${stationId}`;
let audio: AudioContext | null = null;

function toast(message: string) {
  $('toast').textContent = message; $('toast').classList.add('visible'); clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 5500);
}
function decorate() { createIcons({ icons, attrs: { 'stroke-width': 1.8 } }); }
function cue(success = false) {
  if (!prefs.sound || document.hidden) return;
  try {
    audio ||= new AudioContext(); audio.resume();
    const gain = audio.createGain(); gain.gain.setValueAtTime(.025, audio.currentTime); gain.gain.exponentialRampToValueAtTime(.0001, audio.currentTime + .3); gain.connect(audio.destination);
    const tone = audio.createOscillator(); tone.type = 'sine'; tone.frequency.setValueAtTime(success ? 620 : 380, audio.currentTime); tone.frequency.exponentialRampToValueAtTime(success ? 920 : 290, audio.currentTime + .22); tone.connect(gain); tone.start(); tone.stop(audio.currentTime + .3);
  } catch { /* Audio is optional; the same result is always visible. */ }
}
function silence() { speechSynthesis.cancel(); audio?.suspend(); }
function speak() {
  if (!prefs.sound) { toast('Turn on sound in Settings to hear the question.'); return; }
  speechSynthesis.cancel();
  const station = activeStation(); if (!station) return;
  const voice = new SpeechSynthesisUtterance(station.question.prompt); voice.lang = 'en-AU'; voice.rate = .92;
  speechSynthesis.speak(voice);
}
async function request(body?: any) {
  const response = await fetch('/api/beacon-brigade', {
    method: body ? 'POST' : 'GET', credentials: 'same-origin', cache: 'no-store',
    headers: { accept: 'application/json', ...(sessionStorage.getItem('brightQuestChildCapability') ? { 'x-bq-child-capability': sessionStorage.getItem('brightQuestChildCapability')! } : {}), ...(body ? { 'content-type': 'application/json', 'x-bq-child-id': profile.id } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) { const error: any = new Error(result.error || `Connection error (${response.status})`); error.code = result.code; error.status = response.status; throw error; }
  return result;
}
async function commit(action: any) {
  if (busy) return false;
  if (pending) { toast('Reconnect your pending save before starting another action.'); return false; }
  busy = true; render();
  const body = { operationId: crypto.randomUUID(), version: state.version, action };
  try {
    if (preview) { raw = applyAction(raw, { ...body.action, at: new Date().toISOString() }); storage.set(previewKey, raw); state = publicState(raw); }
    else {
      storage.set(pendingKey(), body); const result = await request(body); state = result.state;
      storage.remove(pendingKey());
    }
    if (world.hqLevel !== state.hqLevel) world.createBase(state.hqLevel);
    return true;
  } catch (e: any) {
    if (!preview && (!e.status || e.status >= 500)) {
      pending = body; toast('Connection interrupted. Your answer is kept here. Reconnect to confirm the save.');
    } else {
      storage.remove(pendingKey());
      if (e.status === 409) { try { state = (await request()).state; } catch { /* Preserve the last confirmed state. */ } }
      toast(e.message);
    }
    return false;
  } finally { busy = false; render(); }
}
async function retryPending() {
  if (!pending || busy) return;
  busy = true; render();
  try {
    const result = await request(pending); state = result.state; pending = null; storage.remove(pendingKey());
    if (world.hqLevel !== state.hqLevel) world.createBase(state.hqLevel);
    toast('Saved. Your progress is up to date.');
  } catch (e: any) {
    if (e.status && e.status < 500) { pending = null; storage.remove(pendingKey()); if (e.status === 409) state = (await request()).state; }
    toast(e.message || 'Still offline. Your pending response is kept on this device.');
  } finally { busy = false; render(); }
}
function navigate(next: string, options: any = {}, replace = false) {
  silence();
  view = next; if (options.regionId) regionId = options.regionId;
  if (options.stationId) stationId = options.stationId;
  if (options.reviewId) reviewId = options.reviewId;
  const route = { view, regionId, selectedRegionId, stationId, targetStationId, reviewId };
  history[replace ? 'replaceState' : 'pushState'](route, '', `${location.pathname}${location.search}#${next}${next === 'station' ? `/${encodeURIComponent(stationId)}` : ''}`);
  render();
}
function syncWorld() {
  if (!world || view === 'travel') return;
  world.paused = paused || dialog.open;
  world.reduced = prefs.reduced;
  if (view === 'map' || view === 'region-info') { world.selectStation(regionId, null); world.setView('map'); }
  else if (view === 'region') { world.setView('region', regionId); world.selectStation(regionId, targetStationId ? stationIndex(targetStationId) : null); }
  else if (view === 'station') { world.setView('station', regionId); world.selectStation(regionId, stationIndex(stationId)); world.setView('station', regionId); }
  else if (view === 'results') world.setView('region', lastResult?.regionId || regionId);
  else world.setView('hq');
}
function header() {
  $('topbar').innerHTML = `<div class="brand"><span class="brand-mark">${ico('shield')}</span><div><strong>BEACON BRIGADE</strong><span class="overline">${preview ? 'Local preview / saved on this device' : 'Bright Quest / Expedition command'}</span></div></div>
    <div class="wallet"><div class="resource">${ico('package')}<div><strong>${state.wallet.parts}</strong><small>BUILDING PARTS</small></div></div><div class="resource cores">${ico('flask-conical')}<div><strong>${state.wallet.cores}</strong><small>RESEARCH CORES</small></div></div></div>
    <div class="profile-chip">${escape(profile.name)}<small>${pending ? 'Save pending' : preview ? 'Preview commander' : 'Progress connected'}</small></div>
    ${iconButton('reset-game', 'Reset game progress', 'rotate-ccw')}
    <a class="icon-btn portal-home" href="/" title="Return to Bright Quest" aria-label="Return to Bright Quest">${ico('arrow-left')}</a>`;
}
function navigation() {
  const items = [['hq', 'house', 'HQ'], ['map', 'map', 'World map'], ['journal', 'book-open', 'Journal'], ['settings', 'settings', 'Settings']];
  $('navigation').innerHTML = items.map(([id, icon, text]) => `<button class="nav-btn ${view === id ? 'active' : ''}" data-action="${id}" type="button" ${view === 'travel' && id !== 'settings' || busy ? 'disabled' : ''} ${view === id ? 'aria-current="page"' : ''}>${ico(icon)}<span>${text}</span></button>`).join('');
  $('world-controls').innerHTML = iconButton('zoom-in', 'Zoom in', 'plus') + iconButton('zoom-out', 'Zoom out', 'minus') + iconButton('reset-camera', 'Reset camera', 'rotate-ccw');
  $('world-controls').hidden = ['station', 'travel'].includes(view);
}
function caption(kicker: string, title: string, copy = '', cls = '') {
  return `<div class="scene-caption ${cls}"><div class="eyebrow">${kicker}</div><h1>${title}</h1>${copy ? `<p>${copy}</p>` : ''}<span class="coordinate">SECTOR 07 / BEACON OPERATIONS</span></div>`;
}
function tankPlate() { return `<div class="vehicle-id"><strong>ATLAS / M-07</strong><small>ARMOURED EXPEDITION VEHICLE</small></div>`; }
function requirements() {
  const cost = state.nextUpgrade?.cost; if (!cost) return '';
  return `<div class="requirements">${[['parts', 'Building parts', 'package', 'harbour'], ['cores', 'Research cores', 'flask-conical', 'grove']].map(([key, label, icon, region]) => `<div class="requirement ${state.wallet[key] >= cost[key] ? 'ready' : ''}"><span>${ico(icon)}${label}</span><strong>${state.wallet[key]} <small>/ ${cost[key]}</small></strong>${state.wallet[key] < cost[key] ? `<button data-action="destination" data-region="${region}">Find ${cost[key] - state.wallet[key]} more</button>` : '<small>Ready to build</small>'}</div>`).join('')}</div>`;
}
function hqScreen() {
  const next = state.nextUpgrade;
  const primary = state.activeExpedition
    ? button('resume', 'Resume expedition', 'play', 'primary hq-primary', busy)
    : button('map', 'Choose expedition', 'map', 'primary hq-primary', busy);
  return caption('Your home base', ['','Forward operating base','Expedition headquarters','Beacon command centre'][state.hqLevel], 'Build the base. Equip the expedition.') +
    `<div class="hq-quick-actions" aria-label="Headquarters actions">${next ? iconButton('construction', 'View construction', 'hard-hat') : ''}${primary}</div>` + tankPlate();
}
function mapScreen() {
  const r = REGIONS.find((item: any) => item.id === selectedRegionId);
  const completed = r && regionCompleted(r.id);
  const resolved = r ? state.history.filter((item: any) => item.regionId === r.id && item.status === 'completed').length : 0;
  const active = r && state.activeExpedition?.regionId === r.id;
  const panel = r ? `<aside class="panel field-command world-command selected"><div class="panel-head destination-panel-head"><div><div class="eyebrow">${completed ? 'District completed' : 'Destination selected'}</div><h2>${escape(r.name)}</h2><div class="mission-count">${escape(subjectLabel(r))}</div></div>${iconButton('clear-region', 'Close destination', 'x')}</div><div class="panel-body"><div class="destination-status"><span class="status ${completed ? 'complete-glow' : 'pending'}">${completed ? `${ico('check')} Complete` : active ? 'In progress' : 'Ready'}</span><span class="node-code">${resolved ? `${resolved} CLEAR${resolved === 1 ? '' : 'S'}` : 'NEW ROUTE'}</span></div><p class="destination-skill">${escape(r.description)}</p><div class="summary-resource"><span>${ico(r.resource === 'parts' ? 'package' : 'flask-conical')}${r.resource === 'parts' ? 'Building parts' : 'Research cores'}</span><strong>+${r.stationNames.length * STATION_REWARD}</strong></div><div class="destination-actions">${button('explore-region', 'Explore', 'eye')}${button('march-region', active ? 'Resume' : completed ? 'March again' : 'March', 'navigation', 'primary', busy)}</div></div></aside>` : '';
  return caption('Expedition theatre', 'Choose a subject district', 'Five specialist districts. Tap a building to inspect it.') + panel;
}
function regionInfoScreen() {
  const r = region();
  return caption('Destination selected', escape(r.name)) + `<aside class="panel"><div class="panel-head"><div class="eyebrow">${escape(subjectLabel(r))}</div><h2>${escape(r.name)}</h2></div><div class="panel-body"><p>${escape(r.description)}</p><div class="summary-resource"><span>${ico(r.resource === 'parts' ? 'package' : 'flask-conical')}${r.resource === 'parts' ? 'Building parts' : 'Research cores'}</span><strong>+${r.stationNames.length * STATION_REWARD}</strong></div><p class="subtle">${r.stationNames.length} destinations / untimed questions</p>${button('deploy', 'Deploy Atlas', 'arrow-right', 'primary full', busy)}${button('map', 'Back to world map', 'arrow-left', 'quiet full')}</div></aside>`;
}
function regionScreen() {
  const e = state.activeExpedition;
  if (!e) { view = 'map'; return mapScreen(); }
  regionId = e.regionId;
  const resolved = e.stations.filter((s: any) => s.resolved).length;
  const total = e.stations.length;
  const complete = resolved === total;
  const target = targetStation();
  const selectedPanel = target ? `<aside class="panel field-command selected"><div class="panel-head destination-panel-head"><div><div class="eyebrow">Destination selected</div><h2>${escape(target.name)}</h2><div class="mission-count">${resolved} of ${total} resolved</div></div>${iconButton('clear-station', 'Close destination', 'x')}</div><div class="panel-body"><div class="destination-status"><span class="status ${target.resolved ? '' : 'pending'}">${target.resolved ? 'Resolved' : 'Ready'}</span><span class="node-code">SITE ${String(stationIndex(target.id) + 1).padStart(2, '0')}</span></div><p class="destination-skill">${escape(target.question.skill)}</p><div class="summary-resource"><span>${ico(e.resource === 'parts' ? 'package' : 'flask-conical')}${e.resource === 'parts' ? 'Building parts' : 'Research cores'}</span><strong>+${STATION_REWARD}</strong></div><div class="destination-actions">${button('explore-station', 'Explore', 'eye', '', false, `data-station="${escape(target.id)}"`)}${button('march-station', target.resolved ? 'Revisit' : 'March', 'navigation', 'primary', busy, `data-station="${escape(target.id)}"`)}</div></div></aside>` : '';
  const completePanel = !target && complete ? `<aside class="panel field-command complete"><div class="panel-head"><div class="eyebrow">Expedition ready</div><h2>All ${total} sites complete</h2><div class="mission-count">+${resolved * STATION_REWARD} ${e.resource === 'parts' ? 'parts' : 'cores'} secured</div></div><div class="panel-foot">${button('finish', 'Complete expedition', 'check', 'primary full', busy)}</div></aside>` : '';
  return caption('Aerial expedition view', escape(region().name), `${resolved} of ${total} missions complete`) + selectedPanel + completePanel + tankPlate();
}
function diagram(d: any, interactive = false) {
  if (!d) return '';
  let contents = '';
  if (d.kind === 'groups') contents = `<div class="crate-grid">${Array.from({ length: d.groups }, (_, i) => `<div class="supply-crate" role="img" aria-label="Crate ${i + 1}: ${d.itemsPerGroup} pieces">${'<i></i>'.repeat(d.itemsPerGroup)}</div>`).join('')}</div><p class="diagram-note">Reserved for another base: <strong>${d.reserved}</strong></p>`;
  else if (d.kind === 'sharing') contents = `<div class="log-row"><span>Washers available</span><strong>${d.total}</strong></div><div class="crate-grid" style="margin-top:12px">${Array.from({ length: d.groups }, (_, i) => `<div class="place-value"><strong>?</strong><small>KIT ${i + 1}</small></div>`).join('')}</div>`;
  else if (d.kind === 'place-value') contents = `<div class="place-values">${[['hundreds', 'BOXES OF 100'], ['tens', 'BUNDLES OF 10'], ['ones', 'LOOSE PINS']].map(([key, title]) => `<div class="place-value"><strong>${d[key]}</strong><small>${title}</small></div>`).join('')}</div>`;
  else if (d.kind === 'quantities') contents = d.rows.map(([label, n]: any) => `<div class="log-row"><span>${escape(label)}</span><strong>${n}</strong></div>`).join('');
  else if (d.kind === 'table') contents = `${interactive ? `<div class="test-control">${button('observe', 'Inspect evidence', 'flask-conical', '', busy)}<small>Recorded field observations</small></div>` : ''}<table><thead><tr>${d.columns.map((c: string) => `<th scope="col">${escape(c)}</th>`).join('')}</tr></thead><tbody>${d.rows.map((row: any[], i: number) => `<tr data-evidence-row="${i}">${row.map((c: any) => `<td>${escape(c)}</td>`).join('')}</tr>`).join('')}</tbody></table><p class="diagram-note">${escape(d.controls)}</p>`;
  return `<figure class="diagram"><figcaption>${escape(d.label)}</figcaption>${contents}</figure>`;
}
function stationScreen() {
  const s = activeStation(); if (!s) { view = 'region'; return regionScreen(); }
  const q = s.question; const draft = storage.get(draftKey(), ''); selected = selected || String(draft ?? '');
  const fb = s.lastFeedback;
  return caption(region().name, escape(s.name), '', 'station-caption') + `<section class="panel challenge"><div class="panel-head"><div class="challenge-top"><span class="eyebrow">Arrived / ${escape(s.name)}</span><span class="status ${s.resolved ? '' : 'plain'}">${s.resolved ? 'Reward saved' : `+4 ${s.reward.resource === 'parts' ? 'parts' : 'cores'}`}</span></div><h2 tabindex="-1">${escape(q.prompt)}</h2></div><div class="panel-body">${diagram(q.diagram, true)}
    <form id="answer-form">${q.type === 'number' ? `<label class="answer-field" for="answer-input">Your answer<input id="answer-input" name="answer" inputmode="numeric" autocomplete="off" type="text" maxlength="12" value="${escape(selected)}" ${s.resolved || busy ? 'disabled' : ''}></label>` : `<div class="answer-options" role="group" aria-label="Answer choices">${q.options.map((o: any, i: number) => `<button class="answer-option ${selected === o.id ? 'selected' : ''}" type="button" data-action="option" data-option="${escape(o.id)}" aria-pressed="${selected === o.id}" ${s.resolved || busy ? 'disabled' : ''}><span class="option-mark">${String.fromCharCode(65 + i)}</span><span>${escape(o.label)}</span></button>`).join('')}</div>`}
    ${fb ? `<div class="feedback ${fb.correct ? 'correct' : ''}" role="status"><strong>${fb.correct ? 'Contract resolved' : fb.kind === 'worked' ? 'Worked explanation' : fb.kind === 'hint' ? 'Field guidance' : 'Take another look'}</strong>${escape(fb.explanation)}${s.resolved ? `<p class="subtle">+4 ${s.reward.resource === 'parts' ? 'building parts' : 'research cores'} saved${s.helpUsed ? ' / completed with support' : ''}</p>` : ''}</div>` : ''}
    <div class="actions">${s.resolved ? button('region', 'Return to expedition', 'arrow-right', 'primary', busy) : `<button class="button primary" type="submit" ${busy || pending ? 'disabled' : ''}>${busy ? '<span class="spinner"></span>' : ico('check')}Check answer</button>${button('hint', s.support.stage ? 'Worked example' : 'Hint', 'help-circle', '', busy || !s.attempts.length || s.support.stage >= 2)}`}</div></form>
    <div class="actions">${button('region', 'Back to base', 'arrow-left', 'quiet', busy)}${button('read', 'Read aloud', 'volume-2', 'quiet', false)}</div></div></section>`;
}
function constructionScreen() {
  const next = state.nextUpgrade; const ready = next && state.wallet.parts >= next.cost.parts && state.wallet.cores >= next.cost.cores;
  return caption('Engineering command', 'Build your headquarters') + `<aside class="panel"><div class="panel-head"><div class="eyebrow">${next ? `HQ Level ${state.hqLevel} to Level ${next.level}` : 'Final build complete'}</div><h2>${next?.level === 2 ? 'Expedition headquarters' : 'Beacon command centre'}</h2></div><div class="panel-body"><p>${next ? 'Raise the command building, expand its roof systems and establish your next permanent base upgrade.' : 'The command centre is complete. Your saved progress and expeditions are available in the journal.'}</p>${requirements()}${next ? button('confirm-build', ready ? 'Construct headquarters' : 'Resources required', 'hard-hat', 'primary full', !ready || busy || !!pending) : ''}<div style="margin-top:10px">${button('hq', 'Return to HQ', 'arrow-left', 'full')}</div></div></aside>`;
}
function resultsScreen() {
  const e = lastResult || state.history.at(-1); if (!e) return hqScreen();
  return caption('Mission accomplished', 'Cargo secured') + `<aside class="panel"><div class="panel-head"><span class="rank">${ico('check')}EXPEDITION COMPLETE</span><h2>${escape(REGIONS.find((r: any) => r.id === e.regionId)?.name)}</h2></div><div class="panel-body"><div class="summary-resource"><span>${ico('package')}Building parts</span><strong>+${e.earned.parts}</strong></div><div class="summary-resource"><span>${ico('flask-conical')}Research cores</span><strong>+${e.earned.cores}</strong></div><p>Your cargo is saved. Return to headquarters to put it to work.</p>${button('return-hq', 'Drive back to HQ', 'house', 'primary full')}<div style="margin-top:10px">${button('review', 'Review expedition', 'book-open', 'full', false, `data-review="${escape(e.id)}"`)}</div></div></aside>`;
}
function answerText(q: any, value: any) { return q.options?.find((o: any) => o.id === value)?.label ?? value ?? 'No answer'; }
function journalScreen() {
  const expeditions = [...state.history].reverse();
  return caption('Expedition record', 'Field journal') + `<section class="panel journal"><div class="panel-head"><div class="eyebrow">Your learning and expeditions</div><h2>Field journal</h2></div><div class="panel-body">${state.activeExpedition ? `<div class="history-item"><span class="status pending">In progress</span><h3 style="margin-top:8px">${escape(REGIONS.find((r: any) => r.id === state.activeExpedition.regionId)?.name)}</h3><div class="actions">${button('resume', 'Resume', 'play', 'primary')}${button('end-expedition', 'End expedition', 'flag')}</div></div>` : ''}${!expeditions.length ? '<p class="empty">Your completed expeditions will appear here.</p>' : expeditions.map(e => `<article class="history-item"><span class="status ${e.status === 'ended' ? 'plain' : ''}">${e.status === 'ended' ? 'Ended early' : 'Completed'}</span><h3 style="margin-top:8px">${escape(REGIONS.find((r: any) => r.id === e.regionId)?.name)}</h3><p class="subtle">${e.stations.filter((s: any) => s.resolved).length} of ${e.stations.length} stations / +${e.earned.parts} parts / +${e.earned.cores} cores</p><div class="actions">${button('review', 'Review answers', 'book-open', '', false, `data-review="${escape(e.id)}"`)}</div></article>`).join('')}</div></section>`;
}
function reviewScreen() {
  const e = state.history.find((e: any) => e.id === reviewId); if (!e) return journalScreen();
  const stations = [...e.stations].sort((a, b) => Number(a.firstAttemptCorrect !== false) - Number(b.firstAttemptCorrect !== false));
  return caption('Expedition evidence', 'Answer review') + `<section class="panel journal"><div class="panel-head"><div class="eyebrow">Original missed answers first</div><h2>${escape(REGIONS.find((r: any) => r.id === e.regionId)?.name)}</h2></div><div class="panel-body">${stations.map(s => `<article class="review-station"><span class="status ${s.firstAttemptCorrect === false ? 'missed' : s.resolved ? '' : 'plain'}">${s.firstAttemptCorrect === false ? 'First answer missed' : s.resolved ? 'Correct first time' : 'Not completed'}</span><h3>${escape(s.question.prompt)}</h3>${diagram(s.question.diagram)}<p><strong>First answer:</strong> ${escape(answerText(s.question, s.attempts[0]?.answer))}</p><p><strong>Correct answer:</strong> ${escape(answerText(s.question, s.question.answer))}</p><p>${escape(s.question.explanation)}</p><p class="subtle">${s.resolution ? escape(s.resolution) : 'Unresolved'} / ${s.attempts.length} response${s.attempts.length === 1 ? '' : 's'}${s.helpUsed ? ' / support used' : ''}</p></article>`).join('')}<div class="actions">${button('journal', 'Back to journal', 'arrow-left', 'full')}</div></div></section>`;
}
function render() {
  if (!state || !world) return;
  header(); navigation();
  const screens: any = { hq: hqScreen, map: mapScreen, 'region-info': regionInfoScreen, region: regionScreen, station: stationScreen, construction: constructionScreen, results: resultsScreen, journal: journalScreen, review: reviewScreen };
  if (view === 'travel') $('interface').innerHTML = `<section class="travel-panel ${paused ? 'paused' : ''}"><div class="eyebrow">Atlas M-07 / ${world.travel?.kind === 'station' ? 'Field march' : 'Convoy in transit'}</div><h2>${world.travel?.label ? `En route to ${escape(world.travel.label)}` : 'Route in progress'}</h2><div class="travel-progress"><span></span></div><div class="travel-readout"><span>ROUTE ACTIVE</span><strong>${Math.max(0, Math.ceil((world.travel?.duration || 0) - (world.travel?.elapsed || 0)))}s</strong></div><div class="actions">${button('pause-travel', paused ? 'Continue journey' : 'Pause journey', paused ? 'play' : 'pause')}${button('cancel-travel', world.travel?.kind === 'station' ? 'Cancel march' : 'Stop journey', 'flag')}</div></section>`;
  else $('interface').innerHTML = (screens[view] || hqScreen)();
  if (['map', 'region-info'].includes(view)) $('location-pins').innerHTML = `<button class="location-pin hq-location" type="button" data-pin="hq" data-action="hq">${ico('house')}<span><strong>Headquarters</strong><small>Home base</small></span></button><span class="strategic-anchor atlas-anchor atlas-world" data-pin="atlas" aria-label="Atlas expedition vehicle">${ico('navigation')}<b>ATLAS</b></span>` + REGIONS.map((r: any) => {
    const completed = regionCompleted(r.id); const active = state.activeExpedition?.regionId === r.id;
    return `<button class="location-pin subject-pin ${selectedRegionId === r.id ? 'selected' : ''} ${completed ? 'completed' : ''} ${active ? 'active' : ''}" type="button" data-pin="${r.id}" data-action="destination" data-region="${r.id}" aria-pressed="${selectedRegionId === r.id}" aria-label="${escape(r.name)}, ${completed ? 'completed' : active ? 'in progress' : 'ready'}">${completed ? `<span class="completion-beacon">${ico('check')}</span>` : ico(r.icon)}<span><strong>${escape(r.name)}</strong><small>${escape(subjectLabel(r))}</small></span></button>`;
  }).join('');
  else if (view === 'region' && state.activeExpedition) $('location-pins').innerHTML = `<span class="strategic-anchor hq-anchor" data-pin="hq" aria-label="Headquarters">${ico('house')}<b>HQ</b></span><span class="strategic-anchor atlas-anchor" data-pin="atlas" aria-label="Atlas expedition vehicle">${ico('navigation')}<b>ATLAS</b></span>` + state.activeExpedition.stations.map((s: any, i: number) => `<button class="field-location-pin ${s.id === targetStationId ? 'selected' : ''} ${s.resolved ? 'resolved' : ''}" type="button" data-pin="station-${i}" data-action="select-station" data-station="${escape(s.id)}" aria-label="${escape(s.name)}, ${s.resolved ? 'resolved' : 'available'}" aria-pressed="${s.id === targetStationId}"><span class="field-pin-index">${s.resolved ? ico('check') : i + 1}</span></button>`).join('');
  else $('location-pins').innerHTML = '';
  if (pending) $('interface').insertAdjacentHTML('beforeend', `<div style="position:absolute;top:0;left:50%;transform:translateX(-50%);pointer-events:auto">${button('retry-save', 'Reconnect pending save', 'refresh-cw', 'gold', busy)}</div>`);
  syncWorld(); decorate();
  $('game').dataset.view = view; $('game').dataset.hqLevel = state.hqLevel;
  $('game').setAttribute('aria-busy', String(busy));
}
function openDialog(title: string, contents: string) {
  dialogReturn = document.activeElement as HTMLElement;
  dialog.innerHTML = `<div class="dialog-head"><h2 id="dialog-title">${title}</h2>${iconButton('close-dialog', 'Close', 'x')}</div><div class="dialog-body">${contents}</div>`;
  dialog.setAttribute('aria-labelledby', 'dialog-title'); dialog.showModal(); world.paused = true; silence(); decorate();
}
function closeDialog() { dialog.close(); world.paused = paused; dialogReturn?.focus(); }
function openSettings() {
  openDialog('Expedition settings', `<label class="setting">Sound and read-aloud<input id="sound-setting" type="checkbox" ${prefs.sound ? 'checked' : ''}></label><label class="setting">Reduced motion<input id="motion-setting" type="checkbox" ${prefs.reduced ? 'checked' : ''}></label><p class="subtle" style="margin-top:15px">${preview ? 'Local preview. Progress is stored on this device only.' : 'Progress is saved to the current Bright Quest child profile.'}</p><div class="dialog-actions">${button('save-settings', 'Done', 'check', 'primary')}</div><a class="button full" style="margin-top:10px" href="/">${ico('arrow-left')}Return to Bright Quest</a>`);
}
function exploreRegion() {
  const r = region();
  openDialog(r.name, `<div class="recon-card"><span class="status ${regionCompleted(r.id) ? 'complete-glow' : 'pending'}">${regionCompleted(r.id) ? `${ico('check')} District completed` : 'Ready to explore'}</span><p><strong>${escape(r.stationNames.length)} subject missions</strong><br>${escape(r.stationNames.join(' / '))}</p><p>${escape(r.description)}</p><div class="summary-resource"><span>${ico(r.resource === 'parts' ? 'package' : 'flask-conical')}${r.resource === 'parts' ? 'Building parts' : 'Research cores'}</span><strong>+${r.stationNames.length * STATION_REWARD}</strong></div></div><div class="dialog-actions">${button('close-dialog', 'Back to map', 'arrow-left')}${button('march-region-dialog', state.activeExpedition?.regionId === r.id ? 'Resume' : 'March', 'navigation', 'primary')}</div>`);
}
async function deploy() {
  if (state.activeExpedition) {
    if (state.activeExpedition.regionId === regionId) return resume();
    openDialog('An expedition is already active', `<p>Resume it, or end it in the journal before starting another. Your earned cargo stays safe.</p><div class="dialog-actions">${button('resume-dialog', 'Resume expedition', 'play', 'primary')}${button('journal-dialog', 'Open journal', 'book-open')}</div>`); return;
  }
  if (await commit({ type: 'start', regionId })) { targetStationId = ''; travelTo(regionId, 'region'); }
}
function travelTo(destination: string, next: string) {
  paused = false; world.paused = false; world.drive(destination, () => { navigate(next, {}, true); cue(true); }); view = 'travel'; render();
}
function resume() { regionId = state.activeExpedition.regionId; travelTo(regionId, 'region'); }
function marchToStation(id: string) {
  const index = stationIndex(id); if (index < 0) return;
  targetStationId = id; stationId = id; selected = ''; paused = false; world.paused = false;
  world.driveToStation(regionId, index, () => {
    navigate('station', { stationId: id }, true); cue(true);
    requestAnimationFrame(() => (document.querySelector('.challenge h2') as HTMLElement)?.focus());
  });
  view = 'travel'; render();
}
function exploreStation(id: string) {
  const s = state.activeExpedition?.stations.find((item: any) => item.id === id); if (!s) return;
  const subject = state.activeExpedition.subject === 'maths' ? 'Logistics' : 'Field science';
  openDialog(s.name, `<div class="recon-card"><span class="status ${s.resolved ? '' : 'pending'}">${s.resolved ? 'Resolved' : 'Ready to explore'}</span><p><strong>${subject} objective</strong><br>${escape(s.question.skill)}</p><div class="summary-resource"><span>${ico(s.reward.resource === 'parts' ? 'package' : 'flask-conical')}${s.reward.resource === 'parts' ? 'Building parts' : 'Research cores'}</span><strong>+4</strong></div></div><div class="dialog-actions">${button('close-dialog', 'Back to map', 'arrow-left')}${button('march-dialog', s.resolved ? 'Revisit site' : 'March to site', 'navigation', 'primary', false, `data-station="${escape(s.id)}"`)}</div>`);
}
async function submit() {
  if (busy || !activeStation() || activeStation().resolved) return;
  const q = activeStation().question;
  const answer = q.type === 'number' ? ($('answer-input') as HTMLInputElement)?.value.trim() : selected;
  if (!answer && answer !== '0') { toast('Choose or enter an answer first.'); return; }
  if (q.type === 'number' && !/^\d{1,8}$/.test(answer)) { toast('Enter a whole number.'); return; }
  selected = String(answer); storage.set(draftKey(), selected);
  if (await commit({ type: 'answer', stationId, answer: q.type === 'number' ? Number(answer) : answer })) {
    cue(activeStation()?.resolved); if (activeStation()?.resolved) storage.remove(draftKey());
  }
}
$('game').addEventListener('submit', e => { if ((e.target as HTMLElement).id === 'answer-form') { e.preventDefault(); submit(); } });
$('game').addEventListener('input', e => { const target = e.target as HTMLInputElement; if (target.id === 'answer-input') { selected = target.value; storage.set(draftKey(), selected); } });
$('game').addEventListener('click', async e => {
  const b = (e.target as HTMLElement).closest('[data-action]') as HTMLElement; if (!b || (b as HTMLButtonElement).disabled) return;
  const action = b.dataset.action;
  if (action === 'zoom-in') return world.zoom(-2);
  if (action === 'zoom-out') return world.zoom(2);
  if (action === 'reset-camera') return syncWorld();
  if (action === 'close-dialog') return closeDialog();
  if (action === 'retry-save') return retryPending();
  if (action === 'read') return speak();
  if (action === 'option') { selected = b.dataset.option!; storage.set(draftKey(), selected); document.querySelectorAll('[data-option]').forEach(el => { el.classList.toggle('selected', (el as HTMLElement).dataset.option === selected); el.setAttribute('aria-pressed', String((el as HTMLElement).dataset.option === selected)); }); return; }
  if (action === 'observe') {
    const rows = [...document.querySelectorAll('[data-evidence-row]')];
    for (let i = 0; i < rows.length; i++) { rows.forEach(row => row.classList.remove('selected')); rows[i].classList.add('selected'); await new Promise(r => setTimeout(r, prefs.reduced ? 1 : 500)); }
    rows.forEach(row => row.classList.remove('selected')); return;
  }
  if (action === 'settings') return openSettings();
  if (action === 'reset-game') return openDialog('Reset Beacon Brigade?', `<div class="reset-warning"><strong>This erases this child\'s Beacon Brigade progress.</strong><p>HQ levels, resources, completed districts, answers and journal records will all be permanently cleared. Other Bright Quest modules are not affected.</p></div><div class="dialog-actions">${button('close-dialog', 'Keep progress', 'arrow-left', 'primary')}${button('reset-now', 'Reset all progress', 'rotate-ccw', 'danger')}</div>`);
  if (action === 'reset-now') { closeDialog(); if (await commit({ type: 'reset' })) { selectedRegionId = ''; targetStationId = ''; stationId = ''; selected = ''; reviewId = ''; lastResult = null; world.selectStation(regionId, null); world.clearRoute(); navigate('hq', {}, true); toast('Beacon Brigade has been reset for this child.'); } return; }
  if (action === 'save-settings') { prefs = { sound: ($('sound-setting') as HTMLInputElement).checked, reduced: ($('motion-setting') as HTMLInputElement).checked }; storage.set('bqBeaconSettings', prefs); if (!prefs.sound) silence(); closeDialog(); render(); return; }
  if (action === 'pause-travel') { paused = !paused; world.paused = paused; render(); return; }
  if (action === 'cancel-travel') { const stationMarch = world.travel?.kind === 'station'; world.travel = null; world.onTravelEnd = null; world.clearRoute(); world.dustPuffs.forEach((p: any) => { p.visible = false; }); paused = false; world.paused = false; navigate(stationMarch ? 'region' : 'hq'); return; }
  if (busy || view === 'travel') return;
  if (action === 'hq' || action === 'return-hq') { if (['region', 'station', 'results'].includes(view)) return travelTo('hq', 'hq'); navigate('hq'); return; }
  if (['map', 'construction', 'journal', 'region'].includes(action!)) {
    if (action !== 'region' || state.activeExpedition?.stations.every((station: any) => station.resolved)) targetStationId = '';
    navigate(action!); return;
  }
  if (action === 'destination') { targetStationId = ''; selectedRegionId = b.dataset.region!; regionId = selectedRegionId; navigate('map'); return; }
  if (action === 'clear-region') { selectedRegionId = ''; render(); return; }
  if (action === 'explore-region') return exploreRegion();
  if (action === 'march-region') return deploy();
  if (action === 'march-region-dialog') { closeDialog(); return deploy(); }
  if (action === 'deploy') return deploy();
  if (action === 'resume') return resume();
  if (action === 'resume-dialog') { closeDialog(); return resume(); }
  if (action === 'journal-dialog') { closeDialog(); navigate('journal'); return; }
  if (action === 'select-station') { targetStationId = b.dataset.station!; render(); return; }
  if (action === 'clear-station') { targetStationId = ''; render(); return; }
  if (action === 'explore-station') return exploreStation(b.dataset.station!);
  if (action === 'march-station') return marchToStation(b.dataset.station!);
  if (action === 'march-dialog') { const id = b.dataset.station!; closeDialog(); return marchToStation(id); }
  if (action === 'hint') { await commit({ type: 'hint', stationId }); return; }
  if (action === 'finish') { if (await commit({ type: 'finish' })) { lastResult = state.history.at(-1); navigate('results'); cue(true); } return; }
  if (action === 'review') { navigate('review', { reviewId: b.dataset.review }); return; }
  if (action === 'confirm-build') return openDialog('Confirm construction', `<p>Build HQ Level ${state.nextUpgrade.level} using ${state.nextUpgrade.cost.parts} building parts and ${state.nextUpgrade.cost.cores} research cores?</p><div class="dialog-actions">${button('build-now', 'Construct HQ', 'hard-hat', 'primary')}${button('close-dialog', 'Cancel', 'x')}</div>`);
  if (action === 'build-now') { closeDialog(); if (await commit({ type: 'upgrade' })) { navigate('hq'); toast(`HQ Level ${state.hqLevel} constructed and saved.`); cue(true); } return; }
  if (action === 'end-expedition') return openDialog('End this expedition?', `<p>Earned resources and answer records stay saved. Unresolved stations will be closed.</p><div class="dialog-actions">${button('end-now', 'End expedition', 'flag')}${button('close-dialog', 'Keep exploring', 'arrow-left', 'primary')}</div>`);
  if (action === 'end-now') { closeDialog(); await commit({ type: 'end' }); navigate('journal'); }
});
dialog.addEventListener('cancel', e => { e.preventDefault(); closeDialog(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) silence(); });
window.addEventListener('online', () => { if (pending) retryPending(); });
window.addEventListener('popstate', e => {
  silence(); if (dialog.open) closeDialog();
  if (world?.travel) { world.travel = null; world.onTravelEnd = null; }
  paused = false; view = e.state?.view || 'hq'; regionId = e.state?.regionId || regionId; selectedRegionId = e.state?.selectedRegionId || ''; stationId = e.state?.stationId || ''; targetStationId = e.state?.targetStationId || ''; reviewId = e.state?.reviewId || ''; selected = '';
  if (view === 'travel') view = 'hq'; render();
});
async function boot() {
  try {
    if (preview) { profile = { id: 'local-preview', name: 'Preview commander' }; raw = storage.get(previewKey) || createState({ profileId: profile.id }); state = publicState(raw); }
    else { const response = await request(); state = response.state; profile = response.profile; pending = storage.get(pendingKey()); }
    world = new ExpeditionWorld($('scene') as HTMLCanvasElement); world.createBase(state.hqLevel); world.reduced = prefs.reduced;
    world.onFrame = pins => {
      const captionBottom = document.querySelector('.scene-caption')?.getBoundingClientRect().bottom || 0;
      const topbarBottom = document.querySelector('#topbar')?.getBoundingClientRect().bottom || 0;
      const panelRect = document.querySelector('.field-command')?.getBoundingClientRect();
      const navigationTop = document.querySelector('#navigation')?.getBoundingClientRect().top || innerHeight;
      const panelTop = innerWidth <= 650 ? panelRect?.top || navigationTop : navigationTop;
      for (const p of pins) {
        const el = document.querySelector(`[data-pin="${p.id}"]`) as HTMLElement;
        if (el) {
          const margin = el.offsetWidth / 2 + 12; const minimumTop = Math.max(captionBottom, topbarBottom) + el.offsetHeight + 10; const maximumTop = panelTop - 22;
          const visibleRight = innerWidth > 650 && panelRect ? panelRect.left - 12 : innerWidth;
          el.style.left = `${Math.max(margin, Math.min(visibleRight - margin, p.x))}px`;
          el.style.top = `${Math.max(minimumTop, Math.min(maximumTop, p.y))}px`;
          el.hidden = !p.visible || maximumTop <= minimumTop;
        }
      }
      const progress = document.querySelector('.travel-progress span') as HTMLElement;
      if (progress && world.travel) progress.style.width = `${Math.min(100, world.travel.elapsed / world.travel.duration * 100)}%`;
    };
    $('scene').addEventListener('world-error', (e: any) => toast(e.detail));
    $('boot').remove();
    const savedRoute = history.state;
    if (savedRoute?.view && !['travel', 'results'].includes(savedRoute.view)) { view = savedRoute.view; regionId = savedRoute.regionId || regionId; selectedRegionId = savedRoute.selectedRegionId || ''; stationId = savedRoute.stationId || ''; targetStationId = savedRoute.targetStationId || ''; reviewId = savedRoute.reviewId || ''; }
    navigate(view, {}, true);
    await world.ready;
    if (world.textureErrors.length) toast('Some terrain textures did not load. Refresh when your connection is ready.');
    if (pending) toast('A pending save is ready to reconnect.');
    if (['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) (window as any).__BEACON_QA__ = { get view() { return view; }, get frame() { return world.frame; }, get state() { return state; }, get world() { return world; }, get preview() { return preview; } };
  } catch (e: any) {
    const authentication = [401, 403, 409].includes(e.status);
    $('boot').innerHTML = `<span class="boot-mark">B</span><h1>Beacon Brigade</h1><p>${authentication ? 'Open Bright Quest and select your child profile to begin.' : escape(e.message || 'The expedition could not load. Your saved progress has not changed.')}</p><a class="button primary" href="/">${authentication ? 'Open Bright Quest' : 'Return to Bright Quest'}</a><button class="button" id="reload">Try again</button>`;
    $('reload').addEventListener('click', () => location.reload());
  }
}
boot();
