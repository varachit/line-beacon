import dotenv from 'dotenv';
import invariant from 'tiny-invariant';

dotenv.config();

invariant(process.env.channelAccessToken, 'channelAccessToken is missing from environment variable');
invariant(process.env.channelSecret, 'channelSecret is missing from environment variable');

const config = {
  port: process.env.port || 3000,
  line: {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
  }
};

export default config;
