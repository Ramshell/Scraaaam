import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/routes.js'

// Connects to mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/projects')

// Express configuration
const app = express()
app.use(bodyParser.json())
app.use(routes)
app.use(express.static(__dirname + "/../../dist/frontend"))


// Express startup
const port = 3001
app.listen(port, () => console.log(`Server running on port ${port}`))
