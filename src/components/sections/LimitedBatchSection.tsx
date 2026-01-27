import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../animations/gsap.config";
import Section from "../layout/Section";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { limitedBatchData } from "../../data/limitedBatch.data";

export default function LimitedBatchSection() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    gsap.from(ref.current.children, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  return (
    <Section className="bg-gradient-to-r from-emerald-900 to-emerald-700 text-white">
      <Container>
        <div ref={ref} className="text-center space-y-5">
          <h2 className="text-2xl font-semibold">
            {limitedBatchData.title}{" "}
            <span className="text-yellow-300">
              {limitedBatchData.highlight}
            </span>
          </h2>

          <ul className="space-y-2 text-sm">
            {limitedBatchData.points.map((p, i) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>

          <div className="text-yellow-300 font-semibold">
            ⚠ {limitedBatchData.deadline.label}:{" "}
            {limitedBatchData.deadline.date}
          </div>

          <p className="text-xs opacity-80">{limitedBatchData.deadline.note}</p>

          <div className="pt-4">
            <Button>{limitedBatchData.cta}</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
