import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <div class='container mx-auto h-screen flex flex-col'>
      <Header />
      <main class=" py-0 flex-1">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
