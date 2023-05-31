import { useStore, useTask$ } from "@builder.io/qwik";

export function useDebounding(state: { search: string }, time: number) {
  const search = useStore({ value: "" });
  useTask$(({ track, cleanup }) => {
    track(() => search.value);

    const debounced = setTimeout(() => {
      state.search = search.value;
    }, time);

    cleanup(() => clearTimeout(debounced));
  });

  return search;
}
