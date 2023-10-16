import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'users',
      schema: UserSchema
    }
  ])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UsersModule {}
