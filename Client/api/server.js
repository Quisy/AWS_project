import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import PictureRoutes from './routes/pictureRoutes';
import fs from 'fs';
import Helpers from './utils/helpers';
import Service from './service';



let port = process.env.PORT || 3000;

let app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//Routes
let pictureRouters = new PictureRoutes(app);

app.listen(8080);
export default app

