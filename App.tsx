import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Playground } from './components/Playground';
import { Documentation } from './components/Documentation';
import { Navbar } from './components/Navbar';

export type ViewState = 'home' | 'playground' | 'docs';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  // Lift API key state to App so it persists across navigation
  const [globalApiKey, setGlobalApiKey] = useState('');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <LandingPage onNavigate={setCurrentView} />;
      case 'playground':
        return <Playground apiKey={globalApiKey} setApiKey={setGlobalApiKey} />;
      case 'docs':
        return <Documentation />;
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="antialiased min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <main className="pt-16">
        {renderView()}
      </main>
    </div>
  );
}

export default App;