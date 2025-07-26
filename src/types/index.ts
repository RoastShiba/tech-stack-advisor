export interface Technology {
  name: string;
  description: string;
  learningCurve: number; // 1-5
  popularity: number; // 1-5
  documentation: string; // URL
}

export interface TechStack {
  id: string;
  name: string;
  category: 'simple' | 'spa' | 'fullstack' | 'enterprise';
  frontend: Technology;
  backend?: Technology;
  database?: Technology;
  deployment: Technology;
  additionalTools: Technology[];
  keyFiles: string[];
  useCases: string[];
  efficiency: string;
  timeline: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  cost: 'free' | 'low' | 'medium' | 'high';
}

export interface UserRequirements {
  projectDescription: string;
  capabilities: {
    database: string[];
    features: string[];
    aiMl: string[];
    performance: string[];
    development: string[];
  };
  timeline: string;
  teamSize: string;
  experienceLevel: string;
  budget: string;
}

export interface LiveSearchResult {
  title: string;
  url: string;
  snippet: string;
  publishedDate?: string;
  source: 'web' | 'x' | 'news' | 'rss';
}

export interface RecommendationResult {
  primaryStack: TechStack;
  alternatives: TechStack[];
  liveInsights: {
    trends: string[];
    securityAlerts: string[];
    popularityData: Record<string, number>;
    recentUpdates: string[];
  };
  confidence: number;
  reasoning: string;
}