import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { llm } from "../llm";
import tools from "../tools";

export default createReactAgent({
  llm,
  tools,
})
