import { forwardRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { usePageTransitionContext } from "./PageTransitionContext";

// Accept any props that Link accepts
interface TransitionLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink({ children, onClick, to, ...props }, ref) {
    const { triggerTransition, isTransitioning } = usePageTransitionContext();

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Call original onClick if provided
        onClick?.(e);

        // Don't intercept if already transitioning or if modifier keys are held
        if (isTransitioning || e.metaKey || e.ctrlKey || e.shiftKey) {
          return;
        }

        // Prevent default navigation and trigger transition
        e.preventDefault();
        triggerTransition(to);
      },
      [onClick, isTransitioning, triggerTransition, to]
    );

    return (
      <Link ref={ref} to={to} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }
);
