import { CONTENT_VERSION, HQ_UPGRADES, QUESTION_TEMPLATES, REGIONS, STATION_REWARD,
  STATIONS_PER_EXPEDITION, createQuestion } from "../../beacon-brigade/content.js";

export const MAX_EXPEDITIONS = 100;
export const MAX_WRONG_ATTEMPTS = 12;

export class BeaconError extends Error {
  constructor(code, message, status = 409) {
    super(message);
    this.name = "BeaconError";
    this.code = code;
    this.status = status;
  }
}

export function createState({ profileId = "local-preview" } = {}) {
  return { schemaVersion: 1, contentVersion: CONTENT_VERSION, profileId, version: 0,
    hqLevel: 1, wallet: { parts: 0, cores: 0 }, nextExpeditionNumber: 1,
    activeExpedition: null, history: [], upgrades: [] };
}

// `at` is an optional trusted timestamp supplied by the API, never a clock read here.
export function applyAction(state, action) {
  validateAction(action);
  const next = structuredClone(state);
  const at = action.at ?? null;
  const version = state.version + 1;
  switch (action.type) {
    case "start": {
      if (next.activeExpedition) fail("EXPEDITION_ACTIVE", "Resume or end the current expedition first.");
      if (next.history.length >= MAX_EXPEDITIONS) {
        fail("HISTORY_FULL", "All 100 expedition records are retained. New expeditions are paused until expanded storage is available.");
      }
      const region = REGIONS.find((item) => item.id === action.regionId);
      if (!region) fail("INVALID_REGION", "Unknown region.", 400);
      if (next.hqLevel < region.minHqLevel) fail("REGION_LOCKED", "Upgrade HQ before visiting this region.");
      const templates = QUESTION_TEMPLATES.filter((item) => item.regionId === region.id);
      const run = next.history.filter((item) => item.regionId === region.id).length;
      const id = `${next.profileId}:exp-${next.nextExpeditionNumber++}-${region.id}`;
      next.activeExpedition = { id, regionId: region.id, resource: region.resource,
        startedAt: at, startedVersion: version, status: "active", earned: { parts: 0, cores: 0 },
        stations: Array.from({ length: STATIONS_PER_EXPEDITION }, (_, index) => {
          const template = templates[(run * STATIONS_PER_EXPEDITION + index) % templates.length];
          const variant = Math.floor(run * STATIONS_PER_EXPEDITION / templates.length) % template.instances.length;
          return { id: `${id}:station-${index + 1}`, name: region.stationNames[index],
            question: createQuestion(template.id, variant), attempts: [], resolved: false,
            helpUsed: false, support: { stage: 0, hintAtAttempt: null, events: [], message: null },
            resolution: null, firstAttemptCorrect: null, lastFeedback: null,
            reward: { resource: region.resource, amount: STATION_REWARD }, rewardGranted: false };
        }) };
      break;
    }
    case "answer": {
      const station = activeStation(next, action.stationId);
      if (station.resolved) return next;
      const correct = markAnswer(station.question, action.answer);
      if (!correct && station.attempts.filter((item) => !item.correct).length >= MAX_WRONG_ATTEMPTS) {
        fail("ATTEMPT_LIMIT", "Your attempts are preserved. Use worked guidance, then submit the corrected answer, or end the expedition.");
      }
      station.attempts.push({ answer: action.answer, correct, at, version, helpStage: station.support.stage });
      station.firstAttemptCorrect = station.attempts[0].correct;
      station.lastFeedback = { correct, explanation: correct ? station.question.explanation : station.question.wrongFeedback };
      if (correct) {
        station.resolved = true;
        station.resolvedAt = at;
        station.resolvedVersion = version;
        station.resolution = station.support.stage === 2 ? "assisted" : station.helpUsed ? "hinted"
          : station.attempts.length === 1 ? "independent" : "corrected";
        if (!station.rewardGranted) {
          station.rewardGranted = true;
          next.wallet[station.reward.resource] += station.reward.amount;
          next.activeExpedition.earned[station.reward.resource] += station.reward.amount;
        }
      }
      break;
    }
    case "hint": {
      const station = activeStation(next, action.stationId);
      if (station.resolved || station.support.stage === 2) return next;
      const last = station.attempts.at(-1);
      if (!last || last.correct) fail("ATTEMPT_REQUIRED", "Try an answer first; your resources are safe.");
      if (station.support.stage === 1 && station.attempts.length <= station.support.hintAtAttempt
        && station.attempts.length < MAX_WRONG_ATTEMPTS) {
        fail("RETRY_REQUIRED", "Try again with the hint before opening worked guidance.");
      }
      station.helpUsed = true;
      station.support.stage += 1;
      station.support.hintAtAttempt = station.attempts.length;
      station.support.message = station.support.stage === 1 ? station.question.hint : station.question.explanation;
      station.support.events.push({ stage: station.support.stage, afterAttempt: station.attempts.length, at, version });
      station.lastFeedback = { correct: false, explanation: station.support.message, kind: station.support.stage === 1 ? "hint" : "worked" };
      break;
    }
    case "finish":
    case "end": {
      const expedition = activeExpedition(next);
      if (action.type === "finish" && expedition.stations.some((station) => !station.resolved)) {
        fail("STATIONS_UNRESOLVED", "Resolve every station, or end the expedition with the rewards already earned.");
      }
      expedition.status = action.type === "finish" ? "completed" : "ended";
      expedition.finishedAt = at;
      expedition.finishedVersion = version;
      next.history.push(expedition);
      next.activeExpedition = null;
      break;
    }
    case "upgrade": {
      const cost = HQ_UPGRADES[next.hqLevel + 1];
      if (!cost) fail("MAX_HQ_LEVEL", "HQ is at the highest level in this first playable.");
      if (next.wallet.parts < cost.parts || next.wallet.cores < cost.cores) {
        fail("INSUFFICIENT_RESOURCES", `This upgrade needs ${cost.parts} parts and ${cost.cores} cores.`);
      }
      next.wallet.parts -= cost.parts;
      next.wallet.cores -= cost.cores;
      next.hqLevel += 1;
      next.upgrades.push({ hqLevel: next.hqLevel, cost: { ...cost }, at, version });
      break;
    }
  }
  next.version = version;
  return next;
}

