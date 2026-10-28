import { useEffect } from "react";
import { useCopy } from "./ui";
export default function SEO({
  en,
  ar,
  descriptionEn = "Live online programming courses. Learn step by step with practical projects and instructor guidance.",
  descriptionAr = "كورسات برمجة أونلاين مباشرة. تعلم خطوة بخطوة بمشاريع عملية وإرشاد من المدرب.",
}: {
  en: string;
  ar: string;
  descriptionEn?: string;
  descriptionAr?: string;
}) {
  const { copy } = useCopy();
  const title = copy(en, ar) + " | MindCode Academy";
  const description = copy(descriptionEn, descriptionAr);
  useEffect(() => {
    document.title = title;
    for (const [selector, value] of [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
    ]) {
      document.querySelector(selector)?.setAttribute("content", value);
    }
  }, [title, description]);
  return null;
}
