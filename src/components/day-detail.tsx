import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  chiHourOfClock,
  formatLunarLong,
  formatSolar,
  lunarMonthName,
  qualityLabel,
  WEEKDAYS,
  type DayInfo,
} from "@/lib/lunar";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-border/70 py-2.5 last:border-b-0">
      <dt className="shrink-0 text-xs tracking-wide text-muted uppercase">{label}</dt>
      <dd className="text-right text-sm font-medium text-fg">{children}</dd>
    </div>
  );
}

export function DayDetail({ info }: { info: DayInfo }) {
  const now = new Date();
  const hour = chiHourOfClock(now.getHours());
  const q = info.quality;

  return (
    <aside className="flex flex-col gap-5">
      <div className="text-center">
        <p className="text-xs tracking-widest text-muted uppercase">
          {WEEKDAYS[info.weekday]}
        </p>
        <p className="font-display mt-1 text-4xl leading-none font-semibold text-primary">
          {info.solar.day}
        </p>
        <p className="mt-2 text-sm text-fg">{formatSolar(info.solar)}</p>
        <p className="font-display mt-3 text-xl leading-snug text-fg italic">
          {formatLunarLong(info.lunar)}
        </p>
      </div>

      <div className="hairline" />

      {(info.holiday || info.solarHoliday || info.solarTerm) && (
        <div className="flex flex-col gap-1.5 text-center">
          {info.holiday ? (
            <p className="text-sm font-semibold text-primary">{info.holiday}</p>
          ) : null}
          {info.solarHoliday ? (
            <p className="text-sm text-muted">{info.solarHoliday}</p>
          ) : null}
          {info.solarTerm ? (
            <p className="text-sm text-jade">Tiết {info.solarTerm}</p>
          ) : null}
        </div>
      )}

      <dl>
        <Row label="Năm">{info.yearCanChi} · {info.zodiac}</Row>
        <Row label="Tháng">
          {lunarMonthName(info.lunar.month, info.lunar.leap)} · {info.monthCanChi}
        </Row>
        <Row label="Can chi">{info.dayCanChi}</Row>
        <Row label="Trực">{info.truc}</Row>
        <Row label="Ngày">
          <span
            className={cn(
              q === "hoang" && "text-jade",
              q === "hac" && "text-primary",
            )}
          >
            {qualityLabel(q)}
          </span>
        </Row>
        <Row label="Giờ này">
          {hour.label} ({hour.range})
        </Row>
      </dl>

      <div>
        <p className="mb-2 text-xs tracking-wide text-muted uppercase">Giờ hoàng đạo</p>
        <div className="flex flex-wrap gap-1.5">
          {info.hoangDaoHours.map((h) => (
            <span
              key={h.chi}
              className="border border-jade/35 bg-jade/8 px-2 py-1 text-xs text-jade"
            >
              {h.label} {h.range}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
