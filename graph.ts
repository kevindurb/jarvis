import { StateGraph, END, START } from "@langchain/langgraph";
import { AgentState } from "./AgentState";
import type { AIMessage } from "@langchain/core/messages";
import genericReact from "./agents/genericReact";
import tool from "./agents/tool";

const workflow = new StateGraph(AgentState)
.addNode("agent", genericReact)
.addNode("tool", tool);

workflow.addEdge(START, 'agent');
workflow.addConditionalEdges(
  "agent",
  (state) => {
    const messages = state.messages;
    const lastMessage = messages[messages.length - 1] as AIMessage;
    if (lastMessage?.tool_calls && lastMessage.tool_calls.length > 0) {
      return 'tool';
    }
    return END;
  },
);

workflow.addEdge("tool", "agent");

export const app = workflow.compile();
