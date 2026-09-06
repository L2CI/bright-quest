// Presentation only. Damage, rewards and turn resolution remain on the server.
export function duelCue(match) {
  const { intent, staff, pad, energy } = match;
  if (intent === 'heavy') return { title: 'Prism is charging a BIG hit', detail: 'Your shield can absorb most of it.', icon: 'shield', tone: 'danger', suggested: 'guard', badge: 'Protect' };
  if (intent === 'strike') return { title: 'Prism is about to attack', detail: energy < 4 ? 'A shield block also builds energy.' : 'Your shield can block the incoming hit.', icon: 'swords', tone: 'warning', suggested: 'guard', badge: energy < 4 ? 'Block' : 'Protect' };
  if (intent === 'guard') return { title: 'Prism has raised a shield', detail: staff && energy >= 2 ? 'Your staff can break through it.' : energy < 4 ? 'Build energy while the shield is up.' : 'Keep your shield safe until an opening.', icon: 'shield', tone: 'shield', suggested: staff && energy >= 2 ? 'break' : 'guard', badge: staff && energy >= 2 ? 'Pierce' : energy < 4 ? 'Charge' : 'Protect' };
  return { title: 'Prism is wide open', detail: 'No incoming hit. This is your opening.', icon: 'target', tone: 'opening', suggested: pad && energy >= 4 ? 'special' : staff && energy >= 2 ? 'break' : 'strike', badge: 'Opening' };
}

export function duelMoves(match) {
  return [
    { id: 'strike', name: 'Attack', icon: 'swords', hint: match.energy < 4 ? 'Hit +1 energy' : 'Energy full', disabled: false },
    { id: 'guard', name: 'Shield', icon: 'shield', hint: match.energy < 4 ? `Block +${Math.min(2, 4 - match.energy)} energy` : 'Energy full', disabled: false },
    ...(match.staff ? [{ id: 'break', name: 'Pierce', icon: 'hammer', hint: match.energy >= 2 ? 'Use 2 energy' : 'Needs 2 energy', disabled: match.energy < 2 }] : []),
    ...(match.pad ? [{ id: 'special', name: 'Overdrive', icon: 'zap', hint: match.energy >= 4 ? 'Use 4 energy' : 'Needs 4 energy', disabled: match.energy < 4 }] : [])
  ].map(move => ({ ...move, hint: move.id === 'guard' && match.intent === 'open' ? 'No hit to block' : move.hint }));
}

export function exchangeOutcome(event) {
  if (event?.kind !== 'exchange') return null;
  const dealt = event.damage, received = event.rivalDamage;
  const title = event.guardBroken ? 'Shield pierced!' : event.move === 'guard' ? event.intent === 'open' ? 'Prism was resting' : 'Hit absorbed!' : dealt === 0 ? 'Prism blocked your attack' : event.intent === 'open' ? 'Opening taken!' : 'Attack landed';
  const detail = event.move === 'guard' && event.intent === 'open'
    ? 'No incoming hit. Neither shield changed.'
    : `Prism lost ${dealt} shield. You lost ${received}.`;
  return { title, detail, positive: event.guardBroken || received === 0 || event.move === 'guard' };
}

export function roundReward(match) {
  return match.round === 1 ? 'Next: maths forge + piercing staff' : match.round === 2 ? 'Next: science workshop + Overdrive' : 'Win this round to become a City Guardian';
}
