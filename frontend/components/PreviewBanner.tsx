"use client";

import { useRouter } from "next/navigation";
import { Eye, X } from "lucide-react";

/**
 * Preview Mode Banner
 * Displays when draft mode is active
 */
export default function PreviewBanner() {
  const router = useRouter();

  const handleDisable = async () => {
    try {
      // Call disable-preview endpoint
      await fetch("/api/disable-preview", { method: "POST" });
      router.refresh();
    } catch (error) {
      console.error("Failed to disable preview:", error);
      // Fallback: just refresh
      router.refresh();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black px-4 py-2 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2">
        <Eye className="w-5 h-5" />
        <span className="font-semibold">Preview Mode Active</span>
        <span className="text-sm opacity-80">
          You are viewing unpublished content
        </span>
      </div>
      <button
        onClick={handleDisable}
        className="flex items-center gap-1 px-3 py-1 bg-black text-yellow-500 rounded hover:bg-gray-900 transition-colors"
        aria-label="Exit Preview Mode"
      >
        <X className="w-4 h-4" />
        <span className="text-sm font-medium">Exit Preview</span>
      </button>
    </div>
  );
}
