/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState, useEffect } from 'react';
import KnifeNavbar from './components/KnifeNavbar';
import HeroSequence from './components/HeroSequence';
import FallingFoliage from './components/FallingFoliage';
import ShawarmaShowcase from './components/ShawarmaShowcase';
import ShawarmaTransition from './components/ShawarmaTransition';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');

  const appRef = useRef<HTMLDivElement>(null);
  const discoverRef = useRef<HTMLElement>(null);
  const mainsBitesRef = useRef<HTMLElement>(null);
  const localClassicsRef = useRef<HTMLElement>(null);
  const pastriesRef = useRef<HTMLElement>(null);
  const chillersRef = useRef<HTMLElement>(null);
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let targetRef = null;
    switch (activeCategory) {
      case 'All':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'Local Classics':
        targetRef = localClassicsRef.current;
        break;
      case 'Mains & Bites':
        targetRef = mainsBitesRef.current;
        break;
      case 'Pastries & Snacks':
        targetRef = pastriesRef.current;
        break;
      case 'Chillers & Drinks':
        targetRef = chillersRef.current;
        break;
    }
    
    if (targetRef) {
      gsap.to(window, { duration: 1.5, scrollTo: targetRef, ease: 'power3.inOut' });
    }
  }, [activeCategory]);

  useGSAP(() => {
    // Heading subtle parallax
    gsap.fromTo(headingRef.current, 
      { y: 30 },
      {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: discoverRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    // Paragraph slightly stronger parallax for depth
    gsap.fromTo(textRef.current,
      { y: 60 },
      {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: discoverRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    // Cinematic fade-in effect
    const fadeElements = gsap.utils.toArray('.fade-in-element') as HTMLElement[];
    fadeElements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, { scope: appRef });

  return (
    <div ref={appRef} className="min-h-screen bg-[#f5f4ef] font-sans text-[#3e2723]">
      <KnifeNavbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      
      <HeroSequence />
      
      {/* 1. Discover The Taste comes right after Hero */}
      <section ref={discoverRef} className="relative w-full bg-[#f5f4ef] overflow-hidden">
        <FallingFoliage />
        <main className="py-48 px-8 max-w-5xl mx-auto flex flex-col items-center text-center relative z-20">
          <h2 ref={headingRef} className="text-4xl md:text-5xl font-serif font-bold text-[#2a170a] mb-6 tracking-tight fade-in-element opacity-0">
            Discover The Taste
          </h2>
          <p ref={textRef} className="text-lg md:text-xl text-[#5c4033] font-light max-w-2xl leading-relaxed fade-in-element opacity-0">
            Scroll down to see more of our delicious offerings and experience culinary excellence like never before.
          </p>
        </main>
      </section>

      {/* Placeholders for Local Classics */}
      <section ref={localClassicsRef} className="w-full bg-[#f5f4ef] min-h-[50vh] flex items-center justify-center border-t border-[#e8e6df]">
         {/* Future Local Classics Content */}
         <p className="text-[#a69382] font-serif text-xl opacity-50 tracking-widest uppercase">Local Classics Coming Soon</p>
      </section>

      {/* Mains & Bites (Contains Shawarma) */}
      <section ref={mainsBitesRef} className="w-full bg-[#f5f4ef]">
        <ShawarmaTransition />
        <ShawarmaShowcase />
      </section>

      {/* Placeholders for Pastries & Chillers */}
      <section ref={pastriesRef} className="w-full bg-[#f5f4ef] min-h-[50vh] flex items-center justify-center border-t border-[#e8e6df]">
        {/* Future Pastries Content */}
         <p className="text-[#a69382] font-serif text-xl opacity-50 tracking-widest uppercase">Pastries Coming Soon</p>
      </section>
      <section ref={chillersRef} className="w-full bg-[#f5f4ef] min-h-[50vh] flex items-center justify-center border-t border-[#e8e6df]">
        {/* Future Chillers Content */}
         <p className="text-[#a69382] font-serif text-xl opacity-50 tracking-widest uppercase">Chillers Coming Soon</p>
      </section>

    </div>
  );
}
