import LandingPage from "../pages/LandingPage";
import StickyOrderButton from "../components/layout/StickyOrderButton";

export default function App() {
  return (
    <div className="min-h-screen bg-surface-base font-bengali text-text-primary antialiased">
      <LandingPage />
      <StickyOrderButton />
    </div>
  );
}
