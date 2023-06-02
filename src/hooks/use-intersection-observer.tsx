import { type QRL, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export function useIntersectionObserver(callback: QRL<() => void>) {
  const element = useSignal<HTMLElement>();
  useVisibleTask$(({ track, cleanup }) => {
    track(() => element.value);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          callback();
        }
      },
      {
        rootMargin: "500px",
        threshold: 0,
      }
    );
    if (element?.value) observer.observe(element.value);

    cleanup(() => observer.disconnect());
  });

  return element;
}
