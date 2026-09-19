import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as ArrowDownUp, n as ChevronRight, r as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes--ykHbilA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/**
* Vietnamese lunar calendar (Âm lịch) — Ho Ngoc Duc algorithm.
* Timezone: GMT+8 before 1968, GMT+7 from 1968 (official VN civil change).
*/
var PI = Math.PI;
function INT(d) {
	return Math.floor(d);
}
function vnTimeZone(year) {
	return year >= 1968 ? 7 : 8;
}
function jdFromDate(dd, mm, yy) {
	const a = INT((14 - mm) / 12);
	const y = yy + 4800 - a;
	const m = mm + 12 * a - 3;
	let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
	if (jd < 2299161) jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
	return jd;
}
function jdToDate(jd) {
	let a;
	let b;
	let c;
	if (jd > 2299160) {
		a = jd + 32044;
		b = INT((4 * a + 3) / 146097);
		c = a - INT(b * 146097 / 4);
	} else {
		b = 0;
		c = jd + 32082;
	}
	const d = INT((4 * c + 3) / 1461);
	const e = c - INT(1461 * d / 4);
	const m = INT((5 * e + 2) / 153);
	return {
		day: e - INT((153 * m + 2) / 5) + 1,
		month: m + 3 - 12 * INT(m / 10),
		year: b * 100 + d - 4800 + INT(m / 10)
	};
}
function newMoon(k) {
	const T = k / 1236.85;
	const T2 = T * T;
	const T3 = T2 * T;
	const dr = PI / 180;
	let Jd1 = 2415020.75933 + 29.53058868 * k + 1178e-7 * T2 - 155e-9 * T3;
	Jd1 = Jd1 + 33e-5 * Math.sin((166.56 + 132.87 * T - .009173 * T2) * dr);
	const M = 359.2242 + 29.10535608 * k - 333e-7 * T2 - 347e-8 * T3;
	const Mpr = 306.0253 + 385.81691806 * k + .0107306 * T2 + 1236e-8 * T3;
	const F = 21.2964 + 390.67050646 * k - .0016528 * T2 - 239e-8 * T3;
	let C1 = (.1734 - 393e-6 * T) * Math.sin(M * dr) + .0021 * Math.sin(2 * dr * M);
	C1 = C1 - .4068 * Math.sin(Mpr * dr) + .0161 * Math.sin(dr * 2 * Mpr);
	C1 = C1 - 4e-4 * Math.sin(dr * 3 * Mpr);
	C1 = C1 + .0104 * Math.sin(dr * 2 * F) - .0051 * Math.sin(dr * (M + Mpr));
	C1 = C1 - .0074 * Math.sin(dr * (M - Mpr)) + 4e-4 * Math.sin(dr * (2 * F + M));
	C1 = C1 - 4e-4 * Math.sin(dr * (2 * F - M)) - 6e-4 * Math.sin(dr * (2 * F + Mpr));
	C1 = C1 + .001 * Math.sin(dr * (2 * F - Mpr)) + 5e-4 * Math.sin(dr * (2 * Mpr + M));
	const deltat = T < -11 ? .001 + 839e-6 * T + 2261e-7 * T2 - 845e-8 * T3 - 81e-9 * T * T3 : -278e-6 + 265e-6 * T + 262e-6 * T2;
	return Jd1 + C1 - deltat;
}
function sunLongitude(jdn) {
	const T = (jdn - 2451545) / 36525;
	const T2 = T * T;
	const dr = PI / 180;
	const M = 357.5291 + 35999.0503 * T - 1559e-7 * T2 - 48e-8 * T * T2;
	const L0 = 280.46645 + 36000.76983 * T + 3032e-7 * T2;
	let DL = (1.9146 - .004817 * T - 14e-6 * T2) * Math.sin(dr * M);
	DL = DL + (.019993 - 101e-6 * T) * Math.sin(dr * 2 * M) + 29e-5 * Math.sin(dr * 3 * M);
	let L = (L0 + DL) * dr;
	L = L - PI * 2 * INT(L / (PI * 2));
	return L;
}
function getNewMoonDay(k, timeZone) {
	return INT(newMoon(k) + .5 + timeZone / 24);
}
function getSunLongitude(dayNumber, timeZone) {
	return INT(sunLongitude(dayNumber - .5 - timeZone / 24) / PI * 6);
}
function sunLongitudeDeg(jd, timeZone) {
	let deg = sunLongitude(jd - .5 - timeZone / 24) * 180 / PI;
	if (deg < 0) deg += 360;
	return deg;
}
function getLunarMonth11(yy, timeZone) {
	const k = INT((jdFromDate(31, 12, yy) - 2415021) / 29.530588853);
	let nm = getNewMoonDay(k, timeZone);
	if (getSunLongitude(nm, timeZone) >= 9) nm = getNewMoonDay(k - 1, timeZone);
	return nm;
}
function getLeapMonthOffset(a11, timeZone) {
	const k = INT((a11 - 2415021.076998695) / 29.530588853 + .5);
	let last = 0;
	let i = 1;
	let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
	do {
		last = arc;
		i += 1;
		arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
	} while (arc !== last && i < 14);
	return i - 1;
}
function convertSolarToLunar(dd, mm, yy) {
	const timeZone = vnTimeZone(yy);
	const dayNumber = jdFromDate(dd, mm, yy);
	const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
	let monthStart = getNewMoonDay(k + 1, timeZone);
	if (monthStart > dayNumber) monthStart = getNewMoonDay(k, timeZone);
	let a11 = getLunarMonth11(yy, timeZone);
	let b11 = a11;
	let lunarYear;
	if (a11 >= monthStart) {
		lunarYear = yy;
		a11 = getLunarMonth11(yy - 1, timeZone);
	} else {
		lunarYear = yy + 1;
		b11 = getLunarMonth11(yy + 1, timeZone);
	}
	const lunarDay = dayNumber - monthStart + 1;
	const diff = INT((monthStart - a11) / 29);
	let lunarLeap = false;
	let lunarMonth = diff + 11;
	if (b11 - a11 > 365) {
		const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
		if (diff >= leapMonthDiff) {
			lunarMonth = diff + 10;
			if (diff === leapMonthDiff) lunarLeap = true;
		}
	}
	if (lunarMonth > 12) lunarMonth -= 12;
	if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
	return {
		day: lunarDay,
		month: lunarMonth,
		year: lunarYear,
		leap: lunarLeap
	};
}
function convertLunarToSolar(lunarDay, lunarMonth, lunarYear, lunarLeap) {
	const timeZone = vnTimeZone(lunarYear);
	let a11;
	let b11;
	if (lunarMonth < 11) {
		a11 = getLunarMonth11(lunarYear - 1, timeZone);
		b11 = getLunarMonth11(lunarYear, timeZone);
	} else {
		a11 = getLunarMonth11(lunarYear, timeZone);
		b11 = getLunarMonth11(lunarYear + 1, timeZone);
	}
	const k = INT(.5 + (a11 - 2415021.076998695) / 29.530588853);
	let off = lunarMonth - 11;
	if (off < 0) off += 12;
	if (b11 - a11 > 365) {
		const leapOff = getLeapMonthOffset(a11, timeZone);
		let leapMonth = leapOff - 2;
		if (leapMonth < 0) leapMonth += 12;
		if (lunarLeap && lunarMonth !== leapMonth) return null;
		if (lunarLeap || off >= leapOff) off += 1;
	} else if (lunarLeap) return null;
	return jdToDate(getNewMoonDay(k + off, timeZone) + lunarDay - 1);
}
function daysInLunarMonth(year, month, leap) {
	const solar30 = convertLunarToSolar(30, month, year, leap);
	if (!solar30) return 0;
	const back = convertSolarToLunar(solar30.day, solar30.month, solar30.year);
	if (back.day === 30 && back.month === month && back.leap === leap && back.year === year) return 30;
	return 29;
}
function leapMonthOfYear(lunarYear) {
	for (let m = 1; m <= 12; m += 1) {
		const solar = convertLunarToSolar(1, m, lunarYear, true);
		if (!solar) continue;
		const back = convertSolarToLunar(solar.day, solar.month, solar.year);
		if (back.leap && back.month === m && back.year === lunarYear) return m;
	}
	return null;
}
function daysInSolarMonth(year, month) {
	return new Date(year, month, 0).getDate();
}
function weekdayOfSolar(day, month, year) {
	return new Date(year, month - 1, day).getDay();
}
function todaySolar() {
	const n = /* @__PURE__ */ new Date();
	return {
		day: n.getDate(),
		month: n.getMonth() + 1,
		year: n.getFullYear()
	};
}
function lunarMonthsOfYear(lunarYear) {
	const leap = leapMonthOfYear(lunarYear);
	const months = [];
	for (let m = 1; m <= 12; m += 1) {
		const push = (isLeap) => {
			const days = daysInLunarMonth(lunarYear, m, isLeap);
			const start = convertLunarToSolar(1, m, lunarYear, isLeap);
			const end = convertLunarToSolar(days, m, lunarYear, isLeap);
			if (!start || !end || days < 29) return;
			months.push({
				month: m,
				leap: isLeap,
				year: lunarYear,
				start,
				end,
				days
			});
		};
		push(false);
		if (leap === m) push(true);
	}
	return months;
}
var CAN = [
	"Giáp",
	"Ất",
	"Bính",
	"Đinh",
	"Mậu",
	"Kỷ",
	"Canh",
	"Tân",
	"Nhâm",
	"Quý"
];
var CHI = [
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
	"Hợi"
];
var ZODIAC = [
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
	"Heo"
];
var WEEKDAYS = [
	"Chủ Nhật",
	"Thứ Hai",
	"Thứ Ba",
	"Thứ Tư",
	"Thứ Năm",
	"Thứ Sáu",
	"Thứ Bảy"
];
var WEEKDAYS_SHORT = [
	"CN",
	"T2",
	"T3",
	"T4",
	"T5",
	"T6",
	"T7"
];
var TRUC = [
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
	"Bế"
];
var SOLAR_TERMS = [
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
	"Kinh Trập"
];
var CHI_HOURS = [
	{
		chi: 0,
		label: "Tý",
		range: "23–1h"
	},
	{
		chi: 1,
		label: "Sửu",
		range: "1–3h"
	},
	{
		chi: 2,
		label: "Dần",
		range: "3–5h"
	},
	{
		chi: 3,
		label: "Mão",
		range: "5–7h"
	},
	{
		chi: 4,
		label: "Thìn",
		range: "7–9h"
	},
	{
		chi: 5,
		label: "Tỵ",
		range: "9–11h"
	},
	{
		chi: 6,
		label: "Ngọ",
		range: "11–13h"
	},
	{
		chi: 7,
		label: "Mùi",
		range: "13–15h"
	},
	{
		chi: 8,
		label: "Thân",
		range: "15–17h"
	},
	{
		chi: 9,
		label: "Dậu",
		range: "17–19h"
	},
	{
		chi: 10,
		label: "Tuất",
		range: "19–21h"
	},
	{
		chi: 11,
		label: "Hợi",
		range: "21–23h"
	}
];
/** 4 hoàng đạo chi per lunar month (1–12). */
var HOANG_DAO_BY_MONTH = [
	[
		0,
		1,
		5,
		7
	],
	[
		2,
		3,
		7,
		9
	],
	[
		4,
		5,
		9,
		11
	],
	[
		6,
		7,
		11,
		1
	],
	[
		8,
		9,
		1,
		3
	],
	[
		10,
		11,
		3,
		5
	]
];
var HAC_DAO_BY_MONTH = [
	[
		6,
		3,
		11,
		9
	],
	[
		8,
		5,
		1,
		11
	],
	[
		10,
		7,
		3,
		1
	],
	[
		0,
		9,
		5,
		3
	],
	[
		2,
		11,
		7,
		5
	],
	[
		4,
		1,
		9,
		7
	]
];
/** Giờ hoàng đạo by day chi, paired every 6. */
var HOANG_DAO_HOURS = [
	[
		0,
		1,
		3,
		6,
		8,
		9
	],
	[
		2,
		3,
		5,
		8,
		10,
		11
	],
	[
		1,
		2,
		4,
		7,
		9,
		10
	],
	[
		0,
		3,
		4,
		6,
		9,
		11
	],
	[
		2,
		4,
		5,
		8,
		11,
		1
	],
	[
		1,
		4,
		5,
		7,
		10,
		2
	]
];
function yearCanIndex(lunarYear) {
	return ((lunarYear + 6) % 10 + 10) % 10;
}
function yearChiIndex(lunarYear) {
	return ((lunarYear + 8) % 12 + 12) % 12;
}
function yearCanChi(lunarYear) {
	return `${CAN[yearCanIndex(lunarYear)]} ${CHI[yearChiIndex(lunarYear)]}`;
}
function monthChiIndex(lunarMonth) {
	return (lunarMonth + 1) % 12;
}
function monthCanIndex(lunarYear, lunarMonth) {
	return (yearCanIndex(lunarYear) * 2 + lunarMonth + 1) % 10;
}
function monthCanChi(lunarYear, lunarMonth) {
	return `${CAN[monthCanIndex(lunarYear, lunarMonth)]} ${CHI[monthChiIndex(lunarMonth)]}`;
}
function dayCanChiFromJd(jd) {
	const can = ((jd + 9) % 10 + 10) % 10;
	const chi = ((jd + 1) % 12 + 12) % 12;
	return {
		can,
		chi,
		label: `${CAN[can]} ${CHI[chi]}`
	};
}
function lunarMonthName(month, leap = false) {
	const base = [
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
		"Tháng Chạp"
	][month] ?? `Tháng ${month}`;
	return leap ? `${base} nhuận` : base;
}
function lunarDayLabel(day) {
	if (day === 1) return "Mùng 1";
	if (day < 11) return `Mùng ${day}`;
	if (day === 15) return "Rằm";
	return `Ngày ${day}`;
}
function dayQuality(lunarMonth, dayChi) {
	const idx = (lunarMonth - 1) % 6;
	if (HOANG_DAO_BY_MONTH[idx]?.includes(dayChi)) return "hoang";
	if (HAC_DAO_BY_MONTH[idx]?.includes(dayChi)) return "hac";
	return "binh";
}
function qualityLabel(q) {
	if (q === "hoang") return "Hoàng đạo";
	if (q === "hac") return "Hắc đạo";
	return "Bình thường";
}
function trucName(lunarMonth, dayChi) {
	return TRUC[(dayChi - monthChiIndex(lunarMonth) + 12) % 12];
}
function hoangDaoHours(dayChi) {
	const set = new Set(HOANG_DAO_HOURS[dayChi % 6] ?? []);
	return CHI_HOURS.filter((h) => set.has(h.chi));
}
function lunarHoliday(lunar) {
	if (lunar.leap) return null;
	const key = `${lunar.month}-${lunar.day}`;
	const map = {
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
		"12-23": "Ông Táo về trời"
	};
	if (map[key]) return map[key];
	if (lunar.month === 12 && lunar.day >= 29) return "Tất niên";
	return null;
}
function solarHoliday(solar) {
	return {
		"1-1": "Tết Dương lịch",
		"3-8": "Quốc tế Phụ nữ",
		"4-30": "Ngày Thống nhất",
		"5-1": "Quốc tế Lao động",
		"9-2": "Quốc khánh",
		"10-20": "Ngày Phụ nữ Việt Nam",
		"11-20": "Ngày Nhà giáo",
		"12-25": "Giáng sinh"
	}[`${solar.month}-${solar.day}`] ?? null;
}
function solarTermOnDay(solar) {
	const tz = vnTimeZone(solar.year);
	const jd = jdFromDate(solar.day, solar.month, solar.year);
	const a = sunLongitudeDeg(jd, tz);
	const b = sunLongitudeDeg(jd + 1, tz);
	const ia = Math.floor((a % 360 + 360) % 360 / 15);
	let ib = Math.floor((b % 360 + 360) % 360 / 15);
	if (b < a - 180) ib = Math.floor((b + 360) / 15) % 24;
	if (ia === ib) return null;
	return SOLAR_TERMS[ib % 24] ?? null;
}
function describeDay(solar) {
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
		hoangDaoHours: hoangDaoHours(dc.chi)
	};
}
function formatSolar(s) {
	return `${s.day}/${s.month}/${s.year}`;
}
function formatLunarLong(l) {
	return `${lunarDayLabel(l.day)} ${lunarMonthName(l.month, l.leap)} năm ${yearCanChi(l.year)}`;
}
function chiHourOfClock(hour) {
	if (hour === 23 || hour === 0) return CHI_HOURS[0];
	return CHI_HOURS[Math.floor((hour + 1) % 24 / 2)] ?? CHI_HOURS[0];
}
function Row({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3 border-b border-border/70 py-2.5 last:border-b-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "shrink-0 text-xs tracking-wide text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right text-sm font-medium text-fg",
			children
		})]
	});
}
function DayDetail({ info }) {
	const hour = chiHourOfClock((/* @__PURE__ */ new Date()).getHours());
	const q = info.quality;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-widest text-muted uppercase",
						children: WEEKDAYS[info.weekday]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display mt-1 text-4xl leading-none font-semibold text-primary",
						children: info.solar.day
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-fg",
						children: formatSolar(info.solar)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display mt-3 text-xl leading-snug text-fg italic",
						children: formatLunarLong(info.lunar)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline" }),
			(info.holiday || info.solarHoliday || info.solarTerm) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5 text-center",
				children: [
					info.holiday ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-primary",
						children: info.holiday
					}) : null,
					info.solarHoliday ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: info.solarHoliday
					}) : null,
					info.solarTerm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-jade",
						children: ["Tiết ", info.solarTerm]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					label: "Năm",
					children: [
						info.yearCanChi,
						" · ",
						info.zodiac
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					label: "Tháng",
					children: [
						lunarMonthName(info.lunar.month, info.lunar.leap),
						" · ",
						info.monthCanChi
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Can chi",
					children: info.dayCanChi
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Trực",
					children: info.truc
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Ngày",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn(q === "hoang" && "text-jade", q === "hac" && "text-primary"),
						children: qualityLabel(q)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					label: "Giờ này",
					children: [
						hour.label,
						" (",
						hour.range,
						")"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs tracking-wide text-muted uppercase",
				children: "Giờ hoàng đạo"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: info.hoangDaoHours.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "border border-jade/35 bg-jade/8 px-2 py-1 text-xs text-jade",
					children: [
						h.label,
						" ",
						h.range
					]
				}, h.chi))
			})] })
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-45", {
	variants: {
		variant: {
			primary: "bg-primary text-primary-fg hover:bg-primary/90",
			outline: "border border-bronze bg-transparent text-fg hover:bg-wash",
			ghost: "bg-transparent text-fg hover:bg-wash",
			seal: "border border-primary bg-primary/8 text-primary hover:bg-primary/14"
		},
		size: {
			sm: "h-9 min-h-9 px-3 text-sm",
			md: "h-11 min-h-11 px-4 text-sm",
			icon: "size-11 min-h-11 min-w-11"
		}
	},
	defaultVariants: {
		variant: "outline",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var YEAR_MIN = 1900;
var YEARS = Array.from({ length: 201 }, (_, i) => YEAR_MIN + i);
function SelectField({ id, label, value, onChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex min-w-0 flex-col gap-1.5 text-xs tracking-wide text-muted uppercase",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			id,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "h-11 min-h-11 w-full border border-border bg-surface px-2.5 text-sm font-medium tracking-normal text-fg normal-case focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
			children
		})]
	});
}
function ResultCard({ title, lines }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-border bg-wash/60 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-muted uppercase",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "mt-3 space-y-2",
			children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs text-muted",
					children: l.k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: cn("text-right text-sm font-medium", l.accent ? "text-primary" : "text-fg"),
					children: l.v
				})]
			}, l.k))
		})]
	});
}
function ConverterPanel({ seed }) {
	const seedLunar = convertSolarToLunar(seed.day, seed.month, seed.year);
	const [solar, setSolar] = (0, import_react.useState)(seed);
	const [lunar, setLunar] = (0, import_react.useState)(seedLunar);
	const solarDim = daysInSolarMonth(solar.year, solar.month);
	const leapOfYear = (0, import_react.useMemo)(() => leapMonthOfYear(lunar.year), [lunar.year]);
	const lunarDim = daysInLunarMonth(lunar.year, lunar.month, lunar.leap) || 30;
	const solarOut = describeDay(solar);
	const lunarToSolar = convertLunarToSolar(Math.min(lunar.day, lunarDim), lunar.month, lunar.year, lunar.leap);
	const lunarOut = lunarToSolar ? describeDay(lunarToSolar) : null;
	function setSolarPart(key, raw) {
		const n = Number(raw);
		setSolar((s) => {
			const next = {
				...s,
				[key]: n
			};
			const dim = daysInSolarMonth(next.year, next.month);
			if (next.day > dim) next.day = dim;
			return next;
		});
	}
	function setLunarPart(key, value) {
		setLunar((l) => {
			const next = {
				...l,
				[key]: value
			};
			if (key === "year" || key === "month") {
				const leap = leapMonthOfYear(next.year);
				if (next.leap && leap !== next.month) next.leap = false;
			}
			const dim = daysInLunarMonth(next.year, next.month, next.leap) || 29;
			if (next.day > dim) next.day = dim;
			return next;
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "Dương lịch sang âm lịch"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Chọn ngày dương, xem ngày âm kèm can chi."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "sy",
							label: "Năm",
							value: solar.year,
							onChange: (v) => setSolarPart("year", v),
							children: YEARS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: y,
								children: y
							}, y))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "sm",
							label: "Tháng",
							value: solar.month,
							onChange: (v) => setSolarPart("month", v),
							children: Array.from({ length: 12 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: i + 1,
								children: i + 1
							}, i + 1))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "sd",
							label: "Ngày",
							value: Math.min(solar.day, solarDim),
							onChange: (v) => setSolarPart("day", v),
							children: Array.from({ length: solarDim }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: i + 1,
								children: i + 1
							}, i + 1))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
					title: "Kết quả âm lịch",
					lines: [
						{
							k: "Ngày âm",
							v: formatLunarLong(solarOut.lunar),
							accent: true
						},
						{
							k: "Can chi ngày",
							v: solarOut.dayCanChi
						},
						{
							k: "Tháng",
							v: solarOut.monthCanChi
						},
						{
							k: "Năm",
							v: `${solarOut.yearCanChi} (${solarOut.zodiac})`
						},
						{
							k: "Ngày",
							v: solarOut.quality === "hoang" ? "Hoàng đạo" : solarOut.quality === "hac" ? "Hắc đạo" : "Bình thường"
						}
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "Âm lịch sang dương lịch"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Chọn ngày âm, kể cả tháng nhuận."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Đồng bộ từ ngày dương",
						title: "Lấy ngày dương bên trái",
						onClick: () => setLunar(solarOut.lunar),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownUp, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "ly",
							label: "Năm âm",
							value: lunar.year,
							onChange: (v) => setLunarPart("year", Number(v)),
							children: YEARS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: y,
								children: y
							}, y))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "lm",
							label: "Tháng",
							value: lunar.month,
							onChange: (v) => setLunarPart("month", Number(v)),
							children: Array.from({ length: 12 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: i + 1,
								children: lunarMonthName(i + 1)
							}, i + 1))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "ld",
							label: "Ngày",
							value: Math.min(lunar.day, lunarDim),
							onChange: (v) => setLunarPart("day", Number(v)),
							children: Array.from({ length: lunarDim }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: i + 1,
								children: i + 1
							}, i + 1))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-11 min-h-11 items-center gap-2 text-sm text-fg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "size-4 accent-primary",
							checked: lunar.leap,
							disabled: leapOfYear !== lunar.month,
							onChange: (e) => setLunarPart("leap", e.target.checked)
						}),
						"Tháng nhuận",
						leapOfYear ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: [
								"(năm này nhuận ",
								lunarMonthName(leapOfYear),
								")"
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: "(năm này không nhuận)"
						})
					]
				}),
				lunarOut ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
					title: "Kết quả dương lịch",
					lines: [
						{
							k: "Ngày dương",
							v: formatSolar(lunarOut.solar),
							accent: true
						},
						{
							k: "Thứ",
							v: [
								"Chủ Nhật",
								"Thứ Hai",
								"Thứ Ba",
								"Thứ Tư",
								"Thứ Năm",
								"Thứ Sáu",
								"Thứ Bảy"
							][lunarOut.weekday] ?? ""
						},
						{
							k: "Can chi ngày",
							v: lunarOut.dayCanChi
						},
						{
							k: "Năm âm",
							v: `${lunarOut.yearCanChi} (${lunarOut.zodiac})`
						}
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border border-primary/30 bg-primary/6 p-4 text-sm text-primary",
					children: "Tháng nhuận này không tồn tại trong năm đã chọn."
				})
			]
		})]
	});
}
function CornerFlourish({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 48 48",
		className,
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M46 2H18C10 2 2 10 2 18v28",
				stroke: "currentColor",
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M46 8H22C13.2 8 8 13.2 8 22v24",
				stroke: "currentColor",
				strokeWidth: "0.7",
				opacity: "0.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "8",
				cy: "8",
				r: "1.6",
				fill: "currentColor"
			})
		]
	});
}
function LotusMark({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 36",
		className,
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 4c4 6 10 10 16 12-6 3-10 8-12 14-2-6-6-11-12-14 6-2 12-6 16-12z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 22c8-2 14-8 16-16 2 8 8 14 16 16-8 1-14 6-16 14-2-8-8-13-16-14z",
				fill: "currentColor",
				opacity: "0.45"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M32 20c6-1 10-5 12-10-2 6-6 10-12 12-6-2-10-6-12-12 2 5 6 9 12 10z",
				fill: "currentColor",
				opacity: "0.7"
			})
		]
	});
}
function FrameCorners() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerFlourish, { className: "pointer-events-none absolute top-2 left-2 size-10 text-bronze" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerFlourish, { className: "pointer-events-none absolute top-2 right-2 size-10 rotate-90 text-bronze" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerFlourish, { className: "pointer-events-none absolute bottom-2 left-2 size-10 -rotate-90 text-bronze" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerFlourish, { className: "pointer-events-none absolute right-2 bottom-2 size-10 rotate-180 text-bronze" })
	] });
}
var SOLAR_MONTHS = [
	"Tháng 1",
	"Tháng 2",
	"Tháng 3",
	"Tháng 4",
	"Tháng 5",
	"Tháng 6",
	"Tháng 7",
	"Tháng 8",
	"Tháng 9",
	"Tháng 10",
	"Tháng 11",
	"Tháng 12"
];
function sameDay$1(a, b) {
	return a.day === b.day && a.month === b.month && a.year === b.year;
}
function buildCells(view, selected, today) {
	const startOffset = (weekdayOfSolar(1, view.month, view.year) + 6) % 7;
	const dim = daysInSolarMonth(view.year, view.month);
	const prevMonth = view.month === 1 ? 12 : view.month - 1;
	const prevYear = view.month === 1 ? view.year - 1 : view.year;
	const prevDim = daysInSolarMonth(prevYear, prevMonth);
	const cells = [];
	for (let i = 0; i < 42; i += 1) {
		let d;
		let inMonth = true;
		const n = i - startOffset + 1;
		if (n < 1) {
			d = {
				day: prevDim + n,
				month: prevMonth,
				year: prevYear
			};
			inMonth = false;
		} else if (n > dim) {
			const nextMonth = view.month === 12 ? 1 : view.month + 1;
			const nextYear = view.month === 12 ? view.year + 1 : view.year;
			d = {
				day: n - dim,
				month: nextMonth,
				year: nextYear
			};
			inMonth = false;
		} else d = {
			day: n,
			month: view.month,
			year: view.year
		};
		const lunar = convertSolarToLunar(d.day, d.month, d.year);
		const wd = weekdayOfSolar(d.day, d.month, d.year);
		const mark = lunarHoliday(lunar) ?? solarHoliday(d);
		cells.push({
			solar: d,
			inMonth,
			lunarDay: lunar.day,
			lunarMonth: lunar.month,
			leap: lunar.leap,
			isToday: sameDay$1(d, today),
			isSelected: sameDay$1(d, selected),
			isSunday: wd === 0,
			holiday: mark
		});
	}
	return cells;
}
function MonthGrid({ view, selected, today, onSelect, onViewChange }) {
	const cells = buildCells(view, selected, today);
	const selectedInfo = describeDay(selected);
	function shift(delta) {
		const m = view.month - 1 + delta;
		const year = view.year + Math.floor(m / 12);
		onViewChange({
			day: 1,
			month: (m % 12 + 12) % 12 + 1,
			year
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					"aria-label": "Tháng trước",
					onClick: () => shift(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl leading-tight font-semibold text-fg",
						children: [
							SOLAR_MONTHS[view.month - 1],
							" ",
							view.year
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							selectedInfo.lunar.month === 1 && !selectedInfo.lunar.leap ? "Năm " : "",
							selectedInfo.yearCanChi,
							" · ",
							selectedInfo.zodiac
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					"aria-label": "Tháng sau",
					onClick: () => shift(1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-7 gap-px bg-border/80 p-px",
			children: [WEEKDAYS_SHORT.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("bg-wash py-2 text-center text-xs font-medium tracking-wider uppercase", i === 6 ? "text-primary" : "text-muted"),
				children: w
			}, w)), cells.map((cell, idx) => {
				const lunarHint = cell.lunarDay === 1 ? `${cell.leap ? "N" : ""}${cell.lunarMonth}/${cell.lunarDay}` : String(cell.lunarDay);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelect(cell.solar),
					className: cn("relative flex min-h-14 flex-col items-center justify-center gap-0.5 bg-surface px-0.5 py-1.5 transition-colors duration-150", "hover:bg-wash focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary", !cell.inMonth && "opacity-40", cell.isSelected && "bg-primary/8", cell.isToday && "z-[1]"),
					children: [
						cell.isToday ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-1 rounded-full border border-primary/70" }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("font-display text-lg leading-none font-semibold tabular-nums", cell.isSunday || cell.holiday ? "text-primary" : "text-fg", cell.isSelected && "text-primary"),
							children: cell.solar.day
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs leading-none text-muted tabular-nums",
							children: lunarHint
						})
					]
				}, `${cell.solar.year}-${cell.solar.month}-${cell.solar.day}-${idx}`);
			})]
		})]
	});
}
function YearOverview({ year, today, onYearChange, onPick }) {
	const months = lunarMonthsOfYear(year);
	const todayLunar = convertSolarToLunar(today.day, today.month, today.year);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					"aria-label": "Năm trước",
					onClick: () => onYearChange(year - 1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl leading-tight font-semibold",
						children: ["Năm ", yearCanChi(year)]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							year,
							" · ",
							ZODIAC[yearChiIndex(year)]
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					"aria-label": "Năm sau",
					onClick: () => onYearChange(year + 1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-2 sm:grid-cols-2",
			children: months.map((m) => {
				const isCurrent = todayLunar.year === year && todayLunar.month === m.month && todayLunar.leap === m.leap;
				const tet = m.month === 1 && !m.leap;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(m.start),
					className: cn("flex w-full items-center justify-between gap-3 border border-border bg-surface px-4 py-3 text-left transition-colors duration-150 hover:bg-wash", "min-h-14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", isCurrent && "border-primary/50 bg-wash"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block text-sm font-semibold text-fg",
						children: [lunarMonthName(m.month, m.leap), tet ? " · Tết" : ""]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-0.5 block text-xs text-muted",
						children: [
							m.days,
							" ngày · ",
							formatSolar(m.start),
							" – ",
							formatSolar(m.end)
						]
					})] }), isCurrent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tracking-wide text-primary uppercase",
						children: "Nay"
					}) : null]
				}) }, `${m.month}-${m.leap ? "n" : "r"}`);
			})
		})]
	});
}
var TABS = [
	{
		id: "thang",
		label: "Lịch tháng"
	},
	{
		id: "nam",
		label: "Năm âm"
	},
	{
		id: "doi",
		label: "Đổi ngày"
	}
];
function sameDay(a, b) {
	return a.day === b.day && a.month === b.month && a.year === b.year;
}
function CalendarApp() {
	const [today, setToday] = (0, import_react.useState)(todaySolar);
	const [selected, setSelected] = (0, import_react.useState)(today);
	const [view, setView] = (0, import_react.useState)({
		day: 1,
		month: today.month,
		year: today.year
	});
	const [lunarYear, setLunarYear] = (0, import_react.useState)(today.year);
	const [tab, setTab] = (0, import_react.useState)("thang");
	(0, import_react.useEffect)(() => {
		const n = todaySolar();
		setToday(n);
		setSelected(n);
		setView({
			day: 1,
			month: n.month,
			year: n.year
		});
		setLunarYear(convertSolarToLunar(n.day, n.month, n.year).year);
	}, []);
	const info = (0, import_react.useMemo)(() => describeDay(selected), [selected]);
	function goToday() {
		setSelected(today);
		setView({
			day: 1,
			month: today.month,
			year: today.year
		});
		setLunarYear(convertSolarToLunar(today.day, today.month, today.year).year);
		setTab("thang");
	}
	function pickDay(d) {
		setSelected(d);
		setView({
			day: 1,
			month: d.month,
			year: d.year
		});
		setTab("thang");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-x-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 bg-cover bg-center opacity-55",
				style: { backgroundImage: "url(/textures/paper.jpg)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 top-0 h-48 bg-cover bg-center opacity-40 mix-blend-multiply",
				style: { backgroundImage: "url(/textures/lotus.jpg)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pt-8 pb-16 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotusMark, { className: "h-8 w-14 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs tracking-widest text-muted uppercase",
								children: "Việt Nam · Âm lịch"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display mt-1 text-3xl font-semibold text-fg italic sm:text-4xl",
								children: "Lịch Âm Việt"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-md text-sm text-muted",
								children: "Xem tháng, đổi ngày dương–âm, can chi và ngày hoàng đạo."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "paper-sheet relative px-5 py-6 sm:px-8 sm:py-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameCorners, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 bg-contain bg-center bg-no-repeat opacity-15",
								style: { backgroundImage: "url(/textures/seal.jpg)" },
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex flex-col gap-2 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs tracking-widest text-muted uppercase",
										children: WEEKDAYS[info.weekday]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-display text-xl text-fg sm:text-2xl",
										children: [
											selected.day,
											" tháng ",
											selected.month,
											" năm ",
											selected.year
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg text-primary italic sm:text-xl",
										children: formatLunarLong(info.lunar)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex flex-wrap items-center justify-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("border px-2.5 py-1 text-xs", info.quality === "hoang" ? "border-jade/40 text-jade" : info.quality === "hac" ? "border-primary/40 text-primary" : "border-border text-muted"),
												children: qualityLabel(info.quality)
											}),
											info.holiday ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "border border-primary/40 px-2.5 py-1 text-xs text-primary",
												children: info.holiday
											}) : null,
											info.solarTerm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "border border-jade/40 px-2.5 py-1 text-xs text-jade",
												children: ["Tiết ", info.solarTerm]
											}) : null
										]
									}),
									!sameDay(selected, today) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "seal",
											size: "sm",
											onClick: goToday,
											children: "Về hôm nay"
										})
									}) : null
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex gap-1 border-b border-bronze/60",
						"aria-label": "Chế độ xem",
						children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setTab(t.id),
							className: cn("relative min-h-11 flex-1 px-2 text-sm tracking-wide transition-colors duration-150", tab === t.id ? "text-primary" : "text-muted hover:text-fg"),
							children: [t.label, tab === t.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-3 -bottom-px h-0.5 bg-primary" }) : null]
						}, t.id))
					}),
					tab === "thang" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "paper-sheet relative p-4 sm:p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameCorners, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthGrid, {
									view,
									selected,
									today,
									onSelect: setSelected,
									onViewChange: setView
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "paper-sheet relative p-5 sm:p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameCorners, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayDetail, { info })
							})]
						})]
					}) : null,
					tab === "nam" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "paper-sheet relative p-4 sm:p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameCorners, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearOverview, {
								year: lunarYear,
								today,
								onYearChange: setLunarYear,
								onPick: pickDay
							})
						})]
					}) : null,
					tab === "doi" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "paper-sheet relative p-4 sm:p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameCorners, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConverterPanel, { seed: selected })
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
						className: "px-2 text-center text-xs text-faint",
						children: "Âm lịch Việt Nam theo thuật toán Hồ Ngọc Đức · múi giờ Hà Nội"
					})
				]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarApp, {});
}
//#endregion
export { Home as component };
