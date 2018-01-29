import S3Service from './services/S3Service';
import SqsService from './services/SqsService';

let s3Service = new S3Service();
let sqsService = new SqsService();

class Init {
    async work() {
        var message = await sqsService.getMessage();
        if (message == null)
            return;
        var result = await s3Service.modifyFile(message.body.key, message.body.operation);
        if (!result)
            return;
        sqsService.deleteMessage(message.receiptHandle);
    }
    
    start() {
        setInterval(() => {
            this.work()
        }, 500)
    }
}

export default Init;