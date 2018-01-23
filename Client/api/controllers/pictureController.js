class PictureController {
    constructor() {
       
    }

    testGet(req, res) {
        res.send("Hello Get");
    }

    testPost(req, res) {
        res.send("Hello Post");
    }
}

export default PictureController;