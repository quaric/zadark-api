const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5555

app.use(bodyParser.json())
app.use(cors({
  origin: 'https://chat.zalo.me'
}))
app.use(morgan('combined'))
app.use(helmet())

app.set('trust proxy', 1)
app.get('/ip', (request, response) => response.send(request.ip))
app.get('/x-forwarded-for', (request, response) => response.send(request.headers['x-forwarded-for']))

app.use('/v1', require('./routes/v1'))

app.listen(port, () => {
  console.log(`ZaDark API listening on port ${port}`)
})
