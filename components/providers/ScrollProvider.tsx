"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollProviderProps {
  children: React.ReactNode;
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-container">
      {children}
    </div>
  );
}

// Hook for scroll animations
export function useScrollAnimation(
  ref: React.RefObject<HTMLElement | null>,
  options: {
    animation?: "fadeUp" | "fadeIn" | "scaleIn" | "slideLeft" | "slideRight";
    delay?: number;
    duration?: number;
    start?: string;
    markers?: boolean;
  } = {}
) {
  const {
    animation = "fadeUp",
    delay = 0,
    duration = 1,
    start = "top 85%",
    markers = false,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const animations: Record<string, gsap.TweenVars> = {
      fadeUp: { opacity: 0, y: 30 },
      fadeIn: { opacity: 0 },
      scaleIn: { opacity: 0, scale: 0.95 },
      slideLeft: { opacity: 0, x: 30 },
      slideRight: { opacity: 0, x: -30 },
    };

    const initialState = animations[animation];

    // Set initial state
    gsap.set(element, initialState);

    // Create animation
    const tween = gsap.to(element, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start,
        markers,
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [ref, animation, delay, duration, start, markers]);
}

// Stagger animation hook for lists
export function useStaggerAnimation(
  refs: React.RefObject<(HTMLElement | null)[]>,
  options: {
    animation?: "fadeUp" | "fadeIn" | "scaleIn" | "slideLeft" | "slideRight";
    stagger?: number;
    duration?: number;
    start?: string;
  } = {}
) {
  const {
    animation = "fadeUp",
    stagger = 0.1,
    duration = 1,
    start = "top 85%",
  } = options;

  useEffect(() => {
    if (!refs.current?.length) return;

    const elements = refs.current.filter(Boolean) as HTMLElement[];

    const animations: Record<string, gsap.TweenVars> = {
      fadeUp: { opacity: 0, y: 30 },
      fadeIn: { opacity: 0 },
      scaleIn: { opacity: 0, scale: 0.95 },
      slideLeft: { opacity: 0, x: 30 },
      slideRight: { opacity: 0, x: -30 },
    };

    const initialState = animations[animation];

    gsap.set(elements, initialState);

    const tween = gsap.to(elements, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: elements[0],
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
    };
  }, [refs, animation, stagger, duration, start]);
}
