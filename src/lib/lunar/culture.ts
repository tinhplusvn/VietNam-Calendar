import {
  convertSolarToLunar,
  jdFromDate,
  sunLongitudeDeg,
  vnTimeZone,
  weekdayOfSolar,
  type LunarDate,
  type SolarDate,
} from "./calendar";

export const CAN = [
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
] as const;

export const CHI = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
] as const;

export const ZODIAC = [
  "Chuột",
  "Trâu",
  "Hổ",
  "Mèo",
  "Rồng",
  "Rắn",
  "Ngựa",
  "Dê",
  "Khỉ",
  "Gà",
  "Chó",
  "Heo",
] as const;

export const WEEKDAYS = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
] as const;

export const WEEKDAYS_SHORT = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"] as const;

export const TRUC = [
  "Kiến",
  "Trừ",
  "Mãn",
  "Bình",
  "Định",
  "Chấp",
  "Phá",
  "Nguy",
  "Thành",
  "Thâu",
  "Khai",
  "Bế",
] as const;

export const SOLAR_TERMS = [
  "Xuân Phân",
  "Thanh Minh",
  "Cốc Vũ",
  "Lập Hạ",
  "Tiểu Mãn",
  "Mang Chủng",
  "Hạ Chí",
  "Tiểu Thử",
  "Đại Thử",
  "Lập Thu",
  "Xử Thử",
  "Bạch Lộ",
  "Thu Phân",
  "Hàn Lộ",
  "Sương Giáng",
  "Lập Đông",
  "Tiểu Tuyết",
  "Đại Tuyết",
  "Đông Chí",
  "Tiểu Hàn",
  "Đại Hàn",
  "Lập Xuân",
  "Vũ Thủy",
  "Kinh Trập",
] as const;

export const CHI_HOURS: { chi: number; label: string; range: string }[] = [
  { chi: 0, label: "Tý", range: "23–1h" },
  { chi: 1, label: "Sửu", range: "1–3h" },
  { chi: 2, label: "Dần", range: "3–5h" },
  { chi: 3, label: "Mão", range: "5–7h" },
  { chi: 4, label: "Thìn", range: "7–9h" },
  { chi: 5, label: "Tỵ", range: "9–11h" },
  { chi: 6, label: "Ngọ", range: "11–13h" },
  { chi: 7, label: "Mùi", range: "13–15h" },
  { chi: 8, label: "Thân", range: "15–17h" },
  { chi: 9, label: "Dậu", range: "17–19h" },
  { chi: 10, label: "Tuất", range: "19–21h" },
  { chi: 11, label: "Hợi", range: "21–23h" },
];

/** 4 hoàng đạo chi per lunar month (1–12). */
const HOANG_DAO_BY_MONTH: number[][] = [
  [0, 1, 5, 7],
  [2, 3, 7, 9],
  [4, 5, 9, 11],
  [6, 7, 11, 1],
  [8, 9, 1, 3],
  [10, 11, 3, 5],
];

const HAC_DAO_BY_MONTH: number[][] = [
  [6, 3, 11, 9],
  [8, 5, 1, 11],
  [10, 7, 3, 1],
  [0, 9, 5, 3],
  [2, 11, 7, 5],
  [4, 1, 9, 7],
];

/** Giờ hoàng đạo by day chi, paired every 6. */
const HOANG_DAO_HOURS: number[][] = [
  [0, 1, 3, 6, 8, 9],
  [2, 3, 5, 8, 10, 11],
  [1, 2, 4, 7, 9, 10],
  [0, 3, 4, 6, 9, 11],
  [2, 4, 5, 8, 11, 1],
  [1, 4, 5, 7, 10, 2],
];

export type DayQuality = "hoang" | "hac" | "binh";

export function yearCanIndex(lunarYear: number): number {
  return ((lunarYear + 6) % 10 + 10) % 10;
}

export function yearChiIndex(lunarYear: number): number {
  return ((lunarYear + 8) % 12 + 12) % 12;
}

export function yearCanChi(lunarYear: number): string {
  return `${CAN[yearCanIndex(lunarYear)]} ${CHI[yearChiIndex(lunarYear)]}`;
}

export function monthChiIndex(lunarMonth: number): number {
  return (lunarMonth + 1) % 12;
}

export function monthCanIndex(lunarYear: number, lunarMonth: number): number {
  return (yearCanIndex(lunarYear) * 2 + lunarMonth + 1) % 10;
}

export function monthCanChi(lunarYear: number, lunarMonth: number): string {
  return `${CAN[monthCanIndex(lunarYear, lunarMonth)]} ${CHI[monthChiIndex(lunarMonth)]}`;
}

export function dayCanChiFromJd(jd: number): { can: number; chi: number; label: string } {
  const can = ((jd + 9) % 10 + 10) % 10;
  const chi = ((jd + 1) % 12 + 12) % 12;
  return { can, chi, label: `${CAN[can]} ${CHI[chi]}` };
}

export function lunarMonthName(month: number, leap = false): string {
  const names = [
    "",
    "Tháng Giêng",
    "Tháng Hai",
    "Tháng Ba",
    "Tháng Tư",
    "Tháng Năm",
    "Tháng Sáu",
    "Tháng Bảy",
    "Tháng Tám",
    "Tháng Chín",
    "Tháng Mười",
    "Tháng Mười Một",
    "Tháng Chạp",
  ];
  const base = names[month] ?? `Tháng ${month}`;
  return leap ? `${base} nhuận` : base;
}

