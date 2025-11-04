import React, { useState } from "react";
import { ArrowLeft, HardHat, Hammer, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, ProjectCategory } from "@/data/projects";
import { Link } from "react-router-dom";
interface PortfolioProps {
  onClose: () => void;
}
const categories = ["All", "Residential", "Commercial", "Hospitality", "Design Build"];
const categoryColors: Record<string, string> = {
  Residential: "bg-gold text-charcoal",
  Commercial: "bg-steelBlue text-cream",
  Hospitality: "bg-burgundy text-cream",
  "Design Build": "bg-accent text-charcoal"
};
export const Portfolio: React.FC<PortfolioProps> = ({
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const filteredProjects = selectedCategory === "All" ? projects : projects.filter(p => p.category === selectedCategory);
  const getCategoryCount = (category: string) => {
    if (category === "All") return projects.length;
    return projects.filter(p => p.category === category).length;
  };
  return <div className="min-h-screen bg-background relative">
      {/* Luxurious animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{
      zIndex: -1
    }}>
        {/* Rich gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-background to-charcoal/95" />
        
        {/* Elegant art deco pattern */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
        backgroundImage: `
            radial-gradient(circle at 20% 50%, hsl(var(--gold) / 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, hsl(var(--burgundy) / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, hsl(var(--steelBlue) / 0.1) 0%, transparent 50%)
          `
      }} />
        
        {/* Luxury geometric pattern */}
        <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
            linear-gradient(30deg, hsl(var(--gold) / 0.05) 12%, transparent 12.5%, transparent 87%, hsl(var(--gold) / 0.05) 87.5%, hsl(var(--gold) / 0.05)),
            linear-gradient(150deg, hsl(var(--gold) / 0.05) 12%, transparent 12.5%, transparent 87%, hsl(var(--gold) / 0.05) 87.5%, hsl(var(--gold) / 0.05)),
            linear-gradient(30deg, hsl(var(--gold) / 0.05) 12%, transparent 12.5%, transparent 87%, hsl(var(--gold) / 0.05) 87.5%, hsl(var(--gold) / 0.05)),
            linear-gradient(150deg, hsl(var(--gold) / 0.05) 12%, transparent 12.5%, transparent 87%, hsl(var(--gold) / 0.05) 87.5%, hsl(var(--gold) / 0.05))
          `,
        backgroundSize: '80px 140px',
        backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
        animation: 'luxuryPatternMove 120s linear infinite'
      }} />
        
        {/* Floating construction tools */}
        <div className="absolute inset-0">
          {/* Hard Hats */}
          {[...Array(3)].map((_, i) => <div key={`hardhat-${i}`} className="absolute" style={{
          left: `${10 + i * 30}%`,
          top: `${15 + i * 25}%`,
          animation: `float-luxury-${i % 3} ${25 + i * 3}s ease-in-out infinite`,
          animationDelay: `${i * 1}s`,
          opacity: 0.2
        }}>
              <HardHat size={40 + i * 10} className="text-gold" style={{
            filter: `drop-shadow(0 0 20px hsl(var(--gold) / ${0.3 + i * 0.1}))`
          }} />
            </div>)}
          
          {/* Hammers */}
          {[...Array(3)].map((_, i) => <div key={`hammer-${i}`} className="absolute" style={{
          left: `${20 + i * 25}%`,
          top: `${20 + i * 20}%`,
          animation: `float-luxury-${(i + 1) % 3} ${28 + i * 2}s ease-in-out infinite`,
          animationDelay: `${i * 1.2}s`,
          opacity: 0.18,
          transform: 'rotate(-15deg)'
        }}>
              <Hammer size={35 + i * 12} className="text-steelBlue" style={{
            filter: `drop-shadow(0 0 20px hsl(var(--steelBlue) / ${0.3 + i * 0.1}))`
          }} />
            </div>)}
          
          {/* Wrenches (as ladder substitute) */}
          {[...Array(2)].map((_, i) => <div key={`wrench-${i}`} className="absolute" style={{
          left: `${60 + i * 20}%`,
          top: `${30 + i * 30}%`,
          animation: `float-luxury-${(i + 2) % 3} ${30 + i * 4}s ease-in-out infinite`,
          animationDelay: `${i * 1.5}s`,
          opacity: 0.15,
          transform: 'rotate(25deg)'
        }}>
              <Wrench size={45 + i * 15} className="text-burgundy" style={{
            filter: `drop-shadow(0 0 20px hsl(var(--burgundy) / ${0.3 + i * 0.1}))`
          }} />
            </div>)}
        </div>

        {/* Premium gradient orbs */}
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30" style={{
        background: 'radial-gradient(circle, hsl(var(--gold) / 0.4) 0%, hsl(var(--gold) / 0.1) 40%, transparent 70%)',
        top: '-10%',
        right: '-5%',
        animation: 'float-luxury-orb-1 35s ease-in-out infinite'
      }} />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-25" style={{
        background: 'radial-gradient(circle, hsl(var(--burgundy) / 0.3) 0%, hsl(var(--burgundy) / 0.1) 40%, transparent 70%)',
        bottom: '-5%',
        left: '-8%',
        animation: 'float-luxury-orb-2 40s ease-in-out infinite reverse'
      }} />
        <div className="absolute w-[450px] h-[450px] rounded-full blur-[90px] opacity-20" style={{
        background: 'radial-gradient(circle, hsl(var(--steelBlue) / 0.3) 0%, hsl(var(--steelBlue) / 0.1) 40%, transparent 70%)',
        top: '40%',
        right: '15%',
        animation: 'float-luxury-orb-3 45s ease-in-out infinite'
      }} />

        {/* Shimmering light rays */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
          <defs>
            <linearGradient id="luxuryRay" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{
              stopColor: 'hsl(var(--gold))',
              stopOpacity: 0
            }} />
              <stop offset="50%" style={{
              stopColor: 'hsl(var(--gold))',
              stopOpacity: 0.4
            }} />
              <stop offset="100%" style={{
              stopColor: 'hsl(var(--gold))',
              stopOpacity: 0
            }} />
            </linearGradient>
            <linearGradient id="burgundyRay" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{
              stopColor: 'hsl(var(--burgundy))',
              stopOpacity: 0
            }} />
              <stop offset="50%" style={{
              stopColor: 'hsl(var(--burgundy))',
              stopOpacity: 0.3
            }} />
              <stop offset="100%" style={{
              stopColor: 'hsl(var(--burgundy))',
              stopOpacity: 0
            }} />
            </linearGradient>
          </defs>
          <line x1="0%" y1="0%" x2="100%" y2="50%" stroke="url(#luxuryRay)" strokeWidth="2">
            <animate attributeName="x2" values="100%;50%;100%" dur="30s" repeatCount="indefinite" />
            <animate attributeName="y2" values="50%;80%;50%" dur="30s" repeatCount="indefinite" />
          </line>
          <line x1="100%" y1="30%" x2="0%" y2="80%" stroke="url(#burgundyRay)" strokeWidth="2">
            <animate attributeName="x1" values="100%;80%;100%" dur="35s" repeatCount="indefinite" />
            <animate attributeName="y1" values="30%;60%;30%" dur="35s" repeatCount="indefinite" />
          </line>
        </svg>

        {/* Metallic shine effect */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
        background: 'linear-gradient(110deg, transparent 0%, hsl(var(--gold)) 45%, transparent 50%, transparent 100%)',
        animation: 'luxuryShine 8s ease-in-out infinite',
        backgroundSize: '200% 100%'
      }} />
      </div>

      <style>{`
        @keyframes luxuryPatternMove {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(80px, 140px) scale(1); }
        }
        
        /* Hard Hat Animations - Bobbing motion */
        @keyframes float-luxury-0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.2; }
          25% { transform: translate(20px, -30px) rotate(5deg) scale(1.05); opacity: 0.25; }
          50% { transform: translate(40px, -10px) rotate(-5deg) scale(1.1); opacity: 0.3; }
          75% { transform: translate(20px, 20px) rotate(3deg) scale(0.95); opacity: 0.22; }
        }
        
        /* Hammer Animations - Swinging motion */
        @keyframes float-luxury-1 {
          0%, 100% { transform: translate(0, 0) rotate(-15deg) scale(1); opacity: 0.18; }
          20% { transform: translate(-25px, 30px) rotate(-35deg) scale(1.08); opacity: 0.25; }
          40% { transform: translate(-40px, 60px) rotate(-50deg) scale(1.15); opacity: 0.28; }
          60% { transform: translate(-30px, 40px) rotate(-25deg) scale(1.05); opacity: 0.22; }
          80% { transform: translate(-15px, 15px) rotate(-10deg) scale(0.98); opacity: 0.2; }
        }
        
        /* Wrench Animations - Spinning motion */
        @keyframes float-luxury-2 {
          0%, 100% { transform: translate(0, 0) rotate(25deg) scale(1); opacity: 0.15; }
          33% { transform: translate(35px, -40px) rotate(145deg) scale(1.12); opacity: 0.22; }
          66% { transform: translate(50px, 20px) rotate(265deg) scale(1.08); opacity: 0.18; }
        }
        
        /* Gradient Orb Animations */
        @keyframes float-luxury-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(60px, -50px) scale(1.15); opacity: 0.4; }
          66% { transform: translate(-40px, 40px) scale(0.95); opacity: 0.25; }
        }
        @keyframes float-luxury-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
          33% { transform: translate(-50px, 50px) scale(0.9); opacity: 0.2; }
          66% { transform: translate(50px, -40px) scale(1.12); opacity: 0.3; }
        }
        @keyframes float-luxury-orb-3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(40px, 60px) scale(1.1); opacity: 0.28; }
        }
        @keyframes luxuryShine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Header with back button */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        
      </div>

      {/* Category tabs */}
      <div className="sticky top-[73px] z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-6 py-2 text-sm font-inter uppercase tracking-wider transition-all duration-300 relative ${selectedCategory === category ? "text-accent font-medium" : "text-muted-foreground hover:text-foreground"}`}>
                {category}
                <span className="ml-2 text-xs opacity-60">
                  ({getCategoryCount(category)})
                </span>
                {selectedCategory === category && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />}
              </button>)}
          </div>
        </div>
      </div>

      {/* Project grid */}
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredProjects.map((project, index) => <Link key={project.id} to={`/project/${project.id}`} className="group opacity-0 animate-fade-in-up" style={{
          animationDelay: `${index * 50}ms`
        }}>
              {/* Project image */}
              <div className="aspect-[4/5] overflow-hidden bg-muted rounded-sm mb-4 relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75" loading="lazy" />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500">
                  <div className="absolute bottom-3 left-3 text-xs font-inter text-white/90 tracking-wider">
                    {project.category.replace(' ', ' • ')}
                  </div>
                </div>
              </div>

              {/* Project info below image */}
              <div className="space-y-1">
                <h3 className="font-playfair text-xl text-foreground transition-colors duration-300 group-hover:text-gold">
                  {project.title}
                  {project.subtitle && (
                    <>
                      <br />
                      {project.subtitle}
                    </>
                  )}
                 </h3>
                {project.additionalInfo && (
                  <p className="text-sm font-inter text-muted-foreground font-light tracking-wide transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1">
                    {project.additionalInfo}
                  </p>
                )}
              </div>
            </Link>)}
        </div>

        {filteredProjects.length === 0 && <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No projects found in this category.
            </p>
          </div>}
      </div>

      {/* Footer */}
      
    </div>;
};