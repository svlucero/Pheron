import { Github, Twitter } from "lucide-react";
import Image from "next/image";

const links = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Agents", href: "#agents" },
    { label: "Pricing", href: "#download" },
  ],
  Developers: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Custom Runners", href: "#" },
    { label: "GitHub", href: "https://github.com/svlucero/pheron" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "https://blog.littlesoft-ai.com/en" },
    { label: "Changelog", href: "#" },
    { label: "Contact", href: "mailto:contact@littlesoft-ai.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#6d28d9] rounded-lg flex items-center justify-center">
                <Image src="/icon.png" alt="Pheron" width={20} height={20} />
              </div>
              <span className="font-semibold text-gray-900 text-lg">Pheron</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              The command center for managing AI agents across your software development workflow.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://github.com/svlucero/pheron" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                {group}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Pheron. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
