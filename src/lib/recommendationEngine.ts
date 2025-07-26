import { UserRequirements, TechStack, RecommendationResult, LiveSearchResult } from '@/types';
import { techStacks } from './stackDatabase';
import { liveSearchService } from './liveSearchService';

class RecommendationEngine {
  async generateRecommendations(requirements: UserRequirements): Promise<RecommendationResult> {
    // Score all tech stacks based on requirements
    const scoredStacks = await this.scoreStacks(requirements);
    
    // Sort by score and get top recommendations
    const sortedStacks = scoredStacks.sort((a, b) => b.score - a.score);
    const primaryStack = sortedStacks[0].stack;
    const alternatives = sortedStacks.slice(1, 4).map(item => item.stack);

    // Get live insights for the primary stack
    const liveInsights = await this.getLiveInsights(primaryStack);

    // Calculate confidence based on score and live data
    const confidence = this.calculateConfidence(sortedStacks[0].score, liveInsights);

    // Generate reasoning
    const reasoning = this.generateReasoning(requirements, primaryStack, sortedStacks[0].score);

    return {
      primaryStack,
      alternatives,
      liveInsights,
      confidence,
      reasoning
    };
  }

  private async scoreStacks(requirements: UserRequirements): Promise<Array<{ stack: TechStack; score: number }>> {
    const scores = await Promise.all(
      techStacks.map(async (stack) => {
        const score = await this.calculateStackScore(stack, requirements);
        return { stack, score };
      })
    );

    return scores;
  }

  private async calculateStackScore(stack: TechStack, requirements: UserRequirements): Promise<number> {
    let score = 0;
    const weights = {
      complexity: 0.25,
      timeline: 0.2,
      budget: 0.15,
      capabilities: 0.3,
      teamSize: 0.1
    };

    // Complexity scoring
    score += this.scoreComplexity(stack.complexity, requirements.experienceLevel) * weights.complexity;

    // Timeline scoring
    score += this.scoreTimeline(stack.timeline, requirements.timeline) * weights.timeline;

    // Budget scoring
    score += this.scoreBudget(stack.cost, requirements.budget) * weights.budget;

    // Capabilities scoring
    score += this.scoreCapabilities(stack, requirements.capabilities) * weights.capabilities;

    // Team size scoring
    score += this.scoreTeamSize(stack.complexity, requirements.teamSize) * weights.teamSize;

    return Math.min(score, 100); // Cap at 100
  }

  private scoreComplexity(stackComplexity: string, experienceLevel: string): number {
    const complexityMap = { beginner: 1, intermediate: 2, advanced: 3 };
    const experienceMap = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };

    const stackLevel = complexityMap[stackComplexity as keyof typeof complexityMap] || 2;
    const userLevel = experienceMap[experienceLevel as keyof typeof experienceMap] || 2;

