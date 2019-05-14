import { GetItemInput, PutItemInput } from "aws-sdk/clients/dynamodb";

export abstract class TableModel {

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

    get putQuery(): PutItemInput {
        return {
            TableName: this.tableName,
            Item: this.getMap()
        }
    }

}