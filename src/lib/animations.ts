import type { Variants } from 'framer-motion'

// Page transitions
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.3 } },
}

// Fade in up
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Fade in
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
}

// Scale in
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

// Slide in from right
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

// Slide in from left
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

// Stagger container
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Stagger item
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

// Card hover
export const cardHover = {
  rest: { scale: 1, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' },
  hover: {
    scale: 1.02,
    boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

// Button hover
export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.2, ease: 'easeOut' } },
  tap: { scale: 0.97, transition: { duration: 0.1 } },
}

// Modal variants
export const modalBackdrop: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.25 } },
}

// Drawer variants
export const drawerVariants: Variants = {
  initial: { x: '-100%' },
  animate: { x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: '-100%', transition: { duration: 0.3 } },
}

export const drawerRightVariants: Variants = {
  initial: { x: '100%' },
  animate: { x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: '100%', transition: { duration: 0.3 } },
}

// Toast notification
export const toastVariants: Variants = {
  initial: { opacity: 0, x: 60, scale: 0.9 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: 60, scale: 0.9, transition: { duration: 0.3 } },
}

// Message bubble
export const messageBubble: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
}

// Floating animation props for motion.div
export const floatAnimation = {
  animate: {
    y: [0, -20, -10, -20, 0],
    rotate: [0, 2, -1, 2, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Sidebar collapse
export const sidebarVariants = {
  expanded: { width: 256, transition: { duration: 0.35, ease: 'easeInOut' } },
  collapsed: { width: 72, transition: { duration: 0.35, ease: 'easeInOut' } },
}
