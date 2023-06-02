import { component$, useSignal } from '@builder.io/qwik';
import { Character } from '~/components/character/character';
import { useCharacterContext } from '~/hooks/use-character-context';


export default component$(() => {
  const borrar = useSignal<HTMLElement>()
  const {character} = useCharacterContext()

  const description = character.description || "Does not description for this character"

  return (
    <div class='w-full h-full py-8 flex flex-col text-stone-50'>
      <div class='w-full flex flex-row justify-between gap-8'>
        <Character character={character} ref={borrar} />
        <div class='bg-slate-950 flex-1 rounded-t-3xl p-8'>
          <header class='pb-8'>
            <h1 class='text-7xl w-full inline-block text-center '>{character.name}</h1>
            <h2 class='w-full text-center text-md text-slate-400'>{character.modified}</h2>
            <h2 class='w-full text-center text-md text-slate-400'>{character.id}</h2>
          </header>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
});