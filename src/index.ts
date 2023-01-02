import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { DateTime } from 'luxon';

import { LineClient } from './lib/line';

import { IWebhookEvent, IWebhookEventData, IUserProfile, LineConfig } from './interfaces/line';

import config from './config';

const app: Express = express();
const port: string = config.port;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const lineConfig: LineConfig = {
  baseURL: config.line.baseURL,
  channelAccessToken: config.line.channelAccessToken,
  channelSecret: config.line.channelSecret
}

const lineClient = new LineClient(lineConfig.baseURL, lineConfig.channelAccessToken, lineConfig.channelSecret);

enum EventType {
  BEACON = 'beacon',
  POSTBACK = 'postback',
  MESSAGE ='message'
}

app.get('/knockknock', function (req: Request, res: Response) {
  return res.status(200).json({ 'message': 'Hey!' });
});

app.post('/beacon', async function (req: Request, res: Response) {
  const currentTimestamp = DateTime.now().setZone('Asia/Bangkok').toISO();

  const body = req.body;
  const headers = req.headers;

  const stringifiedBody = JSON.stringify(body);
  const signature = headers['x-line-signature'] as string;

  console.log(`[@] Received an event at ${currentTimestamp}`);

  if (!signature) {
    console.error('[X] Event discarded due to no signature provided');
    return res.status(401).send('Unauthorized');
  }

  if (!lineClient.validateSignature(signature, stringifiedBody)) {
    console.error(`[X] Event discarded due to the invalid signature`);
    return res.status(401).send('Unauthorized');
  }

  console.log(`[@] Total data in an event: ${body.events.length}`);


  body.envets.forEach(async (event: IWebhookEventData) => {
    if (event.type === EventType.BEACON) {
      const localTimestamp = DateTime.now().toLocaleString();
      const userProfile = await lineClient.getUserProfile(event.source.userId);
      console.log(`[@] User ID: ${userProfile.userId}, Name: ${userProfile.displayName}, Picture: ${userProfile.pictureUrl}`);

      const messagesToReply = [
        `Hey ${userProfile.displayName} ! Your entered the radius in proximity with the beacon and your presence is being detected at ${localTimestamp}`
      ];

      lineClient.replyMessage(event.replyToken, messagesToReply, true);
      console.log(`[@] Messages send to ${userProfile.displayName}!`);
    }
    else if (event.type === EventType.POSTBACK) {
      // Postback event logic goes here
    }
    else if (event.type === EventType.MESSAGE) {
      // Message event logic goes here
    }
  });

  return res.status(200).json({ 'message': 'OK' });
});

app.listen(port, async () => {
  console.log(`⚡️ Express is running on port ${port}`);
});
