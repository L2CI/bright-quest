// Public equipment and ability descriptions only. Learning answers stay on the server.
const freeze = value => { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); } return value; };
const roster = [
  { id: 'relay', name: 'Relay', role: 'Vanguard', colour: '#edb345', effect: 'pulse',
    trait: { name: 'Steady Power', description: 'Reliable attacks. Pierce breaks through a raised shield.', id: 'steady' },
    weapons: [
      { name: 'Kinetic Gauntlets', shortName: 'Attack', icon: 'swords', detail: 'Close-range impact. Adds 1 energy.' },
      { name: 'Breach Launcher', shortName: 'Pierce', icon: 'target', detail: 'A heavy pulse bolt. Especially strong against shields.' },
      { name: 'Siege Twin Cannon', shortName: 'Overdrive', icon: 'zap', detail: 'Twin power cells drive a shield-piercing blast.' }
    ] },
  { id: 'helio', name: 'Helio', role: 'Laser Specialist', colour: '#f0dfb0', effect: 'laser',
    trait: { name: 'Perfect Focus', description: 'Attacks deal 2 extra damage when Prism is open.', id: 'focus' },
    weapons: [
      { name: 'Light Gauntlets', shortName: 'Attack', icon: 'swords', detail: 'Focused impact. Stronger during an opening.' },
      { name: 'Prism Rail Laser', shortName: 'Laser', icon: 'scan-line', detail: 'A precise light beam cuts through the rival shield.' },
      { name: 'Solar Lens Cannon', shortName: 'Solar Flare', icon: 'sun', detail: 'An enlarged focusing lens releases a brilliant beam.' }
    ] },
  { id: 'volt', name: 'Volt', role: 'Energy Specialist', colour: '#69d8b3', effect: 'arc',
    trait: { name: 'Supercharger', description: 'Blocking an incoming hit builds 3 energy instead of 2.', id: 'charge' },
    weapons: [
      { name: 'Shock Gauntlets', shortName: 'Attack', icon: 'swords', detail: 'Charged knuckles add 1 energy with each attack.' },
      { name: 'Arc Coil Caster', shortName: 'Arc Bolt', icon: 'zap', detail: 'Twin coils send a crackling arc into the shield.' },
      { name: 'Tesla Fork Array', shortName: 'Thunder', icon: 'zap', detail: 'A forked power array releases a larger electrical arc.' }
    ] },
  { id: 'bastion', name: 'Bastion', role: 'Heavy Defender', colour: '#a9bec8', effect: 'gravity',
    trait: { name: 'Reinforced Hull', description: 'Armour removes 1 point from every incoming hit.', id: 'armour' },
    weapons: [
      { name: 'Piston Fists', shortName: 'Attack', icon: 'swords', detail: 'Heavy mechanical fists. Built for close combat.' },
      { name: 'Gravity Mortar', shortName: 'Grav Shot', icon: 'orbit', detail: 'A dense energy sphere strikes the rival shield.' },
      { name: 'Bulwark Bombard', shortName: 'Quake', icon: 'shield', detail: 'Expanded armour braces a huge gravity cannon.' }
    ] },
  { id: 'zephyr', name: 'Zephyr', role: 'Agile Striker', colour: '#63bdec', effect: 'burst',
    trait: { name: 'Quickstep', description: 'An Attack takes 2 less damage from Prism\'s quick strike.', id: 'evade' },
    weapons: [
      { name: 'Swift Gauntlets', shortName: 'Attack', icon: 'swords', detail: 'Quick attacks evade part of a quick incoming strike.' },
      { name: 'Ion Repeater', shortName: 'Ion Burst', icon: 'wind', detail: 'A light barrel sends a tight burst of ion bolts.' },
      { name: 'Cyclone Tri-Barrel', shortName: 'Cyclone', icon: 'tornado', detail: 'Three barrels fire one powerful coordinated burst.' }
    ] },
  { id: 'glacier', name: 'Glacier', role: 'Frost Controller', colour: '#c4dcf5', effect: 'frost',
    trait: { name: 'Cold Front', description: 'Avalanche halves the incoming hit on that exchange.', id: 'chill' },
    weapons: [
      { name: 'Frost Gauntlets', shortName: 'Attack', icon: 'swords', detail: 'A chilled impact against the rival shield.' },
      { name: 'Cryo Projector', shortName: 'Cryo Bolt', icon: 'snowflake', detail: 'A chilled energy capsule bursts into ice-like light.' },
      { name: 'Avalanche Cannon', shortName: 'Avalanche', icon: 'snowflake', detail: 'A larger cooling rig weakens the incoming counter.' }
    ] }
  ,{ id: 'ember', name: 'Ember', role: 'Thermal Breacher', colour: '#f49b68', effect: 'flame',
    trait: { name: 'Heat Breach', description: 'Piercing a raised shield deals 2 extra damage.', id: 'heat' },
    weapons: [
      { name: 'Thermal Gauntlets', shortName: 'Attack', icon: 'flame', detail: 'Heat-shielded fists deliver a bright thermal impact.' },
      { name: 'Flare Projector', shortName: 'Flare', icon: 'flame', detail: 'A controlled flame jet pushes through a raised shield.' },
      { name: 'Inferno Twin Jets', shortName: 'Inferno', icon: 'flame', detail: 'Paired thermal nozzles unleash a wider burst of heat.' }
    ] },
  { id: 'tidal', name: 'Tidal', role: 'Hydro Defender', colour: '#68cbd1', effect: 'water',
    trait: { name: 'Cooling Recovery', description: 'Blocking an incoming hit restores 1 shield, up to full strength.', id: 'recovery' },
    weapons: [
      { name: 'Hydraulic Fists', shortName: 'Attack', icon: 'droplets', detail: 'Pressure-driven gauntlets land a solid mechanical blow.' },
      { name: 'Hydrojet Lance', shortName: 'Hydrojet', icon: 'droplets', detail: 'A focused water jet drives against the rival shield.' },
      { name: 'Undertow Cannon', shortName: 'Undertow', icon: 'waves', detail: 'Twin pressure tanks feed a heavy water pulse.' }
    ] },
  { id: 'atlas', name: 'Atlas', role: 'Seismic Heavyweight', colour: '#d6c395', effect: 'seismic',
    trait: { name: 'Aftershock', description: 'Every four-energy special deals 2 extra shield damage.', id: 'aftershock' },
    weapons: [
      { name: 'Impact Hammers', shortName: 'Attack', icon: 'hammer', detail: 'Braced piston fists deliver a weighty impact.' },
      { name: 'Seismic Driver', shortName: 'Tremor', icon: 'mountain', detail: 'A piston cannon sends a compact shock pulse.' },
      { name: 'Faultline Ram', shortName: 'Faultline', icon: 'mountain', detail: 'A reinforced ram releases a powerful pressure wave.' }
    ] },
  { id: 'nova', name: 'Nova', role: 'Plasma Vanguard', colour: '#e8a6b8', effect: 'plasma',
    trait: { name: 'Hot Core', description: 'Basic attacks deal 1 extra damage unless Prism is guarding.', id: 'reactor' },
    weapons: [
      { name: 'Reactor Gauntlets', shortName: 'Attack', icon: 'orbit', detail: 'Charged fists strike with a compact plasma flash.' },
      { name: 'Plasma Accelerator', shortName: 'Plasma', icon: 'orbit', detail: 'Magnetic rings launch a contained plasma bolt.' },
      { name: 'Starburst Cannon', shortName: 'Starburst', icon: 'sparkles', detail: 'A larger reactor powers a bright shield-breaking pulse.' }
    ] },
  { id: 'echo', name: 'Echo', role: 'Sonic Tactician', colour: '#b5adc9', effect: 'sonic',
    trait: { name: 'Efficient Resonance', description: 'The piercing weapon uses only 1 energy instead of 2.', id: 'resonance' },
    weapons: [
      { name: 'Resonance Fists', shortName: 'Attack', icon: 'radio', detail: 'Tuned gauntlets produce a sharp pressure impact.' },
      { name: 'Sonic Disruptor', shortName: 'Sonic', icon: 'radio', detail: 'A focused sound pulse disrupts a raised shield.' },
      { name: 'Resonator Array', shortName: 'Resonate', icon: 'audio-lines', detail: 'Paired resonators combine into a larger pressure wave.' }
    ] }
];

