
import React from 'react';
import { cn } from "@/lib/utils";

interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'light' | 'medium' | 'strong';
  hoverEffect?: boolean;
  animate?: boolean;
  neonBorder?: boolean;
  glowEffect?: boolean;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  className,
  children,
  intensity = 'medium',
  hoverEffect = true,
  animate = false,
  neonBorder = false,
  glowEffect = false,
  ...props
}) => {
  const intensityClasses = {
    light: 'bg-white/5 border-white/5',
    medium: 'bg-white/10 border-white/10',
    strong: 'bg-white/15 border-white/15',
  };

  return (
    <div
      className={cn(
        'rounded-xl backdrop-blur-md border shadow-lg transition-all duration-300',
        intensityClasses[intensity],
        hoverEffect && 'hover:shadow-xl hover:border-white/20 hover:bg-white/[0.12] hover:scale-[1.01]',
        animate && 'animate-float-slow',
        neonBorder && 'neon-border',
        glowEffect && 'animate-glow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
