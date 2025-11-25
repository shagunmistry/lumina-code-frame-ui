import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Terminal,
  Wand2,
  Loader2,
  Sparkles,
  Bug,
  FileType,
} from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CodeFrameProps, AIActionType } from "../types";
import { GeminiService } from "../services/geminiService";

const gradients = {
  neon: "from-pink-500 via-purple-500 to-cyan-500",
  sunset: "from-orange-500 via-red-500 to-yellow-500",
  ocean: "from-blue-600 via-teal-400 to-emerald-400",
  forest: "from-green-600 via-emerald-500 to-lime-500",
};

const paddingMap = {
  sm: "p-4",
  md: "p-8",
  lg: "p-12",
  xl: "p-16",
};

export const CodeFrame: React.FC<CodeFrameProps> = ({
  code: initialCode,
  language = "typescript",
  title = "Untitled-1",
  theme = "neon",
  padding = "md",
  showLineNumbers = true,
  isEditable = false,
  wrapLongLines = false,
  apiKey,
  onCodeChange,
}) => {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [geminiService, setGeminiService] = useState<GeminiService | null>(
    null
  );
  const [aiMessage, setAiMessage] = useState<string | null>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    if (apiKey) {
      setGeminiService(new GeminiService(apiKey));
    }
  }, [apiKey]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAIAction = async (action: AIActionType) => {
    if (!geminiService) {
      setAiMessage("Please add an API Key above to use AI features.");
      setTimeout(() => setAiMessage(null), 3000);
      return;
    }

    setIsProcessing(true);
    setAiMessage(null);

    try {
      const result = await geminiService.performActionOnCode(code, action);

      if (action === AIActionType.EXPLAIN) {
        setAiMessage(result);
      } else {
        // Strip potential markdown code blocks from response if Gemini adds them despite prompt
        const cleanCode = result
          .replace(/^```[a-z]*\n/, "")
          .replace(/\n```$/, "");
        setCode(cleanCode);
        if (onCodeChange) onCodeChange(cleanCode);
      }
    } catch (error) {
      setAiMessage("Error processing request.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative ${paddingMap[padding]} rounded-3xl bg-gradient-to-br ${gradients[theme]} shadow-2xl transition-all duration-300`}
    >
      <div className="relative rounded-xl overflow-hidden bg-dark-900/95 backdrop-blur-sm border border-white/10 shadow-2xl ring-1 ring-black/50">
        {/* Header / Window Controls */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm" />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-xs font-mono text-gray-400 opacity-70">
            <Terminal size={12} />
            <span>{title}</span>
          </div>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check size={16} className="text-green-400" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="relative group">
          <div className="max-h-[500px] overflow-y-auto text-sm font-mono scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <SyntaxHighlighter
              language={language}
              style={atomOneDark}
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                background: "transparent",
                fontSize: "0.9rem",
                lineHeight: "1.5",
              }}
              showLineNumbers={showLineNumbers}
              wrapLines={true}
              wrapLongLines={wrapLongLines}
            >
              {code}
            </SyntaxHighlighter>
          </div>

          {/* AI Overlay Controls - Appear on Hover */}
          {apiKey && (
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute bottom-4 right-4 flex gap-2"
            >
              <button
                onClick={() => handleAIAction(AIActionType.REFACTOR)}
                disabled={isProcessing}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-200 text-xs rounded-lg border border-blue-500/30 backdrop-blur-md transition-all"
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin" size={12} />
                ) : (
                  <Wand2 size={12} />
                )}
                Refactor
              </button>
              <button
                onClick={() => handleAIAction(AIActionType.ADD_TYPES)}
                disabled={isProcessing}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/40 text-purple-200 text-xs rounded-lg border border-purple-500/30 backdrop-blur-md transition-all"
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin" size={12} />
                ) : (
                  <FileType size={12} />
                )}
                Types
              </button>
              <button
                onClick={() => handleAIAction(AIActionType.FIX_BUGS)}
                disabled={isProcessing}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-200 text-xs rounded-lg border border-red-500/30 backdrop-blur-md transition-all"
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin" size={12} />
                ) : (
                  <Bug size={12} />
                )}
                Fix
              </button>
              <button
                onClick={() => handleAIAction(AIActionType.EXPLAIN)}
                disabled={isProcessing}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-600/20 hover:bg-green-600/40 text-green-200 text-xs rounded-lg border border-green-500/30 backdrop-blur-md transition-all"
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin" size={12} />
                ) : (
                  <Sparkles size={12} />
                )}
                Explain
              </button>
            </motion.div>
          )}
        </div>

        {/* AI Message Area */}
        <AnimatePresence>
          {aiMessage && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/10 bg-white/5 px-4 py-3"
            >
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <Sparkles
                  size={14}
                  className="text-yellow-400 mt-0.5 shrink-0"
                />
                <p>{aiMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
