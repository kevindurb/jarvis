import { Socket } from 'socket.io';
import intents from './intents';

const MIN_INTENT_SCORE = 0.8;

export default (socket: Socket) => {
  socket.on('message', async (message: string) => {
    const results = await Promise.all(intents.map((intent) => intent(message)));

    const matchedIntent = results.reduce(
      (prev: IntentResult | undefined, result: IntentResult) => {
        if (result.score > 0.8) {
          if (!prev || result.score > prev.score) {
            return result;
          }
        }
        return prev;
      },
      undefined,
    );

    if (matchedIntent) {
      console.log(`matched! ${matchedIntent.identifier}`);
    }
  });
};
