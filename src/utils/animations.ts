/**
 * Throttles a function using requestAnimationFrame
 * Ensures the function only runs once per animation frame
 * @param fn Function to throttle
 * @returns Throttled function
 */
export const rafThrottle = <T extends any[]>(fn: (...args: T) => void) => {
  let ticking = false;
  return (...args: T) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      fn(...args);
      ticking = false;
    });
  };
};

/**
 * Debounces a function
 * @param fn Function to debounce
 * @param ms Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends any[]>(
  fn: (...args: T) => void,
  ms: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
};

/**
 * Checks if user prefers reduced motion
 * @returns Boolean indicating reduced motion preference
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Creates a ripple effect on an element
 * @param element The element to add ripple effect to
 * @param event The mouse or touch event
 * @param color Optional ripple color (defaults to gold)
 */
export const createRipple = (
  element: HTMLElement,
  event: MouseEvent | TouchEvent,
  color: string = "rgba(228, 179, 33, 0.4)"
) => {
  // Don't create ripple if user prefers reduced motion
  if (prefersReducedMotion()) return;

  const rect = element.getBoundingClientRect();
  const ripple = document.createElement("span");
  
  // Calculate position
  let x: number, y: number;
  if (event instanceof MouseEvent) {
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  } else {
    const touch = event.touches[0] || event.changedTouches[0];
    x = touch.clientX - rect.left;
    y = touch.clientY - rect.top;
  }

  // Calculate diameter
  const diameter = Math.max(rect.width, rect.height);
  const radius = diameter / 2;

  // Style the ripple
  ripple.style.position = "absolute";
  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${x - radius}px`;
  ripple.style.top = `${y - radius}px`;
  ripple.style.background = color;
  ripple.style.borderRadius = "50%";
  ripple.style.pointerEvents = "none";
  ripple.style.transform = "scale(0)";
  ripple.style.opacity = "1";
  ripple.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";
  ripple.style.zIndex = "1000";

  // Ensure parent has positioning context
  const position = window.getComputedStyle(element).position;
  if (position === "static") {
    element.style.position = "relative";
  }
  element.style.overflow = "hidden";

  // Add ripple to element
  element.appendChild(ripple);

  // Trigger animation
  requestAnimationFrame(() => {
    ripple.style.transform = "scale(2)";
    ripple.style.opacity = "0";
  });

  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
};

/**
 * Clamps a number between min and max values
 * @param value The value to clamp
 * @param min Minimum value
 * @param max Maximum value
 * @returns Clamped value
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Linear interpolation between two values
 * @param start Start value
 * @param end End value
 * @param t Interpolation factor (0-1)
 * @returns Interpolated value
 */
export const lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t;
};
