import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions extends IntersectionObserverInit {
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(options?: UseScrollRevealOptions) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { once = true, ...observerOptions } = options ?? {};

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
        ...observerOptions,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
}
