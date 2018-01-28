import util from 'util';
import moment from 'moment';
import Helpers from './helpers';

class Policy {
    constructor(policyData) {
        this.helpers = new Helpers();
        this.policy = policyData;	
        this.policy.expiration = moment().add(policyData.expiration).toJSON();
        //console.log("policyData " + util.inspect(policyData, false, null));	
    }

    generateEncodedPolicyDocument(){
        return this.helpers.encode(this.policy, 'base64');		
    }
    
    getConditions(){
        return this.policy.conditions;
    }
    
    generateSignature(secretAccessKey){
        return this.helpers.hmac("sha1", secretAccessKey, this.generateEncodedPolicyDocument(), 'base64');	
    }
    
    getConditionValueByKey(key){
        var condition = [];
        this.policy.conditions.forEach(function(elem) {		
            if(Object.keys(elem)[0] === key)
                condition = elem[Object.keys(elem)[0]];
        });
        return condition;
    }
}

export default Policy;