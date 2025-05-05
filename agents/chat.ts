import { ChatPromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder, SystemMessagePromptTemplate } from "@langchain/core/prompts";
import type { State } from "../AgentState";
import { llm } from "../llm";
import { AIMessage } from "@langchain/core/messages";

const conversationalPrompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(
        "You are Jarvis, a helpful, friendly, and slightly witty AI assistant. Respond conversationally to the user."
    ),
    new MessagesPlaceholder("messages"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

export default async (state: State): Promise<Partial<State>> => {
  const { input, messages } = state;
  const chain = conversationalPrompt.pipe(llm);
  const response = await chain.invoke({
    input,
    messages,
  })

  return {
    messages: [new AIMessage(response.text)]
  }
}
