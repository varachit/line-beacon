
type EventType = 'beacon'
type EventMode = 'active'
type BeaconType = 'enter' | 'banner' | 'stay'
type SourceType = 'user'

export interface ILineUserProfile {
  userId: string,
  displayName: string,
  pictureUrl: string,
  language: string
}

export interface ILINEWebhookEvents {
  destination: string,
  events: ILINEWebhookEvent[]
}

export interface ILINEWebhookEvent {
  webhookEventId: string,
  type: EventType,
  beacon: ILINEBeacon,
  deliveryContext: ILINEBeaconDeliveryContext,
  source: ILINESource,
  replyToken: string,
  timestamp: number
}

export interface ILINEBeacon {
  hwid: string,
  type: BeaconType
}

export interface ILINEBeaconDeliveryContext {
  isRedelivery: boolean
}

export interface ILINESource {
  type: SourceType,
  userId: string
}

export interface ILINEConfig {
  channelAccessToken: string
  channelSecret: string
}