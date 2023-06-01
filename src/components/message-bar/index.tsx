import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useMessageContext } from '~/hooks/use-message-context';
import { MessageStoreDefaults, MessageType } from '~/models';

import { Cancel } from '../icons/qwik';

export const MessageBar = component$(() => {
  const {storageMessage, handlerStorageMessage} = useMessageContext()
  const bg = useSignal('')

  useVisibleTask$(({track, cleanup}) => {
    track(() => storageMessage.message)
    if(storageMessage.type === MessageType.SUCCESS) bg.value = 'bg-emerald-500'
    if(storageMessage.type === MessageType.INFO) bg.value = 'bg-amber-200'
    if(storageMessage.type === MessageType.ERROR) bg.value = 'bg-red-500'
    if(storageMessage.type === MessageType.LOADING) bg.value = 'bg-blue-800'

    if(storageMessage.message && storageMessage.requiredTimeout) {     
      const interval = setInterval(() => {
        handlerStorageMessage(MessageStoreDefaults)
      }, 5000);
      cleanup(() => clearInterval(interval));
    }
  })

  if(!storageMessage.message) return <></>

  return (
    <article class={`ticky bottom-4 right-0 left-0 h-10 mx-4 opacity-75 p-4 rounded-sm border-none flex items-center justify-between overflow-hidden ${ bg.value } `}>
      <p class='flex-1'>{storageMessage.message}</p>
      <button 
        onClick$={() => handlerStorageMessage(MessageStoreDefaults)}>
        {!storageMessage.requiredTimeout &&
          <Cancel width={24} height={24} />
        }
      </button>
    </article>
  )
});