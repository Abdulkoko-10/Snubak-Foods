import { useEffect, useRef, forwardRef, useImperativeHandle, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ProductCanvasProps {
  folderPath?: string;
  baseName?: string;
  fullPathBase?: string;
  frameCount: number;
  scrollTriggerEnd?: string;
  containerHeight?: string;
  sequenceDuration?: number; // 0 to 100, how much of the timeline the image sequence takes
  children?: ReactNode;
}

export interface ProductCanvasRef {
  container: HTMLDivElement | null;
  timeline: gsap.core.Timeline | null;
}

const ProductCanvas = forwardRef<ProductCanvasRef, ProductCanvasProps & { fullPathBase?: string }>(({
  folderPath,
  baseName,
  fullPathBase,
  frameCount,
  scrollTriggerEnd = 'bottom bottom',
  containerHeight = '500vh',
  sequenceDuration = 100,
  children
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const seq = useRef({ frame: 0 });
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useImperativeHandle(ref, () => ({
    container: containerRef.current,
    get timeline() {
      return timelineRef.current;
    }
  }));

  useEffect(() => {
    // Preload images
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const num = (i + 1).toString().padStart(3, '0');
      
      const localPath = fullPathBase ? `${fullPathBase}${num}.jpg` : `/${folderPath}/${baseName}${num}.jpg`;
      const localSrc = localPath;
      // Fallback to GitHub raw content if local images are missing (e.g. after deletion)
      const githubSrc = fullPathBase 
        ? `https://raw.githubusercontent.com/Abdulkoko-10/Snubak-Foods/main/public${localPath}`
        : `https://raw.githubusercontent.com/Abdulkoko-10/Snubak-Foods/main/public/${folderPath}/${baseName}${num}.jpg`;

      img.onload = () => {
        loadedCount++;
        if (i === 0) render(); // render first frame when it loads
      };
      
      let retried = false;
      img.onerror = () => {
        if (!retried) {
          retried = true;
          img.src = githubSrc;
        }
      };

      img.src = localSrc;
      images.push(img);
    }
    imagesRef.current = images;
  }, [folderPath, baseName, frameCount]);

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
        end: scrollTriggerEnd,
        scrub: 1, // Fluid interactive playback
      },
    });
    
    timelineRef.current = tl;

    // MASTER FRAME SEQUENCE: Animates from frame 0 to frameCount - 1
    tl.to(seq.current, {
      frame: frameCount - 1,
      ease: 'none',
      onUpdate: render,
      duration: sequenceDuration,
    }, 0);

    // If sequenceDuration is less than 100, add empty space so the timeline extends to 100
    if (sequenceDuration < 100) {
      tl.to({}, { duration: 100 - sequenceDuration }, sequenceDuration);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };
  }, { scope: containerRef, dependencies: [frameCount, scrollTriggerEnd, sequenceDuration] });

  return (
    <div ref={containerRef} className="relative w-full bg-[#1c1917]" style={{ height: containerHeight }}>
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden flex items-center justify-center bg-black" style={{ perspective: '1200px' }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {children}
      </div>
    </div>
  );
});

export default ProductCanvas;
