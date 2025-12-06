export const ANIMATIONS = {
  // Entrance animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  
  // List item stagger
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  },

  // Interactive
  hoverScale: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tapScale: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

export const TRANSITION_DEFAULTS = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

