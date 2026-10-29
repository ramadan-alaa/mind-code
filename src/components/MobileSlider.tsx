import { Children, useSyncExternalStore, type ReactNode } from "react";
import { Pagination, A11y, Keyboard } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const QUERY = "(max-width: 767px)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/**
 * Renders children in the original grid on desktop and as a Swiper slider on mobile.
 */
export function MobileSlider({
  className,
  children,
  always = false,
}: {
  className: string;
  children: ReactNode;
  always?: boolean;
}) {
  const isMobile = useIsMobile();
  const { i18n } = useTranslation();
  const rtl = i18n.language === "ar";

  if (!isMobile && !always) return <div className={className}>{children}</div>;

  return (
    <Swiper
      key={rtl ? "rtl" : "ltr"}
      className={`mobile-slider ${always ? "all-courses-slider" : ""} ${className}-slider`}
      modules={[Pagination, A11y, Keyboard]}
      keyboard={{ enabled: true, onlyInViewport: true }}
      pagination={{ clickable: true }}
      slidesPerView={1.18}
      spaceBetween={14}
      breakpoints={
        always
          ? {
              768: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 22 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }
          : undefined
      }
      dir={rtl ? "rtl" : "ltr"}
    >
      {Children.toArray(children).map((child, i) => (
        <SwiperSlide key={i} className="mobile-slide">
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
