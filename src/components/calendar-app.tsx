import { useEffect, useMemo, useState } from "react";
import { DayDetail } from "@/components/day-detail";
import { ConverterPanel } from "@/components/converter-panel";
import { FrameCorners, LotusMark } from "@/components/ornaments";
import { MonthGrid } from "@/components/month-grid";
import { YearOverview } from "@/components/year-overview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  convertSolarToLunar,
  describeDay,
  formatLunarLong,
  qualityLabel,
  todaySolar,
  WEEKDAYS,
  type SolarDate,
} from "@/lib/lunar";

type Tab = "thang" | "nam" | "doi";

const TABS: { id: Tab; label: string }[] = [
  { id: "thang", label: "Lịch tháng" },
  { id: "nam", label: "Năm âm" },
  { id: "doi", label: "Đổi ngày" },
];

function sameDay(a: SolarDate, b: SolarDate) {
  return a.day === b.day && a.month === b.month && a.year === b.year;
}

export function CalendarApp() {
  const [today, setToday] = useState<SolarDate>(todaySolar);
  const [selected, setSelected] = useState<SolarDate>(today);
  const [view, setView] = useState<SolarDate>({
    day: 1,
    month: today.month,
    year: today.year,
  });
  const [lunarYear, setLunarYear] = useState(today.year);
  const [tab, setTab] = useState<Tab>("thang");

  useEffect(() => {
    const n = todaySolar();
    setToday(n);
    setSelected(n);
    setView({ day: 1, month: n.month, year: n.year });
    setLunarYear(convertSolarToLunar(n.day, n.month, n.year).year);
  }, []);

  const info = useMemo(() => describeDay(selected), [selected]);

  function goToday() {
    setSelected(today);
    setView({ day: 1, month: today.month, year: today.year });
    setLunarYear(convertSolarToLunar(today.day, today.month, today.year).year);
    setTab("thang");
  }

  function pickDay(d: SolarDate) {
    setSelected(d);
    setView({ day: 1, month: d.month, year: d.year });
    setTab("thang");
  }

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-bg text-fg">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-55"
        style={{ backgroundImage: "url(/textures/paper.jpg)" }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-cover bg-center opacity-40 mix-blend-multiply"
        style={{ backgroundImage: "url(/textures/lotus.jpg)" }}
      />

      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pt-8 pb-16 sm:px-6">
        <header className="flex flex-col items-center text-center">
          <LotusMark className="h-8 w-14 text-primary" />
          <p className="mt-3 text-xs tracking-widest text-muted uppercase">
            Việt Nam · Âm lịch
          </p>
          <h1 className="font-display mt-1 text-3xl font-semibold text-fg italic sm:text-4xl">
            Lịch Âm Việt
          </h1>
          <p className="mt-2 max-w-md text-sm text-muted">
            Xem tháng, đổi ngày dương–âm, can chi và ngày hoàng đạo.
          </p>
        </header>

        <section className="paper-sheet relative px-5 py-6 sm:px-8 sm:py-8">
          <FrameCorners />
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 bg-contain bg-center bg-no-repeat opacity-15"
            style={{ backgroundImage: "url(/textures/seal.jpg)" }}
            aria-hidden
          />

          <div className="relative flex flex-col gap-2 text-center">
            <p className="text-xs tracking-widest text-muted uppercase">
              {WEEKDAYS[info.weekday]}
            </p>
            <p className="font-display text-xl text-fg sm:text-2xl">
              {selected.day} tháng {selected.month} năm {selected.year}
            </p>
            <p className="font-display text-lg text-primary italic sm:text-xl">
              {formatLunarLong(info.lunar)}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <span
                className={cn(
                  "border px-2.5 py-1 text-xs",
                  info.quality === "hoang"
                    ? "border-jade/40 text-jade"
                    : info.quality === "hac"
                      ? "border-primary/40 text-primary"
                      : "border-border text-muted",
                )}
              >
                {qualityLabel(info.quality)}
              </span>
              {info.holiday ? (
                <span className="border border-primary/40 px-2.5 py-1 text-xs text-primary">
                  {info.holiday}
                </span>
              ) : null}
              {info.solarTerm ? (
                <span className="border border-jade/40 px-2.5 py-1 text-xs text-jade">
                  Tiết {info.solarTerm}
                </span>
              ) : null}
            </div>
            {!sameDay(selected, today) ? (
              <div className="mt-3">
                <Button variant="seal" size="sm" onClick={goToday}>
                  Về hôm nay
                </Button>
              </div>
            ) : null}
          </div>
        </section>

        <nav
          className="flex gap-1 border-b border-bronze/60"
          aria-label="Chế độ xem"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "relative min-h-11 flex-1 px-2 text-sm tracking-wide transition-colors duration-150",
                tab === t.id ? "text-primary" : "text-muted hover:text-fg",
              )}
            >
              {t.label}
              {tab === t.id ? (
                <span className="absolute inset-x-3 -bottom-px h-0.5 bg-primary" />
              ) : null}
            </button>
          ))}
        </nav>

        {tab === "thang" ? (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
            <div className="paper-sheet relative p-4 sm:p-6">
              <FrameCorners />
              <div className="relative">
                <MonthGrid
                  view={view}
                  selected={selected}
                  today={today}
                  onSelect={setSelected}
                  onViewChange={setView}
                />
              </div>
            </div>
            <div className="paper-sheet relative p-5 sm:p-6">
              <FrameCorners />
              <div className="relative">
                <DayDetail info={info} />
              </div>
            </div>
          </div>
        ) : null}

        {tab === "nam" ? (
          <div className="paper-sheet relative p-4 sm:p-6">
            <FrameCorners />
            <div className="relative">
              <YearOverview
                year={lunarYear}
                today={today}
                onYearChange={setLunarYear}
                onPick={pickDay}
              />
            </div>
          </div>
        ) : null}

        {tab === "doi" ? (
          <div className="paper-sheet relative p-4 sm:p-6">
            <FrameCorners />
            <div className="relative">
              <ConverterPanel seed={selected} />
            </div>
          </div>
        ) : null}

        <footer className="px-2 text-center text-xs text-faint">
          Âm lịch Việt Nam theo thuật toán Hồ Ngọc Đức · múi giờ Hà Nội
        </footer>
      </main>
    </div>
  );
}
