import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { gsap } from 'gsap';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide the toggle if scrolled down more than 100px
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed top-6 right-6 z-50 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="bg-[#1c1917]/60 backdrop-blur-md rounded-full p-1 border border-[#b48e65]/30 flex items-center shadow-lg">
        <button
          onClick={() => setLang('en')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            lang === 'en' 
              ? 'bg-[#b48e65] text-white shadow-md' 
              : 'text-stone-300 hover:text-white'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLang('ha')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            lang === 'ha' 
              ? 'bg-[#b48e65] text-white shadow-md' 
              : 'text-stone-300 hover:text-white'
          }`}
        >
          HA
        </button>
      </div>
    </div>
  );
}