const advanced = {
  relay: [['Rocket Battery', 'Rockets', 'rocket'], ['Rail Siege Driver', 'Rail Shot', 'target'], ['Guardian Arsenal', 'Arsenal', 'zap']],
  helio: [['Photon Battery', 'Photon', 'sun'], ['Eclipse Rail Array', 'Eclipse', 'scan-line'], ['Dawnstar Siege Lens', 'Dawnstar', 'sun']],
  volt: [['Storm Capacitors', 'Storm', 'zap'], ['Lightning Rail Crown', 'Lightning', 'zap'], ['Thunderhead Array', 'Tempest', 'zap']],
  bastion: [['Fortress Battery', 'Fortress', 'shield'], ['Tectonic Rail Driver', 'Tectonic', 'orbit'], ['Citadel Siege Rig', 'Citadel', 'shield']],
  zephyr: [['Gale Rocket Wings', 'Gale', 'wind'], ['Jetstream Rail Array', 'Jetstream', 'wind'], ['Hurricane Arsenal', 'Hurricane', 'tornado']],
  glacier: [['Frostbite Battery', 'Frostbite', 'snowflake'], ['Polar Rail Projector', 'Polar', 'snowflake'], ['Iceberg Siege Array', 'Iceberg', 'snowflake']],
  ember: [['Firestorm Battery', 'Firestorm', 'flame'], ['Magma Rail Projector', 'Magma', 'flame'], ['Phoenix Siege Array', 'Phoenix', 'flame']],
  tidal: [['Monsoon Battery', 'Monsoon', 'droplets'], ['Pressure Rail Array', 'Pressure', 'waves'], ['Tsunami Siege Rig', 'Surge', 'waves']],
  atlas: [['Bedrock Battery', 'Bedrock', 'mountain'], ['Continental Rail Ram', 'Continental', 'hammer'], ['Mountain Siege Rig', 'Mountain', 'mountain']],
  nova: [['Nebula Battery', 'Nebula', 'orbit'], ['Pulsar Rail Array', 'Pulsar', 'sparkles'], ['Supernova Siege Rig', 'Supernova', 'sparkles']],
  echo: [['Reverb Battery', 'Reverb', 'radio'], ['Harmonic Rail Array', 'Harmonic', 'audio-lines'], ['Symphony Siege Rig', 'Symphony', 'audio-lines']]
};
const stageDetails = [
  'Shoulder batteries and reinforced armour support a stronger piercing shot.',
  'A dorsal rail assembly and stabilisers channel a more powerful shot.',
  'The complete siege rig combines its shoulder battery, rail and arm cannon.'
];
export const UPGRADE_RULES = freeze([
  { id: 'base', description: 'Attack builds 1 energy. Shield blocks most of an incoming hit.' },
  { id: 'pierce', description: 'Unlock a piercing shot. It is strongest against a raised shield.' },
  { id: 'blast', description: 'Spend 4 energy on a heavy blast that pierces shields. Incoming hits still hurt.' },
  { id: 'salvo', specialCost: 3, specialShots: 2,
    description: 'Fire two shots together. The special uses 3 energy, so a full charge leaves 1 energy.' },
  { id: 'rail', openingBonus: 4,
    description: 'Keep your two-shot salvo. Spend 4 energy on a rail shot: 4 extra damage when Prism is open, and no return hit from a raised shield.' },
  { id: 'arsenal', specialShots: 3, openingBonus: 4, incomingDivisor: 2, guardCounter: 2,
    description: 'Keep your salvo. The 4-energy arsenal fires three shots, gains 4 damage when Prism is open, stops shield return hits and halves other incoming hits. Shield also hits back for 2 when blocking.' }
].map(rule => ({ specialCost: 4, specialShots: 1, openingBonus: 0, incomingDivisor: 1, guardCounter: 0, ...rule })));
export const HEROES = freeze(roster.map(hero => ({ ...hero, weapons: [...hero.weapons,
  ...advanced[hero.id].map(([name, shortName, icon], i) => ({ name, shortName, icon, detail: UPGRADE_RULES[i + 3].description }))] })));
