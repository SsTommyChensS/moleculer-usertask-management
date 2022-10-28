import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "./schemas/tasks.schema";
import { TasksController } from "./tasks.controller";
import { TasksHandler } from "./tasks.handler";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
	],
	controllers: [TasksController],
	providers: [TasksHandler],
})
export class TasksModule {}
