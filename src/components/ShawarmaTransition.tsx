import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ShawarmaTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    // Text reveal (camouflaged text popping out)
    gsap.fromTo(textRef.current,
      {
        opacity: 0,
        y: 80,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'center center',
          scrub: true,
        }
      }
    );
    
    // Background color transition from cream to dark stone (matching showcase)
    gsap.to(containerRef.current, {
      backgroundColor: '#000000',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center center',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Fade out text as we scroll into the showcase, while it's dark
    gsap.to(textRef.current, {
      opacity: 0,
      scale: 1.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center center',
        end: 'bottom top',
        scrub: true,
      }
    });

    const subText = containerRef.current?.querySelector('p');
    if (subText) {
      gsap.to(subText, {
        color: '#f5f4ef',
        opacity: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="h-[70vh] flex items-center justify-center bg-[#f5f4ef] overflow-hidden relative">
      <h2 
        ref={textRef} 
        className="text-[12vw] font-serif font-bold uppercase tracking-widest text-[#f5f4ef] select-none"
        style={{
          textShadow: '2px 4px 10px rgba(62, 39, 35, 0.15), -1px -1px 2px rgba(255,255,255,0.8)'
        }}
      >
        {t('shawarma')}
      </h2>
      <p className="absolute bottom-1/4 text-[#5c4033] opacity-60 font-medium tracking-[0.3em] text-sm uppercase">
        {t('catMainsBites')}
      </p>
    </div>
  );
}
