import { useRef, useState, useEffect } from "react";
import { gsap } from "../../animations/gsap.config";
import Section from "../layout/Section";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { orderFormData } from "../../data/orderForm.data";

// API Constants
const BASE_URL = "https://bionic.garden/";
// const BASE_URL = 'http://localhost:9100/';
const ACCESS_KEY = "djFHwT5SlOnEVlCT2NSFr-WRxsXKdxliWTrVJJpHGyVju9oBowaKug";
const ITEM_UID = "djHZa6_KptwK_aIlorfty1jIPgBYJZnQAZkIEJXfnkU";

export default function OrderFormSection() {
  const { product,   paymentNote, cta, box } = orderFormData;
  const imageRef = useRef<HTMLImageElement>(null);

  /* =====================
     STATE
     ====================== */
  const [order_form, setOrderForm] = useState({
    contact_name: "",
    contact_number: "",
    address: "",
  });

  const [orderKey, setOrderKey] = useState<string | null>(null);
  const [deviceKey, setDeviceKey] = useState<string | null>(null);
  
  // Cart data comes from the API response
  const [cart, setCart] = useState<any>({ sub_total: 0, payable_amount: 0 });
  const [cartItems, setCartItems] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [pageInitLoading, setPageInitLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderRequestStatus, setOrderRequestStatus] = useState("");

  /* =====================
     DEVICE FINGERPRINT
     ====================== */
  const getDeviceKey = async () => {
    let cached = localStorage.getItem("device_key");
    if (cached) return cached;

    const raw = {
      userAgent: navigator.userAgent || "",
      language: navigator.language || "",
      platform: (navigator as any).platform || "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      screen: `${window.screen.width}x${window.screen.height}`,
      colorDepth: window.screen.colorDepth || "",
    };

    const fingerprintString = Object.values(raw).join("|");
    const encoder = new TextEncoder();
    const data = encoder.encode(fingerprintString);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const key = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    localStorage.setItem("device_key", key);
    return key;
  };

  /* =====================
     API: INITIATE ORDER
     ====================== */
  useEffect(() => {
    const initiateOrder = async () => {
      setPageInitLoading(true);
      try {
        const dKey = await getDeviceKey();
        setDeviceKey(dKey);

        const res = await fetch(
          `${BASE_URL}ecom/ecom_api/initiate?access_key=${ACCESS_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              order_key: dKey,
              items: [{ uid: ITEM_UID, quantity: 1 }],
            }),
          }
        );

        const data = await res.json();
        if (!res.ok || !data.order_key) throw new Error("Initiation failed");

        setOrderKey(data.order_key);
        setCart(data.cart);
        setCartItems(data.cart.items);
        if (data.order_form) setOrderForm(data.order_form);
      } catch (err) {
        setErrorMessage("অর্ডার শুরু করতে সমস্যা হয়েছে। পৃষ্ঠা রিফ্রেশ করুন।");
      } finally {
        setPageInitLoading(false);
      }
    };

    initiateOrder();
  }, []);

  /* =====================
     API: UPDATE CART
     ====================== */
  const updateOrder = async (updatedItems: any[]) => {
    try {
      const res = await fetch(
        `${BASE_URL}ecom/ecom_api/update_cart?access_key=${ACCESS_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_key: deviceKey,
            items: updatedItems,
            ...order_form,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      setCart(data.cart);
      setCartItems(data.cart.items);
      setOrderForm(data.order_form);
    } catch (err: any) {
      console.error("Cart update error:", err.message);
    }
  };

  /* =====================
     API: PROCESS ORDER
     ====================== */
  const submitOrder = async () => {
    if (!orderKey || !deviceKey) {
      window.location.reload();
      return;
    }

    if (!order_form.contact_name || !order_form.contact_number || !order_form.address) {
      setErrorMessage("সব তথ্য পূরণ করুন");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch(
        `${BASE_URL}ecom/ecom_api/process_order?access_key=${ACCESS_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_key: orderKey,
            ...order_form,
          }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Order failed");

      setOrderRequestStatus(result.order_request_status);

      if (result.order_request_status === "invalid_order") {
        window.location.reload();
      } else if (result.order_request_status === "may_be_fake") {
        setErrorMessage("দুঃখিত! আপনার অর্ডার সিকিউরিটি চেকে আছে। কিছুক্ষণ অপেক্ষা করুন অথবা আমাদের সাথে যোগাযোগ করুন।");
      } else {
        setSuccessMessage(result.message || "✅ আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। ধন্যবাদ!");
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     INTERACTIONS
     ====================== */
  const handleQtyChange = (uid: string, newQty: number) => {
    const updated = cartItems.map((item) =>
      item.uid === uid ? { ...item, quantity: Math.max(1, newQty) } : item
    );
    setCartItems(updated);
    updateOrder(updated); // Sync with backend immediately
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;

    gsap.to(imageRef.current, {
      rotateY: x * 25,
      rotateX: -y * 25,
      scale: 1.05,
      transformPerspective: 900,
      ease: "power2.out",
      duration: 0.6,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, { rotateY: 0, rotateX: 0, scale: 1, ease: "power2.out", duration: 0.6 });
  };

  if (pageInitLoading) return <div className="text-center py-20 font-anekBangla">অর্ডার প্রস্তুত হচ্ছে...</div>;

  return (
    <Section id="order-section" paddedBottom className="max-w-4xl mx-auto">
      <Container>
        {orderRequestStatus === "confirmed" ? (
          <div className="text-center py-20 border rounded-lg bg-white font-anekBangla shadow-sm">
            <h2 className="text-2xl font-bold text-green-700">Congratulations!</h2>
            <p className="mt-2 text-gray-600 text-lg">Your order is placed successfully.</p>
          </div>
        ) : (
          <>
            <div className="mb-10 bg-gradient-to-l from-[#129369] to-[#1B634C] py-12 text-center text-3xl font-anekBangla font-semibold text-white">
              অর্ডার করতে নিচের ফর্ম পূরণ করুন
            </div>

            {errorMessage && (
              <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded font-anekBangla">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded font-anekBangla">
                {successMessage}
              </div>
            )}

            {/* Product Summary Box */}
            <div className="relative mb-12 w-full overflow-hidden rounded-lg border-2 bg-white p-8 shadow-lg">
              <div className="absolute right-0 top-0 h-24 w-24 overflow-hidden">
                <div className="absolute top-5 -right-9 w-44 rotate-45 bg-green-600 py-1 text-center text-sm font-semibold text-white shadow">
                  {product.badge || "জনপ্রিয়"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex items-start gap-5">
                  <input type="checkbox" checked readOnly className="mt-1.5 h-5 w-5 accent-green-600" />
                  <img src={product.image} alt={product.name} className="h-24 w-28 rounded-lg object-cover border shadow" />
                  <div className="flex-1">
                    <p className="text-xl font-semibold font-ebGaramond text-text-dark">{product.name}</p>
                    <p className="text-sm text-text-secondary font-anekBangla mt-1">জনপ্রিয় • অর্গানিক</p>

                    {/* Quantity Selector Mapping API State */}
                    {cartItems.map((item) => (
                      <div key={item.uid} className="mt-4 inline-flex items-center rounded border bg-white">
                        <button
                          onClick={() => handleQtyChange(item.uid, item.quantity - 1)}
                          className="h-9 w-9 border-r hover:bg-gray-100 transition"
                        >
                          −
                        </button>
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQtyChange(item.uid, item.quantity + 1)}
                          className="h-9 w-9 border-l hover:bg-gray-100 transition"
                        >
                          +
                        </button>
                      </div>
                    ))}

                    <div className="mt-3 text-2xl font-bold font-anekBangla">
                      ৳{cart.sub_total.toLocaleString("bn-BD")}
                    </div>
                  </div>
                </div>

                <div
                  className="hidden md:flex items-center justify-center"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ perspective: "1000px" }}
                >
                  <img
                    ref={imageRef}
                    src={box}
                    alt="প্রোডাক্ট বক্স"
                    className="w-56 object-contain drop-shadow-2xl transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Form Side */}
              <div>
                <h3 className="mb-6 text-2xl font-medium font-anekBangla">অর্ডারের তথ্য</h3>
                <div className="space-y-5">
                  <input
                    type="text"
                    placeholder="আপনার নাম"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-anekBangla focus:ring-2 focus:ring-green-500 outline-none"
                    value={order_form.contact_name}
                    onChange={(e) => setOrderForm({ ...order_form, contact_name: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder="ফোন নম্বর (০১৮...)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-anekBangla focus:ring-2 focus:ring-green-500 outline-none"
                    value={order_form.contact_number}
                    onChange={(e) => setOrderForm({ ...order_form, contact_number: e.target.value })}
                  />
                  <textarea
                    rows={3}
                    placeholder="আপনার বিস্তারিত ঠিকানা"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-anekBangla focus:ring-2 focus:ring-green-500 outline-none"
                    value={order_form.address}
                    onChange={(e) => setOrderForm({ ...order_form, address: e.target.value })}
                  />
                </div>
                
                <div className="mt-8">
                  <h4 className="mb-4 text-lg font-semibold font-anekBangla">শিপিং পদ্ধতি</h4>
                  <div className="flex items-center justify-between p-5 rounded-lg border-2 border-green-700 bg-green-50">
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full border-4 border-green-700 bg-white" />
                      <span className="font-medium font-anekBangla">ফ্রি হোম ডেলিভারি (সারা বাংলাদেশে)</span>
                    </div>
                    <span className="font-bold text-green-700">৳০</span>
                  </div>
                </div>
              </div>

              {/* Summary Side */}
              <div>
                <h3 className="mb-6 text-2xl font-medium font-anekBangla">অর্ডার সামারি</h3>
                <div className="border rounded-lg p-6 shadow-sm bg-white">
                  <div className="flex justify-between py-4 border-b">
                    <span>সাবটোটাল</span>
                    <span>৳{cart.sub_total.toLocaleString("bn-BD")}</span>
                  </div>
                  <div className="flex justify-between py-4 text-xl font-semibold text-green-700">
                    <span>মোট</span>
                    <span>৳{cart.payable_amount.toLocaleString("bn-BD")}</span>
                  </div>
                  
                  <div className="mt-6 flex items-start gap-3 text-sm text-gray-600">
                    <svg className="w-7 h-7 text-red-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                    </svg>
                    <span>{paymentNote}</span>
                  </div>

                  <Button
                    fullWidth
                    disabled={loading}
                    onClick={submitOrder}
                    className="mt-8 py-4 text-lg bg-[#129369] text-white rounded-lg hover:bg-[#1B634C]"
                  >
                    {loading ? "প্রক্রিয়াকরণ হচ্ছে..." : cta || "অর্ডার কনফার্ম করুন"}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}