export { Link } from './link';
export { LinkAddress } from './linkaddress';
export { response, missingParameters } from './response';
import * as AWS from 'aws-sdk';

export const createDBClient = () => {
    AWS.config.update({ region: 'ap-northeast-2' });
    AWS.config.logger = console;
    return new AWS.DynamoDB.DocumentClient();
}