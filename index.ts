import { HumanMessage } from "@langchain/core/messages";
import { app } from "./graph";

const result = app.invoke({
  messages:[new HumanMessage('Whats the current location?')]
})

console.log(await result);
