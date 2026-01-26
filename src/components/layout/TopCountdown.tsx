import { countdownData } from "../../data/countdown.data";
import { useCountdown } from "../../utils/useCountdown";
import Container from "../ui/Container";

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[64px] flex-col items-center rounded-lg bg-white/15 px-3 py-2 text-center backdrop-blur">
      <span className="text-lg font-bold text-brand-accent">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs text-text-inverse">{label}</span>
    </div>
  );
}

export default function TopCountdown() {
  const { days, hours, minutes, seconds } = useCountdown(
    countdownData.deadline,
  );

  return (
    <div className="w-full bg-gradient-to-r from-emerald-900 to-emerald-700 text-text-inverse">
      <Container className="py-3">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Label */}
          <div className="flex items-center gap-2 text-sm font-medium">
            <span>⏱</span>
            <span>{countdownData.label}</span>
          </div>

          {/* Time Boxes */}
          <div className="flex items-center gap-2">
            <TimeBox value={days} label="দিন" />
            <span>:</span>
            <TimeBox value={hours} label="ঘন্টা" />
            <span>:</span>
            <TimeBox value={minutes} label="মিনিট" />
            <span>:</span>
            <TimeBox value={seconds} label="সেকেন্ড" />
          </div>
        </div>
      </Container>
    </div>
  );
}
