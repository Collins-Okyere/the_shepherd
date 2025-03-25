import { Body, Get, Post, Req } from "@nestjs/common";

export class BaseController {

//     jsonData: any = {}

//     @Get()
//     async index(@Req() req) {
//         try {
//             return this[req.query.action](req);
//         } catch (error) {
//             console.log(error);
//             return 'Server error';
//         }
//     }

//     @Post()
//     async create(@Req() req, @Body() body: Body) {
//         try {
//             return this[req.body.action](req, body);
//         } catch (error) {
//             console.log(error);
//             return 'Server error';
//         }
//     }


// }

    @Get()
    async index(@Req() req) {
        const action = req.query.action;
        
        if (typeof this[action] !== 'function') {
            return { error: 'Action not found' };
        }
    
        try {
            return await this[action](req);
        } catch (error) {
            console.error(error);
            return { error: 'Server error' };
        }
    }
    
    @Post()
    async create(@Req() req, @Body() body: any) {
        const action = body.action;
        
        if (typeof this[action] !== 'function') {
            return { error: 'Action not found' };
        }
    
        try {
            return await this[action](req, body);
        } catch (error) {
            console.error(error);
            return { error: 'Server error' };
        }
    }
    
}
