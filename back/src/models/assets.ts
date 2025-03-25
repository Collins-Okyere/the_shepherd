import { BaseModel } from "./base";

export class Assets extends BaseModel {

    name: string;
    description: string;
    url: string;
    type: string;
    church_id: number;
    branch_id: number;

    static tableName = 'assets';

}