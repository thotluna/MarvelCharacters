import { createContextId } from "@builder.io/qwik";
import { type CharacterType } from "~/models";

export const CharacterContext =
  createContextId<CharacterType>("character-context");
