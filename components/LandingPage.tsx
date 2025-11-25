import React from "react";
import { CodeFrame } from "lumina-code-frame";
import { ArrowRight, Box, Code2, Copy, Cpu, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { ViewState } from "../App";

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-6">
              <Zap size={12} className="fill-cyan-400" />
              v1.0.0 Released
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Present code with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                intelligence.
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
              The React component that turns boring code blocks into beautiful,
              shareable, AI-enhanced windows. Powered by Gemini.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 font-mono text-sm text-gray-400">
                <span className="text-cyan-400">$</span> npm install
                lumina-code-frame
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      "npm install lumina-code-frame"
                    )
                  }
                  className="ml-4 hover:text-white"
                >
                  <Copy size={14} />
                </button>
              </div>
              <button
                onClick={() => onNavigate("playground")}
                className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all flex items-center justify-center gap-2"
              >
                Try Playground <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative background elements */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl" />

            <CodeFrame
              code={`import { CodeFrame } from 'lumina-code-frame';

const MyComponent = () => (
  <CodeFrame 
    code="console.log('Hello World')" 
    theme="neon" 
    aiEnabled={true} 
  />
);`}
              theme="neon"
              language="typescript"
              title="ExampleUsage.tsx"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="py-20 px-6 bg-slate-900/30 border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              More than just a highlighter
            </h2>
            <p className="text-gray-400">
              Everything you need to showcase code professionally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 className="text-pink-400" />,
                title: "Syntax Highlighting",
                desc: "Supports 100+ languages with automatic detection and vibrant themes.",
              },
              {
                icon: <Cpu className="text-cyan-400" />,
                title: "Gemini Integration",
                desc: "Let users refactor, explain, or fix bugs directly within the code window.",
              },
              {
                icon: <Box className="text-purple-400" />,
                title: "Customizable UI",
                desc: "Control gradients, padding, shadows, and window controls with simple props.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-white/5 py-12 text-center text-gray-500 text-sm">
        <p>© 2024 Lumina Code Frame. Built with React, Tailwind & Gemini.</p>
      </footer>
    </div>
  );
};
