import { useEffect, useRef, useState, memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { useIsMobile } from '@/hooks/use-mobile';

const projects = [
  {
    title: 'Enterprise E-Commerce Platform',
    description: 'Full-stack e-commerce solution with advanced features including real-time inventory management, payment processing, and analytics dashboard.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
    liveUrl: '#',
    githubUrl: '#',
    status: 'Production'
  },
  {
    title: 'Real-Time Analytics Dashboard',
    description: 'Interactive data visualization platform for business intelligence with real-time updates and customizable reporting features.',
    tech: ['React', 'D3.js', 'WebSocket', 'Express'],
    liveUrl: '#',
    githubUrl: '#',
    status: 'Live'
  },
  {
    title: 'Project Management System',
    description: 'Collaborative project management tool with team coordination, task tracking, and automated workflow capabilities.',
    tech: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
    status: 'Beta'
  },
  {
    title: 'API Gateway & Microservices',
    description: 'Scalable microservices architecture with API gateway, authentication, rate limiting, and service discovery.',
    tech: ['Node.js', 'Docker', 'Redis', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
    status: 'Development'
  }
];

interface ProjectCardProps {
  project: typeof projects[number];
  isVisible: boolean;
  index: number;
  getStatusColor: (status: string) => string;
}

const ProjectCard = memo(({ project, isVisible, index, getStatusColor }: ProjectCardProps) => {
  const isMobile = useIsMobile();
  const card = (
    <Card 
      className={`group relative overflow-hidden glass-effect transform ${
        isVisible ? 'animate-smooth-fade-in opacity-100' : 'opacity-0 scale-95'
      }`}
      style={{ 
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Dark gradient overlay with blue tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-blue-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
      <CardHeader className="pb-3 sm:pb-4 relative z-20">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
          <CardTitle className="text-xl sm:text-2xl font-bold group-hover:text-gradient-primary transition-all duration-300">
            {project.title}
          </CardTitle>
          <span className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-full border ${getStatusColor(project.status)} backdrop-blur-sm w-fit`}>
            {project.status}
          </span>
        </div>
        <CardDescription className="text-foreground/80 leading-relaxed text-sm sm:text-base">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span 
                key={tech}
                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/10 text-primary rounded-lg text-xs sm:text-sm font-medium border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full sm:flex-1 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group/btn"
            >
              <ExternalLink className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover/btn:scale-110 transition-transform" />
              Live Demo
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="w-full sm:flex-1 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 group/btn"
            >
              <Github className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover/btn:scale-110 transition-transform" />
              Source Code
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  if (isMobile) return card;
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.15}
      scale={1.03}
      transitionSpeed={250}
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      className="w-full"
      style={{ animationDelay: `${index * 100}ms` }}
      key={project.title}
    >
      {card}
    </Tilt>
  );
});

const Projects = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Production': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Live': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Beta': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Development': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="projects" ref={ref} className="relative section-padding">
      {/* Optimized background pattern */}
      <div className="absolute inset-0 opacity-20 sm:opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
          `
        }}></div>
      </div>
      
      <div className="container-width relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-20">
            <h2 className="section-heading">
              Featured <span className="text-gradient-accent">Projects</span>
            </h2>
            <div className="section-divider" aria-hidden="true"></div>
            <p className="section-description">
              A curated selection of recent projects showcasing technical expertise, innovative solutions, and modern development practices
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                isVisible={isVisible}
                index={index}
                getStatusColor={getStatusColor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Projects;
