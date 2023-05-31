import { component$ } from "@builder.io/qwik";
import { Search } from "../icons/qwik";

export interface SearchBarProps {
  search: { value: string };
  placeholder: string;
}

export const SearchBar = component$<SearchBarProps>(
  ({ search, placeholder }) => {
    return (
      <section class="w-full relative bg-slate-950 p-8 before:absolute before:overflow-hidden before:bottom-0 before:right-0 before:top-auto before:border-t-transparent z-10 before:border-r-slate-800 before:border-b-transparent before:border-l-transparent before:border-t-[12px] before:border-r-[12px] before:border-b-0 before:border-l-0">
        <label class="w-full flex  items-center justify-between text-red-50">
          <input
            class="p-2 bg-slate-950  text-red-50 flex-1 border-b-2 "
            value={search.value}
            onInput$={(event) =>
              (search.value = (event.target as HTMLInputElement).value)
            }
            placeholder={placeholder}
          />
          <Search width={24} height={24} />
        </label>
      </section>
    );
  }
);
