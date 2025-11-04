import { Hammer, HardHat, Wrench, ArrowDown } from "lucide-react";
interface AboutProps {
  onPortfolioClick?: () => void;
}

export const About = ({ onPortfolioClick }: AboutProps) => {
  return <section id="about" className="relative py-24 overflow-hidden bg-background">
      {/* Animated Construction Icons Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Icons */}
        {[...Array(15)].map((_, i) => {
        const icons = [Hammer, HardHat, Wrench];
        const Icon = icons[i % 3];
        const delay = i * 0.8;
        const duration = 15 + i % 5 * 3;
        const size = 24 + i % 3 * 16;
        const startX = i * 7 % 100;
        const startY = i * 13 % 100;
        return <div key={i} className="absolute opacity-5" style={{
          left: `${startX}%`,
          top: `${startY}%`,
          animation: `float-diagonal ${duration}s ease-in-out ${delay}s infinite alternate`
        }}>
              <Icon size={size} className="text-accent" />
            </div>;
      })}
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float-diagonal {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(30px, -40px) rotate(90deg);
          }
          50% {
            transform: translate(-20px, -80px) rotate(180deg);
          }
          75% {
            transform: translate(-40px, -40px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-playfair font-semibold text-center mb-8 text-charcoal opacity-0 animate-slide-in-left">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-lg p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-1 opacity-0 animate-fade-in-up delay-200">
              {/* Arrow pointing to Portfolio */}
              <button 
                onClick={onPortfolioClick}
                className="absolute bottom-4 right-4 opacity-40 hover:opacity-70 transition-all duration-300 flex flex-col items-center gap-1 cursor-pointer group"
                aria-label="Open Portfolio"
              >
                <ArrowDown size={48} className="text-accent animate-bounce group-hover:animate-none" strokeWidth={2.5} />
                <span className="text-sm font-playfair font-semibold text-accent">Portfolio</span>
              </button>
              <div className="space-y-8 text-lg font-inter font-light leading-relaxed text-charcoal/80">
                <p className="transition-all duration-300">
                  I'm Michael, a construction professional who believes that exceptional results come from exceptional teams. My approach is simple: bring together the right people, create an environment built on mutual respect, and stay closely attuned to client feedback throughout every phase of a project.
                </p>
                <p className="transition-all duration-300">
                  I've built my career on the principle that quality construction isn't just about meeting standards—it's about exceeding them. By combining rigorous processes with forward-thinking design and fostering a collaborative team culture, I've found that excellence becomes not just achievable, but inevitable.
                </p>
                
                <div className="pt-4">
                  <h3 className="text-2xl font-playfair font-semibold mb-4 text-charcoal">My Philosophy</h3>
                  <p className="transition-all duration-300">
                    Superior construction is accomplished through three core elements: assembling the right group of people, empowering them with the respect and environment they need to thrive, and making thoughtful course corrections based on real-time feedback from project owners and end users. When these elements align, teams don't just meet expectations—they consistently surpass them.
                  </p>
                </div>

                <div className="pt-4">
                  <h3 className="text-2xl font-playfair font-semibold mb-4 text-charcoal">My Commitment</h3>
                  <p className="transition-all duration-300">
                    Every client, every project, every time: I'm dedicated to exceeding expectations under all conditions. It's not just a goal—it's the standard by which I measure success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};