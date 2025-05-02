import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";

export const llm = new ChatOllama({
	baseUrl: "http://localhost:11434",
	model: "llama3.2",
});

export const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text",
  baseUrl: "http://localhost:11434",
});
