import { BaseMessage, HumanMessage, isAIMessage } from "@langchain/core/messages";
import * as readline from 'node:readline/promises';
import { app } from "./graph";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const threadId = 'asdfasdfasdfasdfd';
const messageHistory: BaseMessage[] = [];

process.on('SIGINT', () => {
  process.exit();
})

while (true) {
  const input = await rl.question('You: ');
  const userMessage = new HumanMessage({
    content: input
  });
  messageHistory.push(userMessage);

  const state = await app.invoke(
    {
      input,
    },
    { configurable: { thread_id: threadId } }
  );

  for await (const message of state.messages) {
    if (!messageHistory.includes(message) && isAIMessage(message) && message.text) {
      console.log('AI: ', message.text)
    }
    messageHistory.push(message)
  }
}
