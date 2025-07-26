import { TechStack, Technology } from '@/types';

// Technology definitions
const technologies: Record<string, Technology> = {
  // Frontend
  react: {
    name: 'React',
    description: 'A JavaScript library for building user interfaces',
    learningCurve: 3,
    popularity: 5,
    documentation: 'https://react.dev'
  },
  nextjs: {
    name: 'Next.js',
    description: 'The React Framework for Production',
    learningCurve: 3,
    popularity: 5,
    documentation: 'https://nextjs.org/docs'
  },
  vue: {
    name: 'Vue.js',
    description: 'The Progressive JavaScript Framework',
    learningCurve: 2,
    popularity: 4,
    documentation: 'https://vuejs.org'
  },
  svelte: {
    name: 'Svelte',
    description: 'Cybernetically enhanced web apps',
    learningCurve: 2,
    popularity: 3,
    documentation: 'https://svelte.dev'
  },
  htmlCssJs: {
    name: 'HTML/CSS/JavaScript',
    description: 'Vanilla web technologies',
    learningCurve: 1,
    popularity: 5,
    documentation: 'https://developer.mozilla.org'
  },

  // Backend
  nodeExpress: {
    name: 'Node.js + Express',
    description: 'JavaScript runtime with Express framework',
    learningCurve: 2,
    popularity: 5,
    documentation: 'https://expressjs.com'
  },
  nextjsApi: {
    name: 'Next.js API Routes',
    description: 'Built-in API routes in Next.js',
    learningCurve: 2,
    popularity: 4,
    documentation: 'https://nextjs.org/docs/api-routes/introduction'
  },
  pythonFastApi: {
    name: 'Python + FastAPI',
    description: 'Modern, fast web framework for building APIs',
    learningCurve: 3,
    popularity: 4,
    documentation: 'https://fastapi.tiangolo.com'
  },
  supabase: {
    name: 'Supabase',
    description: 'Open source Firebase alternative',
    learningCurve: 2,
    popularity: 4,
    documentation: 'https://supabase.com/docs'
  },
  firebase: {
    name: 'Firebase',
    description: 'Google\'s mobile and web application development platform',
    learningCurve: 2,
    popularity: 4,
    documentation: 'https://firebase.google.com/docs'
  },

  // Databases
  postgresql: {
    name: 'PostgreSQL',
    description: 'Advanced open source relational database',
    learningCurve: 3,
    popularity: 5,
    documentation: 'https://www.postgresql.org/docs'
  },
  mongodb: {
    name: 'MongoDB',
    description: 'Document-based NoSQL database',
    learningCurve: 2,
    popularity: 4,
    documentation: 'https://docs.mongodb.com'
  },
  sqlite: {
    name: 'SQLite',
    description: 'Lightweight embedded SQL database',
    learningCurve: 1,
    popularity: 4,
    documentation: 'https://sqlite.org/docs.html'
  },
  firestore: {
    name: 'Firestore',
    description: 'NoSQL document database by Google',
    learningCurve: 2,
    popularity: 4,
    documentation: 'https://firebase.google.com/docs/firestore'
  },

  // Deployment
  vercel: {
    name: 'Vercel',
    description: 'Platform for frontend frameworks and static sites',
    learningCurve: 1,
    popularity: 5,
    documentation: 'https://vercel.com/docs'
  },
  netlify: {
    name: 'Netlify',
    description: 'Platform for modern web projects',
    learningCurve: 1,
    popularity: 4,
    documentation: 'https://docs.netlify.com'
  },
  heroku: {
    name: 'Heroku',
    description: 'Cloud platform as a service',
    learningCurve: 2,
    popularity: 4,
    documentation: 'https://devcenter.heroku.com'
  },
  aws: {
    name: 'AWS',
    description: 'Amazon Web Services cloud platform',
    learningCurve: 4,
    popularity: 5,
    documentation: 'https://docs.aws.amazon.com'
  },

  // Additional Tools
  tailwind: {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework',
    learningCurve: 2,
    popularity: 5,
    documentation: 'https://tailwindcss.com/docs'
  },
  typescript: {
    name: 'TypeScript',
    description: 'Typed superset of JavaScript',
    learningCurve: 3,
    popularity: 5,
    documentation: 'https://www.typescriptlang.org/docs'
  },
  prisma: {
    name: 'Prisma',
    description: 'Next-generation ORM for Node.js and TypeScript',
    learningCurve: 3,
    popularity: 4,
    documentation: 'https://www.prisma.io/docs'
  }
};

