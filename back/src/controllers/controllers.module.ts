import { Module } from "@nestjs/common";
import { AuthController } from "./auth/authentication.controller";
import { HRController } from "./hr/hr-controller";
import { ChurchSetupController } from "./church/church-setup-controller";
import { MembersController } from "./members/members-controller";
import { MemberGroupsController } from "./members/member-groups-controller";
import { UsersController } from "./users/users-controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Ensures all modules can access environment variables
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'), // Fetches from .env
                signOptions: { expiresIn: '1h' },
            }),
        }),
    ],
    controllers: [
        AuthController,
        UsersController,
        ChurchSetupController,
        HRController,
        MembersController,
        MemberGroupsController
    ],
})

export class ControllersModule {
    
}