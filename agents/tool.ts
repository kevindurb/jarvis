import { ToolNode } from "@langchain/langgraph/prebuilt";
import tools from "../tools";

export default new ToolNode(tools);
