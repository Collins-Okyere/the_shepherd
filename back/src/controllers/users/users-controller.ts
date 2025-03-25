import { Controller } from "@nestjs/common";
import { Church } from "src/models/church";
import { User } from "src/models/user";
import { Branch } from "src/models/branch";
import { UserRole } from "src/models/user-role";
import { Member } from "src/models/member";
import { Staff } from "src/models/staff";
import { BaseController } from "../base-controller";

@Controller('users')
export class UsersController extends BaseController {

    jsonData: any = {};

    async get_users(){
        const active_users = await User.query().where({is_deleted: false})
        const inactive_users = await User.query().where({is_deleted: true})
        this.jsonData.users = this.userParams({ active_users, inactive_users })
    }

    async sign_in(req: any, body: any){
        let message: any = ''
        try {  
            const user = await User.query().findOne({username: body.user.username, password: body.user.password});
            if(user) {
                const userRole = await UserRole.query().findOne({id: user.role});
                let role = userRole.name === 'member' ? 'member' : 'admin';
                let churchInfo =  await Church.query().findOne((ch: any) => ch.id === user.church_Id);
                let branchInfo =  await Branch.query().findOne((br: any) => br.id === user.branch_Id);
                let userInfo = role === 'member' ? await Member.query().findOne((mem: any) => mem.member_id === user.username) : await Staff.query().findOne((stf: any) => stf.staff_id === user.username);
                if(user && userInfo){
                    message = { message:`Welcome ${userInfo.first_name}!`, status: 'success' };
                }else{
                    message = { message: `Sign-in unsuccessful. Contact Admin`, status: 'danger' };
                }
                this.jsonData = { message, user, userInfo, churchInfo, branchInfo };
            } else {
                message = { message: `Username or password may be incorrect.`, status: 'danger' };
                this.jsonData = { message: message };
            }
        } catch (error) {
            this.handleError(error);
        }
        return this.jsonData;
    }

    async create_user(req: any, body: any){
        const userParams = this.userParams(body);
        const user = await User.query().insertAndFetch(userParams);
        this.jsonData = { message: { message: `${user.username} created successfully`, status: 'success' }, user: this.userParams(user) }
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

    handleError(error: any) {
        this.jsonData = {
            success: false,
            message: { status: 'danger', message: 'Invalid Creadentials. Please check and try again.' }
        }
        console.log(error)
    }

}