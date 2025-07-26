'use client';

import { useState, useEffect } from 'react';
import { UserRequirements, RecommendationResult } from '@/types';
import { recommendationEngine } from '@/lib/recommendationEngine';
import InputForm from '@/components/InputForm';
import RecommendationCard from '@/components/RecommendationCard';
import AlternativeStacks from '@/components/AlternativeStacks';
import ExportOptions from '@/components/ExportOptions';
import { Lightbulb, Zap, Target } from 'lucide-react';

// Matrix Rain Component
const MatrixRain = () => {
  const [drops, setDrops] = useState<Array<{id: number, x: number, delay: number, duration: number, char: string}>>([]);
  
  useEffect(() => {
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const newDrops = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      char: characters[Math.floor(Math.random() * characters.length)]
    }));
    setDrops(newDrops);
  }, []);

  if (drops.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="matrix-char"
          style={{
            left: `${drop.x}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`
          }}
        >
          {drop.char}
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [requirements, setRequirements] = useState<UserRequirements | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (userRequirements: UserRequirements) => {
    setIsLoading(true);
    setRequirements(userRequirements);
    
    try {
      const result = await recommendationEngine.generateRecommendations(userRequirements);
      setRecommendations(result);
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRequirements(null);
    setRecommendations(null);
  };

  return (
    <div className="min-h-screen relative">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Header */}
      <header className="terminal-window mx-4 mt-4 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 pt-12">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold neon-text glitch" style={{ fontFamily: 'Orbitron, monospace' }}>
                &gt; TECH_STACK_ADVISOR.EXE
              </h1>
              <p className="neon-cyan mt-2 text-lg">
                [INITIALIZING] AI-POWERED TECHNOLOGY MATRIX v2.1
              </p>
              <div className="flex items-center mt-2 text-sm">
                <span className="neon-green">STATUS:</span>
                <span className="neon-pink ml-2 animate-pulse">● ONLINE</span>
                <span className="neon-green ml-4">SECURITY:</span>
                <span className="neon-cyan ml-2">ENCRYPTED</span>
              </div>
            </div>
            {recommendations && (
              <button
                onClick={handleReset}
                className="retro-button glitch"
              >
                &gt; NEW_SCAN
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {!recommendations ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="terminal-window p-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold neon-text" style={{ fontFamily: 'Orbitron, monospace' }}>
                  &gt; SCANNING_TECHNOLOGY_MATRIX...
                </h2>
                <p className="text-lg neon-cyan max-w-3xl mx-auto">
                  [ACCESSING DATABASE] Real-time tech intelligence • AI-powered analysis • Quantum recommendations
                  <br />
                  <span className="neon-green">[SECURITY_LEVEL: MAXIMUM]</span> • <span className="neon-pink">[STATUS: OPERATIONAL]</span>
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="terminal-window p-6 bg-opacity-50">
                <div className="neon-border w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 bg-green-900/20">
                  <Zap className="h-6 w-6 neon-green" />
                </div>
                <h3 className="font-semibold neon-text mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                  REAL-TIME_INTEL
                </h3>
                <p className="neon-cyan text-sm">
                  [LIVE_FEED] Technology trends • Security patches • Community metrics
                </p>
              </div>
              <div className="terminal-window p-6 bg-opacity-50">
                <div className="neon-border w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 bg-purple-900/20">
                  <Target className="h-6 w-6 neon-purple" />
                </div>
                <h3 className="font-semibold neon-text mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                  NEURAL_MATCHING
                </h3>
                <p className="neon-cyan text-sm">
                  [AI_CORE] Personalized algorithms • Project analysis • Team optimization
                </p>
              </div>
              <div className="terminal-window p-6 bg-opacity-50">
                <div className="neon-border w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 bg-pink-900/20">
                  <Lightbulb className="h-6 w-6 neon-pink" />
                </div>
                <h3 className="font-semibold neon-text mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                  EXPERT_PROTOCOL
                </h3>
                <p className="neon-cyan text-sm">
                  [DATABASE] Industry insights • Best practices • Strategic guidance
                </p>
              </div>
            </div>

            {/* Input Form */}
            <div className="terminal-window p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold neon-text" style={{ fontFamily: 'Orbitron, monospace' }}>
                  &gt; INITIALIZE_PROJECT_SCAN
                </h3>
                <p className="neon-cyan mt-2">[INPUT_REQUIRED] Enter project parameters for analysis...</p>
              </div>
              <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="terminal-window p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold neon-text" style={{ fontFamily: 'Orbitron, monospace' }}>
                  &gt; SCAN_COMPLETE
                </h2>
                <p className="neon-cyan">[ANALYSIS_FINISHED] Optimal technology stack identified</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="neon-green">CONFIDENCE:</span>
                  <span className="neon-pink ml-2">{recommendations.confidence}%</span>
                  <span className="neon-green ml-4">ALTERNATIVES:</span>
                  <span className="neon-cyan ml-2">{recommendations.alternatives.length} FOUND</span>
                </div>
              </div>
            </div>
            
            {/* Primary Recommendation */}
            <RecommendationCard 
              stack={recommendations.primaryStack}
              liveInsights={recommendations.liveInsights}
              confidence={recommendations.confidence}
              reasoning={recommendations.reasoning}
              isPrimary={true}
            />

            {/* Alternative Stacks */}
            {recommendations.alternatives.length > 0 && (
              <AlternativeStacks stacks={recommendations.alternatives} />
            )}

            {/* Export Options */}
            <ExportOptions 
              recommendations={recommendations}
              requirements={requirements!}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2025 Developed by The Wagmi Resources. Powered by AI and real-time web data.</p>
            <p className="mt-2 text-sm">Helping developers make informed technology decisions.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
