import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../animations/gsap.config";
import Section from "../layout/Section";
import Container from "../ui/Container";
import { sadakahData } from "../../data/sadakah.data";

export default function SadakahSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Targets elements with .animate-sadakah class
      gsap.from(".animate-sadakah", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <Section className="bg-[#714646] text-white">
      <Container className="max-w-2xl mx-auto">
        <div
          ref={containerRef}
          className="flex flex-col md:flex-row md:gap-20 items-center md:items-start"
        >
          <img
            src={sadakahData.image}
            alt="Sadakah"
            className="animate-sadakah max-h-[290px] rounded-xl"
          />

          <div className="animate-sadakah py-6">
            <h3 className="text-2xl md:text-3xl font-medium font-anekBangla mb-3">
              {sadakahData.title}
            </h3>
            <p className="opacity-90 text-xl md:text-xl font-anekBangla mt-8">
              {sadakahData.text}
            </p>
            <p className="text-xl md:text-3xl font-anekBangla text-[#FFD567] font-medium mt-6">
              ✨ {sadakahData.highlight}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
