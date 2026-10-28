import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowUpRight, Sun, Moon, Menu, X, Code2 } from "lucide-react";
import { Logo, useCopy } from "./ui";
import { useTranslation as useTranslationBridge } from "react-i18next";
import { academy } from "../config/academy";
export default function Layout() {
  const { t, ar, copy } = useCopy();
  const [menu, setMenu] = useState(false);
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || "dark",
  );
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    document.documentElement.lang = ar ? "ar" : "en";
    document.documentElement.dir = ar ? "rtl" : "ltr";
    try {
      localStorage.setItem("mindcode-language", ar ? "ar" : "en");
    } catch {
      /* Storage can be unavailable in private browsers. */
    }
  }, [ar]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0B0F19" : "#FAFAFB");
    try {
      localStorage.setItem("mindcode-theme", theme);
    } catch {
      /* Theme still works without persistence. */
    }
  }, [theme]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  const { i18n } = useTranslationBridge();
  return (
    <>
      <a className="skip-link" href="#main">
        {copy("Skip to content", "انتقل إلى المحتوى")}
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <nav
            className="desktop-nav"
            aria-label={copy("Main navigation", "القائمة الرئيسية")}
          >
            {["home", "courses", "about", "contact"].map((key) => (
              <NavLink
                end={key === "home"}
                key={key}
                to={key === "home" ? "/" : `/${key}`}
              >
                {t(key)}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="language-button"
              onClick={() => {
                i18n.changeLanguage(ar ? "en" : "ar");
                setMenu(false);
              }}
              aria-label={copy("Switch to Arabic", "Switch to English")}
            >
              {ar ? "EN" : "عربي"}
            </button>
            <span className="nav-divider" />
            <button
              className="icon-button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={copy(
                "Toggle light or dark theme",
                "تبديل المظهر الفاتح والداكن",
              )}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link className="button header-cta" to="/contact">
              {t("enroll")}
              <ArrowUpRight size={16} />
            </Link>
            <button
              className="icon-button mobile-toggle"
              onClick={() => setMenu(!menu)}
              aria-expanded={menu}
              aria-controls="mobile-nav"
              aria-label={copy("Toggle navigation", "فتح أو إغلاق القائمة")}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menu && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label={copy("Mobile navigation", "قائمة الهاتف")}
          >
            {["home", "courses", "about", "contact"].map((key) => (
              <NavLink
                onClick={() => setMenu(false)}
                key={key}
                to={key === "home" ? "/" : `/${key}`}
              >
                {t(key)}
              </NavLink>
            ))}
            <Link onClick={() => setMenu(false)} to="/contact">
              {t("enroll")} <ArrowUpRight size={16} />
            </Link>
          </nav>
        )}
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer>
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <Logo />
              <p>
                {copy(academy.tagline, "نبرمج العقول. نبني مستقبلًا أفضل.")}
                <br />
                {copy(
                  "A little curiosity. A world of possibilities.",
                  "قليل من الفضول. عالم من الفرص.",
                )}
              </p>
              <span className="footer-note">
                <span className="status-dot" />
                {t("live")} ·{" "}
                {copy("Made for curious minds", "للعقول المحبة للتعلم")}
              </span>
            </div>
            <div>
              <h4>{copy("Explore", "استكشف")}</h4>
              <Link to="/">{t("home")}</Link>
              <Link to="/courses">{t("courses")}</Link>
              <Link to="/about">{t("about")}</Link>
              <Link to="/contact">{t("contact")}</Link>
            </div>
            <div>
              <h4>{copy("Start learning", "ابدأ التعلم")}</h4>
              {["HTML", "CSS", "JavaScript", "React"].map((c) => (
                <Link key={c} to={`/courses/${c.toLowerCase()}`}>
                  {c}
                </Link>
              ))}
            </div>
            <div className="footer-connect">
              <h4>{copy("Let’s build your future.", "لنبدأ بناء مستقبلك.")}</h4>
              <p>
                {copy(
                  "Have a question? Let’s find your starting point together.",
                  "عندك سؤال؟ نساعدك تختار نقطة البداية المناسبة.",
                )}
              </p>
              <Link to="/contact" className="text-link">
                {copy("Get in touch", "تواصل معنا")}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} MindCode Academy.{" "}
              {copy("All rights reserved.", "جميع الحقوق محفوظة.")}
            </span>
            <span>
              <Code2 size={14} />
              {copy("Built for what comes next.", "نتعلم اليوم. نبني الغد.")}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
