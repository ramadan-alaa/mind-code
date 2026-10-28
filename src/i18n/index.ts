import i18n from "i18next";
import { initReactI18next } from "react-i18next";
let saved: string | null = null;
try {
  saved = localStorage.getItem("mindcode-language");
} catch {
  /* Preferences are optional when storage is unavailable. */
}
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: "Home",
        courses: "Courses",
        about: "About",
        contact: "Contact",
        enroll: "Enroll now",
        explore: "Explore courses",
        details: "View details",
        ask: "Ask about course",
        level: "Level",
        levels: "Levels",
        perLevel: "per level / student",
        live: "Live online",
        sessions: "sessions / level",
        hours: "hours / level",
        available: "Available now",
        soon: "Coming soon",
        beginner: "Beginner",
        intermediate: "Intermediate",
      },
    },
    ar: {
      translation: {
        home: "الرئيسية",
        courses: "الكورسات",
        about: "عن الأكاديمية",
        contact: "تواصل معنا",
        enroll: "سجّل الآن",
        explore: "استكشف الكورسات",
        details: "تفاصيل الكورس",
        ask: "استفسر عن الكورس",
        level: "المستوى",
        levels: "مستويات",
        perLevel: "لكل مستوى / طالب",
        live: "أونلاين مباشر",
        sessions: "محاضرات / مستوى",
        hours: "ساعات / مستوى",
        available: "متاح الآن",
        soon: "قريبًا",
        beginner: "مبتدئ",
        intermediate: "متوسط",
      },
    },
  },
  lng: saved === "ar" ? "ar" : "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});
export default i18n;
