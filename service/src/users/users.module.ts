import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/users.schemas";
import { UsersController } from "./users.controller";
import { UsersHandler } from "./users.handler";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [UsersController],
	providers: [UsersHandler],
})
export class UsersModule {}
