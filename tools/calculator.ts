import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { create, all } from 'mathjs';

if (!all) throw new Error('Error loading math library')

const math = create(all);

export default tool(
  ({ input }) => math.evaluate(input).toString(),
  {
    name: 'calculator',
    description: 'Calculate the result of a simple math expression (e.g., 10 + 5*2, sqrt(16)). Takes the math expression string as input.',
    schema: z.object({ input: z.string() }),
  }
)
