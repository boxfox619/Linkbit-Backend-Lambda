import { GetItemInput, PutItemInput } from "aws-sdk/clients/dynamodb";

export abstract class TableModel {
    public static TableName: string;

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
            TableName: TableModel.TableName,
            Key: this.getMap()
        }
    }

    get putQuery(): PutItemInput {
        return {
            TableName: TableModel.TableName,
            Item: this.getMap()
        }
    }

}