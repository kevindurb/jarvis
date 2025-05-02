import { tool } from "@langchain/core/tools";
import { publicIp } from 'public-ip'

export default tool(
  () => publicIp(),
  {
    name: 'ip-address',
    description: 'get public ip address',
  }
)
