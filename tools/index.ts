import type { Tool } from "@langchain/core/tools";
import calculator from "./calculator";
import currentDateTime from "./currentDateTime";
import currentLocation from "./currentLocation";
import ipAddress from "./ipAddress";
import webBrowser from "./webBrowser";
import webSearch from "./webSearch";

export default [
  currentLocation,
  currentDateTime,
  calculator,
  ipAddress,
  webSearch,
  webBrowser,
]
