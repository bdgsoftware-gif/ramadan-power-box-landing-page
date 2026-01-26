import { useLayoutEffect, useRef } from "react";
import { benefitsData } from "../../data/benefits.data";
import { gsap } from "../../animations/gsap.config";
import Section from "../layout/Section";
import Container from "../ui/Container";

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-benefit]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 32,
        stagger: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section className="bg-bg-accent">
      <Container>
        <div ref={sectionRef}>
          {/* Heading */}
          <div className="mb-10 text-center">
            <h2 className="text-xl font-bold sm:text-2xl">
              {benefitsData.title}
            </h2>
            <p className="mt-3 text-text-secondary">{benefitsData.subtitle}</p>
          </div>

          {/* Benefits Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {benefitsData.items.map((item, index) => (
              <div
                key={index}
                data-benefit
                className="rounded-xl bg-bg-card p-6 text-center shadow-sm"
              >
                {/* Icon placeholder */}
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-brand-accent/20" />

                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
