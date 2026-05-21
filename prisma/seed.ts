import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Check if data already exists
  const existingProfile = await prisma.profile.findFirst();
  if (existingProfile) {
    console.log('Database already seeded, skipping...');
    return;
  }

  console.log('Seeding database...');

  // Seed Profile
  await prisma.profile.create({
    data: {
      name: 'Thummala Manoj',
      title: 'Full Stack Developer',
      bio: 'Passionate full-stack developer with 5+ years of experience building modern web applications. I specialize in React, Node.js, and cloud technologies. I love turning complex problems into simple, beautiful, and intuitive solutions. When I\'m not coding, you\'ll find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical writing.',
      avatarUrl: '',
      location: 'Banglore, KA',
      email: 'thummalamanoj94@gmail.com',
      phone: '+91 7780641182',
      website: 'https://alexjohnson.dev',
      github: 'https://github.com/thummalamanoj',
      linkedin: 'https://linkedin.com/in/thummalamanoj',
      twitter: 'https://twitter.com/thummalamanoj',
      resumeUrl: '',
    },
  });

  // Seed Skills
  const skills = [
    { name: 'React', category: 'Frontend', icon: '⚛️', level: 95, order: 1 },
    { name: 'Next.js', category: 'Frontend', icon: '▲', level: 90, order: 2 },
    { name: 'TypeScript', category: 'Frontend', icon: '🔷', level: 92, order: 3 },
    { name: 'Tailwind CSS', category: 'Frontend', icon: '🎨', level: 88, order: 4 },
    { name: 'HTML/CSS', category: 'Frontend', icon: '🌐', level: 95, order: 5 },
    { name: 'Node.js', category: 'Backend', icon: '🟢', level: 90, order: 6 },
    { name: 'Python', category: 'Backend', icon: '🐍', level: 85, order: 7 },
    { name: 'PostgreSQL', category: 'Backend', icon: '🐘', level: 82, order: 8 },
    { name: 'MongoDB', category: 'Backend', icon: '🍃', level: 80, order: 9 },
    { name: 'REST APIs', category: 'Backend', icon: '🔗', level: 92, order: 10 },
    { name: 'GraphQL', category: 'Backend', icon: '◈', level: 78, order: 11 },
    { name: 'Docker', category: 'DevOps', icon: '🐳', level: 75, order: 12 },
    { name: 'AWS', category: 'DevOps', icon: '☁️', level: 78, order: 13 },
    { name: 'Git', category: 'DevOps', icon: '📦', level: 90, order: 14 },
    { name: 'CI/CD', category: 'DevOps', icon: '🔄', level: 72, order: 15 },
    { name: 'Figma', category: 'Design', icon: '🎨', level: 70, order: 16 },
  ];
  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // Seed Projects
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform built with Next.js and Stripe integration. Features include product catalog, shopping cart, user authentication, order management, and real-time inventory tracking.',
      imageUrl: '',
      liveUrl: 'https://shop-demo.example.com',
      githubUrl: 'https://github.com/alexjohnson/ecommerce',
      techStack: 'Next.js,TypeScript,Tailwind CSS,Prisma,Stripe',
      category: 'web',
      featured: true,
      order: 1,
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates using WebSockets. Supports drag-and-drop task boards, team assignments, deadline tracking, and automated notifications.',
      imageUrl: '',
      liveUrl: 'https://tasks-demo.example.com',
      githubUrl: 'https://github.com/alexjohnson/taskmanager',
      techStack: 'React,Node.js,Socket.io,MongoDB,Redux',
      category: 'web',
      featured: true,
      order: 2,
    },
    {
      title: 'AI Chat Assistant',
      description: 'An intelligent chat assistant powered by OpenAI GPT API with context-aware conversations. Features include conversation history, custom prompts, code generation, and multi-language support.',
      imageUrl: '',
      liveUrl: 'https://ai-chat-demo.example.com',
      githubUrl: 'https://github.com/alexjohnson/ai-chat',
      techStack: 'Next.js,OpenAI API,TypeScript,PostgreSQL,Vercel AI SDK',
      category: 'ai',
      featured: true,
      order: 3,
    },
    {
      title: 'Fitness Tracker',
      description: 'A mobile-first fitness tracking application with workout logging, progress charts, and personalized training plans. Integrates with wearable devices via Health APIs.',
      imageUrl: '',
      liveUrl: '',
      githubUrl: 'https://github.com/alexjohnson/fitness-tracker',
      techStack: 'React Native,TypeScript,Firebase,D3.js',
      category: 'mobile',
      featured: false,
      order: 4,
    },
    {
      title: 'DevOps Dashboard',
      description: 'A comprehensive DevOps monitoring dashboard that aggregates data from multiple cloud providers. Features real-time metrics, alert management, deployment tracking, and cost optimization insights.',
      imageUrl: '',
      liveUrl: 'https://devops-demo.example.com',
      githubUrl: 'https://github.com/alexjohnson/devops-dashboard',
      techStack: 'React,D3.js,Python,FastAPI,Docker,AWS',
      category: 'web',
      featured: false,
      order: 5,
    },
    {
      title: 'Portfolio CMS',
      description: 'A headless CMS specifically designed for developer portfolios. Features markdown editing, project showcasing, analytics integration, and customizable themes with plugin architecture.',
      imageUrl: '',
      liveUrl: '',
      githubUrl: 'https://github.com/alexjohnson/portfolio-cms',
      techStack: 'Next.js,GraphQL,Prisma,PostgreSQL,Tailwind CSS',
      category: 'web',
      featured: false,
      order: 6,
    },
  ];
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  // Seed Experience
  const experiences = [
    {
      company: 'TechCorp Inc.',
      role: 'Senior Full Stack Developer',
      description: 'Led a team of 5 developers in building a microservices-based SaaS platform serving 50K+ users. Architected the frontend with React and Next.js, implemented CI/CD pipelines, and reduced page load times by 40%.',
      startDate: '2022-01',
      endDate: 'Present',
      location: 'San Francisco, CA',
      current: true,
      order: 1,
    },
    {
      company: 'StartupHub',
      role: 'Full Stack Developer',
      description: 'Developed and maintained multiple client-facing web applications using React, Node.js, and PostgreSQL. Implemented real-time features with WebSockets and optimized database queries resulting in 60% faster response times.',
      startDate: '2020-03',
      endDate: '2021-12',
      location: 'Remote',
      current: false,
      order: 2,
    },
    {
      company: 'Digital Agency Co.',
      role: 'Frontend Developer',
      description: 'Built responsive and accessible web interfaces for Fortune 500 clients. Specialized in React, Vue.js, and modern CSS. Collaborated closely with design teams to translate Figma mockups into pixel-perfect experiences.',
      startDate: '2018-06',
      endDate: '2020-02',
      location: 'New York, NY',
      current: false,
      order: 3,
    },
  ];
  for (const experience of experiences) {
    await prisma.experience.create({ data: experience });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
