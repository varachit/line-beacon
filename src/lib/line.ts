import axios from 'axios';
import crypto from 'crypto'

export class LineClient {
  private readonly baseURL: string;
  private readonly channelAccessToken: string;
  private readonly channelSecret: string;

  constructor (baseURL: string, channelAccessToken: string, channelSecret: string) {
    this.baseURL = baseURL;
    this.channelAccessToken = channelAccessToken;
    this.channelSecret = channelSecret;
  }

  public validateSignature (signature: string, body: string): boolean {
    const generatedSignature = crypto.createHmac('SHA256', this.channelSecret).update(body).digest('base64').toString();
    return signature === generatedSignature;
  }

  public async getUserProfile (userId: string): Promise<any> {
    const response = await axios({
      method: 'GET',
      url: this.baseURL + '/v2/bot/profile/' + userId,
      headers: { 'Authorization': 'Bearer ' + this.channelAccessToken }
    });
    return response.data;
  }

  public async replyLocation (replyToken: string, notify: boolean = true): Promise<any> {
    const body: string = JSON.stringify({
      replyToken: replyToken,
      messages: [location],
      notificationDisabled: notify
    });

    const response = await axios({
      method: 'POST',
      url: this.baseURL + '/v2/bot/message/reply',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.channelAccessToken
      },
      data: body
    }).catch(err => console.error(err));

    return response;
  }

  public async replyTextMessage (replyToken: string, messages: string[], notify: boolean = true): Promise<any> {
    const response = await axios({
      method: 'POST',
      url: this.baseURL + '/v2/bot/message/reply',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.channelAccessToken
      },
      data: {
        replyToken: replyToken,
        messages: messages.map((message) => ({ type: 'text', text: message })),
        notificationDisabled: notify
      }
    }).catch(err => console.error(err));
    return response;
  }

  public async replyMessage (replyToken: string, messages: string[], notify: boolean = true): Promise<any> {
    const textMessages = messages.map((message) => ({ type: 'text', text: message }));

    const body = JSON.stringify({
      replyToken,
      messages: [ ...textMessages ],
      notificationDisabled: notify
    });

    const response = await axios({
      method: 'POST',
      url: this.baseURL + '/v2/bot/message/reply',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.channelAccessToken
      },
      data: body
    }).catch(err => console.error(err));
    return response;
  }
}

export default LineClient;
