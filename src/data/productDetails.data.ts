import type { IconKey } from "./productIcons";

export interface ProductItem {
  id: string;
  icon: IconKey;
  text: string;
  highlight?: boolean;
}

export const productDetailsData = {
  title: "একটি বক্সে পাচ্ছেন",
  items: [
    {
      id: "dates-premium",
      icon: "check",
      text: "৩ কেজি প্রিমিয়াম খেজুর (কালমি • সুক্কারি • মরিয়ম)",
    },
    {
      id: "vital-mix",
      icon: "gift",
      text: "ভাইটাল মিক্স (205g) - উপহার",
      highlight: true,
    },
    { id: "pink-salt", icon: "salt", text: "পিঙ্ক অউরা সল্ট - উপহার" },
    {
      id: "tracker-30-days",
      icon: "calendar",
      text: "রুপান্তরের ৩০ দিন ট্রাকার।",
    },
    {
      id: "video-guideline",
      icon: "video",
      text: "ভিডিও গাইডলাইন ফ্রি এক্সেস",
    },
    {
      id: "quran-course",
      icon: "graduation",
      text: "কুরআন শিক্ষা কোর্স (Full FREE)",
    },
    {
      id: "reward-challenge",
      icon: "trophy",
      text: "কক্সবাজার রিওয়ার্ড চ্যালেঞ্জ",
    },
    { id: "sadakah", icon: "heart", text: "প্রতি বক্সে ৳৫০ সাদাকাহ" },
    {
      id: "free-delivery",
      icon: "travel",
      text: "সমগ্র বাংলাদেশে ফ্রি হোম ডেলিভারি",
    },
  ] as ProductItem[],
  pricing: {
    price: "৪,৯৯০",
    note: "এটা শুধু একটি পণ্য নয়, এটা আপনার সম্পূর্ণ রমজান প্রস্তুতি\nবাজারের সব দাম তুলনা করে নিশ্চিতকৃত",
    cta: "আপনার বক্স কনফার্ম করুন",
    delivery: "ফ্রি হোম ডেলিভারি (সমগ্র বাংলাদেশে)",
    scrollTo: "order-section",
  },
};
