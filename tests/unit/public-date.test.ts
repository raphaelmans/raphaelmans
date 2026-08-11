import assert from "node:assert/strict";
import test from "node:test";
import {
  caseStudies,
  validatePublishedCaseStudies,
} from "../../data/case-studies";
import { featuredWork, validateFeaturedWork } from "../../data/portfolio-data";
import { isValidPublicDate } from "../../data/public-date";

test("accepts real public calendar dates, including leap day", () => {
  assert.equal(isValidPublicDate("2026-08-11"), true);
  assert.equal(isValidPublicDate("2024-02-29"), true);
  assert.equal(isValidPublicDate("2000-02-29"), true);
});

test("rejects normalized, malformed, and invalid public calendar dates", () => {
  for (const value of [
    "2026-02-29",
    "2026-02-30",
    "1900-02-29",
    "2026-04-31",
    "2026-13-01",
    "2026-00-10",
    "2026-8-11",
    "0000-01-01",
  ]) {
    assert.equal(isValidPublicDate(value), false, `${value} should be rejected`);
  }
});

test("case-study validation rejects an impossible publication date", () => {
  const invalidRecords = caseStudies.map((record, index) =>
    index === 0 ? { ...record, publishedAt: "2026-02-30" } : record
  );

  assert.throws(
    () => validatePublishedCaseStudies(invalidRecords),
    /invalid publication or review metadata/
  );
});

test("featured-work validation rejects impossible and reversed dates", () => {
  const impossibleDate = featuredWork.map((record, index) =>
    index === 0 ? { ...record, lastReviewed: "2026-02-30" } : record
  );
  const reversedDates = featuredWork.map((record, index) =>
    index === 0
      ? { ...record, publishedAt: "2026-08-11", lastReviewed: "2026-08-10" }
      : record
  );

  assert.throws(() => validateFeaturedWork(impossibleDate), /is incomplete/);
  assert.throws(() => validateFeaturedWork(reversedDates), /is incomplete/);
});
