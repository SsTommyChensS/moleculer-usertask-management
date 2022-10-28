import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { TasksModule } from "./task/tasks.module";
import { TasksManagerModule } from "./user-task-management/tasksmanager.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot("mongodb://localhost:27017/neox"),
		UsersModule,
		TasksModule,
		TasksManagerModule,
	],
})
export class AppModule {}
