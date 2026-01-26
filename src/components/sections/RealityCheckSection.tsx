import Section from "../layout/Section";
import Container from "../ui/Container";
import { realityCheckData } from "../../data/realityCheck.data";

export default function RealityCheckSection() {
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
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                  ❗
                </span>

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
        <div className="mt-14 rounded-2xl bg-gradient-to-t from-[#129369] to-[#1B634C] px-6 py-8 text-center text-text-inverse shadow-lg">
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
