interface IntentResult {
  identifier: string;
  score: number;
  meta?: any;
}

type intent = (message: string) => Promise<IntentResult>;
