export { Link } from './link';
export { LinkAddress } from './linkaddress';
export { Token } from './token';
import * as AWS from 'aws-sdk';

export const createDBClient = (): AWS.DynamoDB.DocumentClient => {
    AWS.config.update({ region: 'ap-northeast-2' });
    AWS.config.logger = console;
    return new AWS.DynamoDB.DocumentClient();
}