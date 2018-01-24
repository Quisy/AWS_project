import express from 'express';
import PictureRoutes from './routes/pictureRoutes'
import bodyParser from 'body-parser'
import fs from 'fs'

let app = express();
let port = process.env.PORT || 3000;
//app.server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
let pictureRouters = new PictureRoutes(app);

app.listen(port);

export default app;