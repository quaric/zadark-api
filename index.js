const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5555

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

app.use('/v1', require('./routes/v1'))

app.listen(port, () => {
  console.log(`ZaDark API listening on port ${port}`)
})
