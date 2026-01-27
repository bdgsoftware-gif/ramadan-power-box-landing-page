import Section from "../layout/Section";
import Container from "../ui/Container";
import { realityCheckData } from "../../data/realityCheck.data";

export default function RealityCheckSection() {
  const handleCTA = () => {
    const el = document.getElementById(realityCheckData.cta.scrollTo);
    el?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Section className="bg-bg-primary">
      <Container>
        {/* Title */}
        <h2 className="mb-12 text-center text-3xl font-semibold font-anekBangla">
          {realityCheckData.title}
        </h2>

        {/* Content Grid */}
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left: Problems */}
          <div className="space-y-4">
            {realityCheckData.problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border border-[#E2CFA6] bg-white p-5"
              >
                {/* Red alert icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FB2C36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 8V12" stroke="#FB2C36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 16H12.01" stroke="#FB2C36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <p className="text-lg font-anekBangla font-medium">{problem}</p>
              </div>
            ))}
          </div>

          {/* Right: Image */}
          <div className="flex justify-center">
            <img
              src={realityCheckData.image.src}
              alt={realityCheckData.image.alt}
              className="w-full max-w-lg rounded-2xl object-cover shadow"
            />
          </div>
        </div>

        {/* Solution Banner */}
        <div onClick={handleCTA} className="mt-14 rounded-2xl bg-gradient-to-t from-[#129369] to-[#1B634C] px-6 py-8 text-center text-text-inverse shadow-lg">
          <p className="text-lg font-anekBangla opacity-90">
            {realityCheckData.solutionBanner.textTop}
          </p>

          <h3 className="mt-4 text-3xl font-bold text-text-golden font-ebGaramond">
            👉 {realityCheckData.solutionBanner.highlight} 👈
          </h3>
        </div>
      </Container>
    </Section>
  );
}
