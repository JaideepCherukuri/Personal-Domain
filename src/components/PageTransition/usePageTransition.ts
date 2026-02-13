import { usePageTransitionContext } from "./PageTransitionContext";

export function usePageTransition() {
  const { triggerTransition, isTransitioning } = usePageTransitionContext();

  return {
    triggerTransition,
    isTransitioning,
  };
}
