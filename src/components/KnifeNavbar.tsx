import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, ConciergeBell, UtensilsCrossed, Leaf, ClipboardList, Mail, Menu as MenuIcon, X } from 'lucide-react';

const links = [
  { name: 'Menu', href: '#', icon: ConciergeBell },
  { name: 'Recipes', href: '#', icon: UtensilsCrossed },
  { name: 'About', href: '#', icon: Leaf },
  { name: 'Events', href: '#', icon: ClipboardList },
  { name: 'Contact', href: '#', icon: Mail }
];

export default function KnifeNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 860);
      if (window.innerWidth > 860) setIsOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Desktop (Horizontal Knife)
  if (!isMobile) {
    return (
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 22, stiffness: 100 }}
        className={`fixed top-12 left-1/2 -translate-x-1/2 z-50 flex items-start drop-shadow-[0_20px_25px_rgba(40,30,20,0.15)] h-[72px] group ${isScrolling ? 'animate-blade-vibrate' : ''}`}
      >
        {/* BLADE */}
        <div className="h-[72px] bg-gradient-to-b from-[#FEFCF9] via-[#F4EFEA] to-[#E6E1D7] rounded-l-[36px] flex items-center pl-4 pr-8 relative z-10 shadow-[inset_0_2px_6px_rgba(255,255,255,0.9),inset_0_-3px_5px_rgba(0,0,0,0.08),0_4px_10px_rgba(0,0,0,0.05)] border-y border-l border-[#D9D5CB]">
          
          {/* Animated Glint */}
          <div className="absolute inset-0 rounded-l-[36px] overflow-hidden pointer-events-none z-30">
             <div className="absolute top-0 bottom-0 w-[60px] bg-gradient-to-r from-transparent via-white/80 to-transparent animate-glint blur-[1px]"></div>
          </div>
          
          {/* Bottom sharp edge highlight */}
          <div className="absolute bottom-0 left-6 right-0 h-[2px] bg-gradient-to-b from-white/10 via-white/80 to-[#9A968E] shadow-[0_1px_1px_rgba(0,0,0,0.05)] pointer-events-none opacity-90 z-20 rounded-bl-full"></div>
          
          {/* Chef Hat Logo */}
          <div className="mr-6 ml-4 flex items-center justify-center relative z-10">
              <ChefHat className="w-8 h-8 text-[#A69382] stroke-[1.2] drop-shadow-[0_1px_0_rgba(255,255,255,1)]" />
          </div>

          {/* HOME Active Block */}
          <div className="h-[56px] w-[92px] bg-gradient-to-b from-[#FFFFFF] to-[#FAF8F5] rounded-[18px] shadow-[0_3px_8px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,1)] border border-[#EAE6DD] flex flex-col items-center justify-center relative mr-8 group cursor-pointer transition-transform hover:scale-[1.02]">
               <span className="text-[#3A2A20] font-bold tracking-[0.25em] text-[9px] mt-1 group-hover:text-[#9A8775] transition-colors drop-shadow-[0_1px_0_rgba(255,255,255,1)]">HOME</span>
               <div className="w-5 h-[1.5px] bg-gradient-to-r from-[#D4BA9E] to-[#B3997D] rounded-full mt-2.5"></div>
          </div>

          {/* Link group */}
          <div className="flex items-center space-x-10 h-full px-2">
              {links.map(link => (
                  <a key={link.name} href={link.href} className="flex flex-col items-center justify-center group w-14 h-full relative">
                      <link.icon className="w-[20px] h-[20px] text-[#7A6A5E] stroke-[1.2] mb-2.5 group-hover:text-[#9A8775] transition-colors drop-shadow-[0_1px_0_rgba(255,255,255,1)]" />
                      <span className="text-[#3A2A20] font-bold tracking-[0.2em] text-[8px] uppercase group-hover:text-[#9A8775] transition-colors whitespace-nowrap drop-shadow-[0_1px_0_rgba(255,255,255,1)]">{link.name}</span>
                  </a>
              ))}
          </div>
        </div>

        {/* BOLSTER (The angled silver connector) */}
        <div className="h-[72px] w-[48px] -ml-[20px] relative z-20 overflow-hidden shadow-[-4px_0_6px_rgba(0,0,0,0.15),4px_0_6px_rgba(0,0,0,0.1)]"
             style={{ clipPath: 'polygon(16px 0, 100% 0, 100% 56px, 0 72px)' }}>
             {/* Base metallic color */}
             <div className="absolute inset-0 bg-[#A6A6A6]"></div>
             
             {/* Brushed Metal SVG Overlay */}
             <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light z-10">
                 <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                     <filter id="brushed-metal-bolster-h">
                         <feTurbulence type="fractalNoise" baseFrequency="0.01 0.8" numOctaves="3" result="noise" />
                         <feColorMatrix type="saturate" values="0" />
                     </filter>
                     <rect width="100%" height="100%" filter="url(#brushed-metal-bolster-h)" fill="white" />
                 </svg>
             </div>
             
             {/* Horizontal reflections (cylinder) */}
             <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#8F8F8F] to-[#4D4D4D] opacity-90"></div>
             {/* Intense top highlight */}
             <div className="absolute top-0 left-0 right-0 h-[10px] bg-gradient-to-b from-[#FFFFFF] to-transparent"></div>
             {/* Bottom ambient bounce */}
             <div className="absolute bottom-0 left-0 right-0 h-[8px] bg-gradient-to-t from-[#D4D4D4] to-transparent"></div>
             {/* Left-to-right shading for the angled cut */}
             <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 mix-blend-overlay"></div>
             
             {/* Sharp edge highlight for the angle */}
             <div className="absolute top-[-2px] bottom-[-2px] left-[15.5px] w-[3px] bg-gradient-to-b from-white via-white/90 to-transparent shadow-[1px_0_3px_rgba(255,255,255,0.9)]"
                  style={{ transform: 'rotate(22deg) scaleY(1.5)', transformOrigin: 'top left' }}></div>
        </div>

        {/* HANDLE */}
        <div className="h-[56px] w-[180px] bg-[#422919] rounded-r-[28px] relative z-0 flex items-center justify-end pr-6 shadow-[inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-6px_10px_rgba(0,0,0,0.8),inset_-6px_0_12px_rgba(0,0,0,0.6),0_6px_12px_rgba(0,0,0,0.2)] border-y border-r border-[#1C0D06]">
             {/* Wood base gradients for 3D cylinder shape */}
             <div className="absolute inset-0 rounded-r-[28px] bg-gradient-to-b from-[#6D452B] via-[#4A2F1D] to-[#25130A] opacity-90 pointer-events-none"></div>
             
             {/* Authentic Wood Grain SVG Overlay */}
             <div className="absolute inset-0 rounded-r-[28px] overflow-hidden pointer-events-none">
                 <svg className="absolute inset-0 w-full h-full opacity-[0.35] mix-blend-soft-light scale-110 transition-transform duration-700 ease-out group-hover:translate-x-1.5 group-hover:scale-[1.12]" preserveAspectRatio="none">
                     <filter id="wood-grain-h">
                         <feTurbulence type="fractalNoise" baseFrequency="0.01 0.4" numOctaves="3" result="noise" />
                         <feColorMatrix type="saturate" values="0" />
                     </filter>
                     <rect width="100%" height="100%" filter="url(#wood-grain-h)" fill="white" />
                 </svg>
                 <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_150%_100%_at_50%_50%,_var(--tw-gradient-stops))] from-[#8B5C3B] via-transparent to-transparent mix-blend-overlay scale-110 transition-transform duration-700 ease-out group-hover:-translate-x-1"></div>
             </div>
             
             {/* Top soft highlight */}
             <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-b from-white/20 to-transparent rounded-tr-[28px] pointer-events-none"></div>

             {/* Brass Rivet with Logo */}
             <div className="w-[16px] h-[16px] rounded-full bg-gradient-to-br from-[#FFF1C5] via-[#D1A23A] to-[#6E4911] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.6),0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center border border-[#593E10] z-10 relative">
                 <Leaf className="w-[9px] h-[9px] text-[#3B2907] fill-[#543F10]/70 drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]" />
             </div>
        </div>
      </motion.nav>
    );
  }

  // Mobile (Vertical Cleaver & FAB)
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#2B1B10]/40 z-40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Open State: Vertical Cleaver Drawer */}
      <AnimatePresence>
         {isOpen && (
           <motion.nav
             className={`fixed top-0 right-0 h-[100dvh] w-[120px] z-50 flex flex-col drop-shadow-[-20px_0_30px_rgba(40,30,20,0.25)] pointer-events-none group ${isScrolling ? 'animate-blade-vibrate' : ''}`}
             initial={{ x: '100%' }}
             animate={{ x: '0%' }}
             exit={{ x: '100%' }}
             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
           >
             <div className="flex flex-col w-full h-full pointer-events-auto items-end pr-4 py-8">
               
               {/* BLADE (Top) */}
               <div className="flex-1 w-[100px] bg-gradient-to-r from-[#FEFCF9] via-[#F4EFEA] to-[#E6E1D7] rounded-t-[50px] relative z-10 border-x border-t border-[#D9D5CB] shadow-[inset_2px_0_6px_rgba(255,255,255,0.9),inset_-3px_0_5px_rgba(0,0,0,0.08),4px_0_10px_rgba(0,0,0,0.05)] overflow-hidden">
                  
                  {/* Animated Glint */}
                  <div className="absolute inset-0 rounded-t-[50px] overflow-hidden pointer-events-none z-30">
                     <div className="absolute left-0 right-0 h-[60px] bg-gradient-to-b from-transparent via-white/80 to-transparent animate-glint-vertical blur-[1px]"></div>
                  </div>

                  {/* Sharp edge highlight (Left side) */}
                  <div className="absolute top-8 left-0 bottom-6 w-[2px] bg-gradient-to-r from-white/10 via-white/80 to-[#9A968E] shadow-[1px_0_1px_rgba(0,0,0,0.05)] pointer-events-none opacity-90 z-20 rounded-tl-full"></div>

                  {/* Inner Scrolling Container */}
                  <div className="absolute inset-0 overflow-y-auto overflow-x-hidden blade-scrollbar flex flex-col items-center py-10 z-40">
                      {/* Chef Hat */}
                      <div className="mt-2 mb-6">
                         <ChefHat className="w-8 h-8 text-[#A69382] stroke-[1.2] drop-shadow-[0_1px_0_rgba(255,255,255,1)]" />
                      </div>

                      {/* HOME Active Block */}
                      <div className="w-[74px] h-[74px] bg-gradient-to-r from-[#FFFFFF] to-[#FAF8F5] rounded-[18px] shadow-[3px_0_8px_rgba(0,0,0,0.06),inset_1px_0_2px_rgba(255,255,255,1)] border border-[#EAE6DD] flex flex-col items-center justify-center relative mb-8 group cursor-pointer transition-transform hover:scale-[1.02]">
                           <span className="text-[#3A2A20] font-bold tracking-[0.25em] text-[9px] mt-2 group-hover:text-[#9A8775] transition-colors drop-shadow-[0_1px_0_rgba(255,255,255,1)]">HOME</span>
                           <div className="w-5 h-[1.5px] bg-gradient-to-b from-[#D4BA9E] to-[#B3997D] rounded-full mt-3"></div>
                      </div>

                      {/* Links */}
                      <div className="flex flex-col items-center space-y-10 w-full pb-8">
                         {links.map((link) => (
                            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="flex flex-col items-center justify-center group w-full relative">
                               <link.icon className="w-[22px] h-[22px] text-[#7A6A5E] stroke-[1.2] mb-3 group-hover:text-[#9A8775] transition-colors drop-shadow-[0_1px_0_rgba(255,255,255,1)]" />
                               <span className="text-[#3A2A20] font-bold tracking-[0.2em] text-[8px] uppercase group-hover:text-[#9A8775] transition-colors drop-shadow-[0_1px_0_rgba(255,255,255,1)]">{link.name}</span>
                            </a>
                         ))}
                      </div>
                  </div>
               </div>

               {/* BOLSTER (Middle Connector) */}
               <div className="h-[48px] w-[100px] -mt-[20px] relative z-20 overflow-hidden shadow-[0_-4px_6px_rgba(0,0,0,0.15)]"
                    style={{ clipPath: 'polygon(0 0, 100% 20px, 100% 48px, 24px 48px, 0 48px)' }}>
                    {/* Metallic gradients rotated for vertical */}
                    <div className="absolute inset-0 bg-[#A6A6A6]"></div>
                    
                    {/* Brushed Metal SVG Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light z-10">
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                            <filter id="brushed-metal-bolster-v">
                                <feTurbulence type="fractalNoise" baseFrequency="0.8 0.01" numOctaves="3" result="noise" />
                                <feColorMatrix type="saturate" values="0" />
                            </filter>
                            <rect width="100%" height="100%" filter="url(#brushed-metal-bolster-v)" fill="white" />
                        </svg>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF] via-[#8F8F8F] to-[#4D4D4D] opacity-90"></div>
                    {/* Intense left highlight */}
                    <div className="absolute top-0 bottom-0 left-0 w-[10px] bg-gradient-to-r from-[#FFFFFF] to-transparent"></div>
                    {/* Right ambient bounce */}
                    <div className="absolute top-0 bottom-0 right-0 w-[8px] bg-gradient-to-l from-[#D4D4D4] to-transparent"></div>
                    {/* Top-to-bottom shading for the angled cut */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20 mix-blend-overlay"></div>
                    
                    {/* Subtle edge highlight */}
                    <div className="absolute top-[-1.5px] right-[-10px] left-[0px] h-[3px] bg-gradient-to-r from-white via-white/90 to-transparent shadow-[0_1px_3px_rgba(255,255,255,0.9)]"
                         style={{ transform: 'rotate(11.5deg)', transformOrigin: 'top left' }}></div>
               </div>

               {/* HANDLE (Bottom) */}
               <div className="h-[180px] w-[76px] bg-[#422919] rounded-b-[38px] relative z-0 flex flex-col items-center justify-end pb-10 shadow-[inset_2px_0_3px_rgba(255,255,255,0.3),inset_-6px_0_10px_rgba(0,0,0,0.8),inset_0_-6px_12px_rgba(0,0,0,0.6),6px_0_12px_rgba(0,0,0,0.2)] border-x border-b border-[#1C0D06] mr-[24px]">
                  
                  {/* Wood base gradients for 3D cylinder shape */}
                  <div className="absolute inset-0 rounded-b-[38px] bg-gradient-to-r from-[#6D452B] via-[#4A2F1D] to-[#25130A] opacity-90 pointer-events-none"></div>
                  
                  {/* Authentic Wood Grain SVG Overlay */}
                  <div className="absolute inset-0 rounded-b-[38px] overflow-hidden pointer-events-none">
                      <svg className="absolute inset-0 w-full h-full opacity-[0.35] mix-blend-soft-light scale-110 transition-transform duration-700 ease-out group-hover:translate-y-1.5 group-hover:scale-[1.12]" preserveAspectRatio="none">
                          <filter id="wood-grain-v">
                              <feTurbulence type="fractalNoise" baseFrequency="0.4 0.01" numOctaves="3" result="noise" />
                              <feColorMatrix type="saturate" values="0" />
                          </filter>
                          <rect width="100%" height="100%" filter="url(#wood-grain-v)" fill="white" />
                      </svg>
                      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_100%_150%_at_50%_50%,_var(--tw-gradient-stops))] from-[#8B5C3B] via-transparent to-transparent mix-blend-overlay scale-110 transition-transform duration-700 ease-out group-hover:-translate-y-1"></div>
                  </div>
                  
                  {/* Left soft highlight */}
                  <div className="absolute top-0 bottom-0 left-0 w-[5px] bg-gradient-to-r from-white/20 to-transparent rounded-bl-[38px] pointer-events-none"></div>

                  {/* Close Button on Handle */}
                  <button
                     onClick={() => setIsOpen(false)}
                     className="absolute top-6 left-1/2 -translate-x-1/2 p-3 rounded-full bg-black/10 hover:bg-black/20 transition-colors z-20 border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                  >
                     <X className="text-white/80 w-5 h-5 stroke-[1.5]" />
                  </button>
                  
                  {/* Brass Rivet */}
                  <div className="w-[16px] h-[16px] rounded-full bg-gradient-to-br from-[#FFF1C5] via-[#D1A23A] to-[#6E4911] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.6),0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center border border-[#593E10] z-10 relative">
                      <Leaf className="w-[9px] h-[9px] text-[#3B2907] fill-[#543F10]/70 drop-shadow-[0_1px_0_rgba(255,255,255,0.4)] -rotate-90" />
                  </div>
               </div>
             </div>
           </motion.nav>
         )}
      </AnimatePresence>

      {/* Closed State: FAB (Horizontal Handle peeking out) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className={`fixed top-1/2 -translate-y-1/2 right-0 z-50 flex items-center drop-shadow-[-8px_12px_20px_rgba(40,30,20,0.25)] group ${isScrolling ? 'animate-blade-vibrate' : ''}`}
          >
             <div className="h-[72px] w-[80px] bg-[#422919] rounded-l-[36px] relative shadow-[inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-6px_10px_rgba(0,0,0,0.8),inset_4px_0_8px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center pl-2 pr-4 border-y border-l border-[#1C0D06] translate-x-4 group-hover:translate-x-0 transition-transform duration-300 ease-out">
                {/* Wood base gradients for 3D cylinder shape */}
                <div className="absolute inset-0 rounded-l-[36px] bg-gradient-to-b from-[#6D452B] via-[#4A2F1D] to-[#25130A] opacity-90 pointer-events-none"></div>
                
                {/* Authentic Wood Grain SVG Overlay */}
                <div className="absolute inset-0 rounded-l-[36px] overflow-hidden pointer-events-none">
                    <svg className="absolute inset-0 w-full h-full opacity-[0.35] mix-blend-soft-light scale-110 transition-transform duration-700 ease-out group-hover:-translate-x-1.5 group-hover:scale-[1.12]" preserveAspectRatio="none">
                        <filter id="wood-grain-h-fab">
                            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.4" numOctaves="3" result="noise" />
                            <feColorMatrix type="saturate" values="0" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#wood-grain-h-fab)" fill="white" />
                    </svg>
                    <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_150%_100%_at_50%_50%,_var(--tw-gradient-stops))] from-[#8B5C3B] via-transparent to-transparent mix-blend-overlay scale-110 transition-transform duration-700 ease-out group-hover:translate-x-1"></div>
                </div>
                
                {/* Top soft highlight */}
                <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-b from-white/20 to-transparent rounded-tl-[36px] pointer-events-none"></div>
                
                <MenuIcon className="text-white/80 w-7 h-7 group-hover:scale-110 transition-transform relative z-10 drop-shadow-md mr-2 stroke-[1.5]" />
                
                {/* Rivet cut off by screen edge */}
                <div className="absolute right-[-10px] w-[16px] h-[16px] rounded-full bg-gradient-to-br from-[#FFF1C5] via-[#D1A23A] to-[#6E4911] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.6),0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center border border-[#593E10] z-10">
                    <Leaf className="w-[9px] h-[9px] text-[#3B2907] fill-[#543F10]/70 drop-shadow-[0_1px_0_rgba(255,255,255,0.4)] -rotate-90" />
                </div>
             </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

