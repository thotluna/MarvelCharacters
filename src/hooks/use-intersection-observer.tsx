import { useSignal, useVisibleTask$ } from "@builder.io/qwik";

export function useIntersectionObserver(state: { page: number }) {
  const element = useSignal<HTMLElement>();
  useVisibleTask$(({ track, cleanup }) => {
    track(() => element.value);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) state.page = ++state.page;
      },
      { threshold: 0.1 }
    );
    if (element?.value) observer.observe(element.value);

    cleanup(() => observer.disconnect());
  });

  return element;
}
