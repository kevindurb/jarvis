import { tool } from "@langchain/core/tools";

export default tool(
  () => new Date().toLocaleString(),
  {
    name: 'current_date_time',
    description: 'get the current date and time',
  }
)