// Predefined tech stacks
export const techStacks: TechStack[] = [
  {
    id: 'simple-landing',
    name: 'Simple Landing Page',
    category: 'simple',
    frontend: technologies.htmlCssJs,
    deployment: technologies.netlify,
    additionalTools: [technologies.tailwind],
    keyFiles: ['index.html', 'style.css', 'script.js'],
    useCases: ['Landing pages', 'Portfolio sites', 'Simple marketing sites'],
    efficiency: 'Perfect for static content with minimal interactivity. Fast loading and easy to maintain.',
    timeline: '1-2 weeks',
    complexity: 'beginner',
    cost: 'free'
  },
  {
    id: 'react-spa',
    name: 'React Single Page Application',
    category: 'spa',
    frontend: technologies.react,
    deployment: technologies.vercel,
    additionalTools: [technologies.typescript, technologies.tailwind],
    keyFiles: ['src/App.tsx', 'src/components/', 'package.json'],
    useCases: ['Interactive dashboards', 'Admin panels', 'Complex user interfaces'],
    efficiency: 'Excellent for dynamic, interactive applications with complex state management.',
    timeline: '3-6 weeks',
    complexity: 'intermediate',
    cost: 'free'
  },
  {
    id: 'nextjs-fullstack',
    name: 'Next.js Full-Stack Application',
    category: 'fullstack',
    frontend: technologies.nextjs,
    backend: technologies.nextjsApi,
    database: technologies.postgresql,
    deployment: technologies.vercel,
    additionalTools: [technologies.typescript, technologies.tailwind, technologies.prisma],
    keyFiles: ['app/page.tsx', 'app/api/', 'prisma/schema.prisma'],
    useCases: ['E-commerce sites', 'Social platforms', 'Content management systems'],
    efficiency: 'Full-stack solution with excellent SEO, server-side rendering, and API capabilities.',
    timeline: '6-12 weeks',
    complexity: 'advanced',
    cost: 'low'
  },
  {
    id: 'vue-rapid',
    name: 'Vue.js Rapid Prototype',
    category: 'spa',
    frontend: technologies.vue,
    deployment: technologies.netlify,
    additionalTools: [technologies.tailwind],
    keyFiles: ['src/App.vue', 'src/components/', 'vite.config.js'],
    useCases: ['Rapid prototyping', 'MVPs', 'Small to medium applications'],
    efficiency: 'Quick development with gentle learning curve and excellent documentation.',
    timeline: '2-4 weeks',
    complexity: 'beginner',
    cost: 'free'
  },
  {
    id: 'firebase-realtime',
    name: 'Firebase Real-time Application',
    category: 'fullstack',
    frontend: technologies.react,
    backend: technologies.firebase,
    database: technologies.firestore,
    deployment: technologies.firebase,
    additionalTools: [technologies.typescript, technologies.tailwind],
    keyFiles: ['src/firebase.ts', 'src/hooks/', 'firebase.json'],
    useCases: ['Chat applications', 'Collaborative tools', 'Real-time dashboards'],
    efficiency: 'Excellent for real-time features with built-in authentication and hosting.',
    timeline: '4-8 weeks',
    complexity: 'intermediate',
    cost: 'low'
  },
  {
    id: 'supabase-modern',
    name: 'Supabase Modern Stack',
    category: 'fullstack',
    frontend: technologies.nextjs,
    backend: technologies.supabase,
    database: technologies.postgresql,
    deployment: technologies.vercel,
    additionalTools: [technologies.typescript, technologies.tailwind],
    keyFiles: ['lib/supabase.ts', 'app/api/', 'supabase/migrations/'],
    useCases: ['SaaS applications', 'User-generated content', 'Data-driven apps'],
    efficiency: 'Modern PostgreSQL with real-time subscriptions and built-in auth.',
    timeline: '6-10 weeks',
    complexity: 'intermediate',
    cost: 'low'
  },
  {
    id: 'python-api',
    name: 'Python FastAPI Backend',
    category: 'fullstack',
    frontend: technologies.react,
    backend: technologies.pythonFastApi,
    database: technologies.postgresql,
    deployment: technologies.heroku,
    additionalTools: [technologies.typescript],
    keyFiles: ['main.py', 'models/', 'routers/', 'requirements.txt'],
    useCases: ['Data science applications', 'ML-powered apps', 'API-first architecture'],
    efficiency: 'Perfect for data-heavy applications and machine learning integration.',
    timeline: '8-12 weeks',
    complexity: 'advanced',
    cost: 'medium'
  },
  {
    id: 'svelte-performance',
    name: 'Svelte Performance-First',
    category: 'spa',
    frontend: technologies.svelte,
    deployment: technologies.vercel,
    additionalTools: [technologies.typescript, technologies.tailwind],
    keyFiles: ['src/App.svelte', 'src/lib/', 'vite.config.js'],
    useCases: ['Performance-critical apps', 'Mobile-first applications', 'Lightweight SPAs'],
    efficiency: 'Smallest bundle size with excellent performance and developer experience.',
    timeline: '3-6 weeks',
    complexity: 'intermediate',
    cost: 'free'
  }
];

export function getTechStackById(id: string): TechStack | undefined {
  return techStacks.find(stack => stack.id === id);
}

export function getTechStacksByCategory(category: TechStack['category']): TechStack[] {
  return techStacks.filter(stack => stack.category === category);
}

export function getTechStacksByComplexity(complexity: TechStack['complexity']): TechStack[] {
  return techStacks.filter(stack => stack.complexity === complexity);
}