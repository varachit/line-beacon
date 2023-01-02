
const LINE_ERROR_MESSAGES = {
  AUDIENCE_GROUP_CAN_NOT_UPLOAD_STATUS_EXPIRED: `This audience can't be used because it's been more than 180 days (15,552,000 seconds) since this audience was created.`,
  AUDIENCE_GROUP_COUNT_MAX_OVER: `You have already created the maximum number of audiences (1,000).`,
  AUDIENCE_GROUP_NAME_SIZE_OVER: `The audience's name is too long.`,
  AUDIENCE_GROUP_NAME_WRONG: `The audience's name contains an invalid character (such as \n or some other control character).`,
  AUDIENCE_GROUP_NOT_FOUND: `Audience not found.`,
  AUDIENCE_GROUP_REQUESTID_DUPLICATE: 'There is already an audience with the specified request ID.',
  REQUEST_NOT_FOUND: `The specified request ID is incorrect or LINE not ready to create an audience with the specified request ID.`,
  TOO_OLD_MESSAGES: `You can't create an audience for a message (request ID) that was sent over 60 days (5,184,000 seconds) ago.`,
  UPLOAD_AUDIENCE_GROUP_INVALID_AUDIENCE_ID_FORMAT: [
    `file contains an invalid user ID or IFA.`,
    `audiences[].id is an invalid user ID or IFA.`
  ],
  UPLOAD_AUDIENCE_GROUP_NO_VALID_AUDIENCE_IDS: [
    `file doesn't contain a valid user ID or IFA.`,
    `audiences[].id isn't a valid user ID or IFA.`
  ],
  UPLOAD_AUDIENCE_GROUP_TOO_MANY_AUDIENCE_IDS: `Exceeded the maximum number of user IDs or IFAs.`,
  WRONG_BOT_ID: `The bot ID in the specified request ID doesn't match the bot linked to the channel that issued the channel access token.`,
  ALREADY_ACTIVE: `The audience group is already active.`
}

export default LINE_ERROR_MESSAGES;
