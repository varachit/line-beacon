import dotenv from 'dotenv';
import invariant from 'tiny-invariant';

dotenv.config();

invariant(process.env.PORT, 'port is missing from environment variable');
invariant(process.env.LINE_BASE_URL, 'LINE_BASE_URL is missing from environment variable');
invariant(process.env.channelAccessToken, 'channelAccessToken is missing from environment variable');
invariant(process.env.channelSecret, 'channelSecret is missing from environment variable');

const config = {
  port: process.env.PORT,
  line: {
    baseURL: process.env.LINE_BASE_URL,
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
  }
};

export default config;