export const STAGE_NAMES = freeze(['Base suit', 'Specialist', 'Advanced', 'Elite', 'Master', 'Guardian']);
export const PRISM_KITS = freeze([
  { name: 'Training Gauntlets', effect: 'pulse', cue: 'Prism is charging a BIG hit', detail: 'Watch the raised arm. Block the charge, then attack an opening.' },
  { name: 'Breach Blaster', effect: 'pulse', cue: 'Prism is charging a breach shot', detail: 'The arm cannon is charging. Your shield absorbs most of the hit.' },
  { name: 'Flame Projector', effect: 'flame', cue: 'Prism is heating a flame burst', detail: 'The nozzle glows before the fire jet. Raise your shield.' },
  { name: 'Rocket Battery', effect: 'rocket', cue: 'Prism is locking its rockets', detail: 'The shoulder pods are opening. Block the incoming volley.' },
  { name: 'Arc Rail Cannon', effect: 'arc', cue: 'Prism is charging an arc cannon', detail: 'Energy is gathering along the rail. Prepare your shield.' },
  { name: 'Solar Siege Array', effect: 'plasma', cue: 'Prism is powering its siege array', detail: 'The full array is charging. Block now; strike when it cools.' }
]);
export const isHeroId = id => typeof id === 'string' && HEROES.some(hero => hero.id === id);
export const getHero = id => HEROES.find(hero => hero.id === id) || HEROES[0];
export const getHeroTrait = match => match?.rulesVersion === 4 && match.heroId === 'glacier' ?
  { ...getHero('glacier').trait, description: 'Every special halves the incoming hit on that exchange.' } : getHero(match?.heroId).trait;
