import { HumanMessage } from "@langchain/core/messages";
import { app } from "./graph";

const result = app.invoke({
  messages:[new HumanMessage('Search the web for the best chocolate cake recipe')]
})

console.log(await result);
