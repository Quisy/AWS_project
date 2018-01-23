import express from 'express';
import PictureRoutes from './routes/pictureRoutes'

let app = express();
let port = process.env.PORT || 3000;
//app.server = http.createServer(app);

let pictureRouters = new PictureRoutes(app);

app.listen(port);

export default app;