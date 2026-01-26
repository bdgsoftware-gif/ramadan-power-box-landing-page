import Section from "../layout/Section";
import Container from "../ui/Container";
import { realityCheckData } from "../../data/realityCheck.data";

export default function RealityCheckSection() {
  return (
    <Section className="bg-bg-primary">
      <Container>
        {/* Title */}
        <h2 className="mb-12 text-center text-2xl font-bold">
          {realityCheckData.title}
        </h2>

        {/* Content Grid */}
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left: Problems */}
          <div className="space-y-4">
            {realityCheckData.problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border border-border-subtle bg-bg-card px-5 py-4"
              >
                {/* Red alert icon */}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                  ❗
                </span>

                <p className="text-sm">{problem}</p>
              </div>
            ))}
          </div>

          {/* Right: Image */}
          <div className="flex justify-center">
            <img
              src={realityCheckData.image.src}
              alt={realityCheckData.image.alt}
              className="w-full max-w-md rounded-2xl object-cover shadow"
            />
          </div>
        </div>

        {/* Solution Banner */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-emerald-900 to-emerald-700 px-6 py-8 text-center text-text-inverse shadow-lg">
          <p className="text-sm opacity-90">
            {realityCheckData.solutionBanner.textTop}
          </p>

          <h3 className="mt-2 text-xl font-bold text-amber-300">
            👉 {realityCheckData.solutionBanner.highlight} 👈
          </h3>
        </div>
      </Container>
    </Section>
  );
}
