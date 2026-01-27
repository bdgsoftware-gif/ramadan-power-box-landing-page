import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../animations/gsap.config";
import Section from "../layout/Section";
import Container from "../ui/Container";
import { founderMessageData } from "../../data/founderMessage.data";

export default function FounderMessageSection() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    gsap.from(ref.current.children, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  return (
    <Section>
      <Container>
        <div
          ref={ref}
          className="grid gap-8 rounded-xl border bg-bg-card p-6 md:grid-cols-2 md:items-center"
        >
          <img
            src={founderMessageData.image}
            alt={founderMessageData.name}
            className="mx-auto max-w-sm rounded-xl"
          />

          <div>
            <p className="text-lg leading-relaxed">
              “{founderMessageData.quote}”
            </p>

            <p className="mt-6 font-semibold">— {founderMessageData.name}</p>
            <p className="text-sm text-text-secondary">
              {founderMessageData.role}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
