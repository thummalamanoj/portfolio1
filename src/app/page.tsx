'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Send,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
  Code2,
  Briefcase,
  User,
  FolderGit2,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Types
interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  resumeUrl: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string;
  category: string;
  featured: boolean;
  order: number;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string;
  level: number;
  order: number;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  current: boolean;
  order: number;
}

// Section animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Navigation
function Navbar({ activeSection }: { activeSection: string }) {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="font-bold text-xl cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollTo('hero')}
          >
            <span className="text-primary">&lt;</span>
            <span>AJ</span>
            <span className="text-primary">/&gt;</span>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-2"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Hero Section
function HeroSection({ profile }: { profile: Profile | null }) {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles className="h-4 w-4" />
            Available for freelance work
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4">
            Hi, I&apos;m{' '}
            <span className="text-primary">
              {profile?.name || 'Alex Johnson'}
            </span>
          </h1>

          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {profile?.title || 'Full Stack Developer'}
          </motion.p>

          <motion.p
            className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            I build exceptional digital experiences that are fast, accessible, and visually stunning.
            Let&apos;s create something amazing together.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button
              size="lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="gap-2"
            >
              View My Work
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="gap-2"
            >
              Get In Touch
              <MessageSquare className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
            )}
            {profile?.twitter && (
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Twitter className="h-5 w-5" />
                </Button>
              </a>
            )}
            {profile?.email && (
              <a href={`mailto:${profile.email}`}>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Mail className="h-5 w-5" />
                </Button>
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}

// About Section
function AboutSection({ profile }: { profile: Profile | null }) {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">About Me</h2>
          </div>
          <div className="h-1 w-20 bg-primary rounded-full mb-10" />

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="relative aspect-square max-w-sm mx-auto md:mx-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                <div className="text-8xl font-bold text-primary/30">
                  {profile?.name?.charAt(0) || 'A'}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {profile?.bio || 'Passionate full-stack developer with years of experience building modern web applications.'}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>{profile?.location || 'San Francisco, CA'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span className="truncate">{profile?.email || 'alex@example.com'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span>{profile?.phone || '+1 (555) 123-4567'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Code2 className="h-4 w-4 text-primary shrink-0" />
                  <span>5+ Years Experience</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={profile?.github || '#'} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="h-4 w-4" /> GitHub
                  </Button>
                </a>
                <a href={profile?.linkedin || '#'} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </Button>
                </a>
                <a href={`mailto:${profile?.email || ''}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Mail className="h-4 w-4" /> Email
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = [...new Set(skills.map((s) => s.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="h-6 w-6 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">Skills & Expertise</h2>
          </div>
          <div className="h-1 w-20 bg-primary rounded-full mb-10" />

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <Button
              variant={activeCategory === 'All' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory('All')}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Skills grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredSkills.map((skill) => (
              <motion.div key={skill.id} variants={staggerItem}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Proficiency</span>
                        <span>{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Project Card
function ProjectCard({ project }: { project: Project }) {
  const colors = [
    'from-rose-500/20 to-orange-500/20',
    'from-emerald-500/20 to-teal-500/20',
    'from-violet-500/20 to-purple-500/20',
    'from-amber-500/20 to-yellow-500/20',
    'from-cyan-500/20 to-sky-500/20',
    'from-pink-500/20 to-fuchsia-500/20',
  ];

  const colorIndex =
    project.title.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    colors.length;

  return (
    <motion.div variants={staggerItem}>
      <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden">
        {/* Project visual header */}
        <div
          className={`h-48 bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center relative`}
        >
          <div className="text-4xl font-bold text-foreground/20 group-hover:scale-110 transition-transform duration-300">
            {project.title
              .split(' ')
              .map((w) => w[0])
              .join('')}
          </div>
          {project.featured && (
            <Badge className="absolute top-3 right-3">Featured</Badge>
          )}
        </div>

        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <Badge variant="outline" className="shrink-0 capitalize">
              {project.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.split(',').map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech.trim()}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="gap-2">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button size="sm" className="w-full gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" /> Live Demo
              </Button>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button size="sm" variant="outline" className="w-full gap-1.5">
                <Github className="h-3.5 w-3.5" /> Source
              </Button>
            </a>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Projects Section
function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('all');
  const categories = ['all', ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FolderGit2 className="h-6 w-6 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
          </div>
          <div className="h-1 w-20 bg-primary rounded-full mb-10" />

          {/* Category filter */}
          <Tabs defaultValue="all" onValueChange={setFilter} className="mb-10">
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="capitalize">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Projects grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Experience Section
function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">Work Experience</h2>
          </div>
          <div className="h-1 w-20 bg-primary rounded-full mb-10" />

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            <motion.div
              className="space-y-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={staggerItem}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 mt-6 z-10 ring-4 ring-background" />

                  {/* Spacer */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content */}
                  <div className="md:w-1/2 pl-12 md:pl-8">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <CardTitle className="text-lg">{exp.role}</CardTitle>
                            <p className="text-primary font-medium">{exp.company}</p>
                          </div>
                          {exp.current && (
                            <Badge className="shrink-0">
                              <span className="mr-1 inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              Current
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {exp.startDate} - {exp.endDate}
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5" />
                              {exp.location}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection({ profile }: { profile: Profile | null }) {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        toast({
          title: 'Message sent!',
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setTimeout(() => setSent(false), 3000);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to send message. Please try again.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">Get In Touch</h2>
          </div>
          <div className="h-1 w-20 bg-primary rounded-full mb-10" />

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities
                to be part of your vision. Feel free to reach out!
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${profile?.email || ''}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{profile?.email || 'alex@example.com'}</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{profile?.location || 'San Francisco, CA'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{profile?.phone || '+1 (555) 123-4567'}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex gap-3">
                {profile?.github && (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Github className="h-4 w-4" />
                    </Button>
                  </a>
                )}
                {profile?.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </a>
                )}
                {profile?.twitter && (
                  <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* Contact form */}
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2" disabled={sending}>
                    {sending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : sent ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" /> Sent!
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer({ profile }: { profile: Profile | null }) {
  return (
    <footer className="py-8 border-t bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {profile?.name || 'Alex Johnson'}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            )}
            {profile?.twitter && (
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(true);

  // Seed and fetch data
  useEffect(() => {
    async function initData() {
      try {
        // Seed database
        await fetch('/api/seed', { method: 'POST' });

        // Fetch all data
        const [profileRes, projectsRes, skillsRes, expRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/projects'),
          fetch('/api/skills'),
          fetch('/api/experience'),
        ]);

        if (profileRes.ok) setProfile(await profileRes.json());
        if (projectsRes.ok) setProjects(await projectsRes.json());
        if (skillsRes.ok) setSkills(await skillsRes.json());
        if (expRes.ok) setExperiences(await expRes.json());
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, []);

  // Track active section
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeSection={activeSection} />
      <main className="flex-1">
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <ContactSection profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
