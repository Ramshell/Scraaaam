import express from "express";
import bodyParser from "body-parser";
import projectRoutes from "./routes/projects.routes.js";
import contributorRoutes from "./routes/contributors.routes.js";

const app = express()
app.use(bodyParser.json())
app.use(
  express.static(__dirname + "/../../dist/frontend"))
app.use('/js',
  express.static(__dirname + '/../../node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js',
  express.static(__dirname + '/../../node_modules/bootstrap-drawer/dist/js')); // redirect bootstrap-drawer JS
app.use('/js',
  express.static(__dirname + '/../../node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css',
  express.static(__dirname + '/../../node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css',
  express.static(__dirname + '/../../node_modules/bootstrap-drawer/dist/css')); // redirect CSS bootstrap
app.use('/fonts',
  express.static(__dirname + '/../../node_modules/bootstrap/fonts')); // redirect CSS bootstrap
app.use('/projects', projectRoutes)
app.use('/contributors', contributorRoutes)

export default app;
