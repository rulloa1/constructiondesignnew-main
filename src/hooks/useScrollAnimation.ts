import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions extends IntersectionObserverInit {
  /**
   * If true, the observer will only trigger once and then disconnect
   * @default true
   */
  once?: boolean;
}

/**
 * Hook that observes an element and returns whether it's in view
 * Automatically respects prefers-reduced-motion preference
 * 
 * @example
 * const { ref, inView } = useScrollAnimation<HTMLDivElement>();
 * return <div ref={ref} className={inView ? 'animate-fade-in' : 'opacity-0'}>...</div>
 */
export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
) {
  const {
    once = true,
    threshold = 0.15,
    rootMargin = "0px 0px -10% 0px",
    ...restOptions
  } = options;

  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || (once && inView)) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setInView(false);
        }
      },
      {
        root: null,
        threshold,
        rootMargin,
        ...restOptions,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [inView, once, threshold, rootMargin, restOptions]);

  return { ref, inView };
}
