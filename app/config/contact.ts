const PHONE_RAW = process.env.NEXT_PUBLIC_PHONE_NUMBER || "6281388868054";
const PHONE_DISPLAY = "+62 813-8886-8054";
const WHATSAPP_RAW = process.env.NEXT_PUBLIC_WA_NUMBER || PHONE_RAW;

const DEFAULT_WHATSAPP_MESSAGE =
  "Halo Jagoan Cair, saya ingin konsultasi pembiayaan.";

export const contact = {
  phone: {
    raw: PHONE_RAW,
    display: PHONE_DISPLAY,
    tel: `tel:+${PHONE_RAW}`,
  },
  whatsapp: {
    number: WHATSAPP_RAW,
    message: DEFAULT_WHATSAPP_MESSAGE,
    link: `https://wa.me/${WHATSAPP_RAW}`,
    display: PHONE_DISPLAY,
  },
  email: "halo@jagoancair.com",
  address: "Jl. Contoh No. 123, Jakarta Selatan",
  socials: {
    facebook: {
      url: "https://www.facebook.com/share/1BnhNZUNcc/?mibextid=wwXIfr",
      display: "Jagoan Cair",
    },
    instagram: {
      url: "https://www.instagram.com/jagoancair?igsh=MTc1MWxraTl4NHpuOQ%3D%3D&utm_source=qr",
      display: "@jagoancair",
    },
    whatsapp: {
      url: `https://wa.me/${WHATSAPP_RAW}`,
      display: PHONE_DISPLAY,
    },
  },
};

export const whatsappLinkWithMessage = (text = contact.whatsapp.message) =>
  `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(text)}`;
