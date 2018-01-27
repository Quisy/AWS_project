import util from 'util';
import S3Form from '../utils/s3form';
import Policy from '../utils/policy';
import Helpers from '../utils/helpers';


const AWS_CONFIG_FILE = "./api/configuration/awsConfig.json";
const POLICY_FILE = "./api/configuration/policy.json";
const INDEX_TEMPLATE = "index.ejs";

class CreateForm {
    task(request, callback){
        //1. load configuration
        var helpers = new Helpers();
        var awsConfig = helpers.readJSONFile(AWS_CONFIG_FILE);
        var policyData = helpers.readJSONFile(POLICY_FILE);
    
        //2. prepare policy
        var policy = new Policy(policyData);
    
        //3. generate form fields for S3 POST
        var s3Form = new S3Form(policy);
        //4. get bucket name
        var bucketName = policy.getConditionValueByKey("bucket");
    
        var fields = s3Form.generateS3FormFields();
        
        fields = s3Form.addS3CredientalsFields(fields, awsConfig);

        callback(null, {template: INDEX_TEMPLATE, params:{fields:fields, bucket:bucketName}});
    }
}

//export const action = CreateForm.task;
export const action = CreateForm.prototype.task;