export const isCampaign = match => match?.rulesVersion === 3 || match?.rulesVersion === 4;
export const forgeSize = match => isCampaign(match) || match?.questions?.length === 6 ? 3 : 2;
export const equipmentStage = match => isCampaign(match) ? Math.max(0, Math.min(5, match.upgradeStage || 0)) : match?.pad ? 2 : match?.staff ? 1 : 0;
export const totalRounds = match => isCampaign(match) ? 6 : 3;
export const getUpgradeRules = match => match?.rulesVersion === 4 ? UPGRADE_RULES[equipmentStage(match)] : null;
export const moveEnergyCost = (match, move) => move === 'break' ? match?.heroId === 'echo' ? 1 : 2 :
  move === 'special' ? getUpgradeRules(match)?.specialCost ?? 4 : 0;
export const upgradeDescription = match => getUpgradeRules(match)?.description ??
  (equipmentStage(match) >= 3 ? stageDetails[equipmentStage(match) - 3] : getHero(match?.heroId).weapons[equipmentStage(match)].detail);
export const prismStage = match => Math.max(0, Math.min(totalRounds(match) - 1, (match?.round || 1) - 1 + (match?.phase === 'rival_upgrade' || match?.phase === 'training' || match?.phase === 'player_upgrade' ? 1 : 0)));
export const forgeSubject = stage => stage % 2 ? 'maths' : 'science';
export const getWeapon = (match, special = false) => {
  const stage = equipmentStage(match), hero = getHero(match?.heroId);
  if (match?.rulesVersion === 4 && stage >= 3) {
    const weapon = hero.weapons[special ? stage : 3];
    return { ...weapon, shortName: special ? stage === 3 ? 'Full Salvo' : stage === 4 ? 'Rail Shot' : 'Arsenal' : 'Salvo',
      detail: special ? UPGRADE_RULES[stage].description : `Spend ${moveEnergyCost(match, 'break')} energy on two shots. Strongest against a raised shield.` };
  }
  const weapon = hero.weapons[stage >= 3 ? stage : special ? 2 : 1];
  return stage >= 3 ? { ...weapon, detail: stageDetails[stage - 3], ...(special ? { shortName: `${weapon.shortName} +` } : {}) } : weapon;
};
