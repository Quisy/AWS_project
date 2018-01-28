import AWS from 'aws-sdk';
import Helpers from '../utils/helpers';

const AWS_CONFIG_FILE = "./api/configuration/awsConfig.json";
AWS.config.loadFromPath(AWS_CONFIG_FILE);
let s3 = new AWS.S3();

class S3Service {
    getPictures(bucketName, prefix) {

        let params = {
            Bucket: bucketName,
            Prefix: prefix,
            MaxKeys: 20
        };

        let pictures = [];

        let promise = s3.listObjects(params).promise()

        return promise.then((data) => {
            let pictures = data.Contents
                .filter((p) => { return p.Size > 0 })
                .map((p) => ({ key: p.Key, src: `https://s3-us-west-2.amazonaws.com/${bucketName}/${p.Key}` }));

            return pictures;
        })
    }
}

export default S3Service;