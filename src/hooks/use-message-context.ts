import { useContext, $ } from "@builder.io/qwik";
import { MessageContext } from "~/contexts/message-context";
import { type MessageStore } from "~/models";


export function useMessageContext(){
  const storageMessage = useContext(MessageContext)

  if(!storageMessage) throw new Error("No storage message")

  const handlerStorageMessage = $((state: MessageStore) => {
    storageMessage.message = state.message
    storageMessage.type = state.type
  })

  return {
    storageMessage,
    handlerStorageMessage
  }


}