import assert from "node:assert/strict";
import test from "node:test";
import { getOgTitleSize, shortenOgDescription } from "../../components/brand/portfolio-og-card";
import { RM_MARK_PATH, RM_MARK_VIEW_BOX } from "../../lib/brand";

test("the brand mark retains its canonical wide silhouette", () => {
  assert.equal(RM_MARK_VIEW_BOX, "0 0 751 392.031637");
  assert.match(RM_MARK_PATH, /^M0\.5 1\.3/);
  assert.match(RM_MARK_PATH, /751 392V0H697/);
});

test("social card copy stays within the fixed image composition", () => {
  const longDescription =
    "This deliberately long description explains a production workflow in enough detail to overflow a fixed social image unless it is shortened at a readable word boundary for the final rendered card.";

  const shortened = shortenOgDescription(longDescription);
  assert.ok(shortened.length <= 146);
  assert.ok(shortened.endsWith("…"));
  assert.equal(getOgTitleSize("Short title"), 62);
  assert.equal(getOgTitleSize("A title that needs a more compact but still prominent display size"), 54);
  assert.equal(getOgTitleSize("A deliberately long engineering title that must fit safely inside the social image without clipping"), 48);
});
