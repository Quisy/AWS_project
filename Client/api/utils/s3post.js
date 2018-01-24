import util from 'util';
import moment from 'moment';
import helpers from './helpers';

const ACCESS_KEY_FIELD_NAME = "AWSAccessKeyId";
const POLICY_FIELD_NAME = "policy";
const SIGNATURE_FIELD_NAME = "signature";

class S3Form {
    constructor(policy) {
        if (policy instanceof Policy)
            this.policy = policy;
        else {
            console.log("policy instanceof Policy");
            throw new Error("policy instanceof Policy");
        }
    }
    
    generateS3FormFields() {
        var conditions = this.policy.getConditions();
    
        var formFields = [];
    
        conditions.forEach(function (elem) {
            if (Array.isArray(elem)) {
                if (elem[1] === "$key")
                    formFields.push(hiddenField("key", elem[2] + "${filename}"));
            } else {
    
                var key = Object.keys(elem)[0];
                var value = elem[key];
                if (key !== "bucket")
                    formFields.push(hiddenField(key, value));
            }
        });
    
        return formFields;
    }
    
    addS3CredientalsFields(fields, awsConfig) {
        fields.push(hiddenField(
            ACCESS_KEY_FIELD_NAME, awsConfig.accessKeyId));
    
        fields.push(hiddenField(
            POLICY_FIELD_NAME, this.policy.generateEncodedPolicyDocument()));
    
        fields.push(hiddenField(
            SIGNATURE_FIELD_NAME, this.policy.generateSignature(awsConfig.secretAccessKey)));
        return fields;
    }

    hiddenField(fieldName, value) {
        return { name: fieldName, value: value };
    }
}

export default S3Form;

