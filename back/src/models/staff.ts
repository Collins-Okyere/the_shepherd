import { BaseModel } from "./base";

export class Staff extends BaseModel {

    first_name: string;
    middle_name: string;
    last_name: string;
    occupation: string;
    email: string;
    mobile_no: string;
    location: string;
    password: string;
    usertype: string;
    group_id: number;
    group_category_ids: any;

    static tableName = 'staff';

}