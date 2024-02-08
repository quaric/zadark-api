const express = require('express')
const googleTranslate = require('../utils/google-translate')
const { getLanguageName } = require('../utils/language')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ZaDark API',
    version: '1'
  })
})

router.post('/translate', async (req, res) => {
  try {
    const { text, target } = req.body

    if (!text || !target) {
      return res.status(422).json({
        success: false,
        message: 'Missing required fields'
      })
    }

    const languageName = getLanguageName(target)

    // res.json({
    //   success: true,
    //   translation: text,
    //   languageName
    // })

    const [translation] = await googleTranslate.translate(text, target)

    res.json({
      success: true,
      translation,
      languageName
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

module.exports = router
