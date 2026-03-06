// Consistent easing across the site
export const easing: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// Fade up — the default reveal animation
export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
};

// Fade in (no slide) — for reduced motion or simpler reveals
export const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
};

// Stagger container — wraps groups of items
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger item — child of stagger container
export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
};
