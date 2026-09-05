import { getCampaign, LOADOUTS } from '../campaign.js';
import { REGIONS } from '../content.js';

const icon = (name: string) => `<i data-lucide="${name}" aria-hidden="true"></i>`;
const projectCopy: Record<string, any> = {
  bridge: { title: 'Reconnect the valley', description: 'Rebuild the river crossing and help every expedition travel faster.', icon: 'route', name: 'River bridge' },
  observatory: { title: 'Reach for the stars', description: 'Restore the telescope. Its survey team finds extra cargo at every new mission.', icon: 'telescope', name: 'Hilltop observatory' },
  greenhouse: { title: 'Bring the gardens back', description: 'Restore the glasshouse and its supply trails to help the whole valley thrive.', icon: 'sprout', name: 'Valley greenhouse' }
};
const loadoutCopy: Record<string, any> = {
  balanced: { name: 'Atlas Explorer', tag: 'All-rounder', icon: 'compass', description: 'Steady travel. A reliable cargo hold.' },
  survey: { name: 'Atlas Scout', tag: 'Quick journeys', icon: 'radar', description: 'Travel faster. Carry a little less cargo.' },
  hauler: { name: 'Atlas Hauler', tag: 'Extra cargo', icon: 'truck', description: 'Carry more home. Take a little longer.' }
};

export function campaignScreen(state: any, busy: boolean, pending: boolean) {
  const c = getCampaign(state);
  const complete = c.projectsBuilt.length === c.projects.length;
  return `<section class="panel campaign-board" aria-label="Valley restoration"><div class="panel-head campaign-heading"><div><span class="eyebrow">Operation / Restore the valley</span><h1>${complete ? 'A valley brought to life' : 'Build something that lasts'}</h1><p>${c.completedDistricts.length} of 5 districts explored <span aria-hidden="true">/</span> ${c.projectsBuilt.length} of 3 landmarks restored</p></div><button class="icon-btn" data-action="map" title="Return to world map" aria-label="Return to world map">${icon('x')}</button></div>
  <div class="panel-body"><div class="district-track" aria-label="Subject progress">${c.objectives.map((o: any) => { const r = REGIONS.find((r: any) => r.id === o.id)!; return `<button class="district-step ${o.completed ? 'done' : ''}" data-action="destination" data-region="${o.id}">${icon(o.completed ? 'check' : r.icon)}<span>${r.subject === 'life-sciences' ? 'Life science' : r.subject === 'maths' ? 'Maths' : r.subject[0].toUpperCase() + r.subject.slice(1)}</span></button>`; }).join('')}</div>
  <div class="restoration-grid">${c.projects.map((p: any, i: number) => { const copy = projectCopy[p.id]; return `<article class="restoration-project ${p.built ? 'built' : ''}" data-project="${p.id}"><div class="project-art project-${p.id}"><img src="./assets/project-${p.id}.jpg" alt="${copy.name}" width="640" height="360"><span class="project-number">0${i + 1}</span><span class="project-seal">${icon(p.built ? 'check' : copy.icon)}</span></div><div class="project-content"><span class="eyebrow">${p.built ? 'Restored' : copy.name}</span><h2>${copy.title}</h2><p>${copy.description}</p><div class="project-cost"><span class="${state.wallet.parts >= p.cost.parts ? 'enough' : ''}">${icon('package')}${p.cost.parts} parts</span><span class="${state.wallet.cores >= p.cost.cores ? 'enough' : ''}">${icon('flask-conical')}${p.cost.cores} cores</span></div>${p.missingDistricts.length ? `<div class="project-prerequisites">${p.missingDistricts.map((id: string) => `<button data-action="destination" data-region="${id}">${icon('map-pin')}Explore ${REGIONS.find((r: any) => r.id === id)?.subject === 'life-sciences' ? 'life science' : REGIONS.find((r: any) => r.id === id)?.subject}${icon('arrow-right')}</button>`).join('')}</div>` : `<p class="project-ready">${p.built ? 'Your expeditions now use this upgrade.' : p.affordable ? 'Your team has everything ready.' : 'Gather the remaining cargo to start.'}</p>`}<button class="button ${p.canBuild ? 'primary' : ''} full" data-action="restore-project" data-project="${p.id}" ${p.built || !p.canBuild || busy || pending ? 'disabled' : ''}>${icon(p.built ? 'check' : 'hard-hat')}${p.built ? 'Restored' : p.canBuild ? 'Build landmark' : 'Supplies needed'}</button></div></article>`; }).join('')}</div>
  <div class="campaign-badges" aria-label="Expedition achievements">${c.achievements.map((a: any) => `<div class="campaign-badge ${a.unlocked ? 'earned' : ''}">${icon(a.unlocked ? 'award' : 'flag')}<span><strong>${a.name}</strong><small>${a.progress} / ${a.target}</small></span></div>`).join('')}</div></div></section>`;
}

export function garageScreen(state: any, busy: boolean, pending: boolean) {
  const c = getCampaign(state);
  return `<section class="panel garage-board"><div class="panel-head campaign-heading"><div><span class="eyebrow">Atlas workshop</span><h1>Ready for the next journey</h1><p>${c.canEquip ? 'Choose your expedition vehicle.' : 'Your vehicle is equipped for the active expedition.'}</p></div><button class="icon-btn" data-action="hq" title="Return to HQ" aria-label="Return to HQ">${icon('x')}</button></div><div class="panel-body"><div class="loadout-grid">${LOADOUTS.map((l: any) => { const copy = loadoutCopy[l.id]; const chosen = c.loadoutId === l.id; return `<article class="loadout-item ${chosen ? 'equipped' : ''}"><div class="loadout-art"><img src="./assets/atlas-${l.id}.jpg" width="640" height="360" alt="${copy.name}"><span>${icon(copy.icon)}</span></div><div class="loadout-content"><span class="eyebrow">${copy.tag}</span><h2>${copy.name}</h2><p>${copy.description}</p><div class="loadout-stat"><span>Cargo per mission</span><strong>${4 + l.cargoBonus + c.bonuses.cargoBonus}</strong></div><button class="button ${chosen ? '' : 'primary'} full" data-action="equip-loadout" data-loadout="${l.id}" ${chosen || !c.canEquip || busy || pending ? 'disabled' : ''}>${icon(chosen ? 'check' : 'wrench')}${chosen ? 'Equipped' : c.canEquip ? 'Equip vehicle' : 'Expedition active'}</button></div></article>`; }).join('')}</div><p class="garage-note">Every vehicle can visit every district. Hints and corrections keep the same cargo reward.</p></div></section>`;
}

export function campaignObjective(state: any) {
  const c = getCampaign(state);
  const next = c.projects.find((p: any) => !p.built);
  if (!next) return { title: 'Valley restored', detail: 'Explore again and build your field journal.', action: 'map' };
  return { title: next.canBuild ? `${projectCopy[next.id].name} ready to build` : projectCopy[next.id].title,
    detail: `${c.projectsBuilt.length} / 3 landmarks restored`, action: 'campaign' };
}

export function loadoutName(id: string) { return loadoutCopy[id]?.name || 'Atlas Explorer'; }
