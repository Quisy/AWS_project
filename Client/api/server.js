import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import PictureRoutes from './routes/pictureRoutes';
import fs from 'fs';
import Helpers from './utils/helpers';


let app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//Routes
let pictureRouters = new PictureRoutes(app);

app.listen(80);
export default app

