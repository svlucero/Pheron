"use client";

import { useEffect, useState } from "react";
import { Download as DownloadIcon, Apple, Monitor, Terminal } from "lucide-react";

interface DownloadLinks {
  version: string;
  arm64: string | null;
  x64: string | null;
}

function useGitHubRelease() {
  const [release, setRelease] = useState<DownloadLinks>({
    version: "...",
    arm64: null,
    x64: null,
  });

  useEffect(() => {
    async function fetchRelease() {
      try {
        const res = await fetch("/api/release");
        if (!res.ok) return;
        const data: DownloadLinks = await res.json();
        setRelease(data);
      } catch {
        // silently fail — buttons remain disabled
      }
    }

    fetchRelease();
  }, []);

  return release;
}

export default function Download() {
  const { version, arm64, x64 } = useGitHubRelease();

  const isLoading = version === "...";
  const primaryHref = arm64 ?? x64 ?? "#";
  const primaryDisabled = !arm64 && !x64;

  return (
    <section id="download" className="py-24 bg-[#0f172a] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6d28d9]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-sm font-medium px-3 py-1.5 rounded-full mb-8">
          <DownloadIcon className="w-3.5 h-3.5 text-[#6d28d9]" />
          Free during beta
        </div>

        <h2 className="text-5xl font-bold mb-6 tracking-tight">
          Start shipping with AI agents today
        </h2>
        <p className="text-gray-400 text-lg mb-4 max-w-xl mx-auto leading-relaxed">
          Download AgentCenter for free and connect your first repository in under
          5 minutes. No credit card required during beta.
        </p>

        {/* Version badge */}
        <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Latest release:&nbsp;
          <span className={`font-mono font-medium text-gray-400 ${isLoading ? "animate-pulse" : ""}`}>
            {version}
          </span>
        </div>

        {/* macOS download buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {/* Apple Silicon */}
          <a
            id="dl-arm64"
            href={arm64 ?? "#"}
            aria-disabled={!arm64}
            className={`group flex items-center gap-3 border px-5 py-3.5 rounded-xl transition-all
              ${arm64
                ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white cursor-pointer"
                : "bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed"
              }`}
            onClick={!arm64 ? (e) => e.preventDefault() : undefined}
          >
            <Apple className={`w-5 h-5 transition-colors ${arm64 ? "text-gray-300 group-hover:text-white" : "text-gray-700"}`} />
            <div className="text-left">
              <p className="text-sm font-semibold">macOS — Apple Silicon</p>
              <p className="text-xs text-gray-500">M1 / M2 / M3 · .dmg</p>
            </div>
          </a>

          {/* Intel */}
          <a
            id="dl-x64"
            href={x64 ?? "#"}
            aria-disabled={!x64}
            className={`group flex items-center gap-3 border px-5 py-3.5 rounded-xl transition-all
              ${x64
                ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white cursor-pointer"
                : "bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed"
              }`}
            onClick={!x64 ? (e) => e.preventDefault() : undefined}
          >
            <Apple className={`w-5 h-5 transition-colors ${x64 ? "text-gray-300 group-hover:text-white" : "text-gray-700"}`} />
            <div className="text-left">
              <p className="text-sm font-semibold">macOS — Intel</p>
              <p className="text-xs text-gray-500">x86_64 · .dmg</p>
            </div>
          </a>

          {/* Windows — coming soon */}
          <a
            href="#"
            aria-disabled
            className="group flex items-center gap-3 bg-white/[0.02] border border-white/5 text-gray-600 px-5 py-3.5 rounded-xl cursor-not-allowed"
            onClick={(e) => e.preventDefault()}
          >
            <Monitor className="w-5 h-5 text-gray-700" />
            <div className="text-left">
              <p className="text-sm font-semibold">Windows</p>
              <p className="text-xs text-gray-700">Coming soon</p>
            </div>
          </a>

          {/* Linux — coming soon */}
          <a
            href="#"
            aria-disabled
            className="group flex items-center gap-3 bg-white/[0.02] border border-white/5 text-gray-600 px-5 py-3.5 rounded-xl cursor-not-allowed"
            onClick={(e) => e.preventDefault()}
          >
            <Terminal className="w-5 h-5 text-gray-700" />
            <div className="text-left">
              <p className="text-sm font-semibold">Linux</p>
              <p className="text-xs text-gray-700">Coming soon</p>
            </div>
          </a>
        </div>

        {/* Big primary CTA */}
        <a
          href={primaryHref}
          aria-disabled={primaryDisabled}
          className={`inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full text-lg transition-colors shadow-lg shadow-[#6d28d9]/20
            ${primaryDisabled
              ? "bg-[#6d28d9]/40 text-white/40 cursor-not-allowed"
              : "bg-[#6d28d9] hover:bg-[#5b21b6] text-white"
            }`}
          onClick={primaryDisabled ? (e) => e.preventDefault() : undefined}
        >
          <DownloadIcon className="w-5 h-5" />
          Download for free
        </a>

        <p className="mt-4 text-sm text-gray-600">
          macOS · Windows (soon) · Linux (soon)
        </p>

        {/* Divider */}
        <div className="mt-16 pt-16 border-t border-white/5">
          {/* App screenshot placeholder */}
          <div className="rounded-2xl border border-white/10 overflow-hidden max-w-2xl mx-auto">
            <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-3 gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
              <span className="ml-3 text-xs text-gray-600">
                AgentCenter —{" "}
                <span id="release-version" className={`font-mono ${isLoading ? "animate-pulse" : ""}`}>
                  {version}
                </span>
              </span>
            </div>
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center gap-4 p-8">
              <div className="w-14 h-14 rounded-2xl bg-[#6d28d9]/20 flex items-center justify-center">
                <DownloadIcon className="w-7 h-7 text-[#6d28d9]" />
              </div>
              <p className="text-sm text-gray-500 font-medium">App screenshot — coming soon</p>
              <p className="text-xs text-gray-700 text-center max-w-xs">
                Full desktop UI showing agent management, issue queue, and real-time cost tracking
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
