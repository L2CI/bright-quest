import assert from "node:assert/strict";
import test from "node:test";
import { ACTIVITY_SITES, ACTIVITY_CONTENT, getActivityItem, checkActivityAnswer }
  from "../beacon-brigade/activities.js";

const counts = { jokes: 8, riddles: 8, lookout: 6, numbers: 6 };
const positions = { jokes: [-13, 0, 14], riddles: [16, 0, -18],
  lookout: [-8, 0, -15], numbers: [19, 0, 13] };
const expectedAnswers = {
  riddles: ["A zip", "Soap", "A shadow", "An envelope", "An ice cube", "A ruler", "A key", "A watering can"],
  lookout: ["Blue", "The white boat", "The scarf", "The hut lamp", "A green leaf", "The red box"],
  numbers: ["8", "3", "1", "8", "6", "2"]
};
const allItems = Object.values(ACTIVITY_CONTENT).flat();

function assertDeepFrozen(value) {
  if (!value || typeof value !== "object") return;
  assert.ok(Object.isFrozen(value));
  Object.values(value).forEach(assertDeepFrozen);
}

function assertShortText(value, maxWords) {
  assert.equal(typeof value, "string");
  assert.equal(value, value.trim());
  assert.ok(value.length > 0);
  assert.ok(value.split(/\s+/).length <= maxWords, value);
}

test("four unique sites expose the exact integration shape and canonical positions", () => {
  assert.ok(Array.isArray(ACTIVITY_SITES));
  assert.deepEqual(ACTIVITY_SITES.map((site) => site.id), Object.keys(counts));
  assert.equal(new Set(ACTIVITY_SITES.map((site) => site.id)).size, 4);
  for (const site of ACTIVITY_SITES) {
    assert.deepEqual(Object.keys(site).sort(),
      ["id", "name", "icon", "description", "colour", "symbol", "position"].sort());
    assertShortText(site.name, 4);
    assertShortText(site.description, 14);
    assert.match(site.icon, /^[a-z]+(?:-[a-z]+)*$/);
    assert.ok(Number.isInteger(site.colour) && site.colour >= 0 && site.colour <= 0xffffff);
    assert.match(site.symbol, /^[!-~]$/);
    assert.deepEqual(site.position, positions[site.id]);
  }
});

test("all 28 items have unique IDs, short text and only the requested content fields", () => {
  assert.deepEqual(Object.keys(ACTIVITY_CONTENT), Object.keys(counts));
  assert.equal(allItems.length, 28);
  assert.equal(new Set(allItems.map((item) => item.id)).size, 28);
  assert.equal(new Set(allItems.map((item) => item.prompt)).size, 28);
  const optionIds = [];
  for (const [siteId, count] of Object.entries(counts)) {
    const items = ACTIVITY_CONTENT[siteId];
    assert.ok(Array.isArray(items));
    assert.equal(items.length, count);
    for (const item of items) {
      assert.match(item.id, new RegExp(`^${siteId}-[a-z]+(?:-[a-z]+)*$`));
      assertShortText(item.prompt, 30);
      assertShortText(item.answer, 18);
      assertShortText(item.explanation, 30);
      const keys = ["id", "prompt", "answer", "explanation"];
      if (siteId !== "jokes") keys.push("options", "correctOption");
      assert.deepEqual(Object.keys(item).sort(), keys.sort());
      for (const option of item.options ?? []) {
        assert.deepEqual(Object.keys(option).sort(), ["id", "text"]);
        assertShortText(option.text, 6);
        assert.match(option.id, new RegExp(`^${item.id}-[123]$`));
        optionIds.push(option.id);
      }
    }
  }
  assert.equal(optionIds.length, 60);
  assert.equal(new Set(optionIds).size, optionIds.length);
});

test("both exports and every nested array and object are frozen", () => {
  assertDeepFrozen(ACTIVITY_SITES);
  assertDeepFrozen(ACTIVITY_CONTENT);
  assert.throws(() => ACTIVITY_SITES.push({}), TypeError);
  assert.throws(() => { ACTIVITY_SITES[0].position[0] = 0; }, TypeError);
  assert.throws(() => { ACTIVITY_CONTENT.jokes = []; }, TypeError);
  assert.throws(() => ACTIVITY_CONTENT.jokes.pop(), TypeError);
  assert.throws(() => { getActivityItem("riddles", 0).options[0].text = "Changed"; }, TypeError);
});

