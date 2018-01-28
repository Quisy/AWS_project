import util from 'util';
import S3Form from '../utils/s3form';
import Policy from '../utils/policy';
import Helpers from '../utils/helpers';
import S3Service from '../utils/s3Service';


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


class PictureController {
    constructor() {
    }

    async renderMainPage(req, res) {
        let fields = s3Form.generateS3FormFields();
        fields = s3Form.addS3CredientalsFields(fields, awsConfig);

        let pictures = await s3Service.getPictures(bucketName, '');
        console.log(pictures);
        res.render(INDEX_TEMPLATE, { fields: fields, bucket: bucketName, pictures: pictures });
    }

    

}

export default PictureController;