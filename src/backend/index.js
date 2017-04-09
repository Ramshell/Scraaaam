import express from "express";
import bodyParser from "body-parser";
import projectRoutes from "./routes/projects.routes.js";
import contributorRoutes from "./routes/contributors.routes.js";

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/projects')

const app = express()
app.use(bodyParser.json())
app.use('/projects', projectRoutes)
app.use('/contributors', contributorRoutes)


const port = 3001
app.listen(port, () => console.log(`Server running on port ${port}`))
