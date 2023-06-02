import { createContextId } from "@builder.io/qwik";
import { type MessageStore } from "~/models";

export const MessageContext = createContextId<MessageStore>("message-context");
