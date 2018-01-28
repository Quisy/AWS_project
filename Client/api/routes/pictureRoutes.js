import PictureController from '../controllers/pictureController'

class PictureRoutes
{
    constructor(app) {
        let controller = new PictureController();
        
        app.route('/')
        .get(controller.renderMainPage)

        app.route('/modify')
        .get(controller.modifyPictures)
    }
}

export default PictureRoutes;