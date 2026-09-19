import { useMemo, useState, type ReactNode } from "react";
import { ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  convertLunarToSolar,
  convertSolarToLunar,
  daysInLunarMonth,
  daysInSolarMonth,
  describeDay,
  formatLunarLong,
  formatSolar,
  leapMonthOfYear,
  lunarMonthName,
  type LunarDate,
  type SolarDate,
} from "@/lib/lunar";
import { cn } from "@/lib/utils";

const YEAR_MIN = 1900;
const YEAR_MAX = 2100;
const YEARS = Array.from({ length: YEAR_MAX - YEAR_MIN + 1 }, (_, i) => YEAR_MIN + i);

function SelectField({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: number | string;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5 text-xs tracking-wide text-muted uppercase">
      {label}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 min-h-11 w-full border border-border bg-surface px-2.5 text-sm font-medium tracking-normal text-fg normal-case focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {children}
      </select>
    </label>
  );
}

function ResultCard({
  title,
  lines,
}: {
  title: string;
  lines: { k: string; v: string; accent?: boolean }[];
}) {
  return (
    <div className="border border-border bg-wash/60 p-4">
      <p className="text-xs tracking-widest text-muted uppercase">{title}</p>
      <dl className="mt-3 space-y-2">
        {lines.map((l) => (
          <div key={l.k} className="flex justify-between gap-3">
            <dt className="text-xs text-muted">{l.k}</dt>
            <dd
              className={cn(
                "text-right text-sm font-medium",
                l.accent ? "text-primary" : "text-fg",
              )}
            >
              {l.v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ConverterPanel({ seed }: { seed: SolarDate }) {
  const seedLunar = convertSolarToLunar(seed.day, seed.month, seed.year);
  const [solar, setSolar] = useState<SolarDate>(seed);
  const [lunar, setLunar] = useState<LunarDate>(seedLunar);

  const solarDim = daysInSolarMonth(solar.year, solar.month);
  const leapOfYear = useMemo(() => leapMonthOfYear(lunar.year), [lunar.year]);
  const lunarDim = daysInLunarMonth(lunar.year, lunar.month, lunar.leap) || 30;

  const solarOut = describeDay(solar);
  const lunarToSolar = convertLunarToSolar(
    Math.min(lunar.day, lunarDim),
    lunar.month,
    lunar.year,
    lunar.leap,
  );
  const lunarOut = lunarToSolar ? describeDay(lunarToSolar) : null;

  function setSolarPart<K extends keyof SolarDate>(key: K, raw: string) {
    const n = Number(raw);
    setSolar((s) => {
      const next = { ...s, [key]: n };
      const dim = daysInSolarMonth(next.year, next.month);
      if (next.day > dim) next.day = dim;
      return next;
    });
  }

  function setLunarPart<K extends keyof LunarDate>(key: K, value: LunarDate[K]) {
    setLunar((l) => {
      const next = { ...l, [key]: value };
      if (key === "year" || key === "month") {
        const leap = leapMonthOfYear(next.year);
        if (next.leap && leap !== next.month) next.leap = false;
      }
      const dim = daysInLunarMonth(next.year, next.month, next.leap) || 29;
      if (next.day > dim) next.day = dim;
      return next;
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="flex flex-col gap-4">
        <header>
          <h2 className="font-display text-2xl font-semibold">Dương lịch sang âm lịch</h2>
          <p className="mt-1 text-sm text-muted">Chọn ngày dương, xem ngày âm kèm can chi.</p>
        </header>
        <div className="grid grid-cols-3 gap-2">
          <SelectField
            id="sy"
            label="Năm"
            value={solar.year}
            onChange={(v) => setSolarPart("year", v)}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </SelectField>
          <SelectField
            id="sm"
            label="Tháng"
            value={solar.month}
            onChange={(v) => setSolarPart("month", v)}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </SelectField>
          <SelectField
            id="sd"
            label="Ngày"
            value={Math.min(solar.day, solarDim)}
            onChange={(v) => setSolarPart("day", v)}
          >
            {Array.from({ length: solarDim }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </SelectField>
        </div>
        <ResultCard
          title="Kết quả âm lịch"
          lines={[
            { k: "Ngày âm", v: formatLunarLong(solarOut.lunar), accent: true },
            { k: "Can chi ngày", v: solarOut.dayCanChi },
            { k: "Tháng", v: solarOut.monthCanChi },
            { k: "Năm", v: `${solarOut.yearCanChi} (${solarOut.zodiac})` },
            { k: "Ngày", v: solarOut.quality === "hoang" ? "Hoàng đạo" : solarOut.quality === "hac" ? "Hắc đạo" : "Bình thường" },
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold">Âm lịch sang dương lịch</h2>
            <p className="mt-1 text-sm text-muted">Chọn ngày âm, kể cả tháng nhuận.</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Đồng bộ từ ngày dương"
            title="Lấy ngày dương bên trái"
            onClick={() => setLunar(solarOut.lunar)}
          >
            <ArrowDownUp className="size-4" />
          </Button>
        </header>
        <div className="grid grid-cols-3 gap-2">
          <SelectField
            id="ly"
            label="Năm âm"
            value={lunar.year}
            onChange={(v) => setLunarPart("year", Number(v))}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </SelectField>
          <SelectField
            id="lm"
            label="Tháng"
            value={lunar.month}
            onChange={(v) => setLunarPart("month", Number(v))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {lunarMonthName(i + 1)}
              </option>
            ))}
          </SelectField>
          <SelectField
            id="ld"
            label="Ngày"
            value={Math.min(lunar.day, lunarDim)}
            onChange={(v) => setLunarPart("day", Number(v))}
          >
            {Array.from({ length: lunarDim }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </SelectField>
        </div>
        <label className="flex h-11 min-h-11 items-center gap-2 text-sm text-fg">
          <input
            type="checkbox"
            className="size-4 accent-primary"
            checked={lunar.leap}
            disabled={leapOfYear !== lunar.month}
            onChange={(e) => setLunarPart("leap", e.target.checked)}
          />
          Tháng nhuận
          {leapOfYear ? (
            <span className="text-xs text-muted">
              (năm này nhuận {lunarMonthName(leapOfYear)})
            </span>
          ) : (
            <span className="text-xs text-muted">(năm này không nhuận)</span>
          )}
        </label>
        {lunarOut ? (
          <ResultCard
            title="Kết quả dương lịch"
            lines={[
              { k: "Ngày dương", v: formatSolar(lunarOut.solar), accent: true },
              { k: "Thứ", v: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"][lunarOut.weekday] ?? "" },
              { k: "Can chi ngày", v: lunarOut.dayCanChi },
              { k: "Năm âm", v: `${lunarOut.yearCanChi} (${lunarOut.zodiac})` },
            ]}
          />
        ) : (
          <p className="border border-primary/30 bg-primary/6 p-4 text-sm text-primary">
            Tháng nhuận này không tồn tại trong năm đã chọn.
          </p>
        )}
      </section>
    </div>
  );
}
