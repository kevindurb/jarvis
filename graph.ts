import { StateGraph, END, START } from "@langchain/langgraph";
import { AgentState } from "./AgentState";
import { agent } from "./agents/agent";
import { toolNode } from "./nodes/tool";
import type { AIMessage } from "@langchain/core/messages";

const workflow = new StateGraph(AgentState)
.addNode("agent", agent)
.addNode("tool", toolNode);

workflow.addEdge(START, 'agent');
workflow.addConditionalEdges(
  "agent",
  (state) => {
    const messages = state.messages;
    const lastMessage = messages[messages.length - 1] as AIMessage;
    if (lastMessage?.tool_calls && lastMessage.tool_calls.length > 0) {
      // The previous agent is invoking a tool
      return 'tool';
    }
    return END;
  },
);

workflow.addEdge("tool", "agent");

export const app = workflow.compile();
