export { Link } from './link';
export { LinkAddress } from './linkaddress';
export { response, missingParameters } from './response';
import * as AWS from 'aws-sdk';

export const createDBClient = () => {
    AWS.config.update({ region: 'ap-northeast-2' });
    return new AWS.DynamoDB.DocumentClient();
}