import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function MasaOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buildRef = useRef<HTMLDivElement>(null);
  const assemblyRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const [portion, setPortion] = useState('6');
  const [extraYaji, setExtraYaji] = useState(false);
  const [miyanTaushe, setMiyanTaushe] = useState(false);
  const [honeyDrizzle, setHoneyDrizzle] = useState(false);
  const [isClipped, setIsClipped] = useState(false);

  const getBasePrice = () => {
    switch(portion) {
      case '3': return 1500;
      case '6': return 2800;
      case '12': return 5000;
      default: return 2800;
    }
  };

  const basePrice = getBasePrice();
  const totalPrice = basePrice + 
    (extraYaji ? 200 : 0) + 
    (miyanTaushe ? 800 : 0) +
    (honeyDrizzle ? 500 : 0);

  useGSAP(() => {
    const triggerEl = document.getElementById('local-classics-viewer');

    // The build text (Frame 001 - 060 approx)
    // "uses a GSAP timeline to slowly scale up and fade out as the user scrolls through the pan-frying sequence"
    gsap.fromTo(buildRef.current,
      { opacity: 1, scale: 0.95 },
      {
        opacity: 0,
        scale: 1.1,
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top top',
          end: '40% top',
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
          {t('masaTitle') || 'Authentic Golden Hausa Masa'}
        </h2>
        <p className="text-lg md:text-xl text-white/80 font-light max-w-md drop-shadow-md">
          {t('masaDesc') || 'Pan-fried to golden perfection, fluffy on the inside.'}
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
            <h3 className="text-3xl font-serif font-bold text-white mb-2">{t('masaName') || 'Traditional Masa'}</h3>
            <p className="text-[#b48e65] text-2xl font-light mb-6">₦{totalPrice.toLocaleString()}</p>

            <div className="space-y-4 mb-6">
              <p className="text-stone-400 text-sm font-medium uppercase tracking-wider">{t('portionSize') || 'Portion Size'}</p>
              <div className="flex gap-4">
                {['3', '6', '12'].map((p) => (
                  <label key={p} className="flex items-center space-x-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="portion"
                      value={p}
                      checked={portion === p}
                      onChange={(e) => setPortion(e.target.value)}
                      className="form-radio h-4 w-4 text-[#b48e65] bg-stone-800 border-stone-600 focus:ring-[#b48e65] focus:ring-offset-stone-900"
                    />
                    <span className="text-stone-300 group-hover:text-white capitalize transition-colors text-sm">{t(`pieces_${p}`) || `${p} Pieces`}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-stone-400 text-sm font-medium uppercase tracking-wider">{t('dipsSpices') || 'Dips & Spices'}</p>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={extraYaji}
                  onChange={(e) => setExtraYaji(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-[#b48e65] rounded border-stone-600 bg-stone-800 focus:ring-[#b48e65] focus:ring-offset-stone-900" 
                />
                <span className="text-stone-300 group-hover:text-white transition-colors">{t('extraYaji') || 'Extra Red Yaji Spice'} (+₦200)</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={miyanTaushe}
                  onChange={(e) => setMiyanTaushe(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-[#b48e65] rounded border-stone-600 bg-stone-800 focus:ring-[#b48e65] focus:ring-offset-stone-900" 
                />
                <span className="text-stone-300 group-hover:text-white transition-colors">{t('miyanTaushe') || 'Miyan Taushe Dip'} (+₦800)</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={honeyDrizzle}
                  onChange={(e) => setHoneyDrizzle(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-[#b48e65] rounded border-stone-600 bg-stone-800 focus:ring-[#b48e65] focus:ring-offset-stone-900" 
                />
                <span className="text-stone-300 group-hover:text-white transition-colors">{t('honeyDrizzle') || 'Honey Drizzle'} (+₦500)</span>
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
