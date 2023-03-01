import {MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod} from '@nestjs/common';
import {SharedModule} from 'src/shared/shared.module';
import {AuthController} from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import {AuthService} from './auth.service';
import {JwtStrategy} from './jwt.strategy';



@Module({
    imports: [SharedModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})

export class AuthModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware)
        .exclude(
            { path: 'auth/login', method: RequestMethod.POST },
            { path: 'auth/register', method: RequestMethod.POST },
        )
        .forRoutes(AuthController);
      }
}