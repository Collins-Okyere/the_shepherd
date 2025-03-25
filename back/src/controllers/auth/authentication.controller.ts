import { Controller } from "@nestjs/common";
import { Church } from "src/models/church";
import { User } from "src/models/user";
import { Branch } from "src/models/branch";
import { UserRole } from "src/models/user-role";
import { Member } from "src/models/member";
import { Staff } from "src/models/staff";
import { BaseController } from "../base-controller";
import { Assets } from "src/models/assets";
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config();

@Controller('auth')
export class AuthController extends BaseController {

    constructor(private jwtService: JwtService) {
        super();
    }

    jsonData: any = {};

    async get_users(){
        const active_users = await User.query().where({is_deleted: false})
        const inactive_users = await User.query().where({is_deleted: true})
        this.jsonData.users = this.userParams({ active_users, inactive_users })
    }

    async create_user(req: any, body: any) {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
        const userParams = { 
            username: body.username, 
            email: body.email, 
            church_id: body.church_id, 
            branch_id: body.branch_id, 
            password: hashedPassword 
        };
        const user:any = await User.query().insertAndFetch(userParams);
        this.jsonData = { 
            message: { message: `${user.username} created successfully`, status: 'success' }, 
            user: { username: user.username, email: user.email }
        };
    }

    async update_user(req: any, body: any){
        const userParams= this.userParams(body)
        await User.query().patch(userParams).findById(body.id)
        const user = await User.query().findById(body.id)
        this.jsonData = { message: { message: `${user.username} updated successfully`, status: 'success' }, user: this.userParams(user) }
    }

    async delete_user(req: any) {
        const user = await User.query().patch({is_deleted: true}).findById(req.query.id);
        this.jsonData = { message: { message: `${user.username} deleted successfully`, status: 'success' }}
    }

    userParams(bodyAttr: any){
        const { username, email, church_id, branch_id } = bodyAttr;
        return { username, email, church_id, branch_id };
    }

    async hashExistingPasswords() {
        const users = await User.query();
        for (const user of users) {
            if (!user.password.startsWith('$2b$')) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(user.password, saltRounds);
                await User.query().patchAndFetchById(user.id, { password: hashedPassword });
                console.log(`Updated password for user: ${user.username}`);
            }
        }
        console.log('All passwords updated!');
    }

    async sign_in(req: any, body: any){
        const res = req.res;  // Extract 'res' from 'req'
        console.log(body)
        let message: any = ''
        try {  
            const user:any = await User.query().findOne({ username: body.user.username });
            if (user && await bcrypt.compare(body.user.password, user.password)) {
                const token = this.jwtService.sign({ userId: user.id });
                res.cookie("authToken", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 });
                const userRole = await UserRole.query().findOne({id: user.role});
                let role = userRole.name === 'member' ? 'member' : 'admin';
                let churchInfo:any =  await Church.query().findOne((ch: any) => ch.id === user.church_Id);
                let logo = await Assets.query().findOne({id: churchInfo.logo});
                churchInfo = { ...churchInfo, logo: logo.url };
                let branchInfo =  await Branch.query().findOne((br: any) => br.id === user.branch_Id);
                let userDetails = role === 'member' ? await Member.query().findOne((mem: any) => mem.member_id === user.username) : await Staff.query().findOne((stf: any) => stf.staff_id === user.username);
                if(user && userDetails){
                    message = { message:`Welcome ${userDetails.first_name}!`, status: 'success' };
                }else{
                    message = { message: `Sign-in unsuccessful. Contact Admin`, status: 'danger' };
                }
                this.jsonData = { authToken: token, message, user: { ...user, user_role: role, userInfo: userDetails }, churchInfo: { church: churchInfo, branch: branchInfo } };
            } else {
                message = { message: `Username or password may be incorrect.`, status: 'danger' };
                this.jsonData = { message: message };
            }
        } catch (error) {
            this.handleError(error);
        }
        return this.jsonData;
    }

    async unlock_screen(req: any, body: any){
        let message: any = ''
        try {  
            const user = await User.query().findOne({username: body.user.username, password: body.user.password});
            if(user) {
                const token = this.jwtService.sign({ userId: user.id });
                req.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
                const xRole = user.role;
                const userRole = await UserRole.query().findOne({id: xRole});
                let role = userRole.name === 'member' ? 'member' : 'admin';
                let churchInfo =  await Church.query().findOne((ch: any) => ch.id === user.church_Id);
                let branchInfo =  await Branch.query().findOne((br: any) => br.id === user.branch_Id);
                let userDetails = role === 'member' ? await Member.query().findOne((mem: any) => mem.member_id === user.username) : await Staff.query().findOne((stf: any) => stf.staff_id === user.username);
                if(user && userDetails){
                    message = { message:`Welcome back ${userDetails.first_name}!`, status: 'success' };
                }else{
                    message = { message: `Unsuccessful. Sign out, then sign back in`, status: 'danger' };
                }
                this.jsonData = { message, user, userDetails, userRole: role, churchInfo, branchInfo, authToken: token };
            } else {
                message = { message: `Password is incorrect.`, status: 'danger' };
                this.jsonData = { message: message };
            }
        } catch (error) {
            this.handleError(error);
        }
        return this.jsonData;
    }

    handleError(error: any) {
        this.jsonData = {
            success: false,
            message: { status: 'danger', message: 'Invalid Creadentials. Please check and try again.' }
        }
        console.log(error)
    }

}