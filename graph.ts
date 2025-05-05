import { StateGraph, END, START, MemorySaver } from "@langchain/langgraph";
import { AgentState } from "./AgentState";
import genericReact from "./agents/genericReact";
import router from "./router";
import chat from "./agents/chat";

const workflow = new StateGraph(AgentState)
.addNode('chat', chat)
.addNode('router', router)
.addNode("agent", genericReact)

workflow.addEdge(START, 'router');
workflow.addConditionalEdges('router', (state) => {
  return state.routeDestination ?? 'GeneralConversation';
}, {
  'GeneralConversation': 'chat',
  'SimpleRequest': 'agent',
  'ComplexPlan': 'agent'
})
workflow.addEdge('agent', END)

export const app = workflow.compile({ checkpointer: new MemorySaver() });
