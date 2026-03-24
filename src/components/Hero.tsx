"use client";

import { ArrowRight, Github, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#f0f4ff]">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-[#4f6ef5]/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#4f6ef5]/10 text-[#4f6ef5] text-sm font-medium px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4f6ef5] inline-block" />
              Now in beta — download free
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 text-balance mb-6">
              Your command center for{" "}
              <span className="text-[#4f6ef5]">AI development agents</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-xl">
              AgentCenter lets you manage repositories, automate GitHub issues, and
              orchestrate multiple AI runners — all from one place. Ship faster with
              specialist agents and full cost control.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#download"
                className="inline-flex items-center gap-2 bg-[#4f6ef5] hover:bg-[#3d5ce3] text-white font-semibold px-6 py-3.5 rounded-full transition-colors shadow-sm"
              >
                Download AgentCenter
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

          {/* Right: image placeholder */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-2xl bg-white">
              {/* Placeholder for product screenshot */}
              <div className="aspect-[4/3] bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex flex-col items-center justify-center gap-4 p-8">
                <div className="w-16 h-16 rounded-2xl bg-[#4f6ef5]/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#4f6ef5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-400 font-medium">Product screenshot coming soon</p>
                <p className="text-xs text-gray-300 text-center max-w-xs">
                  App dashboard showing repositories, active agents and live cost metrics
                </p>
              </div>

              {/* Fake UI bar on top */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-white border-b border-gray-100 flex items-center px-3 gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
                <span className="ml-4 text-xs text-gray-400">AgentCenter — Dashboard</span>
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
    </section>
  );
}
