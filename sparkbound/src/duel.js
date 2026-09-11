import { getHero, getWeapon, totalRounds, forgeSubject, PRISM_KITS, prismStage, isCampaign, getUpgradeRules, moveEnergyCost } from '../roster.js';
// Presentation only. Damage, rewards and turn resolution remain on the server.
export function duelCue(match) {
  const { intent, staff, pad, energy } = match;
  const weapon = getWeapon(match), cost = isCampaign(match) && match.heroId === 'echo' ? 1 : 2;
  const upgrade = getUpgradeRules(match), specialCost = upgrade?.specialCost ?? 4;
  if (upgrade && intent === 'guard' && pad && energy >= specialCost && upgrade.openingBonus)
    return { title: 'Prism has raised a shield', detail: 'Your charged shot pierces it with no return hit.', icon: 'target', tone: 'shield', suggested: 'special', badge: getWeapon(match, true).shortName };
  if (isCampaign(match) && intent === 'heavy') { const kit = PRISM_KITS[prismStage(match)]; return { title: kit.cue, detail: upgrade?.guardCounter ? `${kit.detail} Your Shield also hits back for 2.` : kit.detail, icon: 'shield', tone: 'danger', suggested: 'guard', badge: 'Protect' }; }
  if (intent === 'heavy') return { title: 'Prism is charging a BIG hit', detail: 'Your shield can absorb most of it.', icon: 'shield', tone: 'danger', suggested: 'guard', badge: 'Protect' };
  if (intent === 'strike') return { title: 'Prism is about to attack', detail: energy < 4 ? 'A shield block also builds energy.' : 'Your shield can block the incoming hit.', icon: 'swords', tone: 'warning', suggested: 'guard', badge: energy < 4 ? 'Block' : 'Protect' };
  if (intent === 'guard') return { title: 'Prism has raised a shield', detail: staff && energy >= cost ? getHero(match.heroId).id === 'relay' && !isCampaign(match) ? 'Your pulse launcher can fire through it.' : `Your ${weapon.name} can fire through it.` : energy < 4 ? 'Build energy while the shield is up.' : 'Keep your shield safe until an opening.', icon: 'shield', tone: 'shield', suggested: staff && energy >= cost ? 'break' : 'guard', badge: staff && energy >= cost ? weapon.shortName : energy < 4 ? 'Charge' : 'Protect' };
  return { title: 'Prism is wide open', detail: upgrade?.openingBonus && pad && energy >= specialCost ? 'No incoming hit. Your charged shot deals 4 extra damage now.' : 'No incoming hit. This is your opening.', icon: 'target', tone: 'opening', suggested: pad && energy >= specialCost ? 'special' : staff && energy >= cost ? 'break' : 'strike', badge: 'Opening' };
}

export function duelMoves(match) {
  const hero = getHero(match.heroId), charge = hero.id === 'volt' ? 3 : 2;
  const weapon = getWeapon(match), special = getWeapon(match, true), cost = isCampaign(match) && hero.id === 'echo' ? 1 : 2;
  const upgrade = getUpgradeRules(match), specialCost = upgrade ? moveEnergyCost(match, 'special') : 4;
  return [
    { id: 'strike', name: 'Attack', icon: 'swords', hint: match.energy < 4 ? 'Hit +1 energy' : 'Energy full', disabled: false },
    { id: 'guard', name: 'Shield', icon: 'shield', hint: match.energy < 4 ? `Block +${Math.min(charge, 4 - match.energy)} energy` : 'Energy full', disabled: false },
    ...(match.staff ? [{ id: 'break', name: weapon.shortName, icon: weapon.icon, hint: match.energy >= cost ? `Use ${cost} energy` : `Needs ${cost} energy`, disabled: match.energy < cost }] : []),
    ...(match.pad ? [{ id: 'special', name: special.shortName, icon: special.icon, hint: match.energy >= specialCost ? `Use ${specialCost} energy` : `Needs ${specialCost} energy`, disabled: match.energy < specialCost }] : [])
  ].map(move => {
    let hint = move.id === 'guard' && match.intent === 'open' ? 'No hit to block' : move.hint;
    if (upgrade && !move.disabled) {
      if (move.id === 'guard' && match.intent !== 'open' && upgrade.guardCounter) hint += ' / Counter 2';
      if ((move.id === 'break' && match.upgradeStage >= 3) || (move.id === 'special' && upgrade.specialShots === 2)) hint += ' / 2 shots';
      if (move.id === 'special' && upgrade.openingBonus) hint += match.intent === 'open' ? ' / +4 damage' :
        match.intent === 'guard' ? ' / No return hit' : upgrade.incomingDivisor === 2 ? ' / Half incoming hit' : '';
    }
    return { ...move, hint };
  });
}

export function exchangeOutcome(event) {
  if (event?.kind !== 'exchange') return null;
  const dealt = event.damage, received = event.rivalDamage;
  const title = event.guardBroken ? 'Shield pierced!' : event.technique?.id === 'counter' ? 'Blocked and hit back!' : event.move === 'guard' ? event.intent === 'open' ? 'Prism was resting' : 'Hit absorbed!' : dealt === 0 ? 'Prism blocked your attack' : event.intent === 'open' ? 'Opening taken!' : 'Attack landed';
  const detail = event.move === 'guard' && event.intent === 'open'
    ? 'No incoming hit. Neither shield changed.'
    : `Prism lost ${dealt} shield. You lost ${received}.${event.healing ? ` Recovered ${event.healing} shield.` : ''}${event.technique?.shots.length > 1 ? ` ${event.technique.shots.length === 2 ? 'Two' : 'Three'} shots: ${event.technique.shots.join(' + ')} damage.` : ''}`;
  return { title, detail, ...(event.ability ? { ability: event.ability.name, abilityDescription: event.ability.description } : {}), positive: event.guardBroken || received === 0 || event.move === 'guard' };
}

export function roundReward(match) {
  if (isCampaign(match)) return match.round < totalRounds(match) ? `Next: ${forgeSubject(match.round)} + ${getHero(match.heroId).weapons[match.round].name}` : 'Win this round to become a City Guardian';
  if (match.heroId && match.heroId !== 'relay') { const h = getHero(match.heroId); return match.round === 1 ? `Next: maths + ${h.weapons[1].name}` : match.round === 2 ? `Next: science + ${h.weapons[2].name}` : 'Win this round to become a City Guardian'; }
  return match.round === 1 ? 'Next: maths forge + pulse launcher' : match.round === 2 ? 'Next: science workshop + bigger armour, twin power cells and Overdrive' : 'Win this round to become a City Guardian';
}
