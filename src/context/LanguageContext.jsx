import { createContext, useContext, useState } from 'react'

export const LanguageContext = createContext()

export const translations = {
  en: {
    code: 'en', label: 'English', flag: '🇬🇧',
    nav: { home: 'Home', about: 'About', universe: '🪐 Universe', services: 'Services', credentials: 'Credentials', dosDonts: "Do's & Don'ts", contact: 'Contact', consult: 'Consult Now' },
    hero: {
      badge: '✦ Trikaldarshi — Knower of Past, Present & Future ✦',
      name1: 'Pandit Subrata', name2: 'Kumar Mukherjee',
      subtitle: 'Certified Vedic Astrologer & Spiritual Consultant',
      desc: 'Not just a predictor — a guardian of your destiny. Guiding 50,000+ souls across India for over 30 years with certified expertise, divine insight, and proven remedies.',
      whatsapp: 'WhatsApp Consult', call: 'Call Now', explore: 'Explore Universe',
      stats: [{ num: '30+', label: 'Years Experience' }, { num: '50,000+', label: 'Satisfied Clients' }, { num: 'Pan India', label: 'Reach & Fame' }, { num: '24/7', label: 'Online & Offline' }],
    },
    about: {
      sectionLabel: 'THE DIVINE CHANNEL',
      title: 'Meet Pandit Ji',
      subtitle: 'TRUSTED SPIRITUAL GUIDE · 30+ YEARS · 50,000+ LIVES TRANSFORMED',
      bio1: 'Born with an extraordinary gift of cosmic perception, Pandit Subrata Kumar Mukherjee is one of India\'s most revered and certified astrologers. Known as Trikaldarshi — the one who perceives past, present, and future.',
      bio2: 'Based in Paschim Medinipur, West Bengal, he serves clients both offline and online across all of India. He doesn\'t just predict your future — he resolves the problems before they arrive.',
      qualTitle: '🎓 QUALIFICATIONS & MEMBERSHIPS',
    },
    services: { sectionLabel: 'COMPREHENSIVE GUIDANCE', title: 'Divine Services', subtitle: 'Comprehensive astrological guidance covering every dimension of your life — from prediction to problem resolution.' },
    credentials: { sectionLabel: 'VERIFIED AUTHORITY', title: 'Certifications & Proof', subtitle: 'Every certificate answers one question: "Is this real?" — Yes. Formally trained, government-recognized, institutionally certified.' },
    contact: { sectionLabel: 'BEGIN YOUR JOURNEY', title: 'Connect With Pandit Ji', subtitle: 'Your destiny awaits. One call, one message — and your life could change forever.' },
    bot: {
      title: '🔮 Ask Pandit Ji\'s AI Assistant',
      subtitle: 'Get instant Vedic insights. For detailed consultation, connect with Pandit Ji directly.',
      placeholder: 'Describe your problem or ask about your planets...',
      send: 'Send',
      thinking: 'Consulting the stars...',
      consultBtn: 'Consult Pandit Ji Directly',
      formTitle: '📋 Share Your Details',
      dob: 'Date of Birth', tob: 'Time of Birth', pob: 'Place of Birth',
      name: 'Your Name', phone: 'Phone Number', problem: 'Describe Your Problem',
      sendWA: 'Send via WhatsApp', sendEmail: 'Send via Email',
    },
  },
  hi: {
    code: 'hi', label: 'हिंदी', flag: '🇮🇳',
    nav: { home: 'होम', about: 'परिचय', universe: '🪐 ब्रह्मांड', services: 'सेवाएं', credentials: 'प्रमाण-पत्र', dosDonts: 'क्या करें / न करें', contact: 'संपर्क', consult: 'परामर्श करें' },
    hero: {
      badge: '✦ त्रिकालदर्शी — भूत, वर्तमान और भविष्य के ज्ञाता ✦',
      name1: 'पंडित सुब्रत', name2: 'कुमार मुखर्जी',
      subtitle: 'प्रमाणित वैदिक ज्योतिषी एवं आध्यात्मिक सलाहकार',
      desc: 'केवल भविष्यवक्ता नहीं — आपके भाग्य के रक्षक। 30 वर्षों से 50,000+ लोगों का मार्गदर्शन।',
      whatsapp: 'व्हाट्सएप परामर्श', call: 'अभी कॉल करें', explore: 'ब्रह्मांड देखें',
      stats: [{ num: '30+', label: 'वर्षों का अनुभव' }, { num: '50,000+', label: 'संतुष्ट ग्राहक' }, { num: 'पूरे भारत', label: 'प्रसिद्धि' }, { num: '24/7', label: 'ऑनलाइन उपलब्ध' }],
    },
    about: {
      sectionLabel: 'दिव्य मार्गदर्शक',
      title: 'पंडित जी से मिलें',
      subtitle: 'विश्वसनीय आध्यात्मिक गुरु · 30+ वर्ष · 50,000+ जीवन बदले',
      bio1: 'असाधारण ब्रह्मांडीय अनुभव के साथ जन्मे, पंडित सुब्रत कुमार मुखर्जी भारत के सबसे सम्मानित और प्रमाणित ज्योतिषियों में से एक हैं।',
      bio2: 'पश्चिम मेदिनीपुर, पश्चिम बंगाल में स्थित, वे पूरे भारत में ऑफलाइन और ऑनलाइन दोनों तरह से सेवा प्रदान करते हैं।',
      qualTitle: '🎓 योग्यताएं एवं सदस्यताएं',
    },
    services: { sectionLabel: 'व्यापक मार्गदर्शन', title: 'दिव्य सेवाएं', subtitle: 'आपके जीवन के हर पहलू को कवर करने वाला व्यापक ज्योतिषीय मार्गदर्शन।' },
    credentials: { sectionLabel: 'सत्यापित प्राधिकरण', title: 'प्रमाण-पत्र एवं प्रमाण', subtitle: 'हर प्रमाण-पत्र एक प्रश्न का उत्तर देता है: "क्या यह वास्तविक है?" — हाँ।' },
    contact: { sectionLabel: 'अपनी यात्रा शुरू करें', title: 'पंडित जी से जुड़ें', subtitle: 'आपका भाग्य प्रतीक्षा कर रहा है। एक कॉल, एक संदेश — और आपका जीवन बदल सकता है।' },
    bot: {
      title: '🔮 पंडित जी के AI सहायक से पूछें',
      subtitle: 'तुरंत वैदिक अंतर्दृष्टि प्राप्त करें। विस्तृत परामर्श के लिए पंडित जी से सीधे संपर्क करें।',
      placeholder: 'अपनी समस्या बताएं या ग्रहों के बारे में पूछें...',
      send: 'भेजें',
      thinking: 'सितारों से परामर्श हो रहा है...',
      consultBtn: 'पंडित जी से सीधे परामर्श करें',
      formTitle: '📋 अपना विवरण साझा करें',
      dob: 'जन्म तिथि', tob: 'जन्म समय', pob: 'जन्म स्थान',
      name: 'आपका नाम', phone: 'फोन नंबर', problem: 'अपनी समस्या बताएं',
      sendWA: 'व्हाट्सएप से भेजें', sendEmail: 'ईमेल से भेजें',
    },
  },
  bn: {
    code: 'bn', label: 'বাংলা', flag: '🇧🇩',
    nav: { home: 'হোম', about: 'পরিচয়', universe: '🪐 মহাবিশ্ব', services: 'সেবা', credentials: 'সনদপত্র', dosDonts: 'করণীয় / বর্জনীয়', contact: 'যোগাযোগ', consult: 'পরামর্শ নিন' },
    hero: {
      badge: '✦ ত্রিকালদর্শী — অতীত, বর্তমান ও ভবিষ্যতের জ্ঞাতা ✦',
      name1: 'পণ্ডিত সুব্রত', name2: 'কুমার মুখার্জী',
      subtitle: 'প্রত্যয়িত বৈদিক জ্যোতিষী ও আধ্যাত্মিক পরামর্শদাতা',
      desc: 'শুধু ভবিষ্যদ্বক্তা নন — আপনার ভাগ্যের রক্ষক। ৩০ বছরেরও বেশি সময় ধরে ৫০,০০০+ মানুষের জীবন পরিবর্তন করেছেন।',
      whatsapp: 'হোয়াটসঅ্যাপ পরামর্শ', call: 'এখনই কল করুন', explore: 'মহাবিশ্ব দেখুন',
      stats: [{ num: '৩০+', label: 'বছরের অভিজ্ঞতা' }, { num: '৫০,০০০+', label: 'সন্তুষ্ট গ্রাহক' }, { num: 'সারা ভারত', label: 'খ্যাতি' }, { num: '২৪/৭', label: 'অনলাইন উপলব্ধ' }],
    },
    about: {
      sectionLabel: 'দিব্য মাধ্যম',
      title: 'পণ্ডিত জীর সাথে পরিচয়',
      subtitle: 'বিশ্বস্ত আধ্যাত্মিক গুরু · ৩০+ বছর · ৫০,০০০+ জীবন পরিবর্তিত',
      bio1: 'অসাধারণ মহাজাগতিক উপলব্ধি নিয়ে জন্মগ্রহণ করা পণ্ডিত সুব্রত কুমার মুখার্জী ভারতের সবচেয়ে সম্মানিত এবং প্রত্যয়িত জ্যোতিষীদের একজন।',
      bio2: 'পশ্চিম মেদিনীপুর, পশ্চিমবঙ্গে অবস্থিত, তিনি সারা ভারতে অফলাইন এবং অনলাইন উভয়ভাবেই সেবা প্রদান করেন।',
      qualTitle: '🎓 যোগ্যতা ও সদস্যপদ',
    },
    services: { sectionLabel: 'ব্যাপক নির্দেশনা', title: 'দিব্য সেবাসমূহ', subtitle: 'আপনার জীবনের প্রতিটি দিক কভার করে ব্যাপক জ্যোতিষীয় নির্দেশনা।' },
    credentials: { sectionLabel: 'যাচাইকৃত কর্তৃপক্ষ', title: 'সনদপত্র ও প্রমাণ', subtitle: 'প্রতিটি সনদপত্র একটি প্রশ্নের উত্তর দেয়: "এটি কি বাস্তব?" — হ্যাঁ।' },
    contact: { sectionLabel: 'আপনার যাত্রা শুরু করুন', title: 'পণ্ডিত জীর সাথে যোগাযোগ করুন', subtitle: 'আপনার ভাগ্য অপেক্ষা করছে। একটি কল, একটি বার্তা — এবং আপনার জীবন বদলে যেতে পারে।' },
    bot: {
      title: '🔮 পণ্ডিত জীর AI সহকারীকে জিজ্ঞেস করুন',
      subtitle: 'তাৎক্ষণিক বৈদিক অন্তর্দৃষ্টি পান। বিস্তারিত পরামর্শের জন্য সরাসরি পণ্ডিত জীর সাথে যোগাযোগ করুন।',
      placeholder: 'আপনার সমস্যা বর্ণনা করুন বা গ্রহ সম্পর্কে জিজ্ঞেস করুন...',
      send: 'পাঠান',
      thinking: 'তারাদের সাথে পরামর্শ হচ্ছে...',
      consultBtn: 'সরাসরি পণ্ডিত জীর সাথে পরামর্শ করুন',
      formTitle: '📋 আপনার বিবরণ শেয়ার করুন',
      dob: 'জন্ম তারিখ', tob: 'জন্ম সময়', pob: 'জন্মস্থান',
      name: 'আপনার নাম', phone: 'ফোন নম্বর', problem: 'আপনার সমস্যা বর্ণনা করুন',
      sendWA: 'হোয়াটসঅ্যাপে পাঠান', sendEmail: 'ইমেইলে পাঠান',
    },
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = translations[lang]
  return (
    <LanguageContext.Provider value={{ lang, setLang, t, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
