import { component$ } from "@builder.io/qwik";

export const Header = component$(() => {
  return (
    <header class="w-full flex items-center justify-center bg-red-600 p-8 ">
      <h1 class="text-7xl w-full inline-block text-center text-stone-50 ">
        Marvel Heroes
      </h1>
    </header>
  )
});
