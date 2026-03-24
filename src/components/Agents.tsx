import { Bot, Code2, TestTube, Eye, Paintbrush, Server, Plus } from "lucide-react";

const defaultAgents = [
  {
    icon: Code2,
    name: "Frontend Dev",
    description: "Specializes in React, TypeScript, and UI/UX implementation.",
    color: "bg-blue-50 text-blue-600",
    badge: "Built-in",
  },
  {
    icon: Server,
    name: "Backend Dev",
    description: "APIs, databases, auth, and server-side logic.",
    color: "bg-violet-50 text-violet-600",
    badge: "Built-in",
  },
  {
    icon: TestTube,
    name: "QA Engineer",
    description: "Writes unit tests, integration tests, and catches edge cases.",
    color: "bg-green-50 text-green-600",
    badge: "Built-in",
  },
  {
    icon: Eye,
    name: "Code Reviewer",
    description: "Reviews PRs for quality, security, and best practices.",
    color: "bg-amber-50 text-amber-600",
    badge: "Built-in",
  },
  {
    icon: Paintbrush,
    name: "Design Engineer",
    description: "Translates Figma designs into pixel-perfect components.",
    color: "bg-pink-50 text-pink-600",
    badge: "Built-in",
  },
  {
    icon: Plus,
    name: "Your Custom Agent",
    description: "Define skills, tools, and a base prompt to create your own specialist.",
    color: "bg-[#4f6ef5]/10 text-[#4f6ef5]",
    badge: "Custom",
    isCta: true,
  },
];

export default function Agents() {
  return (
    <section id="agents" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <p className="text-[#4f6ef5] font-semibold text-sm uppercase tracking-wide mb-3">
              Specialist agents
            </p>
            <h2 className="text-4xl font-bold text-gray-900">
              The right agent for every task
            </h2>
          </div>
          <p className="text-gray-500 text-lg leading-relaxed">
            AgentCenter ships with a roster of expert agents ready to use out of the box.
            Not finding what you need? Build your own in minutes.
          </p>
        </div>

        {/* Agent cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultAgents.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.name}
                className={`group p-6 rounded-2xl border transition-all ${
                  agent.isCta
                    ? "border-dashed border-[#4f6ef5]/40 hover:border-[#4f6ef5] bg-[#f0f4ff] cursor-pointer"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md bg-white"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${agent.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      agent.badge === "Custom"
                        ? "bg-[#4f6ef5]/10 text-[#4f6ef5]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {agent.badge}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                  {agent.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {agent.description}
                </p>
                {agent.isCta && (
                  <div className="mt-4 text-sm font-medium text-[#4f6ef5] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Create custom agent →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Runners banner */}
        <div className="mt-16 rounded-2xl bg-[#0f172a] text-white p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Compatible with your favorite runners</h3>
            <p className="text-gray-400 text-sm max-w-lg">
              AgentCenter is runner-agnostic. Pair any agent with Claude Code, Gemini, or plug in your own custom runner via our open API.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            {["Claude Code", "Gemini", "Custom runner"].map((runner) => (
              <span
                key={runner}
                className="bg-white/10 border border-white/10 text-white text-sm font-medium px-4 py-2 rounded-full"
              >
                {runner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
