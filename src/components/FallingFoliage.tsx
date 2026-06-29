import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vy: number;
  vx: number;
  extraVx: number; // Real physical impulse velocity
  extraVy: number; // Real physical impulse velocity
  size: number;
  type: 'leaf' | 'petal';
  angle: number;
  spin: number;
  extraSpin: number; // Aerodynamic spin/torque from gust
  sway: number;
  swaySpeed: number;
  swayRange: number;
  rotationY: number;
  rotationYSpeed: number;
  extraRotationYSpeed: number; // Turbulent flip speed from gust
  color1: string;
  color2: string;
  opacity: number;
}

export default function FallingFoliage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // Dynamic sizing helper
    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Track mouse coordinates relative to container
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // 1. Violent explosion for existing particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 300) {
          const force = (300 - dist) / 300;
          const angle = Math.atan2(dy, dx);
          
          p.extraVx += Math.cos(angle) * force * 20;
          p.extraVy += Math.sin(angle) * force * 20;
          p.extraSpin += (Math.random() - 0.5) * force * 1.5;
          p.extraRotationYSpeed += Math.random() * force * 1.5;
        }
      }

      // 2. Spawn a burst of new particles
      for (let i = 0; i < 20; i++) {
        const p = createParticle(false);
        p.x = clickX + (Math.random() - 0.5) * 40;
        p.y = clickY + (Math.random() - 0.5) * 40;
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 12;
        
        p.extraVx = Math.cos(angle) * speed;
        p.extraVy = Math.sin(angle) * speed;
        
        particles.push(p);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    // Color palettes
    const leafColors = [
      { c1: '#628a5c', c2: '#41633d' }, // Sage green
      { c1: '#8ba882', c2: '#5f7d56' }, // Light herbal green
      { c1: '#a4ba9c', c2: '#738a6c' }, // Olive green
      { c1: '#c4b693', c2: '#9e8c62' }, // Warm golden-green dry leaf
    ];

    const petalColors = [
      { c1: '#ffffff', c2: '#f0edd5' }, // Delicate tea blossom cream
      { c1: '#fff9e6', c2: '#fcecb3' }, // Soft yellow-centered petal
      { c1: '#fcf3e8', c2: '#ebd3be' }, // Golden ivory petal
    ];

    const particles: Particle[] = [];
    const maxParticles = 30; // Clean density that doesn't feel cluttered

    const createParticle = (initTop = false): Particle => {
      const type = Math.random() > 0.6 ? 'leaf' : 'petal';
      const colors = type === 'leaf' 
        ? leafColors[Math.floor(Math.random() * leafColors.length)]
        : petalColors[Math.floor(Math.random() * petalColors.length)];

      const size = type === 'leaf' 
        ? 12 + Math.random() * 12 // Leaf size
        : 8 + Math.random() * 8;   // Petal size

      return {
        x: Math.random() * width,
        y: initTop ? Math.random() * height : -30 - Math.random() * 50,
        vy: 0.6 + Math.random() * 1.2,
        vx: (Math.random() - 0.5) * 0.4,
        extraVx: 0,
        extraVy: 0,
        size,
        type,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
        extraSpin: 0,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.01 + Math.random() * 0.02,
        swayRange: 15 + Math.random() * 25,
        rotationY: Math.random() * Math.PI,
        rotationYSpeed: 0.02 + Math.random() * 0.04,
        extraRotationYSpeed: 0,
        color1: colors.c1,
        color2: colors.c2,
        opacity: 0.6 + Math.random() * 0.4,
      };
    };

    // Populate initial batch scattered around
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    // Drawing functions
    const drawLeaf = (context: CanvasRenderingContext2D, size: number, c1: string, c2: string) => {
      const grad = context.createLinearGradient(0, -size, 0, size);
      grad.addColorStop(0, c1);
      grad.addColorStop(1, c2);
      context.fillStyle = grad;

      // Draw beautiful curved leaf shape
      context.beginPath();
      context.moveTo(0, -size);
      context.quadraticCurveTo(size * 0.7, -size * 0.2, size * 0.1, size);
      context.quadraticCurveTo(-size * 0.5, -size * 0.1, 0, -size);
      context.closePath();
      context.fill();

      // Leaf midrib/vein
      context.strokeStyle = 'rgba(255,255,255,0.25)';
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(0, -size);
      context.quadraticCurveTo(size * 0.2, 0, size * 0.1, size * 0.8);
      context.stroke();
    };

    const drawPetal = (context: CanvasRenderingContext2D, size: number, c1: string, c2: string) => {
      const grad = context.createLinearGradient(0, -size, 0, size);
      grad.addColorStop(0, c1);
      grad.addColorStop(1, c2);
      context.fillStyle = grad;

      // Draw heart-like organic petal
      context.beginPath();
      context.moveTo(0, -size * 0.6);
      context.bezierCurveTo(size * 0.8, -size * 0.8, size, size * 0.3, 0, size);
      context.bezierCurveTo(-size, size * 0.3, -size * 0.8, -size * 0.8, 0, -size * 0.6);
      context.closePath();
      context.fill();

      // Soft center shadow
      context.fillStyle = 'rgba(244,180,26,0.15)';
      context.beginPath();
      context.arc(0, -size * 0.1, size * 0.3, 0, Math.PI * 2);
      context.fill();
    };

    // Core Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Global wind drift offset
      const time = Date.now() * 0.0005;
      const windForce = Math.sin(time) * 0.25;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply velocities (base falling speed + interactive impulses)
        p.y += p.vy + p.extraVy;
        p.sway += p.swaySpeed;
        
        // Sway calculation
        const swayOffset = Math.sin(p.sway) * p.swayRange * 0.05;
        p.x += p.vx + windForce + swayOffset + p.extraVx;
        p.angle += p.spin + p.extraSpin;
        p.rotationY += p.rotationYSpeed + p.extraRotationYSpeed;

        // Apply friction/air drag decay to interactive impulses and torques
        p.extraVx *= 0.95;
        p.extraVy *= 0.95;
        p.extraSpin *= 0.94;
        p.extraRotationYSpeed *= 0.94;

        // Interactive: Mouse repulsion with physical impulse and torque
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const limit = 250; // Increased Interaction radius

          if (dist < limit) {
            const force = (limit - dist) / limit; // 1 at center, 0 at border
            const angle = Math.atan2(dy, dx);
            
            // Sweet spot push acceleration
            const pushMagnitude = force * force * 2.5;
            
            // Accelerate away from cursor
            p.extraVx += Math.cos(angle) * pushMagnitude;
            p.extraVy += Math.sin(angle) * pushMagnitude * 0.8;

            // Add a slight vortex/swirl effect
            const swirlMagnitude = force * 1.5;
            p.extraVx += Math.cos(angle + Math.PI / 2) * swirlMagnitude;
            p.extraVy += Math.sin(angle + Math.PI / 2) * swirlMagnitude;

            // Induce fluttering rotation and turbulent 3D tumble when brushed
            p.extraSpin += (Math.random() - 0.5) * force * 0.2;
            p.extraRotationYSpeed += Math.random() * force * 0.25;
          }
        }

        // Loop constraints
        if (p.y > height + 20 || p.x < -20 || p.x > width + 20) {
          if (particles.length > maxParticles) {
            particles.splice(i, 1);
            i--;
            continue;
          } else {
            particles[i] = createParticle(false);
            continue;
          }
        }

        // Render particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        
        // Simulated 3D tumble via scaleY
        ctx.scale(1, Math.cos(p.rotationY));
        
        ctx.globalAlpha = p.opacity;

        // Draw shadow for elegant depth
        ctx.shadowColor = 'rgba(62,39,35,0.05)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 3;

        if (p.type === 'leaf') {
          drawLeaf(ctx, p.size, p.color1, p.color2);
        } else {
          drawPetal(ctx, p.size, p.color1, p.color2);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ cursor: 'default' }}
      />
    </div>
  );
}