export function publicState(state, { review = false } = {}) {
  const result = structuredClone(state);
  const expeditions = [...result.history, ...(result.activeExpedition ? [result.activeExpedition] : [])];
  for (const expedition of expeditions) {
    for (const station of expedition.stations) {
      delete station.question.hint;
      delete station.question.wrongFeedback;
      if (!review && expedition.status === "active" && !station.resolved && station.support.stage < 2) {
        delete station.question.answer;
        delete station.question.explanation;
      }
    }
  }
  result.limits = { maxExpeditions: MAX_EXPEDITIONS, expeditionsRemaining: MAX_EXPEDITIONS - result.history.length - (result.activeExpedition ? 1 : 0),
    maxWrongAttemptsPerStation: MAX_WRONG_ATTEMPTS, historyRetention: "No automatic deletion" };
  result.nextUpgrade = HQ_UPGRADES[state.hqLevel + 1] ? { level: state.hqLevel + 1, cost: { ...HQ_UPGRADES[state.hqLevel + 1] } } : null;
  return result;
}

function validateAction(action) {
  if (!action || typeof action !== "object" || Array.isArray(action)) fail("INVALID_ACTION", "An action object is required.", 400);
  const fields = { start: ["regionId"], answer: ["stationId", "answer"], hint: ["stationId"], finish: [], upgrade: [], end: [] };
  if (typeof action.type !== "string" || !Object.hasOwn(fields, action.type)) fail("INVALID_ACTION", "Unknown action type.", 400);
  const allowed = ["type", "at", ...fields[action.type]];
  if (Object.keys(action).some((key) => !allowed.includes(key))) fail("INVALID_ACTION", "Unexpected action fields.", 400);
  if (fields[action.type].some((key) => !Object.hasOwn(action, key))) fail("INVALID_ACTION", "Required action fields are missing.", 400);
  if (("stationId" in action && typeof action.stationId !== "string") || ("regionId" in action && typeof action.regionId !== "string")) {
    fail("INVALID_ACTION", "Station and region IDs must be strings.", 400);
  }
  if ("at" in action && (typeof action.at !== "string" || !Number.isFinite(Date.parse(action.at)))) fail("INVALID_ACTION", "Invalid timestamp.", 400);
  if (action.type === "answer" && !((typeof action.answer === "string" && action.answer.length <= 120 && action.answer.trim())
    || (typeof action.answer === "number" && Number.isFinite(action.answer)))) fail("INVALID_ANSWER", "Enter a number or choose an option.", 400);
}

function markAnswer(question, answer) {
  if (question.type === "choice") {
    if (typeof answer !== "string" || !question.options.some((option) => option.id === answer)) {
      fail("INVALID_ANSWER", "Choose one of this question's options.", 400);
    }
    return answer === question.answer;
  }
  if (typeof answer === "string" && !/^[+-]?\d+(?:\.\d+)?$/.test(answer.trim())) {
    fail("INVALID_ANSWER", "Enter a number without units or symbols.", 400);
  }
  return Number(answer) === question.answer;
}

function activeExpedition(state) {
  if (!state.activeExpedition) fail("NO_ACTIVE_EXPEDITION", "Start an expedition first.");
  return state.activeExpedition;
}

function activeStation(state, id) {
  const station = activeExpedition(state).stations.find((item) => item.id === id);
  if (!station) fail("INVALID_STATION", "This station does not belong to the active expedition.", 400);
  return station;
}

function fail(code, message, status = 409) {
  throw new BeaconError(code, message, status);
}
