"use client";

import { motion, useReducedMotion } from "framer-motion";
import WhatsAppIcon from "./icons/WhatsAppIcon";

const phoneNumber = "6281234567890";
const message = encodeURIComponent(
  "Halo Jagoan Cair, saya ingin konsultasi pembiayaan."
);
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

export default function FloatingWhatsAppButton() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Jagoan Cair"
      className="fixed bottom-5 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_rgba(37,211,102,0.35)] ring-1 ring-white/50 backdrop-blur sm:bottom-6 sm:right-6"
      initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.94 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="sr-only">Chat WhatsApp</span>
      <WhatsAppIcon size={22} className="text-white drop-shadow-sm" />
    </motion.a>
  );
}
