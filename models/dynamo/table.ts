import { GetItemInput, PutItemInput, BatchGetItemInput } from "aws-sdk/clients/dynamodb";

export abstract class Table {

    constructor(private tableName: string) {}

    abstract get map(): { [key: string]: any }

    getMap(): { [key: string]: any } {
        const data = this.map;
        Object.keys(data).forEach(key => {
            if (data[key] === undefined) {
                delete data[key];
            }
        });
        return data;
    }

    get keyQuery(): GetItemInput {
        return {
            TableName: this.tableName,
            Key: this.getMap()
        }
    }

    get batchQuery(): BatchGetItemInput {
        return {
            RequestItems: {
                [this.tableName]: {
                    Keys: [this.getMap()]
                }
            }
        }
    }

    get putQuery(): PutItemInput {
        return {
            TableName: this.tableName,
            Item: this.getMap()
        }
    }

}