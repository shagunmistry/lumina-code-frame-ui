import React from 'react';
import { CodeFrame } from './CodeFrame';
import { Terminal, Zap, Palette, Cpu, Box } from 'lucide-react';

export const Documentation: React.FC = () => {
  const exampleCode = `const greeting = "Hello World";\nconsole.log(greeting);`;

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-screen text-slate-300">
      {/* Docs Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 border-r border-white/5 bg-slate-900/30 pt-8 pb-20 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="px-6 space-y-8">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Getting Started</h4>
            <ul className="space-y-3 text-sm border-l border-white/10 ml-1">
              <li><a href="#installation" className="block pl-4 -ml-px border-l border-transparent hover:border-cyan-400 hover:text-cyan-400 transition-colors">Installation</a></li>
              <li><a href="#usage" className="block pl-4 -ml-px border-l border-transparent hover:border-cyan-400 hover:text-cyan-400 transition-colors">Basic Usage</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Customization</h4>
            <ul className="space-y-3 text-sm border-l border-white/10 ml-1">
               <li><a href="#props" className="block pl-4 -ml-px border-l border-transparent hover:border-cyan-400 hover:text-cyan-400 transition-colors">Props API</a></li>
              <li><a href="#themes" className="block pl-4 -ml-px border-l border-transparent hover:border-cyan-400 hover:text-cyan-400 transition-colors">Themes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Intelligence</h4>
            <ul className="space-y-3 text-sm border-l border-white/10 ml-1">
              <li><a href="#ai" className="block pl-4 -ml-px border-l border-transparent hover:border-cyan-400 hover:text-cyan-400 transition-colors">AI Integration</a></li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 px-6 md:px-16 py-12 pb-32">
        <div className="max-w-3xl space-y-20">
          
          {/* Header */}
          <div className="space-y-4 border-b border-white/5 pb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3">
               <Box className="text-cyan-400" size={40} />
               Documentation
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              Everything you need to know to create beautiful, intelligent code presentations.
            </p>
          </div>

          <section id="installation" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Terminal size={24} className="text-cyan-400" />
              Installation
            </h2>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 font-mono text-sm text-gray-300 shadow-lg relative group">
              <span className="text-purple-400">npm</span> install lumina-code-frame framer-motion lucide-react @google/genai
              <button 
                className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors"
                onClick={() => navigator.clipboard.writeText('npm install lumina-code-frame framer-motion lucide-react @google/genai')}
              >
                Copy
              </button>
            </div>
          </section>

          <section id="usage" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Zap size={24} className="text-yellow-400" />
              Basic Usage
            </h2>
            <div className="space-y-6">
              <p className="leading-relaxed">
                Import the <code className="bg-white/10 px-1.5 py-0.5 rounded text-white text-sm">CodeFrame</code> component and pass your code snippet.
              </p>
              <div className="border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                 <CodeFrame 
                  title="Example.tsx"
                  language="tsx"
                  theme="ocean"
                  padding="md"
                  code={`import { CodeFrame } from 'lumina-code-frame';

export default function Page() {
  return (
    <CodeFrame 
      code="console.log('Lumina is awesome!');" 
      language="typescript" 
      title="Console.ts"
    />
  );
}`}
                />
              </div>
            </div>
          </section>

          <section id="props" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-white mb-6">Props API</h2>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-white">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Prop</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">Default</th>
                    <th className="px-6 py-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ['code', 'string', '-', 'The source code to display'],
                    ['language', 'string', 'typescript', 'Language for syntax highlighting'],
                    ['title', 'string', 'Untitled-1', 'Filename shown in window header'],
                    ['theme', 'enum', 'neon', 'Visual theme preset'],
                    ['padding', 'enum', 'md', "'sm' | 'md' | 'lg' | 'xl'"],
                    ['showLineNumbers', 'boolean', 'true', 'Toggle line numbers'],
                    ['apiKey', 'string', 'undefined', 'Gemini API key for AI features'],
                    ['onCodeChange', 'function', '-', 'Callback when code is edited or generated'],
                  ].map(([prop, type, def, desc], i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-cyan-400 font-mono font-medium">{prop}</td>
                      <td className="px-6 py-4 text-purple-300 font-mono">{type}</td>
                      <td className="px-6 py-4 text-gray-500 font-mono">{def}</td>
                      <td className="px-6 py-4 text-gray-300">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="themes" className="scroll-mt-24">
             <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Palette size={24} className="text-pink-400" />
              Themes
            </h2>
            <p className="mb-8">Lumina comes with 4 handcrafted gradients to match any aesthetic.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {['neon', 'sunset', 'ocean', 'forest'].map((theme) => (
                 <div key={theme} className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider pl-1">{theme}</h3>
                    <div className="transform transition-transform hover:scale-[1.02]">
                      <CodeFrame 
                        code={exampleCode} 
                        language="typescript" 
                        theme={theme as any} 
                        padding="sm"
                        title={`${theme}.ts`}
                        showLineNumbers={false}
                      />
                    </div>
                 </div>
               ))}
            </div>
          </section>

          <section id="ai" className="scroll-mt-24">
             <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
               <Cpu size={24} className="text-blue-400" />
               AI Integration
             </h2>
             <div className="space-y-6">
                <p className="leading-relaxed">
                  Lumina isn't just a pretty face. By passing a Google Gemini <code className="bg-white/10 px-1.5 py-0.5 rounded text-white text-sm">apiKey</code>, 
                  you unlock context-aware actions like <strong>Refactor</strong>, <strong>Add Types</strong>, and <strong>Explain</strong>.
                </p>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                  <h3 className="text-blue-200 font-bold mb-2">How it works</h3>
                  <ul className="list-disc list-inside space-y-2 text-blue-100/70 text-sm">
                    <li>The API key is used to initialize a Gemini client.</li>
                    <li>Code is sent to the model along with a specialized system prompt.</li>
                    <li>The result is streamed back into the CodeFrame or displayed as a message.</li>
                  </ul>
                </div>

                <h3 className="text-lg font-bold text-white mt-8">Example</h3>
                <CodeFrame 
                  title="AIComponent.tsx"
                  language="tsx"
                  theme="forest"
                  code={`import { CodeFrame } from 'lumina-code-frame';

const Example = () => {
  // ⚠️ Important: Use environment variables for keys!
  const API_KEY = process.env.REACT_APP_GEMINI_KEY;

  return (
    <CodeFrame 
      code="const x = 10; // I need types!" 
      apiKey={API_KEY}
      title="UnsafeCode.ts"
    />
  );
};`}
                />
             </div>
          </section>

        </div>
      </div>
    </div>
  );
};