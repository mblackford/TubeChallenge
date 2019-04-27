'use strict'

module.exports.canonicalName = (name) => {
  // Convert it to lower case
  const lowerCaseName = name.toLowerCase()

  // Strip out any non-letter character
  const strippedName = lowerCaseName.replace(/[^a-z0-9]/g, '')

  // Handle any special cases
  return strippedName
    .replace('stjamespark', 'stjamesspark')
    .replace('heathrowterminals2and3', 'heathrowterminals23')
}