for (const [siteId, items] of Object.entries(ACTIVITY_CONTENT)) {
  for (const [index, item] of items.entries()) {
    test(`${item.id}: deterministic cycles and exactly one answer, or joke reveal only`, () => {
      for (const cycle of [0, 1, 2, 1000]) {
        const cycledIndex = index + cycle * items.length;
        assert.equal(getActivityItem(siteId, cycledIndex), item);
        if (siteId === "jokes") {
          assert.equal(Object.hasOwn(item, "options"), false);
          assert.equal(Object.hasOwn(item, "correctOption"), false);
          for (const guess of [undefined, null, "", item.answer, item.id]) {
            assert.equal(checkActivityAnswer(siteId, cycledIndex, guess), false);
          }
          continue;
        }
        assert.equal(item.options.length, 3);
        assert.equal(new Set(item.options.map((option) => option.id)).size, 3);
        assert.equal(new Set(item.options.map((option) => option.text.toLowerCase())).size, 3);
        const expectedAnswer = expectedAnswers[siteId][index];
        assert.equal(item.answer, expectedAnswer);
        const correctOptions = item.options.filter((option) => option.id === item.correctOption);
        assert.equal(correctOptions.length, 1);
        assert.equal(correctOptions[0].text, expectedAnswer);
        assert.equal(item.options.filter((option) => option.text === expectedAnswer).length, 1);
        for (const option of item.options) {
          assert.equal(checkActivityAnswer(siteId, cycledIndex, option.id), option.text === expectedAnswer);
        }
        assert.equal(checkActivityAnswer(siteId, cycledIndex, item.answer), false);
      }
    });
  }
}

test("invalid sites, indices and options are rejected without coercion or exceptions", () => {
  const hostile = { toString() { throw new Error("Do not coerce"); },
    valueOf() { throw new Error("Do not coerce"); } };
  const invalidSites = [undefined, null, "", "missing", "JOKES", " jokes", "toString",
    "__proto__", "constructor", "hasOwnProperty", 0, true, [], {}, Symbol("site"), hostile];
  const invalidIndices = [undefined, null, -1, -8, -0.5, 0.5, NaN, Infinity, -Infinity,
    Number.MAX_SAFE_INTEGER + 1, "0", true, [], {}, 0n, Symbol("index"), hostile];
  const invalidOptions = [undefined, null, "", "missing", "__proto__", "constructor",
    0, true, [], {}, Symbol("option"), hostile];
  for (const siteId of invalidSites) {
    assert.equal(getActivityItem(siteId, 0), null);
    assert.equal(checkActivityAnswer(siteId, 0, ACTIVITY_CONTENT.riddles[0].correctOption), false);
  }
  for (const siteId of Object.keys(counts)) {
    for (const index of invalidIndices) {
      assert.equal(getActivityItem(siteId, index), null);
      assert.equal(checkActivityAnswer(siteId, index, ACTIVITY_CONTENT[siteId][0].correctOption), false);
    }
    for (const [index, item] of ACTIVITY_CONTENT[siteId].entries()) {
      for (const optionId of invalidOptions) {
        assert.equal(checkActivityAnswer(siteId, index, optionId), false);
      }
      for (const other of allItems.filter((candidate) => candidate !== item)) {
        assert.equal(checkActivityAnswer(siteId, index, other.correctOption), false);
      }
    }
    const items = ACTIVITY_CONTENT[siteId];
    assert.equal(getActivityItem(siteId, Number.MAX_SAFE_INTEGER), items[Number.MAX_SAFE_INTEGER % items.length]);
    assert.equal(getActivityItem(siteId, items.length), items[0]);
  }
  assert.equal(getActivityItem(), null);
  assert.equal(checkActivityAnswer(), false);
});

test("calls are stateless and leave the exported content unchanged", () => {
  const before = JSON.stringify([ACTIVITY_SITES, ACTIVITY_CONTENT]);
  const first = getActivityItem("numbers", 0);
  checkActivityAnswer("numbers", 0, first.correctOption);
  checkActivityAnswer("numbers", 0, "wrong");
  getActivityItem("jokes", 27);
  assert.equal(getActivityItem("numbers", 0), first);
  assert.equal(JSON.stringify([ACTIVITY_SITES, ACTIVITY_CONTENT]), before);
});
