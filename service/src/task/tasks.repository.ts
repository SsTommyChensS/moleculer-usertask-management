import mongoose from "mongoose";
import { Task } from "./schemas/tasks.schema";

export interface TasksRepository {
	createTask(taskname: string, context: string): Promise<string>;

	update(
		_id: mongoose.Types.ObjectId,
		taskname?: string,
		context?: string
	): Promise<string>;

	delete(_id: mongoose.Types.ObjectId): Promise<string>;

	checkIdTask(_id: mongoose.Types.ObjectId): Promise<boolean>;

	getAllTasks(): Promise<Task[]>;
}
