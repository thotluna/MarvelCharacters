import { component$, type Signal } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { useCharacterContext } from "~/hooks/use-character-context";
import type { CharacterType } from "../../models";
import { CharacterImage } from "../character-image";

interface CharacterProps {
  character: CharacterType;
  ref: Signal<HTMLElement | undefined>;
}

export const Character = component$<CharacterProps>(({ character, ref }) => {
  const [name, last] = character.name.split("(");
  const alias = last?.replace(/\)/g, "") ?? "";
  const nav = useNavigate();
  const { handlerStorageCharacter } = useCharacterContext();

  return (
    <article
      ref={ref}
      onClick$={() => {
        nav(`/characters/${character.id}`);
        handlerStorageCharacter(character);
      }}
      class="relative max-w-xs justify-self-center self-center bg-slate-950 w-full h-96 overflow-hidden rounded-t-3xl before:absolute before:top-0 before:right-0 before:w-full before:h-1/2 before:bg-red-600 before:transition-all before:duration-200 hover:before:absolute hover:before:top-0 hover:before:right-0 hover:before:w-full hover:before:h-96 hover:before:bg-red-600 after:absolute after:overflow-hidden after:bottom-0 after:right-0 after:top-auto after:border-t-transparent after:border-r-slate-800 after:border-b-transparent after:border-l-transparent   after:border-t-[12px] after:border-r-[12px] after:border-b-0 after:border-l-0 "
    >
      <CharacterImage
        name={character.name}
        path={character.thumbnail.path}
      />
      <footer class="relative w-full h-[11.5rem] flex flex-col justify-between p-4 text-slate-200 hover:text-slate-900">
        <h2 class="text-lg text-current uppercase">{name}</h2>
        <h3 class="text-sm px-4 text-slate-400 hover:text-slate-700 text-right">
          {alias}
        </h3>
      </footer>
    </article>
  );
});
