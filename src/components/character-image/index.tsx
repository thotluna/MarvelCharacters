import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import styles from './character-image.module.css'

interface Props{
  name: string
  path: string
  extension: string
}

export const CharacterImage = component$<Props>(({name, path, extension}) => {
  const isLoaded = useSignal(false)

  useTask$(({track}) => {
    track(()=> path)
    isLoaded.value = false
  })

  const hidden = isLoaded.value? false : true

  return (
    <>
      <header class="relative w-48 h-[11.5rem] overflow-hidden transition transform duration-200 ease-linear hover:scale-110 ">
        {!isLoaded.value && <div class="w-full h-full flex items-center justify-center">
            <div class={styles.lds}></div>
          </div>}
        <img
          class={`w-48 h-[11.5rem] object-cover ${hidden} ` }
          width={160}
          height={192}
          src={`${path}.${extension}`}
          alt={name}
          onLoad$ = {() => isLoaded.value = true}
        />
      </header>
    </>
  )
});