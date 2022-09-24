import axios from 'axios';
import crypto from 'crypto'
import { IncomingHttpHeaders } from 'http2';

import { LINE_CONSTANT} from '../constant';

export class LineClient {
  private readonly channelAccessToken: string;
  private readonly channelSecret: string;

  constructor (channelAccessToken: string, channelSecret: string) {
    this.channelAccessToken = channelAccessToken;
    this.channelSecret = channelSecret;
  }

  public validateSignature (signature: string, body: string): boolean {
    const generetedSignature: string = crypto.createHmac('SHA256', this.channelSecret).update(body).digest('base64').toString();
    return signature === generetedSignature;
  }

  public async getUserProfile (userId: string): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + this.channelAccessToken
    }

    const response = await axios({ method: 'GET',
      url: `${LINE_CONSTANT.API_URL}/v1/user/${userId}`,
      headers: headers
    });
    return response.data;
  }

  public async replyMessage (replyToken: string, message: string): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + this.channelAccessToken
    }

    const response = await axios({
      method: 'POST',
      url: `${LINE_CONSTANT.MESSAGING_API_URL}/reply`,
      headers: headers,
      data: JSON.stringify({
        replyToken: replyToken,
        messages: [{ type: 'text', text: JSON.stringify(message) }]
      })
    });
    return response;
  }
}
