import { useEffect, useState } from "react";
import { countdownData } from "../../data/countdown.data";
import { useCountdown } from "../../utils/useCountdown";
import Container from "../ui/Container";

function TimeBox({
  value,
  label,
  isGlowing,
}: {
  value: number;
  label: string;
  isGlowing: boolean;
}) {
  return (
    <div
      className={`
        flex min-w-[64px] flex-col items-center rounded-lg px-4 py-2 text-center backdrop-blur gap-1 
        border border-white/30 bg-white/20
        transition-all duration-500
        ${
          isGlowing ? "shadow-[0_0_30px_8px_rgba(255,193,7,0.3)] scale-105" : ""
        }
      `}
    >
      <span className="text-2xl font-normal text-brand-accent">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-sm text-[#FEF9C2]">{label}</span>
    </div>
  );
}

export default function TopCountdown() {
  const { days, hours, minutes, seconds } = useCountdown(
    countdownData.deadline,
  );

  const [glowingBoxes, setGlowingBoxes] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

  const [prevDays, setPrevDays] = useState(days);
  const [prevHours, setPrevHours] = useState(hours);
  const [prevMinutes, setPrevMinutes] = useState(minutes);
  const [prevSeconds, setPrevSeconds] = useState(seconds);

  function triggerGlow(unit: keyof typeof glowingBoxes, duration: number) {
    setGlowingBoxes((prev) => ({ ...prev, [unit]: true }));
    setTimeout(
      () => setGlowingBoxes((prev) => ({ ...prev, [unit]: false })),
      duration,
    );
  }

  useEffect(() => {
    if (days < prevDays) triggerGlow("days", 1000);
    setPrevDays(days);
  }, [days, prevDays]);

  useEffect(() => {
    if (hours < prevHours) triggerGlow("hours", 1000);
    setPrevHours(hours);
  }, [hours, prevHours]);

  useEffect(() => {
    if (minutes < prevMinutes) triggerGlow("minutes", 1000);
    setPrevMinutes(minutes);
  }, [minutes, prevMinutes]);

  useEffect(() => {
    if (seconds < prevSeconds) triggerGlow("seconds", 500);
    setPrevSeconds(seconds);
  }, [seconds, prevSeconds]);

  return (
    <div className="w-full bg-gradient-to-r from-[#1B634C] via-[#0F3D2E] to-[#1B634C] text-text-inverse">
      <Container className="py-3">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Clock SVG */}
          <svg
            className="w-8 h-8"
            fill="#fff"
            viewBox="0 0 504.375 504.375"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M312.938 18.281h82.5v33.195H110.563V18.281h187.375v-15H95.563v63.195h24.941a79 79 0 0 0-1.489 3.395c-5.65 13.765-8.515 30.717-8.515 50.387 0 26.967 11.125 53.738 33.065 79.57 15.779 18.578 36.846 36.388 62.614 52.937.983.631 1.13 1.575 1.13 2.082s-.146 1.452-1.131 2.085c-17.624 11.321-33.22 23.383-46.354 35.847l10.326 10.881c12.452-11.818 27.302-23.293 44.135-34.107a17.4 17.4 0 0 0 8.024-14.706c0-5.98-3.001-11.478-8.025-14.703-24.521-15.747-44.467-32.577-59.286-50.025-19.573-23.044-29.498-46.549-29.498-69.859 0-31.915 8.408-48.17 12.113-53.781h230.969c4.907 7.286 11.919 24.974 11.919 53.781 0 23.327-9.929 46.847-29.51 69.906-14.819 17.453-34.763 34.287-59.275 50.034a17.4 17.4 0 0 0-8.024 14.706c0 5.98 3.001 11.478 8.025 14.703 24.521 15.747 44.467 32.577 59.286 50.025 19.573 23.045 29.498 46.549 29.498 69.859 0 28.825-7.078 46.512-12.024 53.781h-231c-3.648-5.535-11.977-21.695-11.977-53.781 0-25.252 11.6-50.661 34.477-75.522l-11.037-10.156c-25.507 27.718-38.439 56.544-38.439 85.679 0 26.147 5.189 43.403 9.985 53.781H95.563v57.82h314.875v-57.82h-24.941a79 79 0 0 0 1.489-3.395c5.65-13.765 8.515-30.717 8.515-50.387 0-26.967-11.125-53.738-33.065-79.57-15.779-18.578-36.846-36.388-62.614-52.937-.983-.631-1.13-1.575-1.13-2.082s.146-1.452 1.131-2.084c25.761-16.55 46.824-34.363 62.604-52.946 21.947-25.846 33.075-52.633 33.075-79.615 0-26.147-5.189-43.403-9.985-53.781h24.922V3.281h-97.5zm82.5 467.813H110.563v-27.82h284.875z" />
            <path d="M282.525 225.896c30.241-19.428 80.975-58.985 80.975-105.639 0-11.886-1.257-22.415-3.736-31.298l-1.53-5.483H147.822l-1.543 5.461c-2.508 8.879-3.779 19.417-3.779 31.32 0 46.623 50.729 86.159 80.967 105.577l.001.001c5.951 3.821 12.004 12.161 16.424 18.251 5.162 7.115 8.006 11.034 13.071 11.06h.05c5.082 0 7.942-3.935 13.121-11.058 4.411-6.067 10.452-14.377 16.391-18.192m-28.524 9.373c-.319.438-.652.897-.989 1.357-.333-.457-.664-.912-.98-1.349-5.119-7.055-12.131-16.717-20.46-22.064l.001.001c-13.421-8.618-32.669-22.42-48.152-39.229-17.199-18.673-25.92-36.749-25.92-53.728 0-8.105.642-15.404 1.91-21.781h187.2c1.255 6.384 1.89 13.684 1.89 21.781 0 16.993-8.722 35.083-25.924 53.768-15.484 16.818-34.735 30.627-48.157 39.25-8.311 5.336-15.309 14.964-20.419 21.994M150.637 415.493l-5.243 10.78h152.544v-15H170.351c18.891-28.837 59.91-67.503 82.587-67.503 22.759 0 63.835 38.667 82.726 67.503h-22.726v15h47.673l-5.235-10.777c-7.786-16.029-24.979-37.556-43.802-54.839-30.213-27.744-49.705-31.887-58.636-31.887-8.928 0-28.408 4.145-58.573 31.902-18.766 17.269-35.93 38.788-43.728 54.821m94.801-145.555h15v14.938h-15zm0 30h15v14.938h-15zM35.576 91.771h14.973v28H35.576zm22.549 35.555h28v14.973h-28zm-22.549 22.903h14.973v28H35.576zM0 127.326h28v14.973H0zm453.826 159.382h14.973v28h-14.973zm22.549 35.556h28v14.973h-28zm-22.549 22.903h14.973v28h-14.973zm-35.576-22.903h28v14.973h-28zM86.125 232.451h15v14.973h-15zm345.125-60h15v14.973h-15zM29 337.389h15v14.973H29zm409.75 90h15v14.973h-15z" />
            <path d="M224.694 188.84a247 247 0 0 1-12.143-9.59l9.674-11.463a231 231 0 0 0 11.4 9.002zm-23.666-20.1c-3.953-3.919-7.534-7.854-10.644-11.695l11.66-9.438c2.767 3.419 5.978 6.944 9.544 10.479zm-19.851-25.113c-3.154-5.665-5.216-11.149-6.127-16.301l14.771-2.611c.619 3.503 2.12 7.411 4.461 11.615z" />
          </svg>
          {/* Label */}
          <div className="flex items-center gap-2 text-base font-normal font-anekBangla">
            <span>{countdownData.label}</span>
          </div>

          {/* Time Boxes */}
          <div className="flex items-center gap-2">
            <TimeBox value={days} label="দিন" isGlowing={glowingBoxes.days} />
            <span className="text-2xl font-inter">:</span>
            <TimeBox
              value={hours}
              label="ঘন্টা"
              isGlowing={glowingBoxes.hours}
            />
            <span className="text-2xl font-inter">:</span>
            <TimeBox
              value={minutes}
              label="মিনিট"
              isGlowing={glowingBoxes.minutes}
            />
            <span className="text-2xl font-inter">:</span>
            <TimeBox
              value={seconds}
              label="সেকেন্ড"
              isGlowing={glowingBoxes.seconds}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
