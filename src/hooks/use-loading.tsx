import { useTask$, useVisibleTask$ } from "@builder.io/qwik"
import { MessageStoreDefaults, MessageType } from "~/models"
import { useMessageContext } from "./use-message-context"

export interface UseLoadingProps{
  loading: boolean
}

export function useLoading(state:{ loading: boolean}){
  const {handlerStorageMessage} = useMessageContext()

  useVisibleTask$(({track}) => {
    track(() => state.loading)
    if(state.loading){
      handlerStorageMessage({
        message: 'Loading...', 
        type: MessageType.LOADING,
        requiredTimeout: false
      })
    }else{
      handlerStorageMessage(MessageStoreDefaults)
    }
  })

}