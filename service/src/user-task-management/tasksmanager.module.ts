import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksManagementHandler } from "../user-task-management/tasksmanager.handler";
import {
	TasksManagement,
	TasksManagementSchema,
} from "./schemas/tasksmanager.schema";
import { TasksManagementController } from "./tasksmanager.controller";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: TasksManagement.name, schema: TasksManagementSchema },
		]),
	],
	controllers: [TasksManagementController],
	providers: [TasksManagementHandler],
})
export class TasksManagerModule {}
