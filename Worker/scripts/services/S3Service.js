import AWS from 'aws-sdk';
import Jimp from 'jimp';
import Path from 'path';
import Moment from 'moment';
import fs from 'fs';

const AWS_CONFIG_FILE = "./configuration/awsConfig.json";
const bucketName = "psoirs3bucket";
const tempPicturesFolderName = "tempPictures";
const modifiedPhotosDir = "Edited_Photos";

const getImagePath = (key) => `https://s3-us-west-2.amazonaws.com/${bucketName}/${key}`
const generateNewFileName = (key) => `${tempPicturesFolderName}/${Moment()}.${key.split('.').pop()}`

AWS.config.loadFromPath(AWS_CONFIG_FILE);
let s3 = new AWS.S3();

class S3Service {
    modifyFile(key, operation) {
        let path = getImagePath(key);

        return Jimp.read(path).then((picture) => {
            let newPictureName = generateNewFileName(key);

            switch (operation) {
                case "greyscale":
                    picture.greyscale();
                    break;
                case "rotate":
                    picture.rotate(180);
                    break;
                case "blur":
                    picture.blur(10);
                    break;
                case "delete":
                    this.deleteFile(key);
                    return true;
                default:
                    return null;
            }

            picture.write(newPictureName, (error) => this.saveModifiedFile(newPictureName));

            return true;

        }).catch(function (err) {
            console.log(err);
            return false;
        });
    }

    deleteFile(key) {
        var params = {
            Bucket: bucketName,
            Delete: {
                Objects: [
                    {
                        Key: key
                    },
                ],
            }
        };

        s3.deleteObjects(params, function (err, data) {
            if (err) console.log(err, err.stack);
        });
    }

    saveModifiedFile(fileName) {
        var fileStream = fs.createReadStream(Path.join(`${__dirname}/../../`, fileName));

        let params = {
            Bucket: bucketName,
            Key: `${modifiedPhotosDir}/${fileName.split('/').pop()}`,
            ACL: "public-read",
            Body: fileStream
        };

        let promise = s3.putObject(params).promise();

        promise.then((data) => {
            fs.unlink(fileName, (err) => { if (err) console.log(err) });
            return true;
        }).catch(function (err) {
            console.log(err);
            return false;
        });
    }
}

export default S3Service;