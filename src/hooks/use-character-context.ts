import { useContext, $ } from "@builder.io/qwik";
import { CharacterContext } from "~/contexts/character-context";
import type {  CharacterType } from "~/models";


export function useCharacterContext(){
  const store = useContext(CharacterContext)
  
  if(!store) throw new Error("No storage character")
  // if(!store.id) throw new Error("No storage character data")

  const handlerStorageCharacter = $((character: CharacterType) => {
    store.id = character.id
    store.name = character.name
    store.description = character.description
    store.modified = character.modified
    store.thumbnail = character.thumbnail
    store.resourceURI = character.resourceURI
    store.comics = character.comics
    store.series = character.series
    store.stories = character.stories
    store.events = character.events
    store.urls = character.urls
  })

  return {
    character: store,
    handlerStorageCharacter
  }
}