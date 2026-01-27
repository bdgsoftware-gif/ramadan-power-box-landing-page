import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../animations/gsap.config";
import Section from "../layout/Section";
import Container from "../ui/Container";
import { founderMessageData } from "../../data/founderMessage.data";

export default function FounderMessageSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Targets elements with .animate-founder class
      gsap.from(".animate-founder", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <Section>
      <Container>
        <div
          ref={containerRef}
          className="grid gap-8 rounded-xl border-2 border-[#C9A14A] bg-[#FFFBF4] p-6 md:p-10 lg:p-12 md:grid-cols-2 md:items-center max-w-4xl mx-auto"
        >
          {/* Image Container: Added responsive width and bottom margin for mobile */}
          <div className="animate-founder flex justify-center">
            <img
              src={founderMessageData.image}
              alt={founderMessageData.name}
              className="w-full max-w-[240px] md:max-w-xs rounded-2xl shadow-md border-4 border-white"
            />
          </div>

          {/* Text Content: Added text-center for mobile, text-left for desktop */}
          <div className="animate-founder text-center md:text-left flex flex-col items-center md:items-start">
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="md:w-[42px] md:h-[42px]"
                viewBox="0 0 42 42"
                fill="none"
              >
                <path
                  d="M8.02025 30.3119C6.21775 28.3974 5.25 26.2502 5.25 22.7694C5.25 16.6444 9.54975 11.1547 15.8025 8.44043L17.3653 10.8519C11.529 14.0089 10.388 18.1057 9.933 20.6887C10.8728 20.2022 12.103 20.0324 13.3088 20.1444C16.4657 20.4367 18.9543 23.0284 18.9543 26.2502C18.9543 27.8746 18.3089 29.4326 17.1603 30.5812C16.0116 31.7299 14.4537 32.3752 12.8292 32.3752C11.9309 32.3674 11.043 32.181 10.2174 31.8268C9.39181 31.4726 8.64492 30.9576 8.02025 30.3119ZM25.5203 30.3119C23.7178 28.3974 22.75 26.2502 22.75 22.7694C22.75 16.6444 27.0498 11.1547 33.3025 8.44043L34.8652 10.8519C29.029 14.0089 27.888 18.1057 27.433 20.6887C28.3727 20.2022 29.603 20.0324 30.8088 20.1444C33.9657 20.4367 36.4542 23.0284 36.4542 26.2502C36.4542 27.8746 35.8089 29.4326 34.6603 30.5812C33.5116 31.7299 31.9537 32.3752 30.3292 32.3752C29.4309 32.3674 28.543 32.181 27.7174 31.8268C26.8918 31.4726 26.1449 30.9576 25.5203 30.3119Z"
                  fill="#C9A14A"
                />
              </svg>
            </div>

            <p className="text-lg md:text-xl font-anekBangla leading-relaxed text-gray-800">
              “{founderMessageData.quote}”
            </p>

            <div className="mt-6">
              <p className="font-bold text-lg font-ebGaramond text-gray-900">
                — {founderMessageData.name}
              </p>
              <p className="text-sm text-text-secondary font-ebGaramond italic">
                {founderMessageData.role}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
