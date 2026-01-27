import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../animations/gsap.config";
import Section from "../layout/Section";
import Container from "../ui/Container";
import { sadakahData } from "../../data/sadakah.data";

export default function SadakahSection() {
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
      stagger: 0.2,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  return (
    <Section className="bg-[#6b3f3f] text-white">
      <Container>
        <div ref={ref} className="grid gap-8 md:grid-cols-2 md:items-center">
          <img src={sadakahData.image} alt="" className="rounded-xl" />

          <div>
            <h3 className="text-xl font-bold mb-3">{sadakahData.title}</h3>

            <p className="opacity-90">{sadakahData.text}</p>

            <p className="mt-4 text-yellow-300 font-semibold">
              ✨ {sadakahData.highlight}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
