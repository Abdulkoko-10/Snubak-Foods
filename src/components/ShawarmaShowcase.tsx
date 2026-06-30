import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ProductCanvas from './ProductCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function ShawarmaShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const finalCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // We use a 700vh container, but the image sequence finishes at 70%.
    // This gives us the last 30% of the scroll to interact with the final card.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // Frames 1 to 90 (roughly 0% to 50% of the image sequence, which is 0% to 35% of overall timeline)
    // text1: Intro to the meat slicing
    tl.fromTo(text1Ref.current, 
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 10, ease: 'power2.out' },
      0
    );
    tl.to(text1Ref.current, {
      opacity: 0, scale: 1.2, filter: 'blur(10px)', duration: 10, ease: 'power2.in'
    }, 15);

    // text2: Gathering and wrapping
    tl.fromTo(text2Ref.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 10, ease: 'power2.out' },
      25
    );
    tl.to(text2Ref.current, {
      opacity: 0, x: 50, duration: 10, ease: 'power2.in'
    }, 40);

    // Final card: The image sequence finishes at 70. We animate the card in from 60 to 70.
    // It stays visible from 70 to 100 as the user continues to scroll.
    tl.fromTo(finalCardRef.current,
      { opacity: 0, y: 100, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 10, ease: 'power3.out', pointerEvents: 'auto' },
      60
    );

    // Force the timeline to have a duration of 100 so it aligns perfectly with ProductCanvas
    tl.to({}, { duration: 25 }, 70);

    // Fade out to cream background at the very end to transition to the next section
    const fadeOutOverlay = containerRef.current?.querySelector('.fade-out-overlay');
    if (fadeOutOverlay) {
      tl.to(fadeOutOverlay, {
        opacity: 1,
        duration: 5,
        ease: 'none'
      }, 95);
    }

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full">
      <ProductCanvas 
        folderPath="shawarma" 
        baseName="shawarma_" 
        frameCount={181}
        containerHeight="700vh"
        sequenceDuration={70}
        scrollTriggerEnd="bottom bottom"
      >
        {/* Layered Tailwind Overlay for Typography & UI */}
        
        <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center will-change-transform opacity-0 mix-blend-screen z-10">
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#b48e65] mb-4 drop-shadow-2xl tracking-tight">
            Perfectly Sliced
          </h2>
          <p className="text-xl md:text-2xl text-stone-200 font-light max-w-xl drop-shadow-md">
            Slow-roasted and carved with precision for maximum flavor.
          </p>
        </div>

        <div ref={text2Ref} className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none px-12 md:px-32 will-change-transform opacity-0 mix-blend-overlay z-10">
          <h2 className="text-6xl md:text-8xl font-serif text-white opacity-90 drop-shadow-2xl font-medium max-w-lg leading-tight">
            Wrapped in Warmth
          </h2>
        </div>

        <div ref={finalCardRef} className="absolute inset-0 flex items-center justify-end pointer-events-none px-6 md:px-24 will-change-transform opacity-0 z-20">
          <div className="bg-[#1c1917]/90 backdrop-blur-md p-8 rounded-2xl border border-[#b48e65]/30 shadow-2xl max-w-md w-full pointer-events-auto">
            <h3 className="text-3xl font-serif font-bold text-white mb-2">Signature Shawarma</h3>
            <p className="text-[#b48e65] text-2xl font-light mb-6">$8.99</p>
            
            <div className="space-y-4 mb-8">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-[#b48e65] rounded border-stone-600 bg-stone-800 focus:ring-[#b48e65] focus:ring-offset-stone-900" />
                <span className="text-stone-300 group-hover:text-white transition-colors">Extra Sausage (+$1.50)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-[#b48e65] rounded border-stone-600 bg-stone-800 focus:ring-[#b48e65] focus:ring-offset-stone-900" />
                <span className="text-stone-300 group-hover:text-white transition-colors">Double Cheese (+$2.00)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-[#b48e65] rounded border-stone-600 bg-stone-800 focus:ring-[#b48e65] focus:ring-offset-stone-900" />
                <span className="text-stone-300 group-hover:text-white transition-colors">Extra Creamy Garlic Sauce (+$0.50)</span>
              </label>
            </div>
            
            <button className="w-full py-4 bg-[#b48e65] hover:bg-[#a37c53] text-white font-medium tracking-wide rounded-xl shadow-lg transition-colors">
              Add to Order
            </button>
          </div>
        </div>
        
        {/* Fade out to cream background overlay */}
        <div className="fade-out-overlay absolute inset-0 bg-[#f5f4ef] opacity-0 pointer-events-none z-30"></div>

      </ProductCanvas>
    </div>
  );
}
