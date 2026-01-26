import Section from "../layout/Section";
import Container from "../ui/Container";
import { transformationChallengeData } from "../../data/transformationChallenge.data";

export default function TransformationChallengeSection() {
  const data = transformationChallengeData;

  return (
    <Section className="bg-bg-primary">
      <Container>
        {/* Badge */}
        <div className="mb-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-50 px-4 py-1 text-sm font-semibold">
            🏆 {data.badge}
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-10 text-center text-3xl font-bold text-green-800">
          {data.title}
        </h2>

        {/* Main Content */}
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left */}
          <div>
            <p className="mb-6 text-lg">{data.description}</p>

            <ul className="space-y-3">
              {data.rewards.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-amber-400 text-amber-500">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Images */}
          <div className="grid grid-cols-3 gap-4">
            {data.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-64 w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>

        {/* Deadline Box */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border-2 border-dashed border-green-600 bg-bg-card px-6 py-8 text-center">
          <h3 className="mb-3 text-xl font-bold">📌 {data.deadline.title}</h3>

          <p className="mb-6 whitespace-pre-line text-text-secondary">
            {data.deadline.description}
          </p>

          <ul className="space-y-2 text-sm">
            {data.deadline.notes.map((note, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
