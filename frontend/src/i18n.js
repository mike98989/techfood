import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// Import translation files
// import en from './locals/en.json';
// import sv from './locals/sv.json';
// import fr from './locals/fr.json';
// import sp from './locals/sp.json';
// import pt from './locals/pt.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // resources: {
        //     en: { translation: en }, //// English
        //     sv: { translation: sv }, //// Swedish
        //     fr: { translation: fr }, //// French
        //     sp: { translation: sp }, //// Spanish
        //     pt: { translation: pt }, //// Portuguese
        // },
        //lng: 'sv', // Default language
        fallbackLng: 'sv',
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;
