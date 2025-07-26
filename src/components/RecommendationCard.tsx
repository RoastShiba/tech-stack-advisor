'use client';

import { TechStack, RecommendationResult } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { 
  Star, 
  Clock, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Activity,
  ExternalLink,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface RecommendationCardProps {
  stack: TechStack;
  liveInsights: RecommendationResult['liveInsights'];
  confidence: number;
  reasoning: string;
  isPrimary?: boolean;
}

export default function RecommendationCard({ 
  stack, 
  liveInsights, 
  confidence, 
  reasoning, 
  isPrimary = false 
}: RecommendationCardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'free': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={`terminal-window p-6 ${isPrimary ? 'border-2 border-green-400 shadow-lg shadow-green-500/20' : 'border border-green-500/30'}`}>
      {isPrimary && (
        <div className="flex items-center justify-between mb-4">
          <Badge className="bg-green-500/20 border border-green-400 text-green-400 px-3 py-1 font-mono">
            <Star className="w-4 h-4 mr-1" />
            [OPTIMAL] RECOMMENDED_STACK
          </Badge>
          <div className="px-3 py-1 border border-green-400 text-green-400 text-sm font-mono bg-black/50">
            CONFIDENCE: {confidence}%
          </div>
        </div>
      )}

      {/* Stack Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold neon-green mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
          &gt; {stack.name.toUpperCase()}
        </h3>
        <p className="text-green-300 mb-4 font-mono">[INFO] {stack.efficiency}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-cyan-500/20 border border-cyan-400 text-cyan-400 font-mono">
            [LEVEL] {stack.complexity.toUpperCase()}
          </Badge>
          <Badge className="bg-yellow-500/20 border border-yellow-400 text-yellow-400 font-mono">
            <DollarSign className="w-3 h-3 mr-1" />
            [COST] {stack.cost.toUpperCase()}
          </Badge>
          <Badge className="bg-blue-500/20 border border-blue-400 text-blue-400 font-mono">
            <Clock className="w-3 h-3 mr-1" />
            [TIME] {stack.timeline}
          </Badge>
          <Badge className="bg-purple-500/20 border border-purple-400 text-purple-400 font-mono">
            [TYPE] {stack.category.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h4 className="font-semibold neon-green flex items-center" style={{ fontFamily: 'Orbitron, monospace' }}>
            <Activity className="w-4 h-4 mr-2" />
            &gt; TECH_STACK_ANALYSIS
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-black/30 border border-green-500/30 rounded-lg">
              <div>
                <span className="font-medium text-green-400 font-mono">[FRONTEND]</span>
                <p className="text-sm text-green-300 font-mono">{stack.frontend.description}</p>
              </div>
              <Badge className="bg-blue-500/20 border border-blue-400 text-blue-400 font-mono">{stack.frontend.name}</Badge>
            </div>
            
            {stack.backend && (
              <div className="flex items-center justify-between p-3 bg-black/30 border border-green-500/30 rounded-lg">
                <div>
                  <span className="font-medium text-green-400 font-mono">[BACKEND]</span>
                  <p className="text-sm text-green-300 font-mono">{stack.backend.description}</p>
                </div>
                <Badge className="bg-green-500/20 border border-green-400 text-green-400 font-mono">{stack.backend.name}</Badge>
              </div>
            )}
            
            {stack.database && (
              <div className="flex items-center justify-between p-3 bg-black/30 border border-green-500/30 rounded-lg">
                <div>
                  <span className="font-medium text-green-400 font-mono">[DATABASE]</span>
                  <p className="text-sm text-green-300 font-mono">{stack.database.description}</p>
                </div>
                <Badge className="bg-purple-500/20 border border-purple-400 text-purple-400 font-mono">{stack.database.name}</Badge>
              </div>
            )}
            
            <div className="flex items-center justify-between p-3 bg-black/30 border border-green-500/30 rounded-lg">
              <div>
                <span className="font-medium text-green-400 font-mono">[DEPLOYMENT]</span>
                <p className="text-sm text-green-300 font-mono">{stack.deployment.description}</p>
              </div>
              <Badge className="bg-orange-500/20 border border-orange-400 text-orange-400 font-mono">{stack.deployment.name}</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold neon-green flex items-center" style={{ fontFamily: 'Orbitron, monospace' }}>
            <TrendingUp className="w-4 h-4 mr-2" />
            &gt; LIVE_INTEL_FEED
          </h4>
          
          {/* Trends */}
          {liveInsights.trends.length > 0 && (
            <div className="p-3 bg-blue-500/10 border border-blue-400/50 rounded-lg">
              <h5 className="font-medium text-blue-400 mb-2 flex items-center font-mono">
                <TrendingUp className="w-4 h-4 mr-1" />
                [TRENDS] MARKET_ANALYSIS
              </h5>
              <ul className="space-y-1">
                {liveInsights.trends.slice(0, 2).map((trend, index) => (
                  <li key={index} className="text-sm text-blue-300 flex items-start font-mono">
                    <CheckCircle className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                    {trend.length > 100 ? `${trend.substring(0, 100)}...` : trend}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Security Alerts */}
          {liveInsights.securityAlerts.length > 0 && (
            <div className="p-3 bg-red-500/10 border border-red-400/50 rounded-lg">
              <h5 className="font-medium text-red-400 mb-2 flex items-center font-mono">
                <Shield className="w-4 h-4 mr-1" />
                [ALERT] SECURITY_SCAN
              </h5>
              <ul className="space-y-1">
                {liveInsights.securityAlerts.slice(0, 2).map((alert, index) => (
                  <li key={index} className="text-sm text-red-300 flex items-start font-mono">
                    <AlertTriangle className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                    {alert.length > 100 ? `${alert.substring(0, 100)}...` : alert}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Popularity Data */}
          {Object.keys(liveInsights.popularityData).length > 0 && (
            <div className="p-3 bg-green-500/10 border border-green-400/50 rounded-lg">
              <h5 className="font-medium text-green-400 mb-2 flex items-center font-mono">
                <Users className="w-4 h-4 mr-1" />
                [STATS] POPULARITY_INDEX
              </h5>
              <div className="space-y-1">
                {liveInsights.popularityData.githubStars && (
                  <div className="text-sm text-green-300 font-mono">
                    GITHUB_STARS: {liveInsights.popularityData.githubStars.toLocaleString()}
                  </div>
                )}
                {liveInsights.popularityData.npmDownloads && (
                  <div className="text-sm text-green-300 font-mono">
                    NPM_DOWNLOADS: {liveInsights.popularityData.npmDownloads.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Recent Updates */}
          {liveInsights.recentUpdates.length > 0 && (
            <div className="p-3 bg-purple-500/10 border border-purple-400/50 rounded-lg">
              <h5 className="font-medium text-purple-400 mb-2 flex items-center font-mono">
                <Activity className="w-4 h-4 mr-1" />
                [UPDATE] RECENT_PATCHES
              </h5>
              <ul className="space-y-1">
                {liveInsights.recentUpdates.slice(0, 2).map((update, index) => (
                  <li key={index} className="text-sm text-purple-300 flex items-start font-mono">
                    <CheckCircle className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                    {update.length > 100 ? `${update.substring(0, 100)}...` : update}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Additional Tools */}
      {stack.additionalTools.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold neon-green mb-3" style={{ fontFamily: 'Orbitron, monospace' }}>&gt; ADDITIONAL_MODULES</h4>
          <div className="flex flex-wrap gap-2">
            {stack.additionalTools.map((tool, index) => (
              <Badge key={index} className="bg-gray-500/20 border border-gray-400 text-gray-300 font-mono">
                {tool.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Use Cases */}
      <div className="mb-6">
        <h4 className="font-semibold neon-green mb-3" style={{ fontFamily: 'Orbitron, monospace' }}>&gt; OPTIMAL_USE_CASES</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {stack.useCases.map((useCase, index) => (
            <div key={index} className="flex items-center text-sm text-green-300 font-mono">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              {useCase}
            </div>
          ))}
        </div>
      </div>

      {/* Key Files */}
      <div className="mb-6">
        <h4 className="font-semibold neon-green mb-3" style={{ fontFamily: 'Orbitron, monospace' }}>&gt; CORE_FILES_MANIFEST</h4>
        <div className="bg-black/50 border border-green-500/30 rounded-lg p-3">
          <code className="text-sm text-green-400 font-mono">
            {stack.keyFiles.join(', ')}
          </code>
        </div>
      </div>

      {/* Reasoning */}
      {isPrimary && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-400/50 rounded-lg">
          <h4 className="font-semibold text-green-400 mb-2 font-mono">[ANALYSIS] RECOMMENDATION_LOGIC</h4>
          <p className="text-green-300 text-sm leading-relaxed font-mono">{reasoning}</p>
        </div>
      )}

      {/* Documentation Links */}
      <div className="flex flex-wrap gap-3">
        <a
          href={stack.frontend.documentation}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 font-mono border border-cyan-500/30 px-2 py-1 rounded bg-cyan-500/10"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          [DOCS] {stack.frontend.name}
        </a>
        {stack.backend && (
          <a
            href={stack.backend.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 font-mono border border-cyan-500/30 px-2 py-1 rounded bg-cyan-500/10"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            [DOCS] {stack.backend.name}
          </a>
        )}
        {stack.database && (
          <a
            href={stack.database.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 font-mono border border-cyan-500/30 px-2 py-1 rounded bg-cyan-500/10"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            [DOCS] {stack.database.name}
          </a>
        )}
        <a
          href={stack.deployment.documentation}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 font-mono border border-cyan-500/30 px-2 py-1 rounded bg-cyan-500/10"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          [DOCS] {stack.deployment.name}
        </a>
      </div>
    </Card>
  );
}