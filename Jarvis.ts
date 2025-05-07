import { Ollama, type Message } from 'ollama';
import { ChatLoop } from './ChatLoop';

export class Jarvis {
  private chatLoop = new ChatLoop();
  private messages: Message[] = [];
  private ollama = new Ollama({
    host: 'http://127.0.0.1:11434'
  });

  constructor() {
    this.chatLoop.on('UserMessage', this.handleUserMessage.bind(this))
  }

  private handleUserMessage(message: Message) {
    this.messages.push(message);
    this.handleChat();
  }

  private async handleChat() {
    const response = await this.ollama.chat({
      model: 'llama3.2:3b',
      messages: this.messages,
      stream: false,
    });

    this.messages.push(response.message);
    if (response.message.role === 'assistant') {
      this.chatLoop.emit('AssistantMessage', response.message);
    }
  }

  public run() {
    this.chatLoop.run();
  }
}
