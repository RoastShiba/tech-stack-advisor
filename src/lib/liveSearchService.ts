import { LiveSearchResult } from '@/types';

interface XAISearchResponse {
  results: {
    title: string;
    url: string;
    snippet: string;
    published_date?: string;
    source: string;
  }[];
}

class LiveSearchService {
  private xaiApiKey: string | undefined;
  private openaiApiKey: string | undefined;

  constructor() {
    this.xaiApiKey = process.env.XAI_API_KEY;
    this.openaiApiKey = process.env.OPENAI_API_KEY;
  }

  async searchTechnologyTrends(technology: string): Promise<LiveSearchResult[]> {
    const query = `${technology} framework trends 2024 popularity updates`;
    return this.performSearch(query);
  }

  async searchSecurityAlerts(technology: string): Promise<LiveSearchResult[]> {
    const query = `${technology} security vulnerabilities CVE alerts 2024`;
    return this.performSearch(query);
  }

  async searchCompatibility(tech1: string, tech2: string): Promise<LiveSearchResult[]> {
    const query = `${tech1} ${tech2} compatibility integration issues 2024`;
    return this.performSearch(query);
  }

  async searchPopularityData(technology: string): Promise<LiveSearchResult[]> {
    const query = `${technology} github stars npm downloads usage statistics 2024`;
    return this.performSearch(query);
  }

  async searchRecentUpdates(technology: string): Promise<LiveSearchResult[]> {
    const query = `${technology} latest version release notes changelog 2024`;
    return this.performSearch(query);
  }

  private async performSearch(query: string): Promise<LiveSearchResult[]> {
    // Try xAI Live Search first (free beta until June 2025)
    if (this.xaiApiKey) {
      try {
        return await this.searchWithXAI(query);
      } catch (error) {
        console.warn('xAI search failed, falling back to mock data:', error);
      }
    }

    // Fallback to OpenAI GPT-4o Search Preview
    if (this.openaiApiKey) {
      try {
        return await this.searchWithOpenAI(query);
      } catch (error) {
        console.warn('OpenAI search failed, using mock data:', error);
      }
    }

    // Fallback to mock data for development
    return this.getMockSearchResults(query);
  }

  private async searchWithXAI(query: string): Promise<LiveSearchResult[]> {
    const response = await fetch('https://api.x.ai/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.xaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        sources: ['web', 'x', 'news'],
        max_results: 10
      })
    });

    if (!response.ok) {
      throw new Error(`xAI API error: ${response.status}`);
    }

    const data: XAISearchResponse = await response.json();
    
    return data.results.map(result => ({
      title: result.title,
      url: result.url,
      snippet: result.snippet,
      publishedDate: result.published_date,
      source: this.mapSource(result.source)
    }));
  }

  private async searchWithOpenAI(query: string): Promise<LiveSearchResult[]> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-search-preview',
        messages: [
          {
            role: 'user',
            content: `Search for recent information about: ${query}. Provide structured results with titles, URLs, and snippets.`
          }
        ],
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    // Parse the structured response from GPT-4o
    return this.parseOpenAIResponse(data.choices[0].message.content);
  }

  private parseOpenAIResponse(content: string): LiveSearchResult[] {
    // Simple parsing logic for structured OpenAI response
    // In production, this would be more sophisticated
    const results: LiveSearchResult[] = [];
    const lines = content.split('\n');
    
    let currentResult: Partial<LiveSearchResult> = {};
    
    for (const line of lines) {
      if (line.startsWith('Title:')) {
        if (currentResult.title) {
          results.push(currentResult as LiveSearchResult);
          currentResult = {};
        }
        currentResult.title = line.replace('Title:', '').trim();
      } else if (line.startsWith('URL:')) {
        currentResult.url = line.replace('URL:', '').trim();
      } else if (line.startsWith('Snippet:')) {
        currentResult.snippet = line.replace('Snippet:', '').trim();
        currentResult.source = 'web';
      }
    }
    
    if (currentResult.title) {
      results.push(currentResult as LiveSearchResult);
    }
    
    return results;
  }

  private mapSource(source: string): LiveSearchResult['source'] {
    switch (source.toLowerCase()) {
      case 'twitter':
      case 'x':
        return 'x';
      case 'news':
        return 'news';
      case 'rss':
        return 'rss';
      default:
        return 'web';
    }
  }

  private getMockSearchResults(query: string): LiveSearchResult[] {
    // Mock data for development when APIs are not available
    return [
      {
        title: `Latest ${query} Trends and Updates`,
        url: 'https://example.com/trends',
        snippet: `Recent developments and trends related to ${query}. This is mock data for development purposes.`,
        publishedDate: new Date().toISOString(),
        source: 'web'
      },
      {
        title: `${query} Community Discussion`,
        url: 'https://example.com/discussion',
        snippet: `Community insights and discussions about ${query}. Mock data for testing.`,
        publishedDate: new Date().toISOString(),
        source: 'web'
      }
    ];
  }
}

export const liveSearchService = new LiveSearchService();