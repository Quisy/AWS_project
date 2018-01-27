import PictureController from '../controllers/pictureController'

class PictureRoutes
{
    constructor(app) {
        let controller = new PictureController();
        
        app.route('/')
        .get(controller.renderMainPage)
    }
}

export default PictureRoutes;