import { useRef, useState, useEffect } from "react";
import { gsap } from "../../animations/gsap.config";
import Section from "../layout/Section";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { orderFormData } from "../../data/orderForm.data";

// API Constants
// const ITEM_UID = "djFD0V6AWU4JwmJT_-xeVppYTtfcC_Lt3m5-7JvCqP4";
// const BASE_URL = 'http://localhost:9100/';

 const BASE_URL = "https://bionic.garden/";
const ACCESS_KEY = "djFHwT5SlOnEVlCT2NSFr-WRxsXKdxliWTrVJJpHGyVju9oBowaKug";
 const ITEM_UID = "djHZa6_KptwK_aIlorfty1jIPgBYJZnQAZkIEJXfnkU";
 

export default function OrderFormSection() {
  const { product, shipping, paymentNote, cta, box } = orderFormData;
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

    const validContact = (contact: string) => {
  // Bangladesh mobile: 01XXXXXXXXX | 8801XXXXXXXXX | +8801XXXXXXXXX
        let mobileReg = /^(?:\+?88)?01[3-9]\d{8}$/;

        // Email validation
        let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return mobileReg.test(contact) || emailReg.test(contact);
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
          },
        );

        const data = await res.json();
        if (!res.ok || !data.order_key) throw new Error("Initiation failed");

        setOrderKey(data.order_key);
        setCart(data.cart);
        setCartItems(data.cart.items);
        if (data.order_form) setOrderForm(data.order_form);
      } catch (err) {
        setErrorMessage("অর্ডার শুরু করতে সমস্যা হয়েছে। পৃষ্ঠা রিফ্রেশ করুন।");
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
            order_key: orderKey,
            items: updatedItems,
            ...order_form,
          }),
        },
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

 
   if (!validContact( order_form.contact_number )) {
            setErrorMessage("অনুগ্রহ করে আপনার সঠিক মোবাইল নম্বরটি প্রদান করুন।");
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
        },
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Order failed");

      

      if (result.order_request_status === "invalid_order") {
        window.location.reload();
      } else if (result.order_request_status === "may_be_fake") {
        setErrorMessage("দুঃখিত! আপনার অর্ডার সিকিউরিটি চেকে আছে। কিছুক্ষণ অপেক্ষা করুন অথবা আমাদের সাথে যোগাযোগ করুন।");
      } else {
         setOrderRequestStatus(result.order_request_status);
        setSuccessMessage(result.message || "✅ আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। ধন্যবাদ!");
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
    updateOrder(updated);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;

    gsap.to(imageRef.current, {
      rotateY: x * 30,
      rotateX: -y * 30,
      transformPerspective: 1000,
      ease: "power3.out",
      scale: 1.1,
      y: -10,
      duration: 0.5,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: "power3.out",
      scale: 1,
      y: 0,
      duration: 0.5,
    });
  };

  // Calculate totals from API data
  const subtotal = cart.sub_total || 0;
  const total = cart.payable_amount || 0;

  if (pageInitLoading) {
    return (
      <Section id="order-section" paddedBottom className="max-w-4xl mx-auto">
        <Container>
          <div className="text-center py-20 font-anekBangla text-xl text-text-primary">
            অর্ডার প্রস্তুত হচ্ছে...
          </div>
        </Container>
      </Section>
    );
  }

  if (orderRequestStatus === "confirmed") {

    return (
      <Section id="order-section" paddedBottom className="max-w-4xl mx-auto">
        <Container>
          <div className="text-center py-20 border rounded-lg bg-white font-anekBangla shadow-sm">
            <h2 className="text-2xl font-bold text-green-700">Congratulations!</h2>
            <p className="mt-2 text-gray-600 text-lg">Your order is placed successfully.</p>
          </div>
        </Container>
      </Section>
    );

    
  }

   
  return (


    
    <Section id="order-section" paddedBottom className="max-w-4xl mx-auto">
      <Container>
        {/* Header */}
        <div className="mb-10 bg-gradient-to-l from-[#129369] to-[#1B634C] py-12 text-center text-3xl font-anekBangla font-semibold text-white">
          অর্ডার করতে নিচের ফর্ম পূরণ করুন
        </div>

       
        <div className="my-5">
          <span className="font-anekBangla text-2xl font-light text-text-primary">
            আপনার অর্ডার
          </span>
        </div>

        {/* Product box */}
        <div className="relative mb-12 w-full overflow-hidden rounded-lg border-2 bg-white p-8">
          {/* Ribbon Container */}
          <div className="absolute right-0 top-0 h-24 w-24 overflow-hidden">
            <div className="absolute top-[20px] -right-[35px] w-[140px] rotate-45 bg-green-600 py-1 text-center font-anekBangla text-sm font-semibold text-white shadow-sm">
              {product.badge}
            </div>
          </div>

          {/* Product Cart - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
            {/* Left Part: Product Details */}
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked
                readOnly
                className="accent-green-600 w-4 h-4 mt-1"
              />

              <img
                src={product.image}
                alt={product.name}
                className="h-20 w-24 rounded-lg object-cover border shadow-sm flex-shrink-0"
              />

              <div className="flex-1">
                <p className="font-semibold text-lg font-ebGaramond leading-tight text-text-dark">
                  {product.name}
                </p>
                <p className="text-sm text-text-secondary font-anekBangla font-medium mt-1">
                  জনপ্রিয়
                </p>

                {/* Quantity Selector - Dynamic from API */}
                {cartItems.map((item) => (
                  <div
                    key={item.uid}
                    className="inline-flex items-center gap-2 mt-3 border rounded-md bg-white"
                  >
                    <button
                      onClick={() =>
                        handleQtyChange(item.uid, item.quantity - 1)
                      }
                      className="h-8 w-8 rounded-l border-r hover:bg-gray-50 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQtyChange(item.uid, item.quantity + 1)
                      }
                      className="h-8 w-8 rounded-r border-l hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                ))}

                <div className="font-bold mt-2 font-anekBangla text-xl text-text-dark">
                  <span className="font-bengali text-base font-extrabold">৳</span>
                  {subtotal.toLocaleString("bn-BD")}
                </div>
              </div>
            </div>

            {/* Right Part: Box Image (Hidden on Mobile, Centered on Desktop) */}
            <div
              className="hidden md:flex shrink-0 items-center justify-center"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: "1000px" }}
            >
              <img
                ref={imageRef}
                src={box}
                alt="Product Box"
                className="w-48 h-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>

          {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 rounded-lg bg-red-50 border-2 border-red-200 px-5 py-4 font-anekBangla text-red-700 font-medium">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 rounded-lg bg-green-50 border-2 border-green-200 px-5 py-4 font-anekBangla text-green-700 font-medium">
            ✅ {successMessage}
          </div>
        )}



        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Left: Form */}
          <div>
            <h3 className="mb-6 text-2xl font-medium">অর্ডারের তথ্য</h3>

            <form className="space-y-4 pr-3" onSubmit={(e) => { e.preventDefault(); submitOrder(); }}>
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label className="font-anekBangla text-gray-700 font-medium">
                  আপনার নাম লিখুন <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 font-anekBangla outline-none transition-all focus:border-[#1B634C] focus:ring-2 focus:ring-[#1B634C]/20 shadow-sm"
                  placeholder="আপনার নাম লিখুন"
                  value={order_form.contact_name}
                  onChange={(e) => setOrderForm({ ...order_form, contact_name: e.target.value })}
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="flex flex-col gap-2">
                <label className="font-anekBangla text-gray-700 font-medium">
                  ১১ ডিজিটের ফোন নম্বর লিখুন{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 font-anekBangla outline-none transition-all focus:border-[#1B634C] focus:ring-2 focus:ring-[#1B634C]/20 shadow-sm"
                  placeholder="০১৮XXXXXXXX"
                  value={order_form.contact_number}
                  onChange={(e) => setOrderForm({ ...order_form, contact_number: e.target.value })}
                  required
                />
              </div>

              {/* Address Field */}
              <div className="flex flex-col gap-2">
                <label className="font-anekBangla text-gray-700 font-medium">
                  বিস্তারিত ঠিকানা লিখুন <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 font-anekBangla outline-none transition-all focus:border-[#1B634C] focus:ring-2 focus:ring-[#1B634C]/20 shadow-sm"
                  placeholder="গ্রাম/মহল্লা, রোড নম্বর, থানা ও জেলা লিখুন"
                  value={order_form.address}
                  onChange={(e) => setOrderForm({ ...order_form, address: e.target.value })}
                  required
                />
              </div>

              {/* Shipping Selection */}
              <div className="mt-10">
                <h4 className="mb-4 font-semibold font-anekBangla text-lg text-text-dark">
                  Shipping Method
                </h4>
                <div className="flex items-center justify-between rounded-lg border-2 border-[#1B634C] bg-[#1B634C]/5 px-5 py-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-4 border-[#1B634C] bg-white"></div>
                    <span className="font-anekBangla text-base font-medium">
                      {shipping.label}
                    </span>
                  </div>
                  <span className="font-bold text-[#1B634C]">
                    ৳{shipping.price.toFixed(0)}
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* Right: Summary */}
          <div>
            <h3 className="mb-6 text-2xl font-medium">আপনার অর্ডার</h3>

            <div className="rounded border px-8 py-4">
              <div className="flex justify-between border-b border-dashed border-text-accent/40 pb-3">
                <span className="font-anekBangla text-text-primary font-medium text-lg">
                  Product
                </span>
                <span className="font-anekBangla text-text-primary font-medium text-lg">
                  Subtotal
                </span>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-dashed border-text-accent/40">
                <span className="font-anekBangla text-text-primary font-normal text-base">
                  {product.name}
                </span>
                <span className="font-anekBangla text-text-primary font-medium text-base">
                  ৳{subtotal.toLocaleString("bn-BD")}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b">
                <span className="font-anekBangla text-text-primary font-normal text-base">
                  Subtotal
                </span>
                <span className="font-anekBangla text-text-primary font-medium text-base">
                  ৳{subtotal.toLocaleString("bn-BD")}
                </span>
              </div>

              <div className="flex justify-between py-3 font-semibold">
                <span className="font-anekBangla text-text-primary font-medium text-lg">
                  Total
                </span>
                <span className="font-anekBangla text-text-primary font-medium text-lg">
                  ৳{total.toLocaleString("bn-BD")}
                </span>
              </div>

              <div className="mt-4 text-text-accent font-anekBangla font-bold text-lg">
                ক্যাশ অন ডেলিভারি (বাকি) : ৳{total.toLocaleString("bn-BD")}
              </div>

              <div className="mt-4 flex items-start gap-2 text-sm font-anekBangla text-text-secondary">
                {/* Red alert icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#FB2C36"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 8V12"
                    stroke="#FB2C36"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 16H12.01"
                    stroke="#FB2C36"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>{paymentNote}</span>
              </div>

              <div className="mt-6">
                <Button
                  fullWidth
                  variant="primary"
                  onClick={submitOrder}
                  disabled={loading}
                >
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                  >
                    <path
                      fill="#ffa800"
                      d="M340.029 205.714c17.371 0 32 14.629 32 32s-14.629 32.914-32 32.914h-4.571l-8.229-.914c13.714-3.657 24.686-16.457 24.686-32 0-17.371-14.629-32-32-32m148.114 0c17.371 0 32-14.629 32-32s-14.629-32-32-32h-42.971 22.857c17.371 0 32 14.629 32 32s-13.714 32-32 32M302.543 331.886c9.143-2.743 16.457-10.057 20.114-19.2l.914-1.829c5.486-16.457-2.743-33.829-19.2-39.314l-10.057-3.657 21.943 2.743h5.485l2.743.914c16.457 5.486 24.686 23.771 19.2 39.314l-.914 1.829c-6.4 15.543-23.771 24.685-40.228 19.2m-18.286 33.828c5.486-16.457-3.657-34.743-20.114-40.229l18.286 6.4c4.571 1.829 9.143 1.829 13.714.914 8.229 8.229 11.886 21.029 8.229 32.914-5.486 16.457-23.771 25.6-40.229 20.114 9.143-2.741 17.371-10.056 20.114-20.113"
                      transform="translate(1)"
                    />
                    <path
                      fill="#ffe100"
                      d="M353.743 141.714h-153.6L210.2 153.6l-10.057-11.886c-17.371-24.686-33.829-27.429-64-27.429-42.971 0-54.857 36.571-54.857 36.571H63c-15.543 0-27.429 11.886-27.429 27.429v165.486c0 14.629 11.886 26.514 27.429 26.514h9.143c35.657 26.514 34.743 27.429 100.571 27.429 38.4 0 83.2-11.886 83.2-11.886h-10.057c16.457 5.486 34.743-3.657 40.229-20.114s-3.657-34.743-20.114-40.229l18.286 6.4c16.457 5.486 33.829-2.743 39.314-19.2l.914-1.829c5.486-16.457-2.743-33.829-19.2-39.314l-10.057-3.657 21.943 2.743h4.571c17.371 0 32-14.629 32-32.914s-13.714-32-32-32H255h194.743c17.371 0 32-14.629 32-32s-13.714-32-32-32h-22.857"
                      transform="translate(1)"
                    />
                    <path
                      fill="#fff"
                      d="M35.571 151.771H63c-15.543 0-27.429 11.886-27.429 27.429v165.486c0 14.629 11.886 26.514 27.429 26.514h9.143-36.572c-15.543 0-27.429-11.886-27.429-26.514V179.2c.001-15.543 11.887-27.429 27.429-27.429"
                      transform="translate(1)"
                    />
                    <path d="M182.857 406.857c-64 0-76.8-.914-112.457-27.429H36.571C16.457 379.429 0 363.886 0 343.771V178.286c0-20.114 16.457-36.571 36.571-36.571h32.914c9.143-10.057 38.4-36.571 76.8-36.571h.914c28.343 0 48.457 2.743 67.657 27.429h160c5.486 0 9.143 3.657 9.143 9.143s-3.657 9.143-9.143 9.143H228.571c0 .914.914 1.829.914 2.743 0 2.743-.914 5.486-3.657 7.314-3.657 3.657-10.057 2.743-12.8-.914l-10.057-11.886-.914-.914c-14.629-21.943-27.429-23.771-55.771-23.771h-.914c-37.486.914-64.914 32.914-64.914 32.914-1.829 2.743-4.571 3.657-7.314 3.657H36.571c-10.057 0-18.286 8.229-18.286 18.286v165.486c0 9.143 8.229 17.371 18.286 17.371h35.657c2.743 0 4.571 0 6.4 1.829 32.914 24.686 40.229 25.6 104.229 25.6 36.571 0 80.457-11.886 80.457-11.886 1.829-.914 3.657 0 5.486 0 12.8 4.571 25.6-1.829 29.257-13.714 1.829-5.486 1.829-11.886-.914-17.371s-7.314-10.057-12.8-11.886c-4.571-1.829-7.314-6.4-5.486-11.886 1.829-4.571 6.4-7.314 11.886-5.486l18.286 6.4c11.886 3.657 23.771-1.829 28.343-13.714l.914-1.829c1.829-5.486 1.829-11.886-.914-16.457-2.743-5.486-7.314-9.143-12.8-10.971l-10.057-3.657c-4.571-1.829-7.314-6.4-6.4-10.971s5.486-7.314 10.057-7.314l21.029 2.743h3.657c12.8 0 22.857-10.971 22.857-23.771 0-6.4-2.743-11.886-6.4-16.457-3.657-3.657-9.143-6.4-14.629-6.4l-79.543.914c-5.486 0-9.143-3.657-9.143-9.143s3.657-9.143 9.143-9.143h205.714c12.8 0 22.857-10.057 22.857-22.857s-10.057-22.857-22.857-22.857H448c-5.486 0-9.143-3.657-9.143-9.143s3.657-9.143 9.143-9.143h22.857c22.857 0 41.143 18.286 41.143 41.143s-18.286 41.143-41.143 41.143h-94.171c4.571 6.4 7.314 14.629 7.314 22.857 0 20.114-14.629 37.486-33.829 41.143.914.914 1.829 2.743 2.743 4.571 4.571 10.057 5.486 21.029 1.829 31.086l-.914.914c-5.486 16.457-21.029 27.429-37.486 27.429 2.743 8.229 2.743 18.286 0 26.514-7.314 21.029-29.257 32-50.286 26.514-10.971 1.825-49.371 10.968-83.2 10.968" />
                    <path d="M411.429 150.857c5.486 0 9.143-3.657 9.143-9.143s-3.657-9.143-9.143-9.143-9.143 3.657-9.143 9.143 3.657 9.143 9.143 9.143M277.029 396.8c-4.571 0-9.143-.914-13.714-1.829l-95.086-32.914c-21.029-7.314-32.914-31.086-25.6-52.114 7.314-21.029 31.086-32.914 52.114-25.6l95.086 32.914c21.029 7.314 32.914 31.086 25.6 52.114-5.486 16.458-21.029 27.429-38.4 27.429m-95.086-96.914c-3.657 0-7.314.914-10.057 2.743-5.486 2.743-10.057 7.314-11.886 12.8-3.657 11.886 1.829 24.686 14.629 29.257l95.086 32.914c5.486 1.829 11.886 1.829 17.371-.914s10.057-7.314 11.886-12.8c3.657-11.886-1.829-24.686-14.629-29.257l-95.086-32.914c-1.828-.915-4.571-1.829-7.314-1.829M256.914 288c-5.486 0-10.057-.914-15.543-2.743-32.914-12.8-104.229-75.886-115.2-101.486-1.829-4.571 0-10.057 4.571-11.886s10.057 0 11.886 4.571C150.857 196.571 217.6 256 248.686 268.8c8.229 2.743 18.286.914 22.857-4.571 5.486-7.314 2.743-19.2-6.4-33.829-10.057-14.629-38.4-52.114-62.171-83.2-2.743-3.657-2.743-10.057 1.829-12.8 3.657-2.743 10.057-2.743 12.8 1.829 21.943 28.343 52.114 67.657 62.171 84.114 20.114 30.171 10.971 48.457 5.486 54.857-6.401 8.229-17.372 12.8-28.344 12.8" />
                    <path d="M315.429 342.857c-4.571 0-9.143-.914-12.8-1.829l-105.143-36.571c-21.029-7.314-32-30.171-24.686-51.2l.914-1.829c2.743-6.4 6.4-12.8 12.8-17.371 3.657-2.743 8.229-2.743 11.886 0 21.029 17.371 40.229 30.171 51.2 34.743 10.971 4.571 28.343-2.743 32.914-13.714 1.829-4.571 6.4-6.4 10.971-4.571l36.571 12.8c10.057 3.657 18.286 10.971 22.857 20.114s5.486 21.029 1.829 31.086l-.914.914c-3.657 10.057-10.971 18.286-20.114 22.857-5.485 2.743-11.885 4.571-18.285 4.571M192 253.257c-.914.914-1.829 2.743-1.829 3.657l-.914 1.829c-3.657 11.886 1.829 23.771 13.714 28.343l105.143 36.571c5.486 1.829 11.886 1.829 16.457-.914 5.486-2.743 9.143-7.314 10.971-12.8l.914-1.829c1.829-5.486 1.829-11.886-.914-16.457-2.743-5.486-7.314-9.143-12.8-10.971l-29.257-10.971c-11.886 14.629-34.743 22.857-52.114 15.543-11.885-4.572-29.257-16.458-49.371-32.001m153.6 59.429" />
                  </svg>{" "}
                  <span className="text-base md:text-lg font-anekBangla">
                    {loading ? "প্রক্রিয়াকরণ হচ্ছে..." : cta}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto mt-5">
          <img
            src="/src/assets/images/check-out-security.webp"
            alt="Security Checkout"
            className="w-full h-auto object-contain"
          />
        </div>
      </Container>
    </Section>
  );
}