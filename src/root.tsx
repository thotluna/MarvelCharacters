import { component$, useContextProvider, useStore } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { MessageBar } from "./components/message-bar";
import { RouterHead } from "./components/router-head/router-head";
import { CharacterContext } from "./contexts/character-context";
import { MessageContext } from "./contexts/message-context";

import "./global.css";
import type { CharacterType, MessageStore } from "./models";
import { InitialCharacter, MessageType} from "./models";
import { fakeCharacter } from "./services/fakeCharacter";



export default component$(() => {
  const store: MessageStore = useStore({message:'', type: MessageType.SUCCESS, requiredTimeout: false})
  useContextProvider(MessageContext, store);
  const characterStore = useStore<CharacterType>(fakeCharacter)
  useContextProvider(CharacterContext, characterStore)
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body class='relative w-screen' lang="en">
        <RouterOutlet />
        <div class='sticky bottom-4 right-0 left-0 h-10'> 
          <MessageBar /> 
        </div>
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
