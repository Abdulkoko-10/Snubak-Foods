import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ha';

interface Translations {
  [key: string]: {
    en: string;
    ha: string;
  };
}

export const translations: Translations = {
  // Hero
  heroSubtitle: {
    en: 'Culinary precision meets natural ingredients. Experience our curated selection of artisanal dishes.',
    ha: 'Kwarewar girki da sinadarai na halitta. Kware da zaɓaɓɓun jita-jita na musamman.',
  },
  heroPhase2: {
    en: 'Immersed in Flavor',
    ha: 'Nitse A Cikin Ɗanɗano',
  },
  heroPhase3Title: {
    en: 'Artisanal Mastery',
    ha: 'Kwarewar Sana\'a',
  },
  heroPhase3Desc: {
    en: 'Down to the last grain.',
    ha: 'Har zuwa ƙwayar ƙarshe.',
  },
  heroPhase4: {
    en: 'Savor the Extraordinary',
    ha: 'Daɗin Abin Mamaki',
  },
  viewMenu: {
    en: 'View Menu',
    ha: 'Duba Menu',
  },
  
  // Discover
  discoverTitle: {
    en: 'Discover the Taste',
    ha: 'Gano Daɗin',
  },
  discoverText: {
    en: 'Where passion meets precision in every bite. Our culinary journey is crafted to elevate your senses and bring the authentic taste of tradition to your table.',
    ha: 'Inda kwarewa ta haɗu da daɗi a kowane loma. An tsara tafiyar girkin mu don ɗaukaka hankalinku kuma kawo muku ainihin ɗanɗanon gargajiya a teburin ku.',
  },
  
  // Categories (Navbar & Sections)
  catAll: {
    en: 'All',
    ha: 'Duka',
  },
  catLocalClassics: {
    en: 'Local Classics',
    ha: 'Abincin Gargajiya',
  },
  catMainsBites: {
    en: 'Mains & Bites',
    ha: 'Kananan & Manyan Abinci',
  },
  catPastriesSnacks: {
    en: 'Pastries & Snacks',
    ha: 'Wainar & Kananan Abinci',
  },
  catChillersDrinks: {
    en: 'Chillers & Drinks',
    ha: 'Abubuwan Sha',
  },
  
  // Coming soon
  localClassicsSoon: {
    en: 'Local Classics Coming Soon',
    ha: 'Abincin Gargajiya Yana Zuwa Nan Bada Jimawa Ba',
  },
  pastriesSoon: {
    en: 'Pastries Coming Soon',
    ha: 'Wainar Yana Zuwa Nan Bada Jimawa Ba',
  },
  chillersSoon: {
    en: 'Chillers Coming Soon',
    ha: 'Abubuwan Sha Suna Zuwa Nan Bada Jimawa Ba',
  },
  
  // Shawarma Transition
  shawarma: {
    en: 'Shawarma',
    ha: 'Shawarma',
  },
  
  // Popcorn
  popcorn: {
    en: 'Popcorn',
    ha: 'Guguru',
  },
  popcornTitle: {
    en: 'Artisanal Caramel Popcorn',
    ha: 'Guguru Mai Zaƙin Caramel',
  },
  popcornDesc: {
    en: 'Air-popped to perfection, glazed in rich buttery caramel.',
    ha: 'An toya cikin kwarewa sannan an sa mashi zallar caramel.',
  },
  popcornName: {
    en: 'Caramel Popcorn',
    ha: 'Guguru Mai Caramel',
  },
  extraCaramel: {
    en: 'Extra Caramel Drizzle',
    ha: 'Ƙarin Caramel',
  },
  seaSalt: {
    en: 'Coarse Sea Salt Dash',
    ha: 'Ƙarin Gishirin Teda',
  },
  
  // Masa
  masa: {
    en: 'Masa',
    ha: 'Masa',
  },
  masaTitle: {
    en: 'Authentic Golden Hausa Masa',
    ha: 'Zallar Masar Hausa Mai Kyau',
  },
  masaDesc: {
    en: 'Pan-fried to golden perfection, fluffy on the inside.',
    ha: 'An soya cikin kwanon kasa, mai laushi a ciki.',
  },
  masaName: {
    en: 'Traditional Masa',
    ha: 'Masar Gargajiya',
  },
  portionSize: {
    en: 'Portion Size',
    ha: 'Yawan Raba',
  },
  pieces_3: {
    en: '3 Pieces',
    ha: 'Kwaya Uku',
  },
  pieces_6: {
    en: '6 Pieces',
    ha: 'Kwaya Shida',
  },
  pieces_12: {
    en: '12 Pieces',
    ha: 'Kwaya Goma Sha Biyu',
  },
  dipsSpices: {
    en: 'Dips & Spices',
    ha: 'Miya Da Yaji',
  },
  extraYaji: {
    en: 'Extra Red Yaji Spice',
    ha: 'Karin Yaji',
  },
  miyanTaushe: {
    en: 'Miyan Taushe Dip',
    ha: 'Miyan Taushe',
  },
  honeyDrizzle: {
    en: 'Honey Drizzle',
    ha: 'Zuma',
  },
  
  icecream: {
    en: 'Ice Cream',
    ha: 'Kankara Zaki',
  },
  icecreamTitle: {
    en: 'Rich Vanilla Bean & Chocolate Ribbon',
    ha: 'Zallar Vanilla Da Chocolate Ribbon',
  },
  icecreamDesc: {
    en: 'Hand-churned gelato, dripping with artisanal sauces.',
    ha: 'Gelato wanda aka sarrafa da hannu, tare da hadin masu kyau.',
  },
  icecreamName: {
    en: 'Artisanal Ice Cream',
    ha: 'Zallar Kankara Zaki',
  },
  flavors: {
    en: 'Flavors',
    ha: 'Kala-Kala',
  },
  flavor_vanilla: {
    en: 'Vanilla',
    ha: 'Vanilla',
  },
  flavor_chocolate: {
    en: 'Chocolate',
    ha: 'Chocolate',
  },
  flavor_mix: {
    en: 'Mix',
    ha: 'Hade',
  },
  toppings: {
    en: 'Toppings',
    ha: 'Kari Diga',
  },
  extraSyrup: {
    en: 'Extra Chocolate Syrup',
    ha: 'Karin Chocolate Syrup',
  },
  peanuts: {
    en: 'Crushed Peanuts',
    ha: 'Gyada',
  },
  sprinkles: {
    en: 'Sprinkles',
    ha: 'Sprinkles',
  },
  
  // Shawarma Showcase
  showcaseText1Title: {
    en: 'Perfectly Sliced',
    ha: 'An Yanka Daidai',
  },
  showcaseText1Desc: {
    en: 'Slow-roasted and carved with precision for maximum flavor.',
    ha: 'An gasa a hankali sannan an yanka da gwaninta don samun cikakken ɗanɗano.',
  },
  showcaseText2Title: {
    en: 'Wrapped in Warmth',
    ha: 'An Nannade Da Dumi',
  },
  signatureShawarma: {
    en: 'Signature Shawarma',
    ha: 'Fitacciyar Shawarma',
  },
  extraSausage: {
    en: 'Extra Sausage',
    ha: 'Cikakken Tsiran Naman', // or 'Karin tsiran nama'
  },
  doubleCheese: {
    en: 'Double Cheese',
    ha: 'Cikakken Cuku',
  },
  extraGarlic: {
    en: 'Extra Creamy Garlic Sauce',
    ha: 'Ƙarin Miya Ta Tafarnuwa',
  },
  addToOrder: {
    en: 'Add to Order',
    ha: 'Saka A Cikin Sayayya',
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string) => {
    if (!translations[key]) return key;
    return translations[key][lang] || translations[key]['en'];
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
