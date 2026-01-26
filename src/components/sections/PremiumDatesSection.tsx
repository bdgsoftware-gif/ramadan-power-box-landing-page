import Section from "../layout/Section";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { premiumDatesData } from "../../data/premiumDates.data";

export default function PremiumDatesSection() {
  const handleCTA = () => {
    document
      .getElementById(premiumDatesData.cta.scrollTo)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section className="bg-bg-primary">
      <Container>
        {/* Title */}
        <h2 className="mb-12 text-center text-2xl font-bold">
          {premiumDatesData.title}
        </h2>

        {/* Info Box */}
        <div className="mx-auto mb-16 max-w-xl rounded-xl border-2 border-dashed border-green-600 bg-bg-card px-6 py-5 text-center">
          <p className="whitespace-pre-line text-text-secondary">
            {premiumDatesData.descriptionBox.text}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 font-semibold">
            ✅ {premiumDatesData.descriptionBox.highlight}
          </div>
        </div>

        {/* Images */}
        <div className="relative flex flex-col items-center gap-12 sm:flex-row sm:justify-between">
          {premiumDatesData.dates.map((item) => (
            <div
              key={item.id}
              className={`text-center ${
                item.position === "center"
                  ? "sm:order-2 sm:scale-110"
                  : item.position === "left"
                    ? "sm:order-1"
                    : "sm:order-3"
              }`}
            >
              <span className="mb-3 inline-block rounded-full bg-gray-100 px-4 py-1 text-sm">
                {item.name}
              </span>

              <img
                src={item.image}
                alt={item.name}
                className={`mx-auto object-contain ${
                  item.position === "center" ? "h-64" : "h-40 sm:h-44"
                }`}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-16 text-center font-semibold text-green-700">
          {premiumDatesData.footerText}
        </p>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Button onClick={handleCTA}>
            👉 {premiumDatesData.cta.label} – {premiumDatesData.cta.price}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
