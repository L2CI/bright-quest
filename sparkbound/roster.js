// Public equipment and ability descriptions only. Learning answers stay on the server.
const freeze = value => { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); } return value; };
export const HEROES = freeze([
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
]);
export const isHeroId = id => typeof id === 'string' && HEROES.some(hero => hero.id === id);
export const getHero = id => HEROES.find(hero => hero.id === id) || HEROES[0];
export const forgeSize = match => match?.questions?.length === 6 ? 3 : 2;
export const equipmentStage = match => match?.pad ? 2 : match?.staff ? 1 : 0;
