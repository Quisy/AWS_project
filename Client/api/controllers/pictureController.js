import util from 'util';
import S3Form from '../utils/s3form';
import Policy from '../utils/policy';
import Helpers from '../utils/helpers';


const AWS_CONFIG_FILE = "./api/configuration/awsConfig.json";
const POLICY_FILE = "./api/configuration/policy.json";
const INDEX_TEMPLATE = "index.ejs";

let helpers = new Helpers();
let awsConfig = helpers.readJSONFile(AWS_CONFIG_FILE);
let policyData = helpers.readJSONFile(POLICY_FILE);
let policy = new Policy(policyData);
let s3Form = new S3Form(policy);
let bucketName = policy.getConditionValueByKey("bucket");

class PictureController {
    constructor() {
    }

    renderMainPage(req, res) {
        console.log(s3Form);
        var fields = s3Form.generateS3FormFields();
        fields = s3Form.addS3CredientalsFields(fields, awsConfig);
        res.render(INDEX_TEMPLATE, { fields: fields, bucket: bucketName });
    }

}

export default PictureController;