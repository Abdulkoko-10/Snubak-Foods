import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ProductCanvas from './ProductCanvas';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ShawarmaShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const finalCardRef = useRef<HTMLDivElement>(null);
  
  const [isClipped, setIsClipped] = useState(false);
  const [extras, setExtras] = useState({
    sausage: false,
    cheese: false,
    garlicSauce: false,
  });

  const basePrice = 3500;
  const totalPrice = basePrice + 
    (extras.sausage ? 500 : 0) + 
    (extras.cheese ? 800 : 0) + 
    (extras.garlicSauce ? 200 : 0);

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
            {t('showcaseText1Title')}
          </h2>
          <p className="text-xl md:text-2xl text-stone-200 font-light max-w-xl drop-shadow-md">
            {t('showcaseText1Desc')}
          </p>
        </div>

        <div ref={text2Ref} className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none px-12 md:px-32 will-change-transform opacity-0 mix-blend-overlay z-10">
          <h2 className="text-6xl md:text-8xl font-serif text-white opacity-90 drop-shadow-2xl font-medium max-w-lg leading-tight">
            {t('showcaseText2Title')}
          </h2>
        </div>

        <div ref={finalCardRef} className="absolute inset-y-0 right-0 flex items-center justify-end pointer-events-none pr-0 z-20 overflow-hidden">
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
              <h3 className="text-3xl font-serif font-bold text-white mb-2">{t('signatureShawarma')}</h3>
              <p className="text-[#b48e65] text-2xl font-light mb-6">₦{totalPrice.toLocaleString()}</p>
              
              <div className="space-y-4 mb-8">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={extras.sausage}
                    onChange={(e) => setExtras({...extras, sausage: e.target.checked})}
                    className="form-checkbox h-5 w-5 text-[#b48e65] rounded border-stone-600 bg-stone-800 focus:ring-[#b48e65] focus:ring-offset-stone-900" 
                  />
                  <span className="text-stone-300 group-hover:text-white transition-colors">{t('extraSausage')} (+₦500)</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={extras.cheese}
                    onChange={(e) => setExtras({...extras, cheese: e.target.checked})}
                    className="form-checkbox h-5 w-5 text-[#b48e65] rounded border-stone-600 bg-stone-800 focus:ring-[#b48e65] focus:ring-offset-stone-900" 
                  />
                  <span className="text-stone-300 group-hover:text-white transition-colors">{t('doubleCheese')} (+₦800)</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={extras.garlicSauce}
                    onChange={(e) => setExtras({...extras, garlicSauce: e.target.checked})}
                    className="form-checkbox h-5 w-5 text-[#b48e65] rounded border-stone-600 bg-stone-800 focus:ring-[#b48e65] focus:ring-offset-stone-900" 
                  />
                  <span className="text-stone-300 group-hover:text-white transition-colors">{t('extraGarlic')} (+₦200)</span>
                </label>
              </div>
              
              <button className="w-full py-4 bg-[#b48e65]/90 hover:bg-[#a37c53] backdrop-blur-sm text-white font-medium tracking-wide rounded-xl shadow-lg transition-colors border border-[#b48e65]/50 cursor-pointer flex justify-between px-6">
                <span>{t('addToOrder')}</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Fade out to cream background overlay */}
        <div className="fade-out-overlay absolute inset-0 bg-[#f5f4ef] opacity-0 pointer-events-none z-30"></div>

      </ProductCanvas>
    </div>
  );
}
