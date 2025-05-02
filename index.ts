import { HumanMessage } from "@langchain/core/messages";
import { app } from "./graph";

const result = app.invoke({
  messages:[new HumanMessage('Go to theverge.com and tell me the top articles')]
})

console.log(await result);
