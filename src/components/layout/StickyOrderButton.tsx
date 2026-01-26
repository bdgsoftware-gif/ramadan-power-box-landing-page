import Button from "../ui/Button";

export default function StickyOrderButton() {
  const handleClick = () => {
    const target = document.getElementById("order-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full sm:hidden">
      {/* Safe-area wrapper */}
      <div className="safe-bottom bg-surface-base/95 backdrop-blur">
        <div className="mx-auto max-w-8xl px-4 py-3">
          <Button fullWidth onClick={handleClick} aria-label="অর্ডার করুন">
            এখনই অর্ডার করুন
          </Button>
        </div>
      </div>
    </div>
  );
}
