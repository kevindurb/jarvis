import { tool } from "@langchain/core/tools";
import { publicIp } from "public-ip";
import ipLocation from 'iplocation';

export default tool(
  async () => {
    const ip = await publicIp();
    return await ipLocation(ip);
  },
  {
    name: 'current_location',
    description: 'gets the current location',
  }
)
