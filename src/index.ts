import express, { Express, Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { LineClient } from './lib/line';

import { ILINEWebhookEvent, ILineUserProfile, ILINEConfig } from './interfaces/line';
import { IncomingHttpHeaders } from 'http2';

import config from './config';

const app: Express = express();
const router: Router = express.Router();
const port: string = config.port;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const lineConfig: ILINEConfig = {
  channelAccessToken: config.line.channelAccessToken,
  channelSecret: config.line.channelSecret
}

const lineClient: LineClient = new LineClient(lineConfig.channelAccessToken, lineConfig.channelSecret);

router.get('/', function (req: Request, res: Response) {
  return res.status(200).send('Hi!');
});

router.post('/beacon', async function (req: Request, res: Response) {
  const currentTimestamp = new Date().getTime();

  const body = req.body;
  const headers = req.headers;

  const stringifiedBody: string = JSON.stringify(body);
  const signature: string = headers['x-line-signature'] as string;

  console.log(`[@] Received an event at ${currentTimestamp}`);

  if (signature === undefined || signature === null) {
    console.error('[X] Event discarded due to no signature provided');
    return res.status(401).send('Unauthorized');
  }

  if (lineClient.validateSignature(signature, stringifiedBody) === false) {
    console.error(`[X] Event discarded due to the invalid signature`)
    return res.status(401).send('Unauthorized');
  }

  console.log(`[@] Total data in an event: ${body.events.length}`);

  body.events.forEach(async (event: ILINEWebhookEvent) => {
    const userProfile: ILineUserProfile = await lineClient.getUserProfile(event.source.userId);
    console.log(`[@] User ID: ${userProfile.userId}, Name: ${userProfile.displayName}, Picture: ${userProfile.pictureUrl}`);
  });
  return res.status(200).send('Successful');
});

app.use(router);

app.listen(port, async () => {
  console.log(`⚡️ Express is running on port ${port}`);
});
