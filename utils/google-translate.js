const { Translate } = require('@google-cloud/translate').v2

const googleTranslate = new Translate({
  projectId: 'zadark',
  key: process.env.TRANSLATE_API_KEY
})

module.exports = googleTranslate
