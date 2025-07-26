'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserRequirements } from '@/types';
import { Loader2, Send } from 'lucide-react';

const formSchema = z.object({
  projectDescription: z.string().min(10, 'Please provide at least 10 characters describing your project'),
  timeline: z.string().min(1, 'Please select a timeline'),
  teamSize: z.string().min(1, 'Please select team size'),
  experienceLevel: z.string().min(1, 'Please select experience level'),
  budget: z.string().min(1, 'Please select budget range'),
  database: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  aiMl: z.array(z.string()).optional(),
  performance: z.array(z.string()).optional(),
  development: z.array(z.string()).optional()
});

type FormData = z.infer<typeof formSchema>;

interface InputFormProps {
  onSubmit: (requirements: UserRequirements) => void;
  isLoading: boolean;
}

const capabilityOptions = {
  database: [
    { id: 'sql', label: 'SQL Database (PostgreSQL, MySQL)' },
    { id: 'nosql', label: 'NoSQL Database (MongoDB, Firestore)' },
    { id: 'realtime', label: 'Real-time Database' },
    { id: 'embedded', label: 'Embedded Database (SQLite)' },
    { id: 'cloud', label: 'Cloud Database' }
  ],
  features: [
    { id: 'user-auth', label: 'User Authentication' },
    { id: 'real-time', label: 'Real-time Features' },
    { id: 'payments', label: 'Payment Processing' },
    { id: 'cms', label: 'Content Management' },
    { id: 'e-commerce', label: 'E-commerce' },
    { id: 'blog', label: 'Blog/News' },
    { id: 'dashboard', label: 'Admin Dashboard' },
    { id: 'api', label: 'REST/GraphQL API' },
    { id: 'file-upload', label: 'File Upload' },
    { id: 'search', label: 'Search Functionality' }
  ],
  aiMl: [
    { id: 'chatbot', label: 'AI Chatbot' },
    { id: 'recommendations', label: 'Recommendation System' },
    { id: 'image-processing', label: 'Image Processing' },
    { id: 'nlp', label: 'Natural Language Processing' },
    { id: 'data-analysis', label: 'Data Analysis' },
    { id: 'machine-learning', label: 'Machine Learning Models' }
  ],
  performance: [
    { id: 'high-traffic', label: 'High Traffic (10k+ users)' },
    { id: 'fast-loading', label: 'Fast Loading (<3s)' },
    { id: 'mobile-optimized', label: 'Mobile Optimized' },
    { id: 'seo', label: 'SEO Optimized' },
    { id: 'offline', label: 'Offline Support' },
    { id: 'scalable', label: 'Highly Scalable' }
  ],
  development: [
    { id: 'typescript', label: 'TypeScript' },
    { id: 'component-library', label: 'Component Library' },
    { id: 'testing', label: 'Testing Framework' },
    { id: 'ci-cd', label: 'CI/CD Pipeline' },
    { id: 'docker', label: 'Docker Support' },
    { id: 'monitoring', label: 'Monitoring & Analytics' }
  ]
};

