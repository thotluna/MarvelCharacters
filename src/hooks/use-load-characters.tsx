import { $, useStore, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { Data, Root } from "~/models";

export interface storeProps {
  page: number;
  data?: Data | null;
  loading: boolean;
  search: string;
}

export function useLoadCharacters() {
  const myUrl = useLocation();
  const baseUrl = myUrl.url.href;

  const initialState = {
    page: 0,
    data: null,
    loading: false,
    search: "",
  };

  const state = useStore<storeProps>(initialState);

  const handlerFetch = $(async (url: string, controller: AbortController) => {
    try {
      const respuesta = await fetch(url, {
        method: "GET",
        signal: controller?.signal,
      });

      return (await respuesta.json()) as Root;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

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
  });

  return state;
}
