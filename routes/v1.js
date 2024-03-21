const express = require('express')
// const googleTranslate = require('../utils/google-translate')
// const { getLanguageName } = require('../utils/language')
const { checkSchema, validationResult } = require('express-validator')

const router = express.Router()

const MAX_TEXT_LENGTH = 3000

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ZaDark API',
    version: '1.1'
  })
})

router.post(
  '/translate',
  checkSchema({
    text: {
      notEmpty: true,
      isString: true,
      errorMessage: 'Vui lòng nhập nội dung.',
      isLength: {
        options: {
          min: 3,
          max: MAX_TEXT_LENGTH
        },
        errorMessage: `Nội dung phải từ 3 đến ${MAX_TEXT_LENGTH} kí tự.`
      }
    },
    target: {
      notEmpty: true,
      isString: true,
      errorMessage: 'Vui lòng chọn ngôn ngữ.',
      isLength: {
        options: {
          min: 2
        },
        errorMessage: 'Ngôn ngữ không hợp lệ.'
      }
    }
  }),
  async (req, res) => {
    try {
      const result = validationResult(req)

      if (!result.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: Object.values(result.formatWith(({ msg }) => msg).mapped()).join(' ')
        })
      }

      res.status(500).json({
        success: false,
        message: 'Tính năng tạm thời ngừng hoạt động.'
      })

      // const { text, target } = req.body

      // const languageName = getLanguageName(target)

      // const [translation] = await googleTranslate.translate(text, target)

      // res.json({
      //   success: true,
      //   translation,
      //   languageName
      // })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })

module.exports = router
