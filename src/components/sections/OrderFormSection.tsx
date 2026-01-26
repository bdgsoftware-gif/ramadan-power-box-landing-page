import Section from "../layout/Section";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { orderFormData } from "../../data/orderForm.data";

export default function OrderFormSection() {
  const { product, shippingCost } = orderFormData;

  return (
    <Section id="order-section" paddedBottom className="bg-bg-primary">
      <Container>
        {/* Header */}
        <div className="mb-10 rounded-xl bg-gradient-to-r from-emerald-900 to-emerald-700 py-5 text-center text-xl font-semibold text-white">
          অর্ডার করতে নিচের ফর্ম পূরণ করুন
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Left Form */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">অর্ডারের তথ্য</h3>

            <div className="space-y-4">
              <input
                className="w-full rounded-lg border px-4 py-3"
                placeholder="আপনার নাম লিখুন *"
              />
              <input
                className="w-full rounded-lg border px-4 py-3"
                placeholder="বিস্তারিত ঠিকানা লিখুন *"
              />
              <input
                className="w-full rounded-lg border px-4 py-3"
                placeholder="১১ ডিজিটের ফোন নম্বর লিখুন *"
              />
            </div>

            <div className="mt-8">
              <h4 className="mb-2 font-semibold">Shipping</h4>
              <div className="flex items-center justify-between rounded-lg border px-4 py-3">
                <span>ডেলিভারি চার্জ (সারা বাংলাদেশ)</span>
                <span>{shippingCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">আপনার অর্ডার</h3>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <img src={product.image} alt="" className="h-14 w-14 rounded" />
                <div className="flex-1">
                  <p>{product.name}</p>
                  <p className="text-sm text-text-secondary">
                    ৳{product.price}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t pt-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{product.price}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>৳{product.price}</span>
                </div>
              </div>

              <div className="mt-6 text-xs text-text-secondary">
                Your personal data will be used to process your order, support
                your experience and for other purposes described in our privacy
                policy.
              </div>

              <div className="mt-6">
                <Button fullWidth>👉 {orderFormData.cta}</Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
