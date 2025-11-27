import React from "react";
import { CodeFrame } from "lumina-code-frame";
import { ArrowRight, Box, Code2, Copy, Cpu, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { ViewState } from "../App";

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const themes = ["ocean", "neon", "sunset", "forest", "noir", "midnight", "warm"];
  const [currentThemeIndex, setCurrentThemeIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThemeIndex((prev) => (prev + 1) % themes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [themes.length]);

  return (
    <article className="font-sans overflow-x-hidden">
      <section className="relative pt-20 pb-20 px-6" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.header
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-6" role="status" aria-label="Version release">
              <Zap size={12} className="fill-cyan-400" aria-hidden="true" />
              v1.0.0 Released
            </div>
            <h1 id="hero-heading" className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Present code with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                intelligence.
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
              Beautiful React code component with AI-powered explanations, syntax highlighting for 100+ programming languages, and seamless Gemini integration. Transform code blocks into stunning, shareable windows.
            </p>

            <nav className="flex flex-col sm:flex-row gap-4" aria-label="Quick actions">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 font-mono text-sm text-gray-400" role="region" aria-label="Installation command">
                <span className="text-cyan-400" aria-hidden="true">$</span>
                <span aria-label="npm install command">npm install lumina-code-frame</span>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      "npm install lumina-code-frame"
                    )
                  }
                  className="ml-4 hover:text-white"
                  aria-label="Copy npm install command to clipboard"
                  title="Copy to clipboard"
                >
                  <Copy size={14} aria-hidden="true" />
                </button>
              </div>
              <button
                onClick={() => onNavigate("playground")}
                className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all flex items-center justify-center gap-2"
                aria-label="Navigate to interactive playground"
              >
                Try Playground <ArrowRight size={16} aria-hidden="true" />
              </button>
            </nav>

            <div className="mt-6">
              <a href="https://www.producthunt.com/products/lumina-code-frame?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-lumina&#0045;code&#0045;frame" target="_blank" rel="noopener noreferrer">
                <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1042820&theme=dark&t=1764262583081" alt="Lumina Code Frame - Integrate a beautiful Code preview on your website. | Product Hunt" style={{width: '250px', height: '54px'}} width="250" height="54" />
              </a>
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative transition-all duration-1000"
            role="figure"
            aria-label="Example code demonstration"
          >
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl" aria-hidden="true" />

            <CodeFrame
              code={`import { CodeFrame } from 'lumina-code-frame';

const MyComponent = () => (
  <CodeFrame
    code="console.log('Hello World')"
    theme="neon"
    aiEnabled={true}
  />
);`}
              theme={themes[currentThemeIndex] as any}
              language="typescript"
              title="ExampleUsage.tsx"
            />
          </motion.div>
        </div>
      </section>

      <section
        id="features"
        className="py-20 px-6 bg-slate-900/30 border-y border-white/5"
        aria-labelledby="features-heading"
      >
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16">
            <h2 id="features-heading" className="text-3xl font-bold mb-4">
              Enterprise-Grade Code Presentation for React Developers
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to showcase code professionally with AI-powered intelligence.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8" role="list">
            {[
              {
                icon: <Code2 className="text-pink-400" />,
                title: "Advanced Syntax Highlighting",
                desc: "Support for 100+ programming languages including JavaScript, TypeScript, Python, Java, Go, Rust, and more. Automatic language detection with vibrant, customizable themes.",
                keywords: "syntax highlighting, code formatting, multi-language support"
              },
              {
                icon: <Cpu className="text-cyan-400" />,
                title: "AI-Powered Code Intelligence",
                desc: "Integrated Gemini AI lets developers refactor code, get instant explanations, detect bugs, and receive intelligent suggestions directly within the component.",
                keywords: "AI code assistant, code refactoring, bug detection"
              },
              {
                icon: <Box className="text-purple-400" />,
                title: "Fully Customizable Design",
                desc: "Complete control over appearance with theme props, custom gradients, configurable padding, shadows, window controls, and responsive layouts for any design system.",
                keywords: "customizable UI, theming, responsive design"
              },
            ].map((feature, i) => (
              <motion.article
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-white/10 transition-all"
                role="listitem"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center mb-4" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{feature.desc}</p>
                <span className="text-xs text-gray-600 italic" aria-label="Related keywords">{feature.keywords}</span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-white/5 py-12 text-center text-gray-500 text-sm" role="contentinfo">
        <p>
          © 2024 Lumina Code Frame.
          <span className="mx-2" aria-hidden="true">|</span>
          Open-source React component library for developers
          <span className="mx-2" aria-hidden="true">|</span>
          Built with React, TypeScript, Tailwind CSS & Google Gemini AI
        </p>
        <nav className="mt-4" aria-label="Footer links">
          <span className="text-gray-600 text-xs">
            Keywords: React code component, syntax highlighter, AI code assistant, developer tools, npm package, TypeScript support
          </span>
        </nav>
      </footer>
    </article>
  );
};
