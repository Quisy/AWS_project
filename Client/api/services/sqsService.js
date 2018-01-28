import AWS from 'aws-sdk';
import Helpers from '../utils/helpers';
import Statics from '../utils/statics';

const AWS_CONFIG_FILE = "./api/configuration/awsConfig.json";
const queueUrl = "https://sqs.us-west-2.amazonaws.com/156139702614/PSOIR_QUEUE";

AWS.config.loadFromPath(AWS_CONFIG_FILE);
let s3 = new AWS.S3();
let sqs = new AWS.SQS();

class SqsService {
    queuePicturesModification(picturesKeys, operation) {
        let entries = picturesKeys.map((k, index) => ({ Id: index.toString(), MessageBody: `{key: ${k}, operation: ${operation} }` }));

        let params = {
            QueueUrl: queueUrl,
            Entries: entries
        };

        let promise = sqs.sendMessageBatch(params).promise();

        return promise.then((data) => {
            if (data.Failed.length > 0) {
                Statics.Message = { type: 'Danger', content: 'Error while processing request' };
            }
            else {
                Statics.Message = { type: 'success', content: 'Success' };
            }
        });
    }
}

export default SqsService;