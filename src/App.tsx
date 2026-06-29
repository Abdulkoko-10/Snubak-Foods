/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import KnifeNavbar from './components/KnifeNavbar';
import HeroSequence from './components/HeroSequence';
import FallingFoliage from './components/FallingFoliage';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Heading subtle parallax
    gsap.fromTo(headingRef.current, 
      { y: 30 },
      {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
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
          trigger: containerRef.current,
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
      <KnifeNavbar />
      
      <HeroSequence />
      
      <section ref={containerRef} className="relative w-full bg-[#f5f4ef] overflow-hidden">
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
    </div>
  );
}
