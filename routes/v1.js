const express = require('express')
const { rateLimit } = require('express-rate-limit')
const { checkSchema, validationResult } = require('express-validator')
const dayjs = require('dayjs')

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

require('dayjs/locale/vi')
dayjs.locale('vi')

const { getLanguageName } = require('../utils/language')
const googleTranslate = require('../utils/google-translate')

const RATE_LIMIT_RESET_INTERVAL = 24 * 60 * 60 * 1000 // 1 day (in milliseconds)
const RATE_LIMIT_PER_INTERVAL = process.env.TRANSLATE_LIMIT_REQUEST_PER_DAY || 10
const MAX_TEXT_LENGTH = process.env.TRANSLATE_MAX_TEXT_LENGTH || 3000

const limiter = rateLimit({
  windowMs: RATE_LIMIT_RESET_INTERVAL,
  limit: RATE_LIMIT_PER_INTERVAL, // Limit each IP to RATE_LIMIT_PER_INTERVAL requests per `window`
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: `Bạn đã sử dụng hết ${req.rateLimit.limit} lượt dịch tin nhắn miễn phí.<br/>Vui lòng thử lại sau ${dayjs(req.rateLimit.resetTime).fromNow(true)}.`
    })
  }
})

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ZaDark API',
    version: '1.2'
  })
})

router.post(
  '/translate',
  limiter,
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

      // res.status(500).json({
      //   success: false,
      //   message: 'Tính năng tạm thời ngừng hoạt động.'
      // })

      const { text, target } = req.body

      const languageName = getLanguageName(target)

      const [translation] = await googleTranslate.translate(text, target)

      res.json({
        success: true,
        translation: `[Bạn đã sử dụng ${req.rateLimit.used}/${req.rateLimit.limit} lượt dịch miễn phí]<br/><br/>${translation}`,
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
