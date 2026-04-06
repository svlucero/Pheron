"use client";

import { useState } from "react";
import {
  GitBranch,
  Bot,
  Zap,
  PuzzleIcon,
  BarChart2,
  Bell,
  MessageCircle,
  Settings,
  ChevronDown,
  ChevronRight,
  BookOpen,
} from "lucide-react";

type Section = {
  id: string;
  icon: React.ElementType;
  title: string;
  color: string;
  content: React.ReactNode;
};

function AccordionItem({
  section,
  isOpen,
  onToggle,
}: {
  section: Section;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = section.icon;
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${section.color}`}
          >
            <Icon className="w-4 h-4" />
          </div>
          <span className="font-semibold text-gray-900">{section.title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 text-sm text-gray-600 leading-relaxed space-y-4">
          {section.content}
        </div>
      )}
    </div>
  );
}

function Step({ n, text }: { n: number; text: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="w-6 h-6 rounded-full bg-[#6d28d9] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
        {n}
      </span>
      <span>{text}</span>
    </div>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-4 py-2 font-semibold text-gray-700"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-gray-100 bg-white">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-gray-600">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <code className="bg-gray-200 text-gray-800 text-xs px-1.5 py-0.5 rounded font-mono">
      {children}
    </code>
  );
}

const sections: Section[] = [
  {
    id: "repos",
    icon: GitBranch,
    title: "Repositories",
    color: "bg-blue-50 text-blue-600",
    content: (
      <div className="space-y-4">
        <p>
          The <strong>Repositories</strong> section is your starting point.
          Register the git repositories your agents will work on.
        </p>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">Create a new repository</p>
          <div className="space-y-2">
            <Step n={1} text="Click Add Repository." />
            <Step n={2} text={<>Under <strong>Source</strong>, select <strong>Create new</strong>.</>} />
            <Step n={3} text="Enter the repository name and choose a destination folder." />
            <Step n={4} text={<>Click <strong>Create</strong> — Pheron creates the repo on GitHub and initializes it locally at the same time.</>} />
          </div>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">Clone from GitHub</p>
          <div className="space-y-2">
            <Step n={1} text="Click Add Repository." />
            <Step n={2} text="Select your organization or user and pick a repo from the list (requires a GitHub Token in Settings)." />
            <Step n={3} text="Choose the destination folder to clone into." />
            <Step n={4} text={<>Click <strong>Create</strong> — Pheron clones the repo and registers it automatically.</>} />
          </div>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">Add an existing local repo</p>
          <div className="space-y-2">
            <Step n={1} text="Click Add Repository." />
            <Step n={2} text={<>Under <strong>Source</strong>, select <strong>Local path</strong>.</>} />
            <Step n={3} text="Click Browse to navigate and select the folder." />
            <Step n={4} text={<>Pheron automatically detects the GitHub remote URL from <Code>git remote.origin.url</Code>.</>} />
            <Step n={5} text="Click Create." />
          </div>
        </div>
        <p>
          <strong>Worktrees:</strong> Each repository can have multiple worktrees
          (isolated working branches). Pheron detects them automatically so
          different agents can work in parallel without conflicts.
        </p>
      </div>
    ),
  },
  {
    id: "tasks",
    icon: BookOpen,
    title: "Tasks (Issues)",
    color: "bg-violet-50 text-violet-600",
    content: (
      <div className="space-y-4">
        <p>
          Inside each repository, the main view shows <strong>pending tasks</strong> as
          a list of GitHub issues.
        </p>
        <div className="space-y-2">
          <p>
            <strong>View tasks:</strong> Select a repository — open issues are
            listed with pagination of 5 per page.
          </p>
          <p>
            <strong>Create a task:</strong> Click <strong>New Task</strong> →
            enter a title and description → it gets created as a GitHub issue.
          </p>
          <p>
            <strong>Start an agent from a task:</strong> Click the ▶ icon on any
            task → choose a specialization and runner → the agent starts with
            that task as its initial prompt.
          </p>
          <p>
            <strong>Close a task:</strong> Click the ✓ icon on a task to mark it
            as resolved (closes the issue on GitHub).
          </p>
        </div>
        <Table
          headers={["Filter", "Shows"]}
          rows={[
            ["running", "Agents currently active"],
            ["idle", "Agents with no task assigned"],
            ["error", "Agents that failed"],
          ]}
        />
      </div>
    ),
  },
  {
    id: "agents",
    icon: Bot,
    title: "Agents",
    color: "bg-[#6d28d9]/10 text-[#6d28d9]",
    content: (
      <div className="space-y-4">
        <p>
          An agent is an AI runner instance assigned to a repository and
          configured with a specialization. It can execute development tasks
          autonomously.
        </p>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">Create an agent</p>
          <div className="space-y-2">
            <Step n={1} text="Inside a repository, click New Agent." />
            <Step n={2} text="Give it a task description." />
            <Step n={3} text="Choose a specialization (defines the agent's behavior)." />
            <Step n={4} text="Choose a runner (Claude Code, Gemini CLI, or Codex)." />
            <Step n={5} text="Click Create." />
          </div>
        </div>
        <p>
          <strong>During execution:</strong> Logs are shown in real time. You can
          see the tools it uses, its responses, and results. Click{" "}
          <strong>Stop</strong> to halt the agent, or <strong>Send</strong> to
          send it an additional message while it's running.
        </p>
        <p>
          <strong>Session history:</strong> Each agent start creates a new
          session. You can review the full history from the agent detail view.
        </p>
        <Table
          headers={["Status", "Description"]}
          rows={[
            ["idle", "Ready to receive a task"],
            ["running", "Actively executing"],
            ["paused", "Paused"],
            ["error", "Failed on last run"],
          ]}
        />
      </div>
    ),
  },
  {
    id: "runners",
    icon: Zap,
    title: "AI Runners",
    color: "bg-amber-50 text-amber-600",
    content: (
      <div className="space-y-4">
        <p>
          Pheron supports multiple interchangeable AI runners. The app
          automatically detects which CLIs are installed on your machine.
        </p>
        <Table
          headers={["Runner", "Required CLI", "Description"]}
          rows={[
            ["Claude Code", "claude", "Default runner, powered by Anthropic's Claude"],
            ["Gemini CLI", "gemini", "Runner powered by Google's Gemini"],
            ["OpenAI Codex", "codex", "Runner powered by OpenAI models"],
          ]}
        />
        <p>
          When you click ▶ on a task or create an agent manually, a runner
          selector appears. If a specialization is locked to a specific runner,
          only that runner will be enabled.
        </p>
      </div>
    ),
  },
  {
    id: "specializations",
    icon: PuzzleIcon,
    title: "Specializations",
    color: "bg-pink-50 text-pink-600",
    content: (
      <div className="space-y-4">
        <p>
          Specializations define an agent's <strong>behavior</strong> through a
          system prompt. They determine what kind of tasks the agent can handle
          and in what style.
        </p>
        <Table
          headers={["Type", "Description"]}
          rows={[
            ["system", "Provided by Pheron, not editable"],
            ["default", "Built-in, customizable"],
            ["user", "Created by you"],
          ]}
        />

        <p className="font-semibold text-gray-800">Built-in specializations</p>
        <Table
          headers={["", "Name", "What it does"]}
          rows={[
            ["⚙️", "Developer", "Reads the codebase, implements the requested changes, runs tests, and commits the result."],
            ["🌐", "General Purpose", "A versatile agent that handles any task — coding, research, writing, analysis, or general problem-solving."],
          ]}
        />

        <div className="space-y-3">
          <p className="font-semibold text-gray-800">Create a specialization</p>
          <div className="space-y-2">
            <Step n={1} text="Click New Specialization." />
            <Step n={2} text={<>Fill in <strong>Name</strong>, <strong>Slug</strong>, <strong>Description</strong>, and <strong>Runner type</strong>.</>} />
            <Step n={3} text={<>Write the <strong>Base prompt</strong> — supports the variables <Code>{"{{.RepoName}}"}</Code> and <Code>{"{{.RepoPath}}"}</Code>.</>} />
            <Step n={4} text="Click Save." />
          </div>
        </div>
        <p>
          If you modified a default specialization and want to revert it, click{" "}
          <strong>Restore</strong> in the specialization detail view.
        </p>
      </div>
    ),
  },
  {
    id: "skills",
    icon: PuzzleIcon,
    title: "Skills",
    color: "bg-teal-50 text-teal-600",
    content: (
      <div className="space-y-4">
        <p>
          Skills are reusable capability packages installed into AI runners to
          extend them with specialized knowledge or predefined workflows.
        </p>

        <p className="font-semibold text-gray-800">Built-in skills</p>
        <Table
          headers={["Name", "Runner", "What it does"]}
          rows={[
            ["feature-dev", "Claude / Gemini", "Full feature development workflow: syncs main, creates an isolated git worktree, reads project context, implements the feature, commits, and opens a PR."],
            ["specialization-editing", "Claude / Gemini", "Guides you through editing an agentFlow specialization — refining its purpose, base prompt, and associated skill. Can trigger /skill-creator to create new skills along the way."],
          ]}
        />

        <div className="space-y-3">
          <p className="font-semibold text-gray-800">Create a skill</p>
          <div className="space-y-2">
            <Step n={1} text="Click New Skill." />
            <Step n={2} text="Fill in name, slug, description, and runner type." />
            <Step n={3} text="Write the skill content in Markdown." />
            <Step n={4} text="Click Save." />
          </div>
        </div>
        <Table
          headers={["Import method", "How"]}
          rows={[
            ["ZIP file", "Upload a .zip file containing the skill content"],
            ["Local folder", "Enter a folder path on your machine"],
            ["Direct path", "Import from a specific file path"],
          ]}
        />
        <p>
          Use <strong>Install</strong> to install the skill into the
          corresponding runner's CLI, and <strong>Uninstall</strong> to remove
          it.
        </p>
      </div>
    ),
  },
  {
    id: "reports",
    icon: BarChart2,
    title: "Usage Reports",
    color: "bg-green-50 text-green-600",
    content: (
      <div className="space-y-4">
        <p>
          The <strong>Reports</strong> section shows token consumption and
          estimated costs, broken down by runner and time period.
        </p>
        <Table
          headers={["Period", "Description"]}
          rows={[
            ["Today", "Current day only"],
            ["This Week", "Current week"],
            ["This Month", "Current month"],
            ["All Time", "Full history"],
          ]}
        />
        <p>Each report includes:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Total tokens consumed (input + output + cache)</li>
          <li>Estimated cost in USD</li>
          <li>Breakdown by runner (Claude, Gemini, Codex)</li>
          <li>Comparison with the previous period — badge with percentage delta</li>
          <li>Daily usage chart for the selected period</li>
        </ul>
      </div>
    ),
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notifications",
    color: "bg-orange-50 text-orange-600",
    content: (
      <div className="space-y-4">
        <p>
          Pheron has a built-in notification center that alerts you when an agent
          completes or fails a task. Access it from the 🔔 icon in the top-right
          bar.
        </p>
        <Table
          headers={["Type", "When it appears"]}
          rows={[
            ["Agent completed", "The agent finished its task successfully"],
            ["Agent failed", "The agent encountered an error"],
          ]}
        />
      </div>
    ),
  },
  {
    id: "telegram",
    icon: MessageCircle,
    title: "Telegram Bot",
    color: "bg-sky-50 text-sky-600",
    content: (
      <div className="space-y-4">
        <p>
          Control your agents and receive notifications directly from Telegram,
          without opening the app.
        </p>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">Setup</p>
          <div className="space-y-2">
            <Step n={1} text={<>Open <strong>Settings → Telegram</strong>.</>} />
            <Step n={2} text={<>Open <strong>@BotFather</strong> on Telegram, send <Code>/newbot</Code>, and copy the token.</>} />
            <Step n={3} text="Paste the token into the Bot Token field and save." />
            <Step n={4} text="Send any message to your bot — the app detects your Chat ID automatically." />
            <Step n={5} text="Toggle Enable Telegram on." />
          </div>
        </div>
        <Table
          headers={["Command", "Description"]}
          rows={[
            ["/help", "Lists all available commands"],
            ["/status", "Shows the bot configuration status"],
            ["/repos", "Lists repositories with their pending task count"],
            ["/agents", "Shows up to 5 agents (running ones first)"],
            ["/running", "Shows only currently running agents"],
            ["/tasks [repo]", "Shows pending tasks filtered by repo"],
            ["/newtask", "Interactive flow to create and assign a new task"],
            ["/continue", "Resumes a paused or idle agent"],
            ["/lastchat", "Shows the last Claude Session ID for an agent"],
          ]}
        />
        <p className="text-xs text-gray-400 bg-gray-100 rounded-lg px-3 py-2">
          🔒 Security: the bot only responds to the configured <Code>chat_id</Code>.
          Any other user who messages it is ignored.
        </p>
      </div>
    ),
  },
  {
    id: "settings",
    icon: Settings,
    title: "Settings",
    color: "bg-gray-100 text-gray-600",
    content: (
      <div className="space-y-4">
        <p>
          Open <strong>Settings</strong> from the sidebar to configure
          integrations.
        </p>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">GitHub Token</p>
          <p>
            Required to clone private repos, list, create, and close issues.
            Needs the <Code>repo</Code> scope.
          </p>
          <div className="space-y-2">
            <Step n={1} text="Go to GitHub Settings → Developer settings → Personal access tokens." />
            <Step n={2} text="Click Generate new token (classic)." />
            <Step n={3} text={<>Enable the <Code>repo</Code> scope and copy the token.</>} />
            <Step n={4} text="Paste it into Pheron → Settings → GitHub Token." />
          </div>
        </div>
        <Table
          headers={["Badge", "Meaning"]}
          rows={[
            ["✓ Connected", "Integration active and working"],
            ["⚠ Incomplete", "Missing configuration"],
            ["✗ Disabled", "Integration manually disabled"],
          ]}
        />
      </div>
    ),
  },
];

export default function Documentation() {
  const [openId, setOpenId] = useState<string | null>("repos");

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <section id="docs" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#6d28d9] font-semibold text-sm uppercase tracking-wide mb-3">
            Documentation
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How to use Pheron
          </h2>
          <p className="text-lg text-gray-500">
            Everything you need to know to manage your agents, repositories, and
            AI runners from one place.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {sections.map((section) => (
            <AccordionItem
              key={section.id}
              section={section}
              isOpen={openId === section.id}
              onToggle={() => toggle(section.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
