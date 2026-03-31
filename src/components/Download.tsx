"use client";

import { useEffect, useState } from "react";
import { Download as DownloadIcon, Monitor, Terminal, Copy, Check } from "lucide-react";
import Image from "next/image";
import Lightbox from "./Lightbox";

const INSTALL_CMD = "curl -sSL https://raw.githubusercontent.com/svlucero/pheron/main/install.sh | bash";

function useGitHubRelease() {
  const [version, setVersion] = useState("...");

  useEffect(() => {
    async function fetchRelease() {
      try {
        const res = await fetch("/api/release");
        if (!res.ok) return;
        const data = await res.json();
        if (data.version) setVersion(data.version);
      } catch {
        // silently fail
      }
    }

    fetchRelease();
  }, []);

  return version;
}

export default function Download() {
  const version = useGitHubRelease();
  const isLoading = version === "...";
  const [copied, setCopied] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(INSTALL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

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
          Install Pheron in seconds and connect your first repository in under
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

        {/* Install command */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-2 bg-gray-900 border border-white/10 rounded-xl px-5 py-4 text-left">
            <Terminal className="w-4 h-4 text-[#6d28d9] shrink-0" />
            <code className="flex-1 text-sm font-mono text-gray-300 break-all">
              {INSTALL_CMD}
            </code>
            <button
              onClick={handleCopy}
              className="shrink-0 ml-2 p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-600">macOS · Apple Silicon &amp; Intel</p>
        </div>

        {/* Coming soon platforms */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {/* Windows — coming soon */}
          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 text-gray-600 px-5 py-3.5 rounded-xl">
            <Monitor className="w-5 h-5 text-gray-700" />
            <div className="text-left">
              <p className="text-sm font-semibold">Windows</p>
              <p className="text-xs text-gray-700">Coming soon</p>
            </div>
          </div>

          {/* Linux — coming soon */}
          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 text-gray-600 px-5 py-3.5 rounded-xl">
            <Terminal className="w-5 h-5 text-gray-700" />
            <div className="text-left">
              <p className="text-sm font-semibold">Linux</p>
              <p className="text-xs text-gray-700">Coming soon</p>
            </div>
          </div>
        </div>

        {/* Big primary CTA */}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full text-lg transition-colors shadow-lg shadow-[#6d28d9]/20 bg-[#6d28d9] hover:bg-[#5b21b6] text-white"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {copied ? "Copied!" : "Copy install command"}
        </button>

        <p className="mt-4 text-sm text-gray-600">
          macOS · Windows (soon) · Linux (soon)
        </p>

        {/* Divider */}
        <div className="mt-16 pt-16 border-t border-white/5">
          {/* App screenshot */}
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
            <div
              className="relative aspect-video cursor-zoom-in"
              onClick={() => setLightbox(true)}
            >
              <Image
                src="/panel1.jpg"
                alt="Pheron app dashboard"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      {lightbox && (
        <Lightbox src="/panel1.jpg" alt="Pheron app dashboard" onClose={() => setLightbox(false)} />
      )}
    </section>
  );
}
