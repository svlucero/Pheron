import { Download as DownloadIcon, Apple, Monitor, Terminal } from "lucide-react";

const platforms = [
  {
    icon: Apple,
    label: "macOS",
    sublabel: "Apple Silicon & Intel",
    href: "#",
  },
  {
    icon: Monitor,
    label: "Windows",
    sublabel: "Windows 10 / 11",
    href: "#",
  },
  {
    icon: Terminal,
    label: "Linux",
    sublabel: ".deb · .rpm · AppImage",
    href: "#",
  },
];

export default function Download() {
  return (
    <section id="download" className="py-24 bg-[#0f172a] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4f6ef5]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-sm font-medium px-3 py-1.5 rounded-full mb-8">
          <DownloadIcon className="w-3.5 h-3.5 text-[#4f6ef5]" />
          Free during beta
        </div>

        <h2 className="text-5xl font-bold mb-6 tracking-tight">
          Start shipping with AI agents today
        </h2>
        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          Download AgentCenter for free and connect your first repository in under
          5 minutes. No credit card required during beta.
        </p>

        {/* Platform buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <a
                key={p.label}
                href={p.href}
                className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-5 py-3.5 rounded-xl transition-all"
              >
                <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                <div className="text-left">
                  <p className="text-sm font-semibold">{p.label}</p>
                  <p className="text-xs text-gray-500">{p.sublabel}</p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Big primary CTA */}
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-[#4f6ef5] hover:bg-[#3d5ce3] text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors shadow-lg shadow-[#4f6ef5]/20"
        >
          <DownloadIcon className="w-5 h-5" />
          Download for free
        </a>

        <p className="mt-4 text-sm text-gray-600">
          Available for macOS · Windows · Linux
        </p>

        {/* Divider */}
        <div className="mt-16 pt-16 border-t border-white/5">
          {/* App screenshot placeholder */}
          <div className="rounded-2xl border border-white/10 overflow-hidden max-w-2xl mx-auto">
            <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-3 gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
              <span className="ml-3 text-xs text-gray-600">AgentCenter — v0.1.0-beta</span>
            </div>
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center gap-4 p-8">
              <div className="w-14 h-14 rounded-2xl bg-[#4f6ef5]/20 flex items-center justify-center">
                <DownloadIcon className="w-7 h-7 text-[#4f6ef5]" />
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