export function lunarDayLabel(day: number): string {
  if (day === 1) return "Mùng 1";
  if (day < 11) return `Mùng ${day}`;
  if (day === 15) return "Rằm";
  return `Ngày ${day}`;
}

export function dayQuality(lunarMonth: number, dayChi: number): DayQuality {
  const idx = (lunarMonth - 1) % 6;
  if (HOANG_DAO_BY_MONTH[idx]?.includes(dayChi)) return "hoang";
  if (HAC_DAO_BY_MONTH[idx]?.includes(dayChi)) return "hac";
  return "binh";
}

export function qualityLabel(q: DayQuality): string {
  if (q === "hoang") return "Hoàng đạo";
  if (q === "hac") return "Hắc đạo";
  return "Bình thường";
}

export function trucName(lunarMonth: number, dayChi: number): string {
  const monthChi = monthChiIndex(lunarMonth);
  return TRUC[((dayChi - monthChi + 12) % 12)];
}

export function hoangDaoHours(dayChi: number): { chi: number; label: string; range: string }[] {
  const set = new Set(HOANG_DAO_HOURS[dayChi % 6] ?? []);
  return CHI_HOURS.filter((h) => set.has(h.chi));
}

export function lunarHoliday(lunar: LunarDate): string | null {
  if (lunar.leap) return null;
  const key = `${lunar.month}-${lunar.day}`;
  const map: Record<string, string> = {
    "1-1": "Tết Nguyên Đán",
    "1-2": "Mùng 2 Tết",
    "1-3": "Mùng 3 Tết",
    "1-15": "Rằm tháng Giêng",
    "3-3": "Tết Hàn Thực",
    "3-10": "Giỗ Tổ Hùng Vương",
    "4-15": "Phật Đản",
    "5-5": "Tết Đoan Ngọ",
    "7-15": "Vu Lan",
    "8-15": "Tết Trung Thu",
    "9-9": "Tết Trùng Cửu",
    "12-23": "Ông Táo về trời",
  };
  if (map[key]) return map[key];
  if (lunar.month === 12 && lunar.day >= 29) return "Tất niên";
  return null;
}

export function solarHoliday(solar: SolarDate): string | null {
  const key = `${solar.month}-${solar.day}`;
  const map: Record<string, string> = {
    "1-1": "Tết Dương lịch",
    "3-8": "Quốc tế Phụ nữ",
    "4-30": "Ngày Thống nhất",
    "5-1": "Quốc tế Lao động",
    "9-2": "Quốc khánh",
    "10-20": "Ngày Phụ nữ Việt Nam",
    "11-20": "Ngày Nhà giáo",
    "12-25": "Giáng sinh",
  };
  return map[key] ?? null;
}

export function solarTermOnDay(solar: SolarDate): string | null {
  const tz = vnTimeZone(solar.year);
  const jd = jdFromDate(solar.day, solar.month, solar.year);
  const a = sunLongitudeDeg(jd, tz);
  const b = sunLongitudeDeg(jd + 1, tz);
  const ia = Math.floor(((a % 360) + 360) % 360 / 15);
  let ib = Math.floor(((b % 360) + 360) % 360 / 15);
  if (b < a - 180) ib = Math.floor((b + 360) / 15) % 24;
  if (ia === ib) return null;
  return SOLAR_TERMS[ib % 24] ?? null;
}

export type DayInfo = {
  solar: SolarDate;
  lunar: LunarDate;
  jd: number;
  weekday: number;
  yearCanChi: string;
  monthCanChi: string;
  dayCanChi: string;
  dayCan: number;
  dayChi: number;
  zodiac: string;
  quality: DayQuality;
  truc: string;
  holiday: string | null;
  solarHoliday: string | null;
  solarTerm: string | null;
  hoangDaoHours: { chi: number; label: string; range: string }[];
};

export function describeDay(solar: SolarDate): DayInfo {
  const lunar = convertSolarToLunar(solar.day, solar.month, solar.year);
  const jd = jdFromDate(solar.day, solar.month, solar.year);
  const dc = dayCanChiFromJd(jd);
  return {
    solar,
    lunar,
    jd,
    weekday: weekdayOfSolar(solar.day, solar.month, solar.year),
    yearCanChi: yearCanChi(lunar.year),
    monthCanChi: monthCanChi(lunar.year, lunar.month),
    dayCanChi: dc.label,
    dayCan: dc.can,
    dayChi: dc.chi,
    zodiac: ZODIAC[yearChiIndex(lunar.year)],
    quality: dayQuality(lunar.month, dc.chi),
    truc: trucName(lunar.month, dc.chi),
    holiday: lunarHoliday(lunar),
    solarHoliday: solarHoliday(solar),
    solarTerm: solarTermOnDay(solar),
    hoangDaoHours: hoangDaoHours(dc.chi),
  };
}

export function formatSolar(s: SolarDate): string {
  return `${s.day}/${s.month}/${s.year}`;
}

export function formatLunarLong(l: LunarDate): string {
  return `${lunarDayLabel(l.day)} ${lunarMonthName(l.month, l.leap)} năm ${yearCanChi(l.year)}`;
}

export function chiHourOfClock(hour: number): (typeof CHI_HOURS)[number] {
  if (hour === 23 || hour === 0) return CHI_HOURS[0];
  const idx = Math.floor(((hour + 1) % 24) / 2);
  return CHI_HOURS[idx] ?? CHI_HOURS[0];
}
