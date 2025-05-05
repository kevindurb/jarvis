import { HumanMessage } from "@langchain/core/messages";
import { type State } from "./AgentState";
import { llm } from "./llm";

export default async function (
  state: State,
): Promise<Partial<State>> {
  const { input } = state;

  if (!input) {
      console.warn("Router Node: No input found in state.");
      return { routeDestination: "GeneralConversation" };
  }

  // Updated prompt for binary classification
  const classificationPrompt = `Analyze the following user request. Classify it into ONE of the following categories: "GeneralConversation", "SimpleToolRequest", or "ComplexPlan".

Definitions:
- 'GeneralConversation': Greetings, farewells, thanks, chit-chat, opinions, or other non-actionable statements. Does not require tools or complex planning.
- 'SimpleToolRequest': Can likely be handled by a single tool use (like weather check, calculation, time lookup, date lookup, basic web search, simple reminder setting/viewing).
- 'ComplexPlan': Likely requires multiple steps, combining information from different sources, using multiple tools sequentially, significant reasoning, or generating complex artifacts (like code, detailed reports, multi-part emails, planning trips).

Examples:
User Request: "Hello there!" -> GeneralConversation
User Request: "Thanks, that was helpful." -> GeneralConversation
User Request: "What do you think about the weather today?" -> GeneralConversation
User Request: "What time is it in Tokyo?" -> SimpleToolRequest
User Request: "Calculate (1024 / 16) + 5" -> SimpleToolRequest
User Request: "Search for the main ingredients in carbonara" -> SimpleToolRequest
User Request: "Remind me to buy milk tomorrow morning" -> SimpleToolRequest
User Request: "Research the pros and cons of using Bun with LangChain, summarize the findings, and list potential challenges." -> ComplexPlan
User Request: "Read 'project_alpha_brief.txt', find the budget, compare it to 'financials_q1.csv', and tell me the difference." -> ComplexPlan
User Request: "Plan a romantic dinner date for Friday night." -> ComplexPlan

Respond ONLY with 'GeneralConversation', 'SimpleToolRequest', or 'ComplexPlan'.

User Request: "${input}"

Classification:`;

  try {
    const response = await llm.invoke([new HumanMessage(classificationPrompt)]);

    let rawResponse = "";
    if (typeof response.content === 'string') {
      rawResponse = response.content.trim();
    } else {
      console.warn("Router Node: Unexpected LLM response content type:", response.content);
      rawResponse = JSON.stringify(response.content).trim();
    }

    // Normalize and check against the two categories
    const normalizedResponse = rawResponse.toLowerCase().replace(/[^a-z]/gi, '');

    if (normalizedResponse === "generalconversation") {
      return {
        routeDestination: 'GeneralConversation',
      }
    } else if (normalizedResponse === "simpletoolrequest") {
      return {
        routeDestination: 'SimpleRequest',
      }
    } else if (normalizedResponse === "complexplan") {
      return {
        routeDestination: 'ComplexPlan',
      }
    } else {
      console.warn(`Router Node: Classification response "${rawResponse}" didn't match known categories. Defaulting to GeneralConversation.`);
      return {
        routeDestination: 'GeneralConversation',
      }
    }

  } catch (error: any) {
    console.error("Router Node: Error during LLM classification call:", error);
    // Fallback to SimpleRequest in case of error
    return { routeDestination: "SimpleRequest" };
  }
}
