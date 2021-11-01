import { DynamoDB, Endpoint, config } from "aws-sdk";

const options = {
  region: "localhost",
  endpoint: new Endpoint("http://localhost:8000"),
};

const isOffline = () => {
  return process.env.IS_OFFLINE;
};

const AWSaccessKeyId = 'not-important';
const AWSsecretAccessKey = 'not-important';      
const AWSregion = 'local';
config.update({
    accessKeyId: AWSaccessKeyId,
    secretAccessKey: AWSsecretAccessKey,  
    region: AWSregion
});

export const document = isOffline()
  ? new DynamoDB.DocumentClient(options)
  : new DynamoDB.DocumentClient();
