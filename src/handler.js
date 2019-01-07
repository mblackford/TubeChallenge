'use strict';

const QueryString = require('querystring');
const Twilio = require('twilio');
const MessagingResponse = Twilio.twiml.MessagingResponse;

const { commandParser } = require('./helpers/command-parser');

require('dotenv-safe').config();

module.exports.twilio = async (event, context) => {

  const data = QueryString.parse(event.body);

  const receivedMessage = data.Body
  const phoneNumber = data.From.replace('+', '');

  // Parse the command from the message
  const commandInfo = commandParser(receivedMessage);

  // Execute the command and get the response
  const response = await commandInfo.command(phoneNumber, commandInfo.params);

  // Build up and return the message
  const twiml = new MessagingResponse();
  twiml.message(response);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
    body: twiml.toString(),
  };
};
