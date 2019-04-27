'use strict'

const { createRecord } = require('../dynamo/create-record')
const { getRecord } = require('../dynamo/get-record')

module.exports.joinCommand = async (phoneNumber, username) => {
  // Check if the user already exists
  const existingRecord = await getRecord(phoneNumber)
  if (existingRecord) {
    return `${username}, you are aleady registered for the Tube Challenge.`
  }

  // Create the user record
  await createRecord(phoneNumber, username)

  // Return the message
  return `Hi ${username}, you have registered for the Tube Challenge with your number +${phoneNumber}. Text INSTRUCTIONS to list the available commands.`
}
