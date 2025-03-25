import { BaseModel } from "./base";

export class UserRole extends BaseModel {

    name: string;
    description: string;

    static tableName = 'user_roles';

}