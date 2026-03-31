"use client";

import { useState } from "react";
import { ShieldCheck, TrendingDown, Bell, BarChart3 } from "lucide-react";
import Image from "next/image";
import Lightbox from "./Lightbox";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Per-project spending caps",
    description: "Set hard limits per repository so no single project runs away with your budget.",
  },
  {
    icon: TrendingDown,
    title: "Real-time token tracking",
    description: "See exactly how many tokens each agent used, broken down by issue and run.",
  },
  {
    icon: Bell,
    title: "Cost alerts",
    description: "Get notified when a project is approaching its limit — before it hits.",
  },
  {
    icon: BarChart3,
    title: "Monthly reports",
    description: "Export detailed cost reports by team, repository, or agent type.",
  },
];

export default function TokenControl() {
  const [lightbox, setLightbox] = useState(false);

  return (
    <section className="py-24 bg-[#f3f0ff]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: cost dashboard screenshot */}
          <div className="relative">
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-xl bg-white">
              {/* Window chrome */}
              <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-3 gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
                <span className="ml-3 text-xs text-gray-400">Pheron — Cost Dashboard</span>
              </div>
              <div
                className="relative aspect-video cursor-zoom-in"
                onClick={() => setLightbox(true)}
              >
                <Image
                  src="/cost.jpg"
                  alt="Pheron cost dashboard"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Floating alert badge */}
            <div className="absolute -bottom-5 -right-5 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3 max-w-[220px]">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">80% of limit reached</p>
                <p className="text-xs text-gray-400">frontend-app · March</p>
              </div>
            </div>
          </div>

          {/* Right: copy */}
          <div>
            <p className="text-[#6d28d9] font-semibold text-sm uppercase tracking-wide mb-3">
              Cost control
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Know exactly what your agents are spending
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Pheron gives you full visibility into token usage and costs across
              every project, agent, and run — so there are no surprises at the end of
              the month.
            </p>

            <ul className="flex flex-col gap-6">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <li key={b.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#6d28d9]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-[#6d28d9]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-0.5">{b.title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{b.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {lightbox && (
        <Lightbox src="/cost.jpg" alt="Pheron cost dashboard" onClose={() => setLightbox(false)} />
      )}
    </section>
  );
}
