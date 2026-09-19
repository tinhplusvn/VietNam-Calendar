import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  convertLunarToSolar,
  convertSolarToLunar,
  leapMonthOfYear,
} from "./calendar.ts";

const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
function yearCanChi(y: number) {
  return `${CAN[(y + 6) % 10]} ${CHI[(y + 8) % 12]}`;
}

describe("Vietnamese lunar conversion", () => {
  it("Tết 2024 is 10/2/2024 = mùng 1 tháng Giêng Giáp Thìn", () => {
    const l = convertSolarToLunar(10, 2, 2024);
    assert.equal(l.day, 1);
    assert.equal(l.month, 1);
    assert.equal(l.leap, false);
    assert.equal(l.year, 2024);
    assert.equal(yearCanChi(l.year), "Giáp Thìn");
  });

  it("Tết 2025 is 29/1/2025 = mùng 1 Ất Tỵ", () => {
    const l = convertSolarToLunar(29, 1, 2025);
    assert.equal(l.day, 1);
    assert.equal(l.month, 1);
    assert.equal(l.year, 2025);
    assert.equal(yearCanChi(l.year), "Ất Tỵ");
  });

  it("Tết 2026 is 17/2/2026 = mùng 1 Bính Ngọ", () => {
    const l = convertSolarToLunar(17, 2, 2026);
    assert.equal(l.day, 1);
    assert.equal(l.month, 1);
    assert.equal(l.year, 2026);
    assert.equal(yearCanChi(l.year), "Bính Ngọ");
    const s = convertLunarToSolar(1, 1, 2026, false);
    assert.ok(s);
    assert.equal(s.day, 17);
    assert.equal(s.month, 2);
    assert.equal(s.year, 2026);
  });

  it("30/4/1975 is 20/3 năm Ất Mão", () => {
    const l = convertSolarToLunar(30, 4, 1975);
    assert.equal(l.day, 20);
    assert.equal(l.month, 3);
    assert.equal(l.year, 1975);
    assert.equal(yearCanChi(l.year), "Ất Mão");
  });

  it("round-trips a mid-year date", () => {
    const l = convertSolarToLunar(19, 9, 2026);
    const s = convertLunarToSolar(l.day, l.month, l.year, l.leap);
    assert.ok(s);
    assert.equal(s.day, 19);
    assert.equal(s.month, 9);
    assert.equal(s.year, 2026);
  });

  it("finds a known leap month (2020 nhuận 4)", () => {
    assert.equal(leapMonthOfYear(2020), 4);
  });

  it("round-trips lunar day 1 of each 2026 month", () => {
    for (let m = 1; m <= 12; m += 1) {
      const s = convertLunarToSolar(1, m, 2026, false);
      assert.ok(s, `L2S month ${m}`);
      const l = convertSolarToLunar(s.day, s.month, s.year);
      assert.equal(l.day, 1, `day month ${m} solar ${JSON.stringify(s)}`);
      assert.equal(l.month, m, `month ${m} got ${l.month} solar ${JSON.stringify(s)}`);
      assert.equal(l.leap, false);
      assert.equal(l.year, 2026);
    }
  });
});
