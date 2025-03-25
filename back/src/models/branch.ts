import { BaseModel } from "./base";

export class Branch extends BaseModel {

    name: string;
    alt_name: string;
    church_id: number;
    country: number;
    url: string;
    phone1: string;
    phone2: string;
    website: string;
    location: string;
    mobile_no: string;
    post_address: string;
    logo: string;
    overseers: JSON;
    establish_date: Date;
    email: string;
    description: string;

    static tableName = 'branches';

}