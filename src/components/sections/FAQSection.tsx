import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../../animations/gsap.config";
import Section from "../layout/Section";
import Container from "../ui/Container";
import { faqData } from "../../data/faq.data";

export default function FAQSection() {
  const [active, setActive] = useState(0);
  const answerRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    answerRefs.current.forEach((el, i) => {
      if (!el) return;

      if (i === active) {
        gsap.to(el, {
          height: "auto",
          opacity: 1,
          duration: 0.3,
        });
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.3,
        });
      }
    });
  }, [active]);

  return (
    <Section className="bg-bg-accent">
      <Container>
        <h2 className="mb-10 text-center text-3xl font-anekBangla font-bold">
          {faqData.title}
        </h2>

        <div className="space-y-4 max-w-4xl mx-auto">
          {faqData.items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-amber-300 bg-gradient-to-t from-[#ffdb8e5b] to-[#cfaf6ab2] px-6 py-4"
            >
              <button
                onClick={() => setActive(i === active ? -1 : i)}
                className="flex w-full items-center justify-between text-left font-semibold font-anekBangla text-lg"
              >
                <span>
                  Q{i + 1}: {item.question}
                </span>

                <span className="flex h-6 w-6 items-center justify-center rounded bg-green-600 text-white">
                  {active === i ? "−" : "+"}
                </span>
              </button>

              <div
                ref={(el) => (answerRefs.current[i] = el!)}
                className="overflow-hiddentext-text-primary text-lg"
                style={{
                  height: item.open ? "auto" : 0,
                  opacity: item.open ? 1 : 0,
                }}
              >
                <p className="pt-3 font-anekBangla text-base text-text-secondary">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