export default function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [selectedCapabilities, setSelectedCapabilities] = useState<Record<string, string[]>>({
    database: [],
    features: [],
    aiMl: [],
    performance: [],
    development: []
  });

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const handleCapabilityChange = (category: string, optionId: string, checked: boolean) => {
    setSelectedCapabilities(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category], optionId]
        : prev[category].filter(id => id !== optionId)
    }));
  };

  const onFormSubmit = (data: FormData) => {
    const requirements: UserRequirements = {
      projectDescription: data.projectDescription,
      capabilities: {
        database: selectedCapabilities.database,
        features: selectedCapabilities.features,
        aiMl: selectedCapabilities.aiMl,
        performance: selectedCapabilities.performance,
        development: selectedCapabilities.development
      },
      timeline: data.timeline,
      teamSize: data.teamSize,
      experienceLevel: data.experienceLevel,
      budget: data.budget
    };
    
    onSubmit(requirements);
  };

  const CapabilitySection = ({ title, category, options }: { 
    title: string; 
    category: string; 
    options: Array<{ id: string; label: string }> 
  }) => (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((option) => (
          <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={selectedCapabilities[category].includes(option.id)}
              onChange={(e) => handleCapabilityChange(category, option.id, e.target.checked)}
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      {/* Project Description */}
      <div className="space-y-2">
        <label htmlFor="projectDescription" className="block text-sm font-medium neon-green mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
          &gt; PROJECT_DESCRIPTION *
        </label>
        <textarea
          id="projectDescription"
          rows={4}
          className="w-full px-4 py-3 bg-black/50 border-2 border-green-500/50 rounded-md text-green-400 placeholder-green-600 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-500/20 font-mono"
          placeholder="[INPUT] Describe your project, goals, target audience, and key features..."
          {...register('projectDescription')}
        />
        {errors.projectDescription && (
          <p className="text-sm neon-pink">[ERROR] {errors.projectDescription.message}</p>
        )}
      </div>

      {/* Basic Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="timeline" className="block text-sm font-medium neon-green" style={{ fontFamily: 'Orbitron, monospace' }}>
            &gt; PROJECT_TIMELINE *
          </label>
          <select
            id="timeline"
            className="w-full px-4 py-3 bg-black/50 border-2 border-green-500/50 rounded-md text-green-400 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-500/20 font-mono"
            {...register('timeline')}
          >
            <option value="" className="bg-black text-green-400">[SELECT] Choose timeline</option>
            <option value="asap" className="bg-black text-green-400">ASAP [RUSH_MODE]</option>
            <option value="1-2 weeks" className="bg-black text-green-400">1-2 weeks [RAPID]</option>
            <option value="1 month" className="bg-black text-green-400">1 month [STANDARD]</option>
            <option value="2-3 months" className="bg-black text-green-400">2-3 months [EXTENDED]</option>
            <option value="3+ months" className="bg-black text-green-400">3+ months [ENTERPRISE]</option>
          </select>
          {errors.timeline && (
            <p className="text-sm neon-pink">[ERROR] {errors.timeline.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="teamSize" className="block text-sm font-medium neon-green" style={{ fontFamily: 'Orbitron, monospace' }}>
            &gt; TEAM_SIZE *
          </label>
          <select
            id="teamSize"
            className="w-full px-4 py-3 bg-black/50 border-2 border-green-500/50 rounded-md text-green-400 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-500/20 font-mono"
            {...register('teamSize')}
          >
            <option value="" className="bg-black text-green-400">[SELECT] Choose team size</option>
            <option value="solo" className="bg-black text-green-400">Solo developer [LONE_WOLF]</option>
            <option value="small" className="bg-black text-green-400">Small team (2-3) [SQUAD]</option>
            <option value="medium" className="bg-black text-green-400">Medium team (4-8) [UNIT]</option>
            <option value="large" className="bg-black text-green-400">Large team (9+) [BATTALION]</option>
          </select>
          {errors.teamSize && (
            <p className="text-sm neon-pink">[ERROR] {errors.teamSize.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="experienceLevel" className="block text-sm font-medium neon-green" style={{ fontFamily: 'Orbitron, monospace' }}>
            &gt; EXPERIENCE_LEVEL *
          </label>
          <select
            id="experienceLevel"
            className="w-full px-4 py-3 bg-black/50 border-2 border-green-500/50 rounded-md text-green-400 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-500/20 font-mono"
            {...register('experienceLevel')}
          >
            <option value="" className="bg-black text-green-400">[SELECT] Choose experience level</option>
            <option value="beginner" className="bg-black text-green-400">Beginner (0-1 years) [NOVICE]</option>
            <option value="intermediate" className="bg-black text-green-400">Intermediate (2-4 years) [SKILLED]</option>
            <option value="advanced" className="bg-black text-green-400">Advanced (5-8 years) [VETERAN]</option>
            <option value="expert" className="bg-black text-green-400">Expert (9+ years) [MASTER]</option>
          </select>
          {errors.experienceLevel && (
            <p className="text-sm neon-pink">[ERROR] {errors.experienceLevel.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="budget" className="block text-sm font-medium neon-green" style={{ fontFamily: 'Orbitron, monospace' }}>
            &gt; BUDGET_RANGE *
          </label>
          <select
            id="budget"
            className="w-full px-4 py-3 bg-black/50 border-2 border-green-500/50 rounded-md text-green-400 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-500/20 font-mono"
            {...register('budget')}
          >
            <option value="" className="bg-black text-green-400">[SELECT] Choose budget range</option>
            <option value="minimal" className="bg-black text-green-400">Minimal (Free tools only) [ZERO_COST]</option>
            <option value="low" className="bg-black text-green-400">Low ($0-50/month) [BUDGET]</option>
            <option value="medium" className="bg-black text-green-400">Medium ($50-200/month) [STANDARD]</option>
            <option value="high" className="bg-black text-green-400">High ($200+/month) [PREMIUM]</option>
          </select>
          {errors.budget && (
            <p className="text-sm neon-pink">[ERROR] {errors.budget.message}</p>
          )}
        </div>
      </div>

      {/* Capabilities */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Project Capabilities (Optional)</h3>
        <p className="text-sm text-gray-600">Select the features and capabilities your project needs:</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <CapabilitySection 
              title="Database Requirements" 
              category="database" 
              options={capabilityOptions.database} 
            />
            <CapabilitySection 
              title="Core Features" 
              category="features" 
              options={capabilityOptions.features} 
            />
            <CapabilitySection 
              title="AI/ML Features" 
              category="aiMl" 
              options={capabilityOptions.aiMl} 
            />
          </div>
          
          <div className="space-y-6">
            <CapabilitySection 
              title="Performance Requirements" 
              category="performance" 
              options={capabilityOptions.performance} 
            />
            <CapabilitySection 
              title="Development Preferences" 
              category="development" 
              options={capabilityOptions.development} 
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="retro-button py-4 px-6 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          {isLoading ? '[ANALYZING...] SCANNING TECH_MATRIX' : '[EXECUTE] GENERATE_RECOMMENDATIONS'}
        </button>
      </div>
    </form>
  );
}