import express, { Express, Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import config from './config';

import { ILINEWebhookEvent, ILineUserProfile, ILINEConfig } from './interfaces/line';

const lineConfig: ILINEConfig = {
  channelAccessToken: config.line.channelAccessToken,
  channelSecret: config.line.channelSecret
}

const app: Express = express();
const router: Router = express.Router();
const port = config.port;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/', (req: Request, res: Response) => {
  res.send('Hi!');
});

app.post('/beaconHook', async (req: Request, res: Response) => {
  const msSinceEpoch = new Date().getTime();
  const body = req.body;

  console.log(`[@] Received events at ${msSinceEpoch}. Total events: ${body.events.length}`);

  body.events.forEach(async (event: ILINEWebhookEvent) => {
    const userProfile: ILineUserProfile = await getUserProfile(event.source.userId);
    console.log(userProfile);
  });

  res.status(200);
});

async function getUserProfile (userId: string): Promise<any> {
  const profile = await axios({
    method: 'GET',
    url: `https://api.line.me/v2/bot/profile/${userId}`,
    headers: {
      Authorization: `Bearer ${lineConfig.channelAccessToken}`
    }
  });
  return profile.data;
}

app.listen(port, async () => {
  console.log(`⚡️ Express is running on port ${port}`);
});

