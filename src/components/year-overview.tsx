import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  convertSolarToLunar,
  formatSolar,
  lunarMonthsOfYear,
  lunarMonthName,
  yearCanChi,
  ZODIAC,
  yearChiIndex,
  type SolarDate,
} from "@/lib/lunar";
import { cn } from "@/lib/utils";

export function YearOverview({
  year,
  today,
  onYearChange,
  onPick,
}: {
  year: number;
  today: SolarDate;
  onYearChange: (year: number) => void;
  onPick: (d: SolarDate) => void;
}) {
  const months = lunarMonthsOfYear(year);
  const todayLunar = convertSolarToLunar(today.day, today.month, today.year);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Năm trước"
          onClick={() => onYearChange(year - 1)}
        >
          <ChevronLeft className="size-5" />
        </Button>
        <div className="text-center">
          <p className="font-display text-2xl leading-tight font-semibold">
            Năm {yearCanChi(year)}
          </p>
          <p className="mt-1 text-sm text-muted">
            {year} · {ZODIAC[yearChiIndex(year)]}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Năm sau"
          onClick={() => onYearChange(year + 1)}
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>

      <ul className="grid gap-2 sm:grid-cols-2">
        {months.map((m) => {
          const isCurrent =
            todayLunar.year === year &&
            todayLunar.month === m.month &&
            todayLunar.leap === m.leap;
          const tet = m.month === 1 && !m.leap;
          return (
            <li key={`${m.month}-${m.leap ? "n" : "r"}`}>
              <button
                type="button"
                onClick={() => onPick(m.start)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 border border-border bg-surface px-4 py-3 text-left transition-colors duration-150 hover:bg-wash",
                  "min-h-14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  isCurrent && "border-primary/50 bg-wash",
                )}
              >
                <span>
                  <span className="block text-sm font-semibold text-fg">
                    {lunarMonthName(m.month, m.leap)}
                    {tet ? " · Tết" : ""}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {m.days} ngày · {formatSolar(m.start)} – {formatSolar(m.end)}
                  </span>
                </span>
                {isCurrent ? (
                  <span className="text-xs tracking-wide text-primary uppercase">Nay</span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
