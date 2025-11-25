import React, { useState, useRef } from "react";
import { CodeFrame } from "lumina-code-frame";
import { GeminiService } from "../services/geminiService";
import {
  Settings,
  Sparkles,
  Loader2,
  Key,
  RefreshCw,
  LayoutTemplate,
  Maximize,
  Move,
  WrapText,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

interface PlaygroundProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const DEFAULT_CODE = `import React from 'react';

const Greeting = ({ name }: { name: string }) => {
  return (
    <div className="p-4 bg-blue-500 text-white rounded-lg">
      <h1>Hello, {name}!</h1>
      <p>Welcome to the Lumina Playground.</p>
    </div>
  );
};`;

export const Playground: React.FC<PlaygroundProps> = ({
  apiKey,
  setApiKey,
}) => {
  // UI State
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState("typescript");
  const [theme, setTheme] = useState<"neon" | "sunset" | "ocean" | "forest">(
    "neon"
  );
  const [padding, setPadding] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [title, setTitle] = useState("Component.tsx");
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [wrapLongLines, setWrapLongLines] = useState(false);

  // AI State
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Download State
  const codeFrameRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) return;

    setIsGenerating(true);
    try {
      const service = new GeminiService(apiKey);
      const generated = await service.generateCodeFromPrompt(prompt);
      const cleanCode = generated
        .replace(/^```[a-z]*\n/, "")
        .replace(/\n```$/, "");
      setCode(cleanCode);
    } catch (error) {
      console.error(error);
      alert("Failed to generate code.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!codeFrameRef.current) return;

    setIsDownloading(true);
    try {
      // Capture the code frame as canvas
      const canvas = await html2canvas(codeFrameRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        logging: false,
      });

      // Create a new canvas to add watermark
      const finalCanvas = document.createElement("canvas");
      const ctx = finalCanvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size with extra padding for watermark
      finalCanvas.width = canvas.width;
      finalCanvas.height = canvas.height + 60; // Extra space for watermark

      // Fill background
      ctx.fillStyle = "#0f172a"; // slate-950
      ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

      // Draw the captured image
      ctx.drawImage(canvas, 0, 0);

      // Add watermark
      ctx.font = "bold 28px sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.textAlign = "right";
      ctx.fillText(
        "LuminaFrame",
        finalCanvas.width - 40,
        finalCanvas.height - 20
      );

      // Download
      finalCanvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${title.replace(/\.[^/.]+$/, "")}-lumina-frame.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error("Failed to download image:", error);
      alert("Failed to download image.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid lg:grid-cols-[400px_1fr]">
      {/* Left Sidebar: Controls */}
      <div className="border-r border-white/5 bg-slate-900/50 p-6 overflow-y-auto max-h-[calc(100vh-64px)] custom-scrollbar">
        {/* API Key Section */}
        <div className="mb-8 p-4 rounded-xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20">
          <div className="flex items-center gap-2 mb-3 text-indigo-300 font-semibold text-sm">
            <Key size={16} />
            Gemini API Access
          </div>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste API Key here..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none mb-2"
          />
          <p className="text-[10px] text-gray-500">
            Required for AI generation and refactoring features.
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              className="text-indigo-400 hover:underline ml-1"
            >
              Get Key
            </a>
          </p>
        </div>

        {/* AI Generator */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
            <Sparkles size={14} className="text-cyan-400" />
            AI Generator
          </h3>
          <form onSubmit={handleGenerate}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the code you want (e.g., 'A Python script to scrape a website')..."
              className="w-full h-24 bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-gray-300 focus:border-cyan-500 outline-none resize-none mb-3"
            />
            <button
              type="submit"
              disabled={!apiKey || isGenerating}
              className={`w-full py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                !apiKey
                  ? "bg-slate-800 text-gray-500 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20"
              }`}
            >
              {isGenerating ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <Sparkles size={14} />
              )}
              Generate Code
            </button>
          </form>
        </div>

        <hr className="border-white/5 mb-8" />

        {/* Appearance Controls */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2">
            <Settings size={14} />
            Appearance
          </h3>

          {/* Theme Selector */}
          <div>
            <label className="text-xs text-gray-500 mb-2 block">
              Window Theme
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["neon", "sunset", "ocean", "forest"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all border ${
                    theme === t
                      ? "bg-slate-800 border-cyan-500/50 text-cyan-400"
                      : "bg-slate-950 border-slate-800 text-gray-400 hover:border-slate-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Padding Selector */}
          <div>
            <label className="text-xs text-gray-500 mb-2 block flex items-center gap-2">
              <Move size={12} /> Padding
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["sm", "md", "lg", "xl"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPadding(p)}
                  className={`py-1.5 rounded-lg text-xs font-medium uppercase transition-all border ${
                    padding === p
                      ? "bg-slate-800 border-cyan-500/50 text-cyan-400"
                      : "bg-slate-950 border-slate-800 text-gray-400 hover:border-slate-600"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Language Input */}
          <div>
            <label className="text-xs text-gray-500 mb-2 block">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-gray-300 outline-none focus:border-cyan-500"
            >
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
              <option value="rust">Rust</option>
              <option value="go">Go</option>
              <option value="sql">SQL</option>
            </select>
          </div>

          {/* Title Input */}
          <div>
            <label className="text-xs text-gray-500 mb-2 block">
              Window Title
            </label>
            <div className="relative">
              <LayoutTemplate
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
              />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-300 outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Line Numbers</span>
            <button
              onClick={() => setShowLineNumbers(!showLineNumbers)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                showLineNumbers ? "bg-cyan-600" : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${
                  showLineNumbers ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400 flex items-center gap-2">
              {/* Optional Icon if imported */}
              {/* <WrapText size={14} /> */}
              Word Wrap
            </span>
            <button
              onClick={() => setWrapLongLines(!wrapLongLines)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                wrapLongLines ? "bg-cyan-600" : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${
                  wrapLongLines ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Right Content: Preview */}
      <div className="bg-slate-950 relative overflow-hidden flex flex-col h-[calc(100vh-64px)]">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-500 opacity-20 blur-[100px]"></div>

        {/* Toolbar */}
        <div className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-slate-900/30 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <RefreshCw size={14} />
            <span>Live Preview</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-sm rounded-lg font-medium transition-all shadow-lg shadow-cyan-900/20"
              title="Download as image with LuminaFrame watermark"
            >
              {isDownloading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Download size={16} />
              )}
              Download
            </button>
            <div className="text-xs text-gray-600 font-mono">
              {padding} / {theme} / {language}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
          <motion.div ref={codeFrameRef} layout className="w-full max-w-2xl">
            <CodeFrame
              code={code}
              language={language}
              title={title}
              theme={theme}
              padding={padding}
              showLineNumbers={showLineNumbers}
              wrapLongLines={wrapLongLines}
              apiKey={apiKey}
              onCodeChange={setCode}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
