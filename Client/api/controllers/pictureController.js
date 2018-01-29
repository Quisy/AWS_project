import util from 'util';
import S3Form from '../utils/s3form';
import Policy from '../utils/policy';
import Helpers from '../utils/helpers';
import S3Service from '../services/s3Service';
import SqsService from '../services/sqsService';
import TemplateRenderer from '../utils/templateRenderer';
import Statics from '../utils/statics';


const AWS_CONFIG_FILE = "./api/configuration/awsConfig.json";
const POLICY_FILE = "./api/configuration/policy.json";
const INDEX_TEMPLATE = "index.ejs";

let helpers = new Helpers();
let awsConfig = helpers.readJSONFile(AWS_CONFIG_FILE);
let policyData = helpers.readJSONFile(POLICY_FILE);
let policy = new Policy(policyData);
let s3Form = new S3Form(policy);
let bucketName = policy.getConditionValueByKey("bucket");
let s3Service = new S3Service();
let sqsService = new SqsService();
let templateRenderer = new TemplateRenderer();

class PictureController {

    renderMainPage(req, res) {
        let fields = s3Form.generateS3FormFields();
        fields = s3Form.addS3CredientalsFields(fields, awsConfig);

        templateRenderer.renderMainPage(res, Statics.Message);
    }

    async modifyPictures(req, res) {
        console.log(req.body.keys);
        if (!req.body.keys) {
            Statics.Message = { type: 'danger', content: 'No picture selected' };
            res.redirect('/');
            return;
        }

        let selectedPicturesKeys = [];

        if (!Array.isArray(req.body.keys))
            selectedPicturesKeys = [req.body.keys];
        else
            selectedPicturesKeys = req.body.keys;

        let selectedOperation = req.body.operation;

        await sqsService.queuePicturesModification(selectedPicturesKeys, selectedOperation);

        let newPicturesQuant = 0;
        let expectedPicturesQuant = 0;

        if (selectedOperation != 'delete')
            expectedPicturesQuant = Statics.OriginalPicturesQuant + Statics.ModifiedPicturesQuant + selectedPicturesKeys.length;
        else
            expectedPicturesQuant = Statics.OriginalPicturesQuant + Statics.ModifiedPicturesQuant - selectedPicturesKeys.length;

        while (newPicturesQuant !== expectedPicturesQuant) {
            let pict = await s3Service.getPictures(bucketName, '');
            newPicturesQuant = pict.length;
        }

        res.redirect('/');
    }

}

export default PictureController;