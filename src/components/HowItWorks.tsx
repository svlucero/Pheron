"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

const steps = [
  {
    number: "01",
    title: "Connect your repositories",
    description:
      "Link your GitHub account and select the repositories you want Pheron to manage. It reads your issues, branches, and pull requests automatically.",
    imageAlt: "Repository connection screen",
    imageSrc: "/repository.jpg",
  },
  {
    number: "02",
    title: "Assign issues to agents",
    description:
      "Pick an open GitHub issue and assign it to a specialist agent — a frontend dev, a backend engineer, a QA reviewer. The agent reads the issue context and gets to work.",
    imageAlt: "Issue assignment interface",
    imageSrc: "/issue.jpg",
  },
  {
    number: "03",
    title: "Choose your runner",
    description:
      "Select which AI runner handles the task: Claude Code, Gemini, or your own custom runner. Different issues, different runners — full flexibility.",
    imageAlt: "Runner selection screen",
    imageSrc: "/runner.jpg",
  },
  {
    number: "04",
    title: "Review, merge, and track costs",
    description:
      "The agent opens a PR with the implementation. You review and merge. Pheron logs every token spent so you always know the cost per issue.",
    imageAlt: "PR review and cost dashboard",
    imageSrc: "/cost.jpg",
  },
];

export default function HowItWorks() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="how-it-works" className="py-24 bg-[#f3f0ff]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-[#6d28d9] font-semibold text-sm uppercase tracking-wide mb-3">
            How it works
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            From issue to pull request in minutes
          </h2>
          <p className="text-lg text-gray-500">
            Pheron handles the full cycle — no glue code, no manual hand-offs.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-20">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:[direction:rtl]" : ""
              }`}
            >
              {/* Text */}
              <div className={index % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                <span className="text-7xl font-black text-gray-100 leading-none block mb-4">
                  {step.number}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-base">
                  {step.description}
                </p>
              </div>

              {/* Step screenshot */}
              <div className={index % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-lg bg-white">
                  <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-3 gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
                    <span className="ml-3 text-xs text-gray-400">{step.imageAlt}</span>
                  </div>
                  <div
                    className="relative aspect-video cursor-zoom-in"
                    onClick={() => setLightbox({ src: step.imageSrc, alt: step.imageAlt })}
                  >
                    <Image
                      src={step.imageSrc}
                      alt={step.imageAlt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
}
