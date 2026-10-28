import { ButtonLink, useCopy } from "../components/ui";
import SEO from "../components/SEO";
export default function NotFound() {
  const { copy } = useCopy();
  return (
    <section className="container not-found">
      <SEO en="Page not found" ar="الصفحة غير موجودة" />
      <span className="error-code">{"{ 404 }"}</span>
      <h1>
        {copy("A little off the learning path.", "خرجنا شوية عن مسار التعلم.")}
      </h1>
      <p>
        {copy(
          "This page doesn’t exist. Let’s get you back to building something great.",
          "الصفحة دي مش موجودة. نرجع نبني حاجة جميلة مع بعض.",
        )}
      </p>
      <ButtonLink to="/">{copy("Back to home", "الرجوع للرئيسية")}</ButtonLink>
    </section>
  );
}
