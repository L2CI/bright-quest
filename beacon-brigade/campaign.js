import { REGIONS, STATION_REWARD } from "./content.js";

// Shared, immutable catalogue. Cargo is an additive per-station resource amount;
// travel multipliers are consumed by the world, never by answer marking.
export const LOADOUTS = deepFreeze([
  { id: "balanced", name: "Balanced", description: "Standard travel and cargo.", travelSpeedMultiplier: 1, cargoBonus: 0 },
  { id: "survey", name: "Survey", description: "Faster travel with a smaller cargo hold.", travelSpeedMultiplier: 1.2, cargoBonus: -1 },
  { id: "hauler", name: "Hauler", description: "Extra cargo with slower travel.", travelSpeedMultiplier: 0.85, cargoBonus: 1 },
  { id: "rescue", name: "Rescue", description: "A six-wheel expedition support vehicle.", travelSpeedMultiplier: 1, cargoBonus: 0 },
  { id: "crawler", name: "Crawler", description: "Tracked engineering power and extra cargo.", travelSpeedMultiplier: 0.85, cargoBonus: 1 }
]);

export const PROJECTS = deepFreeze([
  { id: "bridge", name: "District Bridge", cost: { parts: 16, cores: 0 },
    requiredDistricts: ["harbour"], abilities: { travelSpeedBonus: 0.08, cargoBonus: 0 } },
  { id: "observatory", name: "Observatory", cost: { parts: 24, cores: 16 },
    requiredDistricts: ["harbour", "physics"], abilities: { travelSpeedBonus: 0, cargoBonus: 1 } },
  { id: "greenhouse", name: "Greenhouse", cost: { parts: 16, cores: 24 },
    requiredDistricts: ["chemistry", "grove"], abilities: { travelSpeedBonus: 0.07, cargoBonus: 0 } }
]);

/** Safe evidence summary, also works on old saves and redacted public stations.
 * Stars are descriptive only: completed + independent/corrected = 2, all
 * independent = 3, completion with support = 1. No spending or unlock uses stars.
 */
export function getExpeditionCompletion(expedition) {
  const stations = expedition.stations ?? [];
  const resolved = stations.filter((station) => station.resolved);
  const independent = resolved.filter((station) => station.resolution === "independent").length;
  const corrected = resolved.filter((station) => station.resolution === "corrected").length;
  const supported = resolved.filter((station) => ["hinted", "assisted"].includes(station.resolution)).length;
  const completed = expedition.status === "completed" && stations.length > 0 && resolved.length === stations.length;
  const stars = !completed ? 0 : independent === stations.length ? 3
    : independent + corrected === stations.length ? 2 : 1;
  return { expeditionId: expedition.id, regionId: expedition.regionId, completed, stars,
    total: stations.length, resolved: resolved.length, independent, corrected, supported };
}

/** Pure projection from either persisted or public state (never trusts campaignProgress).
 * Persistence: campaign = { loadoutId, projects: [{ projectId, cost, at, version }] }.
 * Projection: loadoutId/loadout, projectsBuilt (IDs), project availability, bonuses,
 * next-expedition modifiers/reward, district objectives, history completions and
 * achievements ({ id, name, progress, target, unlocked }). resolvedStations and
 * totalResolved are aliases including history and active work, with supported
 * answers counted equally. No question data escapes.
 */
export function getCampaign(state) {
  const loadout = LOADOUTS.find((item) => item.id === state.campaign?.loadoutId) ?? LOADOUTS[0];
  const projectsBuilt = PROJECTS.filter((project) => state.campaign?.projects?.some((record) => record.projectId === project.id))
    .map((project) => project.id);
  const completions = (state.history ?? []).map(getExpeditionCompletion);
  const objectives = REGIONS.map((region) => {
    const runs = completions.filter((run) => run.regionId === region.id && run.completed);
    return { id: region.id, name: region.name, completed: runs.length > 0, progress: Math.min(1, runs.length),
      target: 1, completions: runs.length, bestStars: Math.max(0, ...runs.map((run) => run.stars)) };
  });
  const completedDistricts = objectives.filter((item) => item.completed).map((item) => item.id);
  const bonuses = { travelSpeedBonus: 0, cargoBonus: 0 };
  const projects = PROJECTS.map((project) => {
    const built = projectsBuilt.includes(project.id);
    if (built) {
      bonuses.travelSpeedBonus += project.abilities.travelSpeedBonus;
      bonuses.cargoBonus += project.abilities.cargoBonus;
    }
    const missingDistricts = project.requiredDistricts.filter((id) => !completedDistricts.includes(id));
    const affordable = ["parts", "cores"].every((resource) => (state.wallet?.[resource] ?? 0) >= project.cost[resource]);
    return { ...project, built, missingDistricts, affordable, unlocked: missingDistricts.length === 0,
      canBuild: !built && affordable && missingDistricts.length === 0 };
  });
  const completedRuns = completions.filter((run) => run.completed).length;
  const historyResolvedStations = completions.reduce((total, run) => total + run.resolved, 0);
  const totalResolved = historyResolvedStations + (state.activeExpedition ? getExpeditionCompletion(state.activeExpedition).resolved : 0);
  bonuses.travelSpeedBonus = Math.round(bonuses.travelSpeedBonus * 100) / 100;
  const achievements = [
    { id: "first-expedition", name: "First Expedition", progress: completedRuns, target: 1 },
    { id: "district-explorer", name: "District Explorer", progress: completedDistricts.length, target: REGIONS.length },
    { id: "steady-crew", name: "Steady Crew", progress: completedRuns, target: 10 },
    { id: "fieldwork", name: "Fieldwork", progress: historyResolvedStations, target: 25 }
  ].map((item) => ({ ...item, progress: Math.min(item.progress, item.target), unlocked: item.progress >= item.target }));
  const expeditionModifiers = { travelSpeedMultiplier: loadout.travelSpeedMultiplier * (1 + bonuses.travelSpeedBonus),
    cargoBonus: loadout.cargoBonus + bonuses.cargoBonus };
  return structuredClone({ loadoutId: loadout.id, loadout, canEquip: !state.activeExpedition,
    projectsBuilt, projects, bonuses, expeditionModifiers,
    stationRewardAmount: STATION_REWARD + expeditionModifiers.cargoBonus,
    completedDistricts, objectives, achievements, completions, totalResolved, resolvedStations: totalResolved,
    totalStars: objectives.reduce((total, district) => total + district.bestStars, 0),
    maxStars: REGIONS.length * 3 });
}

function deepFreeze(value) {
  for (const child of Object.values(value)) if (child && typeof child === "object") deepFreeze(child);
  return Object.freeze(value);
}
