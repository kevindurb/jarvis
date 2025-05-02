import { WebBrowser } from 'langchain/tools/webbrowser'
import { embeddings, llm } from '../llm';

export default new WebBrowser({ model: llm, embeddings });
