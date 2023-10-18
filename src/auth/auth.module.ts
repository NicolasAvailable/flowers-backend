import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: {expiresIn: '2 days'}
    })
  ],
  providers: [
    AuthService, 
    LocalStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
