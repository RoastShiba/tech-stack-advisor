'use client';

import { TechStack } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { 
  Clock, 
  DollarSign, 
  ExternalLink,
  CheckCircle,
  Activity
} from 'lucide-react';

interface AlternativeStacksProps {
  stacks: TechStack[];
}

export default function AlternativeStacks({ stacks }: AlternativeStacksProps) {
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
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold neon-green mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
          &gt; ALTERNATIVE_CONFIGURATIONS
        </h3>
        <p className="text-green-300 font-mono">[INFO] Additional viable tech stacks for mission parameters</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stacks.map((stack, index) => (
          <Card key={stack.id} className="terminal-window p-6 border border-green-500/30 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20 transition-all">
            {/* Stack Header */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold neon-green mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                &gt; {stack.name.toUpperCase()}
              </h4>
              <p className="text-sm text-green-300 mb-3 font-mono">[DESC] {stack.efficiency}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                <Badge className="bg-cyan-500/20 border border-cyan-400 text-cyan-400 font-mono text-xs">
                  [LVL] {stack.complexity.toUpperCase()}
                </Badge>
                <Badge className="bg-yellow-500/20 border border-yellow-400 text-yellow-400 font-mono text-xs">
                  <DollarSign className="w-3 h-3 mr-1" />
                  [COST] {stack.cost.toUpperCase()}
                </Badge>
                <Badge className="bg-blue-500/20 border border-blue-400 text-blue-400 font-mono text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  [TIME] {stack.timeline}
                </Badge>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="mb-4">
              <h5 className="font-medium neon-green mb-2 flex items-center text-sm font-mono">
                <Activity className="w-4 h-4 mr-1" />
                [STACK] COMPONENTS
              </h5>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-300 font-mono">FRONTEND:</span>
                  <Badge className="bg-blue-500/20 border border-blue-400 text-blue-400 font-mono text-xs">
                    {stack.frontend.name}
                  </Badge>
                </div>
                
                {stack.backend && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-300 font-mono">BACKEND:</span>
                    <Badge className="bg-green-500/20 border border-green-400 text-green-400 font-mono text-xs">
                      {stack.backend.name}
                    </Badge>
                  </div>
                )}
                
                {stack.database && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-300 font-mono">DATABASE:</span>
                    <Badge className="bg-purple-500/20 border border-purple-400 text-purple-400 font-mono text-xs">
                      {stack.database.name}
                    </Badge>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-300 font-mono">DEPLOY:</span>
                  <Badge className="bg-orange-500/20 border border-orange-400 text-orange-400 font-mono text-xs">
                    {stack.deployment.name}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="mb-4">
              <h5 className="font-medium neon-green mb-2 text-sm font-mono">[OPTIMAL] USE_CASES:</h5>
              <div className="space-y-1">
                {stack.useCases.slice(0, 3).map((useCase, idx) => (
                  <div key={idx} className="flex items-center text-xs text-green-300 font-mono">
                    <CheckCircle className="w-3 h-3 mr-1 text-green-400 flex-shrink-0" />
                    {useCase}
                  </div>
                ))}
                {stack.useCases.length > 3 && (
                  <div className="text-xs text-green-400 font-mono">
                    +{stack.useCases.length - 3} additional protocols...
                  </div>
                )}
              </div>
            </div>

            {/* Additional Tools */}
            {stack.additionalTools.length > 0 && (
              <div className="mb-4">
                <h5 className="font-medium neon-green mb-2 text-sm font-mono">[MODULES] INCLUDED:</h5>
                <div className="flex flex-wrap gap-1">
                  {stack.additionalTools.slice(0, 3).map((tool, idx) => (
                    <Badge key={idx} className="bg-gray-500/20 border border-gray-400 text-gray-300 font-mono text-xs">
                      {tool.name}
                    </Badge>
                  ))}
                  {stack.additionalTools.length > 3 && (
                    <Badge className="bg-gray-500/20 border border-gray-400 text-gray-400 font-mono text-xs">
                      +{stack.additionalTools.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Documentation Links */}
            <div className="pt-3 border-t border-green-500/30">
              <div className="flex flex-wrap gap-2">
                <a
                  href={stack.frontend.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-cyan-400 hover:text-cyan-300 font-mono border border-cyan-500/30 px-1 py-0.5 rounded bg-cyan-500/10"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  [DOCS] {stack.frontend.name}
                </a>
                {stack.backend && (
                  <a
                    href={stack.backend.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-cyan-400 hover:text-cyan-300 font-mono border border-cyan-500/30 px-1 py-0.5 rounded bg-cyan-500/10"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    [DOCS] {stack.backend.name}
                  </a>
                )}
                <a
                  href={stack.deployment.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-cyan-400 hover:text-cyan-300 font-mono border border-cyan-500/30 px-1 py-0.5 rounded bg-cyan-500/10"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  [DOCS] Deploy
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}