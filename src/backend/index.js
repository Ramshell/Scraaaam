import express from "express";
import bodyParser from "body-parser";
import projectRoutes from "./routes/projects.routes.js";
import contributorRoutes from "./routes/contributors.routes.js";

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/projects')

const app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname + "/../../dist/frontend"))
app.use('/js', express.static(__dirname + '/../../node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/../../node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/../../node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/projects', projectRoutes)
app.use('/contributors', contributorRoutes)


const port = 3001
app.listen(port, () => console.log(`Server running on port ${port}`))
