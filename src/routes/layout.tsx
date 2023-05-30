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
    <>
      <Header />
      <main class="container mx-auto py-0">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
