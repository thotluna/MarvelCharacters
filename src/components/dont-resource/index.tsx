import { component$ } from "@builder.io/qwik";

export const DontResource = component$<{ message: string; classStyle: string }>(
  ({ message, classStyle }) => {
    return (
      <article class={`relative w-full ${classStyle}`}>
        <picture class="w-full before:absolute before:overflow-hidden before:bottom-0 before:right-0 before:top-auto before:border-t-transparent z-10 before:border-r-yellow-500 before:border-b-transparent before:border-l-transparent before:border-t-[24px] before:border-r-[24px] before:border-b-0 before:border-l-0 ">
          <img src="images/all-deathl.webp" alt="" />
        </picture>
        <div class="absolute w-full top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div class="bg-slate-950 ">
            <h2 class='text-7xl font-["Regular"] text-slate-200'>{message}</h2>
          </div>
        </div>
      </article>
    );
  }
);
