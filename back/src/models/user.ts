import { BaseModel } from "./base";

export class User extends BaseModel {

    username: string;
    email: string;
    password: string;
    role: number;
    church_Id: number;
    branch_Id: number

    static tableName = 'users';

}
