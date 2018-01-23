import PictureController from '../controllers/pictureController'

class PictureRoutes
{
    constructor(app) {
        let controller = new PictureController();
        
        app.route('/test')
        .get(controller.testGet)
        .post(controller.testPost);
    }
}

export default PictureRoutes;