import { AgentExecutor, createReactAgent } from "langchain/agents";
import * as hub from 'langchain/hub'
import { llm } from "../llm";
import tools from "../tools";
import type { State } from '../AgentState';
import { AIMessage } from "@langchain/core/messages";

const agent = await createReactAgent({
  llm,
  tools,
  prompt: await hub.pull('hwchase17/react'),
})

const executor = new AgentExecutor({
  tools,
  agent,
  handleParsingErrors: true,
})

export default async (state: State): Promise<Partial<State>> => {
  const response = await executor.invoke({
    input: state.input,
  })

  return {
    messages: [new AIMessage(response.output)]
  }
}
