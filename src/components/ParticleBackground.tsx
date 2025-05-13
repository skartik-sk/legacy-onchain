
import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    let hue = 260; // Start hue for the color cycling
    
    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create particles
    function initParticles() {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000); // More particles
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.6, // Slightly faster movement
          speedY: (Math.random() - 0.5) * 0.6,
          color: `hsla(${hue + Math.random() * 60}, 80%, 60%, 0.8)`, // Dynamic color based on hue
          pulse: 0,
          pulseSpeed: 0.02 + Math.random() * 0.04
        });
      }
    }
    
    // Connect particles with lines if they're close enough
    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) { // Increased connection distance
            // Calculate gradient based on particle colors
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y, 
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, particles[i].color);
            gradient.addColorStop(1, particles[j].color);
            
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${0.15 * (1 - distance / 150)})`; // Dynamic color based on hue
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsActive(true);
      
      // Reset active state after some time of no movement
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => setIsActive(false), 2000);
    };
    
    let mouseTimeout: NodeJS.Timeout;
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      // Create semi-transparent background to create trail effect
      ctx.fillStyle = 'rgba(19, 21, 28, 0.05)'; // Matches our new background color
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p, index) => {
        // Slowly cycle through colors
        hue = (hue + 0.05) % 360;
        
        // Mouse interaction with more dramatic effect when active
        if (isActive) {
          const dx = p.x - mousePosition.x;
          const dy = p.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            const angle = Math.atan2(dy, dx);
            const force = (maxDistance - distance) / 1500;
            p.speedX += Math.cos(angle) * force;
            p.speedY += Math.sin(angle) * force;
            
            // Create new particles on mouse movement occasionally
            if (Math.random() < 0.02 && particles.length < 200) {
              particles.push({
                x: mousePosition.x + (Math.random() - 0.5) * 20,
                y: mousePosition.y + (Math.random() - 0.5) * 20,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                color: `hsla(${hue + Math.random() * 60}, 80%, 60%, 0.8)`,
                pulse: 0,
                pulseSpeed: 0.02 + Math.random() * 0.04
              });
            }
          }
        }
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Pulsating effect
        p.pulse += p.pulseSpeed;
        const pulseFactor = Math.sin(p.pulse) * 0.5 + 1;
        const size = p.size * pulseFactor;
        
        // Update color based on position and time
        const particleHue = (hue + index % 60) % 360;
        p.color = `hsla(${particleHue}, 80%, 60%, 0.8)`;
        
        // Slow down
        p.speedX *= 0.99;
        p.speedY *= 0.99;
        
        // Wrap around edges with small random variation
        if (p.x < 0) p.x = canvas.width + (Math.random() * 10);
        if (p.x > canvas.width) p.x = 0 - (Math.random() * 10);
        if (p.y < 0) p.y = canvas.height + (Math.random() * 10);
        if (p.y > canvas.height) p.y = 0 - (Math.random() * 10);
        
        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        
        // Add glow with shadow
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Reset shadow for better performance
        ctx.shadowBlur = 0;
      });
      
      // Connect nearby particles
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(mouseTimeout);
    };
  }, [mousePosition, isActive]);
  
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-aurora"></div>
      <div className="fixed top-0 left-0 w-full h-full noise-filter"></div>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full opacity-60 pointer-events-none"
        style={{ zIndex: 0 }}
      />
    </>
  );
};

export default ParticleBackground;
