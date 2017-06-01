const mongoose = require('mongoose')
import app from "./app"

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/projects')


const port = 3001
app.listen(port, () => console.log(`Server running on port ${port}`))
