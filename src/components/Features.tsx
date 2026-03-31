import React from "react";
import {
  GitBranch,
  GitPullRequest,
  Zap,
  Coins,
  Bot,
  PuzzleIcon,
  MessageCircle,
  BrainCircuit,
} from "lucide-react";

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  comingSoon?: boolean;
};

const features: Feature[] = [
  {
    icon: GitBranch,
    title: "Repository Management",
    description:
      "Connect your GitHub repositories and let Pheron monitor branches, commits, and pull requests in real time.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: GitPullRequest,
    title: "GitHub Issues Automation",
    description:
      "Assign issues to AI agents with a single click. Pheron reads the context, writes the code, and opens a PR automatically.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Zap,
    title: "Multiple AI Runners",
    description:
      "Choose the best runner for each task — Claude Code, Gemini, or your own custom runner. Switch without changing your workflow.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Coins,
    title: "Token & Cost Control",
    description:
      "Set spending limits per project, per agent, or per month. Get real-time token usage breakdowns and never overspend.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Bot,
    title: "Specialist Agents",
    description:
      "Use built-in agents for frontend, backend, testing, and code review — or configure your own with custom prompts and tools.",
    color: "bg-[#6d28d9]/10 text-[#6d28d9]",
  },
  {
    icon: PuzzleIcon,
    title: "Custom Agent Builder",
    description:
      "Design your own specialist agents from scratch. Define their skills, tools, and context, then reuse them across all your projects.",
    color: "bg-pink-50 text-pink-600",
  },
  {
    icon: MessageCircle,
    title: "Telegram Integration",
    description:
      "Chat with Claude, Gemini, or Codex from your phone. Assign issues, review PRs, and check costs directly from Telegram.",
    color: "bg-sky-50 text-sky-600",
    comingSoon: true,
  },
  {
    icon: BrainCircuit,
    title: "Context Optimization",
    description:
      "Automatic context window management per agent — trim, summarize, and prioritize history to cut token usage on long-running tasks.",
    color: "bg-orange-50 text-orange-600",
    comingSoon: true,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#6d28d9] font-semibold text-sm uppercase tracking-wide mb-3">
            Everything you need
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            One platform, your entire agent workflow
          </h2>
          <p className="text-lg text-gray-500">
            Pheron brings together repositories, issues, runners, and cost
            control into a single, cohesive workspace.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all bg-white relative"
              >
                {feat.comingSoon && (
                  <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wide bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                    Coming soon
                  </span>
                )}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${feat.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
