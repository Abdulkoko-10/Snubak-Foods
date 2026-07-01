import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function PopcornOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buildRef = useRef<HTMLDivElement>(null);
  const assemblyRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const [extraCaramel, setExtraCaramel] = useState(false);
  const [seaSalt, setSeaSalt] = useState(false);
  const [isClipped, setIsClipped] = useState(false);

  const basePrice = 4500;
  const totalPrice = basePrice + 
    (extraCaramel ? 500 : 0) + 
    (seaSalt ? 200 : 0);

  useGSAP(() => {
    const triggerEl = document.getElementById('pastries-viewer');

    // The build text (Frame 001 - 060 approx, but controlled by scroll)
    gsap.fromTo(buildRef.current,
      { opacity: 1, scale: 1 },
      {
        opacity: 0,
        scale: 0.9,
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top top',
          end: '20% top', // fades out as user scrolls
          scrub: true,
        },
      }
    );

    // The assembly UI (Frame 080 - 101 approx)
    gsap.fromTo(assemblyRef.current,
      { opacity: 0, y: 100, scale: 0.95, pointerEvents: 'none' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: 'auto',
        scrollTrigger: {
          trigger: triggerEl,
          start: '60% top', // starts appearing late in the scroll
          end: '80% top',
          scrub: true,
        },
      }
    );
  }, { dependencies: [] });

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-20">
      
      {/* The Build Text */}
      <div ref={buildRef} className="absolute top-[20%] left-0 right-0 flex flex-col items-center text-center px-4">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white drop-shadow-xl tracking-tight mb-4">
          {t('popcornTitle') || 'Artisanal Caramel Popcorn'}
        </h2>
        <p className="text-lg md:text-xl text-white/80 font-light max-w-md drop-shadow-md">
          {t('popcornDesc') || 'Air-popped to perfection, glazed in rich buttery caramel.'}
        </p>
      </div>

      {/* The Assembly UI */}
      <div ref={assemblyRef} className="absolute inset-y-0 right-0 flex items-center justify-end pointer-events-none pr-0 z-20 overflow-hidden">
        <div 
          className={`relative flex items-center transition-transform duration-500 ease-in-out pointer-events-auto ${isClipped ? 'translate-x-[calc(100%-2rem)] md:translate-x-[calc(100%-3rem)]' : 'translate-x-0'} pr-6 md:pr-12`}
        >
          {/* Toggle Button */}
          <button 
            onClick={() => setIsClipped(!isClipped)}
            className="absolute top-[30%] -translate-y-1/2 -left-4 md:-left-6 bg-[#1c1917]/60 backdrop-blur-md p-2 rounded-full border border-[#b48e65]/30 text-white hover:text-[#b48e65] hover:scale-110 transition-all shadow-lg z-30 flex items-center justify-center cursor-pointer"
            title={isClipped ? "Show Menu" : "Hide Menu"}
          >
            {isClipped ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>

          <div className="bg-[#1c1917]/40 backdrop-blur-lg p-8 rounded-2xl border border-[#b48e65]/20 shadow-2xl w-[90vw] sm:w-[400px]">
            <h3 className="text-3xl font-serif font-bold text-white mb-2">{t('popcornName') || 'Caramel Popcorn'}</h3>
            <p className="text-[#b48e65] text-2xl font-light mb-6">₦{totalPrice.toLocaleString()}</p>

            <div className="space-y-4 mb-8">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={extraCaramel}
                  onChange={(e) => setExtraCaramel(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-[#b48e65] rounded border-stone-600 bg-stone-800 focus:ring-[#b48e65] focus:ring-offset-stone-900" 
                />
                <span className="text-stone-300 group-hover:text-white transition-colors">{t('extraCaramel') || 'Extra Caramel Drizzle'} (+₦500)</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={seaSalt}
                  onChange={(e) => setSeaSalt(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-[#b48e65] rounded border-stone-600 bg-stone-800 focus:ring-[#b48e65] focus:ring-offset-stone-900" 
                />
                <span className="text-stone-300 group-hover:text-white transition-colors">{t('seaSalt') || 'Coarse Sea Salt Dash'} (+₦200)</span>
              </label>
            </div>

            <button className="w-full py-4 bg-[#b48e65]/90 hover:bg-[#a37c53] backdrop-blur-sm text-white font-medium tracking-wide rounded-xl shadow-lg transition-colors border border-[#b48e65]/50 cursor-pointer flex justify-between px-6">
              <span>{t('addToOrder')}</span>
              <span>₦{totalPrice.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
