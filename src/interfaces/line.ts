
type EventType = 'beacon'
type EventMode = 'active'
type BeaconType = 'enter' | 'banner' | 'stay'
type SourceType = 'user'

type MessageType = 'text' | 'sticker' | 'iamge' | 'video' | 'audio' | 'location' | 'imagemap' | 'template' | 'flex'

export interface IUserProfile {
  userId: string,
  displayName: string,
  pictureUrl: string,
  language: string
}

export interface IWebhookEvent {
  destination: string,
  events: IWebhootEventData[]
}

export interface IWebhookEventData {
  webhookEventId: string,
  type: EventType,
  beacon: IBeacon,
  deliveryContext: IDeliveryContext,
  source: ISource,
  replyToken: string,
  timestamp: number
}

export interface IBeacon {
  hwid: string,
  type: BeaconType
}

export interface IDeliveryContext {
  isRedelivery: boolean
}

export interface ISource {
  type: SourceType,
  userId: string
}

export interface IMessage {
  type: MessageType
}

export interface ITextMessage extends IMessage {
  text: string
  emojis?: IEmoji[]
}

export interface IStickerMessage extends IMessage {
  packageId: string
  stickerId: string
}

export interface IMediaMessage extends IMessage {
  originalContentUrl: string
  previewImageUrl: string
}

export interface IImageMessage extends IMediaMessage {}

export interface IVideoMessage extends IMediaMessage {
  trackingId?: string
}

export interface IAudioMessage extends IMessage {
  originalContentUrl: string
  duration: number
}

export interface ILocationMessage extends IMessage {
  title: string
  address: string
  latitude: number
  longitude: number
}

export interface IImageMapMessage extends IMessage {
  baseUrl: string,
  altText: string,
  baseSize: {
    width: number,
    height: number
  },
  video: {
    originalContentUrl: string,
    previewImageUrl: string,
    area: {
      x: number,
      y: number,
      width: number,
      height: number
    },
    externalLink: {
      linkUri: string,
      label: string
    }
  },
  actions: IImageMapAction[]
}

export interface IImageMapAction {
  type: string,
  label?: string,
  linkUri: string,
  area: IImageMapArea
}

export interface IImageMapArea {
  x: number,
  y: number,
  width: number,
  height: number
}


export interface IEmoji {
  index: number,
  productId: string,
  emojiId: string
}

export interface IReplyMessageBody {
  replyToken: string,
  messages: string,
  notificationDisabled: boolean
}

export enum MessageTypeEnum {
  TEXT = 'text',
  STICKER = 'sticker',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  LOCATION = 'location',
  IMAGEMAP = 'imagemap',
  TEMPLATE = 'template',
  FLEX = 'flex'
}

export enum EventTypeEnum {
  BEACON = 'beacon',
  POSTBACK = 'postback',
  MESSAGE = 'message'
}

export interface IConfig {
  channelAccessToken: string
  channelSecret: string
}