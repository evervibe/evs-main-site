"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ShoppingCart } from "lucide-react";
import { Template } from "@/types";

interface TemplateCardProps {
  template: Template;
  index: number;
}

export default function TemplateCard({ template, index }: TemplateCardProps) {
  return (
    <motion.div
      className="rounded-xl border border-foreground/10 overflow-hidden hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="aspect-video relative bg-foreground/5">
        <Image
          src={template.image}
          alt={template.title}
          fill
          className="object-cover"
          onError={(e) => {
            // Fallback for missing images
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
        <p className="text-foreground/70 mb-4">{template.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-foreground/60">Preise:</span>
            <div className="flex gap-3 mt-1">
              <span className="text-sm font-semibold">
                Single: €{template.prices.single}
              </span>
              <span className="text-sm font-semibold">
                Agency: €{template.prices.agency}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href={template.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-foreground/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-foreground/5 transition-colors"
          >
            <ExternalLink size={16} />
            Demo
          </Link>
          <Link
            href={template.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <ShoppingCart size={16} />
            Kaufen
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
