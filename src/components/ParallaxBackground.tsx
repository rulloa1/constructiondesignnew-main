import { useEffect, useState } from "react";
import { HardHat, Hammer, Wrench, Gauge, Ruler, Square } from "lucide-react";

interface ToolItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  x: number;
  y: number;
  size: number;
  speed: number; // Parallax speed (0-1, where lower = moves slower)
  rotation: number;
  opacity: number;
  index: number;
}

export const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [tools, setTools] = useState<ToolItem[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Initialize tools with random positions
  useEffect(() => {
    const icons = [HardHat, Hammer, Wrench, Gauge, Ruler, Square];
    const newTools: ToolItem[] = [];
    
    // Create 25 construction tools at different positions
    for (let i = 0; i < 25; i++) {
      newTools.push({
        icon: icons[i % icons.length],
        x: Math.random() * 100, // 0-100% across screen
        y: Math.random() * 200 - 50, // Start some above viewport (-50 to 150%)
        size: 24 + Math.random() * 32, // 24-56px
        speed: 0.2 + Math.random() * 0.6, // Different parallax speeds (0.2-0.8)
        rotation: Math.random() * 360,
        opacity: 0.08 + Math.random() * 0.12, // 0.08-0.2 opacity
        index: i,
      });
    }
    
    setTools(newTools);
  }, []);

  // Track scroll position with throttling for performance
  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  // Don't render if reduced motion is preferred
  if (prefersReducedMotion || tools.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ zIndex: -1 }}>
      {tools.map((tool) => {
        const Icon = tool.icon;
        // Calculate parallax movement - tools move at different speeds
        // Slower tools (lower speed) appear further away and move less
        const parallaxY = scrollY * tool.speed * 0.3;
        // Also add slight horizontal drift for more natural movement
        const driftX = Math.sin((scrollY + tool.index * 100) / 500) * 20;
        // Subtle rotation as you scroll
        const currentRotation = tool.rotation + scrollY * 0.05;
        
        return (
          <div
            key={tool.index}
            className="absolute will-change-transform"
            style={{
              left: `${tool.x}%`,
              top: `${tool.y + parallaxY}%`, // Move down with scroll at different speeds
              transform: `translate(${driftX}px, ${parallaxY}px) rotate(${currentRotation}deg)`,
              opacity: tool.opacity,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <Icon
              size={tool.size}
              className="text-gold"
              style={{
                filter: `drop-shadow(0 0 10px hsl(var(--gold) / ${tool.opacity * 2}))`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

