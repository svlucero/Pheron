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
          La sección <strong>Repositories</strong> es el punto de partida. Acá
          registrás los repos git sobre los que van a trabajar tus agentes.
        </p>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">
            Clonar desde GitHub
          </p>
          <div className="space-y-2">
            <Step n={1} text="Click en Add Repository." />
            <Step n={2} text="Seleccioná tu organización/usuario y elegí el repo de la lista (requiere GitHub Token en Settings)." />
            <Step n={3} text="Elegí la carpeta destino donde clonar." />
            <Step n={4} text={<>Click en <strong>Create</strong> — Pheron clona el repo y lo registra automáticamente.</>} />
          </div>
        </div>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">
            Agregar un repo local ya existente
          </p>
          <div className="space-y-2">
            <Step n={1} text="Click en Add Repository." />
            <Step n={2} text={<>En <strong>Source</strong>, seleccioná <strong>Local path</strong>.</>} />
            <Step n={3} text="Click en Browse para navegar y seleccionar la carpeta." />
            <Step n={4} text={<>Pheron detecta automáticamente la URL del remote de GitHub desde <Code>git remote.origin.url</Code>.</>} />
            <Step n={5} text="Click en Create." />
          </div>
        </div>
        <p>
          <strong>Worktrees:</strong> Cada repo puede tener múltiples worktrees
          (ramas de trabajo aisladas). Pheron los detecta automáticamente para
          que diferentes agentes trabajen en paralelo sin pisarse.
        </p>
      </div>
    ),
  },
  {
    id: "tasks",
    icon: BookOpen,
    title: "Tareas (Issues)",
    color: "bg-violet-50 text-violet-600",
    content: (
      <div className="space-y-4">
        <p>
          Dentro de cada repositorio, la vista principal muestra las{" "}
          <strong>tareas pendientes</strong> como una lista de issues de GitHub.
        </p>
        <div className="space-y-2">
          <p>
            <strong>Ver tareas:</strong> Seleccioná un repositorio — los issues
            abiertos se listan con paginación de 5 por página.
          </p>
          <p>
            <strong>Crear una tarea:</strong> Click en <strong>New Task</strong>{" "}
            → escribí título y descripción → se crea como un issue en GitHub.
          </p>
          <p>
            <strong>Iniciar un agente desde una tarea:</strong> Click en el
            ícono ▶ de cualquier tarea → elegí la especialización y el runner →
            el agente arranca con esa tarea como prompt inicial.
          </p>
          <p>
            <strong>Cerrar una tarea:</strong> Click en el ícono ✓ de la tarea
            para marcarla como resuelta (cierra el issue en GitHub).
          </p>
        </div>
        <Table
          headers={["Filtro", "Muestra"]}
          rows={[
            ["running", "Agentes activos en este momento"],
            ["idle", "Agentes sin tarea"],
            ["error", "Agentes que fallaron"],
          ]}
        />
      </div>
    ),
  },
  {
    id: "agents",
    icon: Bot,
    title: "Agentes",
    color: "bg-[#6d28d9]/10 text-[#6d28d9]",
    content: (
      <div className="space-y-4">
        <p>
          Un agente es una instancia de un runner de IA asignada a un
          repositorio y configurada con una especialización. Puede ejecutar
          tareas de desarrollo de forma autónoma.
        </p>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">Crear un agente</p>
          <div className="space-y-2">
            <Step n={1} text="Dentro de un repositorio, click en New Agent." />
            <Step n={2} text="Asignale una descripción de tarea." />
            <Step n={3} text="Elegí la especialización (define el comportamiento)." />
            <Step n={4} text="Elegí el runner (Claude Code, Gemini CLI o Codex)." />
            <Step n={5} text="Click en Create." />
          </div>
        </div>
        <p>
          <strong>Durante la ejecución:</strong> Los logs se muestran en tiempo
          real. Podés ver las herramientas que usa, sus respuestas y resultados.
          Click en <strong>Stop</strong> para detener el agente, o{" "}
          <strong>Send</strong> para enviarle un mensaje adicional mientras
          corre.
        </p>
        <p>
          <strong>Historial:</strong> Cada inicio del agente genera una sesión.
          Podés revisar el historial completo desde la vista de detalle.
        </p>
        <Table
          headers={["Estado", "Descripción"]}
          rows={[
            ["idle", "Listo para recibir una tarea"],
            ["running", "Ejecutando activamente"],
            ["paused", "Pausado"],
            ["error", "Falló en la última ejecución"],
          ]}
        />
      </div>
    ),
  },
  {
    id: "runners",
    icon: Zap,
    title: "Runners de IA",
    color: "bg-amber-50 text-amber-600",
    content: (
      <div className="space-y-4">
        <p>
          Pheron soporta múltiples runners de IA intercambiables. La app
          detecta automáticamente qué CLIs están instalados.
        </p>
        <Table
          headers={["Runner", "CLI requerido", "Descripción"]}
          rows={[
            ["Claude Code", "claude", "Runner por defecto, basado en Claude de Anthropic"],
            ["Gemini CLI", "gemini", "Runner basado en Gemini de Google"],
            ["OpenAI Codex", "codex", "Runner basado en modelos de OpenAI"],
          ]}
        />
        <p>
          Al hacer click en ▶ en una tarea o al crear un agente manualmente,
          aparece un selector de runner. Si la especialización está configurada
          para un runner específico, solo se habilitará ese.
        </p>
      </div>
    ),
  },
  {
    id: "specializations",
    icon: PuzzleIcon,
    title: "Especializaciones",
    color: "bg-pink-50 text-pink-600",
    content: (
      <div className="space-y-4">
        <p>
          Las especializaciones definen el <strong>comportamiento</strong> de un
          agente mediante un system prompt. Determinan qué tipo de tareas puede
          hacer y con qué estilo.
        </p>
        <Table
          headers={["Tipo", "Descripción"]}
          rows={[
            ["system", "Provistas por Pheron, no editables"],
            ["default", "Por defecto, personalizables"],
            ["user", "Creadas por vos"],
          ]}
        />
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">Crear una especialización</p>
          <div className="space-y-2">
            <Step n={1} text="Click en New Specialization." />
            <Step n={2} text={<>Completá <strong>Name</strong>, <strong>Slug</strong>, <strong>Description</strong> y <strong>Runner type</strong>.</>} />
            <Step n={3} text={<>Escribí el <strong>Base prompt</strong> — soporta las variables <Code>{"{{.RepoName}}"}</Code> y <Code>{"{{.RepoPath}}"}</Code>.</>} />
            <Step n={4} text="Click en Save." />
          </div>
        </div>
        <p>
          Si modificaste una especialización por defecto y querés volver a la
          versión original, click en <strong>Restore</strong> en el detalle de
          la especialización.
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
          Los skills son paquetes de habilidades reutilizables que se instalan
          en los runners para extender sus capacidades con conocimiento
          especializado o flujos de trabajo predefinidos.
        </p>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">Crear un skill</p>
          <div className="space-y-2">
            <Step n={1} text="Click en New Skill." />
            <Step n={2} text="Completá nombre, slug, descripción y runner type." />
            <Step n={3} text="Escribí el contenido del skill (en Markdown)." />
            <Step n={4} text="Click en Save." />
          </div>
        </div>
        <Table
          headers={["Método de importación", "Cómo"]}
          rows={[
            ["ZIP file", "Subís un archivo .zip con el contenido del skill"],
            ["Carpeta local", "Ingresás la ruta de una carpeta en tu máquina"],
            ["Path directo", "Importás desde una ruta de archivo específica"],
          ]}
        />
        <p>
          Usá <strong>Install</strong> para instalar el skill en el CLI del
          runner correspondiente, y <strong>Uninstall</strong> para quitarlo.
        </p>
      </div>
    ),
  },
  {
    id: "reports",
    icon: BarChart2,
    title: "Reportes de uso",
    color: "bg-green-50 text-green-600",
    content: (
      <div className="space-y-4">
        <p>
          La sección <strong>Reports</strong> muestra el consumo de tokens y
          costos estimados, desglosados por runner y período.
        </p>
        <Table
          headers={["Período", "Descripción"]}
          rows={[
            ["Today", "Solo el día de hoy"],
            ["This Week", "Semana actual"],
            ["This Month", "Mes actual"],
            ["All Time", "Todo el historial"],
          ]}
        />
        <p>Cada reporte incluye:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Total de tokens consumidos (input + output + cache)</li>
          <li>Costo estimado en USD</li>
          <li>Desglose por runner (Claude, Gemini, Codex)</li>
          <li>Comparación con período anterior — badge con delta porcentual</li>
          <li>Gráfico diario del consumo en el período seleccionado</li>
        </ul>
      </div>
    ),
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notificaciones",
    color: "bg-orange-50 text-orange-600",
    content: (
      <div className="space-y-4">
        <p>
          Pheron tiene un centro de notificaciones integrado que te avisa cuando
          un agente completa o falla una tarea. Accedé desde el ícono 🔔 en la
          barra superior derecha.
        </p>
        <Table
          headers={["Tipo", "Cuándo aparece"]}
          rows={[
            ["Agent completed", "El agente terminó su tarea con éxito"],
            ["Agent failed", "El agente encontró un error"],
          ]}
        />
      </div>
    ),
  },
  {
    id: "telegram",
    icon: MessageCircle,
    title: "Bot de Telegram",
    color: "bg-sky-50 text-sky-600",
    content: (
      <div className="space-y-4">
        <p>
          Controlá tus agentes y recibí notificaciones directamente desde
          Telegram, sin abrir la app.
        </p>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">Configuración</p>
          <div className="space-y-2">
            <Step n={1} text={<>Abrí <strong>Settings → Telegram</strong>.</>} />
            <Step n={2} text={<>Abrí <strong>@BotFather</strong> en Telegram, enviá <Code>/newbot</Code> y copiá el token.</>} />
            <Step n={3} text="Pegá el token en el campo Bot Token y guardá." />
            <Step n={4} text="Enviá cualquier mensaje a tu bot — la app detecta el Chat ID automáticamente." />
            <Step n={5} text="Activá el toggle Enable Telegram." />
          </div>
        </div>
        <Table
          headers={["Comando", "Descripción"]}
          rows={[
            ["/help", "Lista todos los comandos disponibles"],
            ["/status", "Muestra el estado de configuración del bot"],
            ["/repos", "Lista los repositorios con sus tareas pendientes"],
            ["/agents", "Muestra hasta 5 agentes (los corriendo primero)"],
            ["/running", "Muestra solo los agentes actualmente corriendo"],
            ["/tasks [repo]", "Muestra tareas pendientes filtradas por repo"],
            ["/newtask", "Flujo interactivo para crear y asignar una nueva tarea"],
            ["/continue", "Reanuda un agente pausado o idle"],
            ["/lastchat", "Muestra el último Session ID de Claude para un agente"],
          ]}
        />
        <p className="text-xs text-gray-400 bg-gray-100 rounded-lg px-3 py-2">
          🔒 Seguridad: el bot solo responde al <Code>chat_id</Code> configurado.
          Cualquier otro usuario que le escriba es ignorado.
        </p>
      </div>
    ),
  },
  {
    id: "settings",
    icon: Settings,
    title: "Configuración",
    color: "bg-gray-100 text-gray-600",
    content: (
      <div className="space-y-4">
        <p>
          Abrí <strong>Settings</strong> desde el sidebar para configurar las
          integraciones.
        </p>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">GitHub Token</p>
          <p>
            Necesario para clonar repos privados, listar, crear y cerrar
            issues. Requiere scope <Code>repo</Code>.
          </p>
          <div className="space-y-2">
            <Step n={1} text="Ir a GitHub Settings → Developer settings → Personal access tokens." />
            <Step n={2} text="Click en Generate new token (classic)." />
            <Step n={3} text={<>Activar scope <Code>repo</Code> y copiar el token.</>} />
            <Step n={4} text="Pegar en Pheron → Settings → GitHub Token." />
          </div>
        </div>
        <Table
          headers={["Badge", "Significado"]}
          rows={[
            ["✓ Connected", "Integración activa y funcionando"],
            ["⚠ Incomplete", "Falta configuración"],
            ["✗ Disabled", "Integración desactivada manualmente"],
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
            Documentación
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Cómo usar Pheron
          </h2>
          <p className="text-lg text-gray-500">
            Todo lo que necesitás saber para gestionar tus agentes, repositorios
            y runners de IA desde un solo lugar.
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
