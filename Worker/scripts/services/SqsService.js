import AWS from 'aws-sdk';

const AWS_CONFIG_FILE = "./configuration/awsConfig.json";
const queueUrl = "https://sqs.us-west-2.amazonaws.com/156139702614/PSOIR_QUEUE";
const operations = ['rotate', 'greyscale', 'blur', 'delete'];
const receiveParams = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1
}

AWS.config.loadFromPath(AWS_CONFIG_FILE);
let sqs = new AWS.SQS();

class SqsService {
    getMessage() {
        let promise = sqs.receiveMessage(receiveParams).promise();
        return promise.then((data) => { 
            if (!data.hasOwnProperty("Messages")) {
                return null;
            }
            let messageBody = JSON.parse(data.Messages[0].Body);
            var receiptHandle = data.Messages[0].ReceiptHandle;
            
            if (!operations.includes(messageBody.operation)) {
                return null;
            }

            return {body: messageBody, receiptHandle: receiptHandle};
        });
    }

    deleteMessage(receiptHandle){
        let params = {
            QueueUrl: queueUrl,
            ReceiptHandle: receiptHandle
        };
        sqs.deleteMessage(params, function(err, data) {
            return;
        });
    }
}

export default SqsService;