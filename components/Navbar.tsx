import React from 'react';
import { Box, Github } from 'lucide-react';
import { ViewState } from '../App';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-cyan-400 font-bold text-xl tracking-tighter cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Box className="fill-cyan-400/20" />
          Lumina<span className="text-white">Frame</span>
        </div>
        
        <div className="flex items-center gap-1 md:gap-6 text-sm font-medium text-gray-400">
          <button 
            onClick={() => onNavigate('home')}
            className={`hover:text-white transition-colors px-3 py-1 rounded-md ${currentView === 'home' ? 'text-white bg-white/5' : ''}`}
          >
            Features
          </button>
          <button 
            onClick={() => onNavigate('playground')}
            className={`hover:text-white transition-colors px-3 py-1 rounded-md ${currentView === 'playground' ? 'text-white bg-white/5' : ''}`}
          >
            Playground
          </button>
          <button 
            onClick={() => onNavigate('docs')}
            className={`hover:text-white transition-colors px-3 py-1 rounded-md ${currentView === 'docs' ? 'text-white bg-white/5' : ''}`}
          >
            Docs
          </button>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/shagunmistry/lumina-code-frame-ui" 
            target="_blank"
            className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
          {currentView !== 'playground' && (
            <button 
              onClick={() => onNavigate('playground')}
              className="bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-cyan-50 transition-colors"
            >
              Try Demo
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};