import sdk from'aws-sdk';

class Aws {
    constructor() {
       sdk.config.loadFromPath('../configuration/awsConfig.json');
    }
}

export default Aws;