import { $, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { Root, storeProps } from "~/models";

export const handlerFetch = $(
  async (url: string, controller: AbortController) => {
    try {
      const respuesta = await fetch(url, {
        method: "GET",
        signal: controller?.signal,
      });
      const res: Root = await respuesta.json();

      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

export function useLoadCharacters(state: storeProps) {
  const myUrl = useLocation();
  const baseUrl = myUrl.url.href;

  useTask$(async ({ track, cleanup }) => {
    track(() => state.page);

    const controller = new AbortController();
    cleanup(() => controller.abort());
    const url = `${baseUrl}api/characters/${state.page}/${state.search}`;
    const res: Root | null = await handlerFetch(url, controller);
    if (!res) return;

    if (state.data) {
      state.data = {
        ...res.data,
        results: [...state.data.results, ...res.data.results],
      };
    } else {
      state.data = res.data;
    }
  });

  useTask$(async ({ track, cleanup }) => {
    track(() => state.search);

    const controller = new AbortController();
    cleanup(() => controller.abort());
    if (state.search.length < 3) return;
    if (state.data) state.data.results = [];
    state.page = 0;

    const url = `${baseUrl}api/characters/${state.page}/${state.search}`;

    const res: Root | null = await handlerFetch(url, controller);
    if (!res) return;

    if (state.data) {
      state.data = {
        ...res.data,
        results: [...state.data.results, ...res.data.results],
      };
    } else {
      state.data = res.data;
    }
    state.loading = false;
  });

  useVisibleTask$(({ track }) => {
    track(() => state.data);
    state.loading = false;
    console.log(`/*/**/*/*/*/**/*//**/*/ Cambiando a false`);
  });
  return state;
}
