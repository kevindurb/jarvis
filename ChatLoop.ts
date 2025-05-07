import * as readline from 'node:readline/promises';
import { EventEmitter } from "node:stream";
import type { Message } from 'ollama';

export class ChatLoop extends EventEmitter{
  private rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  private async waitForAssistantMessage(): Promise<Message> {
    return new Promise((resolve) => {
      this.once('AssistantMessage', (message) => resolve(message))
    });
  }

  public async run() {
    while (true) {
      const input = await this.rl.question('You: ');
      const userMessage: Message = {
        role: 'user',
        content: input,
      }
      this.emit('UserMessage', userMessage);
      const assistantMessage = await this.waitForAssistantMessage();
      console.log('AI: ', assistantMessage.content);
    }
  }
}
