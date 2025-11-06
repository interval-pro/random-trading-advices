import type { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'fade-slide';
  delay?: number;
}

export const AnimatedSection = ({
  children,
  className = '',
  animation = 'fade-slide',
  delay = 0,
}: AnimatedSectionProps) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const animationClasses = {
    'fade-in': isVisible ? 'opacity-100' : 'opacity-0',
    'slide-up': isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
    'fade-slide': isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${animationClasses[animation]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

