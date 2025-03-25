import { BaseModel } from './base';

export class Church extends BaseModel {

    name: string;
    alt_name: string;
    url: string;
    phone1: string;
    phone2: string;
    website: string;
    location: string;
    country: number;
    mobile_no: string;
    post_address: string;
    logo: string;
    overseers: JSON;
    establish_date: Date;
    mission: string;
    vison: string;
    email: string;

    static tableName = 'churches';

}