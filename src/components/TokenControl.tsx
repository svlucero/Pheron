import { ShieldCheck, TrendingDown, Bell, BarChart3 } from "lucide-react";

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
  return (
    <section className="py-24 bg-[#f0f4ff]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: image placeholder */}
          <div className="relative">
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-xl bg-white">
              {/* Fake window chrome */}
              <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-3 gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
                <span className="ml-3 text-xs text-gray-400">AgentCenter — Cost Dashboard</span>
              </div>

              {/* Placeholder content that mimics a cost dashboard */}
              <div className="p-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
                {/* Fake chart area */}
                <div className="mb-4 flex items-end gap-2 h-24">
                  {[40, 65, 50, 80, 55, 70, 45, 90, 60, 75, 50, 85].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{
                        height: `${h}%`,
                        background: i === 11
                          ? "#4f6ef5"
                          : i % 3 === 0
                          ? "#e5e7eb"
                          : "#f3f4f6",
                      }}
                    />
                  ))}
                </div>

                {/* Fake stats row */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { label: "This month", value: "$4.32", trend: "↓ 18%" },
                    { label: "Tokens used", value: "1.2M", trend: "↑ 5%" },
                    { label: "Issues solved", value: "47", trend: "↑ 31%" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-3">
                      <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                      <p className="text-base font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-xs font-medium ${stat.trend.startsWith("↓") ? "text-green-500" : "text-blue-500"}`}>
                        {stat.trend}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-300 text-center mt-6 font-medium">
                  Screenshot placeholder — cost dashboard coming soon
                </p>
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
            <p className="text-[#4f6ef5] font-semibold text-sm uppercase tracking-wide mb-3">
              Cost control
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Know exactly what your agents are spending
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              AgentCenter gives you full visibility into token usage and costs across
              every project, agent, and run — so there are no surprises at the end of
              the month.
            </p>

            <ul className="flex flex-col gap-6">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <li key={b.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#4f6ef5]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-[#4f6ef5]" />
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
    </section>
  );
}
