import { Children, useSyncExternalStore, type ReactNode } from "react";
import { Pagination } from "swiper/modules";
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
}: {
  className: string;
  children: ReactNode;
}) {
  const isMobile = useIsMobile();

  if (!isMobile) return <div className={className}>{children}</div>;

  return (
    <Swiper
      className={`mobile-slider ${className}-slider`}
      modules={[Pagination]}
      pagination={{ clickable: true }}
      slidesPerView={1.18}
      spaceBetween={14}
      dir={document.documentElement.dir === "rtl" ? "rtl" : "ltr"}
    >
      {Children.toArray(children).map((child, i) => (
        <SwiperSlide key={i} className="mobile-slide">
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

