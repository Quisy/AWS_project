import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import Init from './init';


let app = express();
app.listen(3000);

let init = new Init();

init.start();


export default app

