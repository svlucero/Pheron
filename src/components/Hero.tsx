"use client";

import { useState } from "react";
import { ArrowRight, Github, Play } from "lucide-react";
import Image from "next/image";
import Lightbox from "./Lightbox";

export default function Hero() {
  const [lightbox, setLightbox] = useState(false);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#f3f0ff]">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-[#6d28d9]/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#6d28d9]/10 text-[#6d28d9] text-sm font-medium px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6d28d9] inline-block" />
              Now in beta — download free
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 text-balance mb-6">
              Your command center for{" "}
              <span className="text-[#6d28d9]">AI development agents</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-xl">
              Pheron lets you manage repositories, automate GitHub issues, and
              orchestrate multiple AI runners — all from one place. Ship faster with
              specialist agents and full cost control.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#download"
                className="inline-flex items-center gap-2 bg-[#6d28d9] hover:bg-[#5b21b6] text-white font-semibold px-6 py-3.5 rounded-full transition-colors shadow-sm"
              >
                Download Pheron
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium px-6 py-3.5 rounded-full border border-gray-200 hover:border-gray-300 bg-white transition-colors"
              >
                <Play className="w-4 h-4" />
                See how it works
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Github className="w-4 h-4" />
                GitHub integrated
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <span>Claude Code · Gemini · Custom runners</span>
            </div>
          </div>

          {/* Right: product screenshot */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-2xl bg-white">
              {/* Window chrome */}
              <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-3 gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
                <span className="ml-4 text-xs text-gray-400">Pheron — Dashboard</span>
              </div>
              <div
                className="relative aspect-[4/3] cursor-zoom-in"
                onClick={() => setLightbox(true)}
              >
                <Image
                  src="/panel1.jpg"
                  alt="Pheron dashboard"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <span className="text-green-500 text-sm font-bold">✓</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">Issue #142 resolved</p>
                <p className="text-xs text-gray-400">by Claude Code · 2 min ago</p>
              </div>
            </div>

            {/* Floating cost badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3">
              <p className="text-xs text-gray-400">Monthly spend</p>
              <p className="text-lg font-bold text-gray-900">$4.32</p>
              <p className="text-xs text-green-500 font-medium">↓ 18% vs last month</p>
            </div>
          </div>
        </div>
      </div>
      {lightbox && (
        <Lightbox src="/panel1.jpg" alt="Pheron dashboard" onClose={() => setLightbox(false)} />
      )}
    </section>
  );
}
