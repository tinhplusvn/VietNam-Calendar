import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  convertSolarToLunar,
  daysInSolarMonth,
  describeDay,
  lunarHoliday,
  solarHoliday,
  WEEKDAYS_SHORT,
  weekdayOfSolar,
  type SolarDate,
} from "@/lib/lunar";

const SOLAR_MONTHS = [
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
  "Tháng 12",
];

type Cell = {
  solar: SolarDate;
  inMonth: boolean;
  lunarDay: number;
  lunarMonth: number;
  leap: boolean;
  isToday: boolean;
  isSelected: boolean;
  isSunday: boolean;
  holiday: string | null;
};

function sameDay(a: SolarDate, b: SolarDate) {
  return a.day === b.day && a.month === b.month && a.year === b.year;
}

function buildCells(view: SolarDate, selected: SolarDate, today: SolarDate): Cell[] {
  const firstWeekday = weekdayOfSolar(1, view.month, view.year);
  const startOffset = (firstWeekday + 6) % 7;
  const dim = daysInSolarMonth(view.year, view.month);
  const prevMonth = view.month === 1 ? 12 : view.month - 1;
  const prevYear = view.month === 1 ? view.year - 1 : view.year;
  const prevDim = daysInSolarMonth(prevYear, prevMonth);

  const cells: Cell[] = [];
  for (let i = 0; i < 42; i += 1) {
    let d: SolarDate;
    let inMonth = true;
    const n = i - startOffset + 1;
    if (n < 1) {
      d = { day: prevDim + n, month: prevMonth, year: prevYear };
      inMonth = false;
    } else if (n > dim) {
      const nextMonth = view.month === 12 ? 1 : view.month + 1;
      const nextYear = view.month === 12 ? view.year + 1 : view.year;
      d = { day: n - dim, month: nextMonth, year: nextYear };
      inMonth = false;
    } else {
      d = { day: n, month: view.month, year: view.year };
    }
    const lunar = convertSolarToLunar(d.day, d.month, d.year);
    const wd = weekdayOfSolar(d.day, d.month, d.year);
    const mark = lunarHoliday(lunar) ?? solarHoliday(d);
    cells.push({
      solar: d,
      inMonth,
      lunarDay: lunar.day,
      lunarMonth: lunar.month,
      leap: lunar.leap,
      isToday: sameDay(d, today),
      isSelected: sameDay(d, selected),
      isSunday: wd === 0,
      holiday: mark,
    });
  }
  return cells;
}

export function MonthGrid({
  view,
  selected,
  today,
  onSelect,
  onViewChange,
}: {
  view: SolarDate;
  selected: SolarDate;
  today: SolarDate;
  onSelect: (d: SolarDate) => void;
  onViewChange: (d: SolarDate) => void;
}) {
  const cells = buildCells(view, selected, today);
  const selectedInfo = describeDay(selected);

  function shift(delta: number) {
    const m = view.month - 1 + delta;
    const year = view.year + Math.floor(m / 12);
    const month = ((m % 12) + 12) % 12 + 1;
    onViewChange({ day: 1, month, year });
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Tháng trước"
          onClick={() => shift(-1)}
        >
          <ChevronLeft className="size-5" />
        </Button>
        <div className="text-center">
          <p className="font-display text-2xl leading-tight font-semibold text-fg">
            {SOLAR_MONTHS[view.month - 1]} {view.year}
          </p>
          <p className="mt-1 text-sm text-muted">
            {selectedInfo.lunar.month === 1 && !selectedInfo.lunar.leap
              ? "Năm "
              : ""}
            {selectedInfo.yearCanChi} · {selectedInfo.zodiac}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Tháng sau"
          onClick={() => shift(1)}
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-border/80 p-px">
        {WEEKDAYS_SHORT.map((w, i) => (
          <div
            key={w}
            className={cn(
              "bg-wash py-2 text-center text-xs font-medium tracking-wider uppercase",
              i === 6 ? "text-primary" : "text-muted",
            )}
          >
            {w}
          </div>
        ))}
        {cells.map((cell, idx) => {
          const lunarHint =
            cell.lunarDay === 1
              ? `${cell.leap ? "N" : ""}${cell.lunarMonth}/${cell.lunarDay}`
              : String(cell.lunarDay);
          return (
            <button
              key={`${cell.solar.year}-${cell.solar.month}-${cell.solar.day}-${idx}`}
              type="button"
              onClick={() => onSelect(cell.solar)}
              className={cn(
                "relative flex min-h-14 flex-col items-center justify-center gap-0.5 bg-surface px-0.5 py-1.5 transition-colors duration-150",
                "hover:bg-wash focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary",
                !cell.inMonth && "opacity-40",
                cell.isSelected && "bg-primary/8",
                cell.isToday && "z-[1]",
              )}
            >
              {cell.isToday ? (
                <span className="absolute inset-1 rounded-full border border-primary/70" />
              ) : null}
              <span
                className={cn(
                  "font-display text-lg leading-none font-semibold tabular-nums",
                  cell.isSunday || cell.holiday ? "text-primary" : "text-fg",
                  cell.isSelected && "text-primary",
                )}
              >
                {cell.solar.day}
              </span>
              <span className="text-xs leading-none text-muted tabular-nums">
                {lunarHint}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
