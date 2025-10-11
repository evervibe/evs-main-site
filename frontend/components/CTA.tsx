"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export default function CTA({
  title,
  description,
  buttonText,
  buttonHref,
}: CTAProps) {
  return (
    <section className="py-16 md:py-24">
      <motion.div
        className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg md:text-xl mb-8 text-white/90">{description}</p>
        <Link
          href={buttonHref}
          className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
        >
          {buttonText}
          <ArrowRight size={20} />
        </Link>
      </motion.div>
    </section>
  );
}
