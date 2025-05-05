import { BaseMessage } from "@langchain/core/messages";
import { Annotation } from "@langchain/langgraph";

export const AgentState = Annotation.Root({
  input: Annotation<string>({
    reducer: (x, y) => y ?? x,
  }),
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
    default: () => []
  }),
  routeDestination: Annotation<'SimpleRequest' | 'GeneralConversation' | 'ComplexPlan' | undefined>({
    reducer: (x, y) => y ?? x,
  })
})

export type State = typeof AgentState.State;
