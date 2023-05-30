import {
  component$,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,

} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { Character } from "~/components/character/character";
import { SearchBar } from "~/components/search-bar";
import type { Root, Data, CharacterType } from "~/models";

interface storeProps {
  page: number;
  data?: Data | null;
  loading: boolean;
}

const initialState = {
  page: 0,
  data: null,
  loading: false,
};

export default component$(() => {
  const state = useStore<storeProps>(initialState);
  const element = useSignal<HTMLElement>();
  
  useTask$(async ({ track, cleanup }) => {
    track(() => state.page);
    const url = `http://localhost:5173/api/characters/${state.page}`;
    const controller = new AbortController();
    cleanup(() => controller.abort());
    
    try {
      const respuesta = await fetch(url, {
        method: "GET",
        signal: controller?.signal,
      });
      const res = (await respuesta.json()) as Root;
      
      if (state.data) {
        state.data = {
          ...res.data,
          results: [...state.data.results, ...res.data.results],
        };
      } else {
        state.data = res.data;
      }
    } catch (error) {
      console.error(error);
    }
  });
  
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
    
    const search = useSignal('')    
    
  return (
    <>
      <header class="w-full flex items-center justify-center bg-red-600 p-8 ">
        <h1 class="text-7xl w-full inline-block text-center text-stone-50 ">
          Marvel Heroes
        </h1>
      </header>

      <SearchBar 
        value={search} 
        placeholder='A-Bonb'
      />
      
      <section class="w-full flex justify-center items-center">
        <div
          class="p-8 w-full grid  gap-8 justify-between items-center "
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
          }}
        >
          {state.data &&
            state.data.results?.length &&
            state.data.results.map((result: CharacterType) => {
              return (
                <Character ref={element} key={result.id} character={result} />
              );
            })}
        </div>
      </section>
    </>
  );
});



export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
