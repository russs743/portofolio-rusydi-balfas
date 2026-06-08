"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()}
      className="group flex items-center gap-2 text-sm font-bold tracking-[0.2em] uppercase hover:opacity-70 transition-opacity w-fit"
    >
      <span className="transform transition-transform group-hover:-translate-x-2">←</span>
      Back
    </button>
  );
}