    // Perfect match gets 100, each level difference reduces score
    if (stackLevel === userLevel) return 100;
    if (stackLevel === userLevel - 1) return 85; // Slightly easier is good
    if (stackLevel === userLevel + 1) return 70; // Slightly harder is acceptable
    return Math.max(0, 50 - Math.abs(stackLevel - userLevel) * 20);
  }

  private scoreTimeline(stackTimeline: string, requiredTimeline: string): number {
    const timelineWeeks = {
      '1-2 weeks': 1.5,
      '2-4 weeks': 3,
      '3-6 weeks': 4.5,
      '4-8 weeks': 6,
      '6-10 weeks': 8,
      '6-12 weeks': 9,
      '8-12 weeks': 10
    };

    const requiredWeeks = {
      'asap': 2,
      '1-2 weeks': 1.5,
      '1 month': 4,
      '2-3 months': 10,
      '3+ months': 16
    };

    const stackWeeks = timelineWeeks[stackTimeline as keyof typeof timelineWeeks] || 6;
    const userWeeks = requiredWeeks[requiredTimeline as keyof typeof requiredWeeks] || 8;

    if (stackWeeks <= userWeeks) return 100;
    if (stackWeeks <= userWeeks * 1.5) return 70;
    return Math.max(0, 50 - (stackWeeks - userWeeks) * 5);
  }

  private scoreBudget(stackCost: string, budget: string): number {
    const costMap = { free: 0, low: 1, medium: 2, high: 3 };
    const budgetMap = { minimal: 0, low: 1, medium: 2, high: 3 };

    const stackCostLevel = costMap[stackCost as keyof typeof costMap] || 1;
    const userBudgetLevel = budgetMap[budget as keyof typeof budgetMap] || 2;

    if (stackCostLevel <= userBudgetLevel) return 100;
    return Math.max(0, 100 - (stackCostLevel - userBudgetLevel) * 30);
  }

  private scoreCapabilities(stack: TechStack, capabilities: UserRequirements['capabilities']): number {
    let score = 0;
    let totalRequirements = 0;

    // Database capabilities
    if (capabilities.database.length > 0) {
      totalRequirements++;
      if (stack.database) {
        const dbMatches = capabilities.database.some(req => 
          stack.database!.name.toLowerCase().includes(req.toLowerCase()) ||
          req.toLowerCase().includes(stack.database!.name.toLowerCase())
        );
        if (dbMatches) score += 20;
      }
    }

    // Feature capabilities
    if (capabilities.features.length > 0) {
      totalRequirements++;
      const featureScore = this.scoreFeatureMatch(stack, capabilities.features);
      score += featureScore;
    }

    // AI/ML capabilities
    if (capabilities.aiMl.length > 0) {
      totalRequirements++;
      const aiScore = this.scoreAIMatch(stack, capabilities.aiMl);
      score += aiScore;
    }

    // Performance requirements
    if (capabilities.performance.length > 0) {
      totalRequirements++;
      const perfScore = this.scorePerformanceMatch(stack, capabilities.performance);
      score += perfScore;
    }

    // Development preferences
    if (capabilities.development.length > 0) {
      totalRequirements++;
      const devScore = this.scoreDevelopmentMatch(stack, capabilities.development);
      score += devScore;
    }

    return totalRequirements > 0 ? score / totalRequirements : 50;
  }

  private scoreFeatureMatch(stack: TechStack, features: string[]): number {
    const featureMap: Record<string, string[]> = {
      'user-auth': ['firebase', 'supabase', 'nextjs'],
      'real-time': ['firebase', 'supabase', 'websocket'],
      'payments': ['stripe', 'nextjs', 'react'],
      'cms': ['nextjs', 'react', 'vue'],
      'e-commerce': ['nextjs', 'react', 'vue'],
      'blog': ['nextjs', 'gatsby', 'vue'],
      'dashboard': ['react', 'vue', 'svelte'],
      'api': ['nextjs', 'express', 'fastapi']
    };

    let matches = 0;
    for (const feature of features) {
      const supportedTechs = featureMap[feature] || [];
      const stackTechs = [
        stack.frontend.name.toLowerCase(),
        stack.backend?.name.toLowerCase(),
        stack.database?.name.toLowerCase()
      ].filter(Boolean);

      if (supportedTechs.some(tech => stackTechs.some(stackTech => stackTech!.includes(tech)))) {
        matches++;
      }
    }

    return (matches / features.length) * 20;
  }

  private scoreAIMatch(stack: TechStack, aiRequirements: string[]): number {
    const aiFriendlyStacks = ['python', 'fastapi', 'nextjs', 'react'];
    const stackTechs = [
      stack.frontend.name.toLowerCase(),
      stack.backend?.name.toLowerCase()
    ].filter(Boolean);

    const hasAISupport = aiFriendlyStacks.some(tech => 
      stackTechs.some(stackTech => stackTech!.includes(tech))
    );

    return hasAISupport ? 20 : 5;
  }

  private scorePerformanceMatch(stack: TechStack, perfRequirements: string[]): number {
    const performanceMap: Record<string, number> = {
      'svelte': 20,
      'nextjs': 18,
      'react': 15,
      'vue': 16,
      'html': 20
    };

    const frontendPerf = performanceMap[stack.frontend.name.toLowerCase()] || 10;
    return Math.min(frontendPerf, 20);
  }

  private scoreDevelopmentMatch(stack: TechStack, devPrefs: string[]): number {
    let score = 0;
    
    if (devPrefs.includes('typescript')) {
      const hasTS = stack.additionalTools.some(tool => tool.name.toLowerCase().includes('typescript'));
      score += hasTS ? 10 : 0;
    }
    
    if (devPrefs.includes('component-library')) {
      const hasComponents = ['react', 'vue', 'svelte'].some(tech => 
        stack.frontend.name.toLowerCase().includes(tech)
      );
      score += hasComponents ? 10 : 0;
    }

    return Math.min(score, 20);
  }

  private scoreTeamSize(complexity: string, teamSize: string): number {
    const teamSizeMap = { solo: 1, small: 2, medium: 3, large: 4 };
    const complexityMap = { beginner: 1, intermediate: 2, advanced: 3 };

    const team = teamSizeMap[teamSize as keyof typeof teamSizeMap] || 2;
    const comp = complexityMap[complexity as keyof typeof complexityMap] || 2;

    // Larger teams can handle more complexity
    if (team >= comp) return 100;
    return Math.max(50, 100 - (comp - team) * 25);
  }

  private async getLiveInsights(stack: TechStack): Promise<RecommendationResult['liveInsights']> {
    try {
      const [trends, security, popularity, updates] = await Promise.all([
        liveSearchService.searchTechnologyTrends(stack.frontend.name),
        liveSearchService.searchSecurityAlerts(stack.frontend.name),
        liveSearchService.searchPopularityData(stack.frontend.name),
        liveSearchService.searchRecentUpdates(stack.frontend.name)
      ]);

      return {
        trends: trends.slice(0, 3).map(result => result.snippet),
        securityAlerts: security.slice(0, 2).map(result => result.snippet),
        popularityData: this.extractPopularityData(popularity),
        recentUpdates: updates.slice(0, 3).map(result => result.snippet)
      };
    } catch (error) {
      console.warn('Failed to get live insights:', error);
      return {
        trends: [],
        securityAlerts: [],
        popularityData: {},
        recentUpdates: []
      };
    }
  }

  private extractPopularityData(results: LiveSearchResult[]): Record<string, number> {
    // Simple extraction logic - in production this would be more sophisticated
    const data: Record<string, number> = {};
    
    for (const result of results) {
      const snippet = result.snippet.toLowerCase();
      
      // Extract GitHub stars
      const starsMatch = snippet.match(/(\d+(?:,\d+)*(?:\.\d+)?[km]?)\s*stars?/i);
      if (starsMatch) {
        data.githubStars = this.parseNumber(starsMatch[1]);
      }
      
      // Extract npm downloads
      const downloadsMatch = snippet.match(/(\d+(?:,\d+)*(?:\.\d+)?[km]?)\s*downloads?/i);
      if (downloadsMatch) {
        data.npmDownloads = this.parseNumber(downloadsMatch[1]);
      }
    }
    
    return data;
  }

  private parseNumber(str: string): number {
    const num = parseFloat(str.replace(/,/g, ''));
    if (str.toLowerCase().includes('k')) return num * 1000;
    if (str.toLowerCase().includes('m')) return num * 1000000;
    return num;
  }

  private calculateConfidence(score: number, liveInsights: RecommendationResult['liveInsights']): number {
    let confidence = score;
    
    // Boost confidence if we have recent positive trends
    if (liveInsights.trends.length > 0) confidence += 5;
    
    // Reduce confidence if there are security alerts
    if (liveInsights.securityAlerts.length > 0) confidence -= 10;
    
    // Boost confidence if technology is popular
    if (liveInsights.popularityData.githubStars > 10000) confidence += 5;
    
    return Math.max(0, Math.min(100, confidence));
  }

  private generateReasoning(requirements: UserRequirements, stack: TechStack, score: number): string {
    const reasons = [];
    
    reasons.push(`This ${stack.name} is recommended based on your requirements.`);
    
    if (score > 80) {
      reasons.push('It\'s an excellent match for your project needs.');
    } else if (score > 60) {
      reasons.push('It\'s a good fit with some trade-offs to consider.');
    } else {
      reasons.push('It\'s a reasonable option, though other stacks might be better suited.');
    }
    
    reasons.push(`The ${stack.timeline} development timeline aligns with your ${requirements.timeline} requirement.`);
    
    if (stack.cost === 'free') {
      reasons.push('This stack uses entirely free technologies, keeping costs minimal.');
    }
    
    reasons.push(`The ${stack.complexity} complexity level matches your ${requirements.experienceLevel} experience.`);
    
    return reasons.join(' ');
  }
}

export const recommendationEngine = new RecommendationEngine();