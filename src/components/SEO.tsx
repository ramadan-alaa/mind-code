import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { academy } from "../config/academy";
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
  const { pathname } = useLocation();
  const canonical = new URL(pathname, academy.siteUrl).href;
  const title = copy(en, ar) + " | MindCode Academy";
  const description = copy(descriptionEn, descriptionAr);
  useEffect(() => {
    document.title = title;
    for (const [selector, value] of [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
      ['meta[property="og:url"]', canonical],
      [
        'meta[property="og:image"]',
        `${academy.siteUrl}/mindcode_logo_light.png`,
      ],
    ]) {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        const match = selector.match(/\[(name|property)="([^"]+)"\]/);
        if (match) meta.setAttribute(match[1], match[2]);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", value);
    }
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [title, description, canonical]);
  return null;
}
