import { component$, Slot } from '@builder.io/qwik';
import type {QRL} from '@builder.io/qwik';
interface ButtonProps{
  handlerClick: QRL<() => void>;
  disabled: boolean;
}

export const Button = component$(({handlerClick, disabled}: ButtonProps) => {
  return (
    <button 
      class='relative bg-slate-950 text-slate-300 px-8 py-2 flex overflow-hidden justify-center items-center after:absolute after:overflow-hidden after:bottom-0 after:right-0 after:top-auto after:border-t-transparent z-10 after:border-r-slate-800 after:border-b-transparent after:border-l-transparent after:border-t-[12px] after:border-r-[12px] after:border-b-0 after:border-l-0 before:bg-red-600 before:-z-10 before:text-slate-950 before:overflow-hidden before:transition-all before:duration-200 before:w-0 before:h-full hover:before:absolute hover:before:bg-red-600 hover:before:text-slate-950 hover:before:top-0 hover:before:left-0 hover:before:right-0  hover:before:w-full hover:before:h-full disabled:bg-slate-800 disabled:pointer-events-none disabled:text-slate-500' 
      onClick$={() => handlerClick()}
      disabled = {disabled} > 
      <Slot />
    </button>
  )
});