import { useEffect, useRef, useState } from "react";
import { rafThrottle, prefersReducedMotion } from "@/utils/animations";

interface UseParallaxOptions {
  /**
   * Speed factor for parallax effect (negative for reverse)
   * @default 0.5
   */
  speed?: number;
  /**
   * Enable rotation based on scroll position
   * @default false
   */
  rotate?: boolean;
  /**
   * Rotation multiplier
   * @default 0.1
   */
  rotateSpeed?: number;
  /**
   * Enable mouse-move parallax
   * @default false
   */
  mouse?: boolean;
  /**
   * Mouse parallax strength
   * @default 20
   */
  mouseStrength?: number;
}

/**
 * Hook for creating parallax scroll effects
 * Automatically respects prefers-reduced-motion
 * Uses requestAnimationFrame for smooth performance
 * 
 * @example
 * const { ref, transform } = useParallax<HTMLDivElement>({ speed: 0.5 });
 * return <div ref={ref} style={{ transform }}>Parallax content</div>
 */
export function useParallax<T extends HTMLElement>(
  options: UseParallaxOptions = {}
) {
  const {
    speed = 0.5,
    rotate = false,
    rotateSpeed = 0.1,
    mouse = false,
    mouseStrength = 20,
  } = options;

  const ref = useRef<T | null>(null);
  const [transform, setTransform] = useState<string>("");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip parallax if user prefers reduced motion
    if (prefersReducedMotion()) {
      setTransform("");
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const updateTransform = rafThrottle(() => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Calculate scroll-based parallax
      const elementCenter = elementTop + elementHeight / 2;
      const viewportCenter = scrollY + windowHeight / 2;
      const distance = elementCenter - viewportCenter;
      const parallaxOffset = distance * speed;

      // Calculate rotation
      const rotation = rotate ? distance * rotateSpeed : 0;

      // Calculate mouse parallax
      const mouseDeltaX = mouse ? (targetMouseX - mouseX) * 0.1 : 0;
      const mouseDeltaY = mouse ? (targetMouseY - mouseY) * 0.1 : 0;
      mouseX += mouseDeltaX;
      mouseY += mouseDeltaY;

      const mouseOffsetX = mouse ? mouseX * mouseStrength : 0;
      const mouseOffsetY = mouse ? mouseY * mouseStrength : 0;

      // Combine transforms
      const transforms = [
        `translate3d(${mouseOffsetX}px, ${parallaxOffset + mouseOffsetY}px, 0)`,
        rotate ? `rotate(${rotation}deg)` : "",
      ].filter(Boolean);

      setTransform(transforms.join(" "));
    });

    // Scroll handler
    const handleScroll = () => {
      updateTransform();
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouse) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize to -1 to 1
      targetMouseX = (clientX / innerWidth - 0.5) * 2;
      targetMouseY = (clientY / innerHeight - 0.5) * 2;

      updateTransform();
    };

    // Initial update
    updateTransform();

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    if (mouse) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (mouse) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [speed, rotate, rotateSpeed, mouse, mouseStrength]);

  return { ref, transform };
}
