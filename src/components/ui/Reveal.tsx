import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type RevealDirection = "up" | "down" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

const transformMap: Record<RevealDirection, string> = {
  up: "translate3d(0, 24px, 0) scale(0.96)",
  down: "translate3d(0, -24px, 0) scale(0.96)",
  left: "translate3d(-24px, 0, 0) scale(0.96)",
  right: "translate3d(24px, 0, 0) scale(0.96)",
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  once = true,
  className = "",
}: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ once });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transformMap[direction],
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
