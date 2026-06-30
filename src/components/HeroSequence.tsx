import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 193;

export default function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for the multi-phase text sequence
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const seq = useRef({ frame: 0 });

  useEffect(() => {
    // Preload images
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const num = (i + 1).toString().padStart(3, '0');
      
      // Local path (what was previously used)
      const localSrc = `/frames/ezgif-frame-${num}.jpg`;
      
      // GitHub fallback path: frames 1-96 use '-', 97-193 use '_'
      const separator = (i + 1) >= 97 ? '_' : '-';
      const githubSrc = `https://raw.githubusercontent.com/Abdulkoko-10/Snubak-Foods/main/public/frames/ezgif-frame${separator}${num}.jpg`;

      img.onload = () => {
        loadedCount++;
        if (i === 0) render(); // render first frame when it loads
      };
      
      let retried = false;
      img.onerror = () => {
        if (!retried) {
          retried = true;
          img.src = githubSrc; // Fallback to GitHub image
        }
      };

      img.src = localSrc;
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  const render = () => {
    if (!canvasRef.current) return;
    const frameIndex = Math.round(seq.current.frame);
    if (!imagesRef.current[frameIndex]) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const img = imagesRef.current[frameIndex];
    if (!img.complete || img.naturalWidth === 0) return;
    
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, img.width, img.height,
                      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  };

  useGSAP(() => {
    console.log("HeroSequence timeline init v3 - multiple text phases enabled");
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render();
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Fluid Apple-style interactive playback
      },
    });

    // 1. MASTER FRAME SEQUENCE: Animates from frame 0 to 192 over the entire scroll (0-100)
    tl.to(seq.current, {
      frame: frameCount - 1,
      ease: 'none',
      onUpdate: render,
      duration: 100,
    }, 0);

    // --- 2. MULTI-PHASE TEXT TIMELINES ---
    
    // PHASE 1: The Intro (0% to 25%)
    // Effect: Deep recession into the background with a heavy blur and fade
    tl.to(text1Ref.current, {
      scale: 0.5,
      y: -150,
      z: -500,
      opacity: 0,
      filter: 'blur(20px)',
      duration: 25,
      ease: 'power2.inOut'
    }, 0);

    // PHASE 2: The Atmosphere (25% to 50%)
    // Effect: Expanding letter tracking (cinematic reveal) with a glowing blend mode
    tl.fromTo(text2Ref.current,
      { opacity: 0, y: 50, scale: 0.9, letterSpacing: '0px', filter: 'blur(15px)' },
      { opacity: 1, y: 0, scale: 1, letterSpacing: '12px', filter: 'blur(0px)', duration: 10, ease: 'power2.out' },
      25
    );
    tl.to(text2Ref.current, {
      opacity: 0, y: -50, scale: 1.1, filter: 'blur(15px)', duration: 15, ease: 'power2.in'
    }, 35);

    // PHASE 3: The Assembly (50% to 75%)
    // Effect: Sharp sideways slide-in mimicking the assembly of the food components
    tl.fromTo(text3Ref.current,
      { opacity: 0, x: -80, filter: 'blur(10px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 10, ease: 'power2.out' },
      50
    );
    tl.to(text3Ref.current, {
      opacity: 0, x: 80, filter: 'blur(10px)', duration: 15, ease: 'power2.in'
    }, 60);

    // PHASE 4: The Finale & CTA (80% to 100%)
    // Effect: Elegant rise-up, revealing the final call to action
    // Finishes at 90, so from 90 to 100 it stays fully visible for the user to interact
    tl.fromTo(text4Ref.current,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 10, ease: 'power2.out' },
      80
    );

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#1c1917]">
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden flex items-center justify-center bg-black" style={{ perspective: '1200px' }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* PHASE 1: The Intro */}
        <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center will-change-transform mix-blend-screen">
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#b48e65] mb-6 tracking-tight" style={{ textShadow: '0 4px 30px rgba(180,142,101,0.3)' }}>
            Snubak Foods
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 font-light max-w-2xl leading-relaxed drop-shadow-md">
            Culinary precision meets natural ingredients. Experience our curated selection of artisanal dishes.
          </p>
        </div>

        {/* PHASE 2: The Smoke / Atmosphere */}
        <div ref={text2Ref} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center will-change-transform mix-blend-overlay opacity-0">
          <h2 className="text-4xl md:text-6xl font-serif text-white uppercase opacity-90 drop-shadow-2xl font-medium">
            Immersed in Flavor
          </h2>
        </div>

        {/* PHASE 3: The Assembly */}
        <div ref={text3Ref} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center will-change-transform opacity-0">
          <h2 className="text-5xl md:text-7xl font-serif text-stone-100 mb-4 drop-shadow-2xl">
            Artisanal Mastery
          </h2>
          <p className="text-xl md:text-2xl text-[#b48e65] font-light italic drop-shadow-md">
            Down to the last grain.
          </p>
        </div>

        {/* PHASE 4: The Finale */}
        <div ref={text4Ref} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center will-change-transform opacity-0">
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#b48e65] mb-10 drop-shadow-2xl">
            Savor the Extraordinary
          </h2>
          <button className="px-10 py-4 bg-[#b48e65] hover:bg-[#a37c53] text-white font-medium tracking-wide rounded-full shadow-2xl transition-colors cursor-pointer pointer-events-auto">
            View Menu
          </button>
        </div>

      </div>
    </div>
  );
}
