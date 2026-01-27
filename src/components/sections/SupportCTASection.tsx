import Section from "../layout/Section";
import Container from "../ui/Container";
import { supportCTAData } from "../../data/supportCTA.data";

export default function SupportCTASection() {
  return (
    <Section paddedBottom>
      <Container className="max-w-xl mx-auto">
        <div className="rounded-2xl border-2 border-dashed border-text-accent px-6 py-10 text-center">
          <h3 className="mb-4 text-xl font-bold font-anekBangla">
            ❓ {supportCTAData.title}
          </h3>

          <div className="space-y-3 text-text-accent font-anekBangla font-semibold">
            <p>📞 কল / WhatsApp করুন: {supportCTAData.phone}</p>
            <p>✉️ ইমেইল: {supportCTAData.email}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
