import mongoose from "mongoose";
import { TasksManagement } from "./schemas/tasksmanager.schema";

export interface TasksManagementRepository {
	createTaskforUser(
		taskId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId,
		status: string
	): Promise<string>;

	getTaskListbyUserId(
		userId: mongoose.Types.ObjectId
	): Promise<TasksManagement[]>;

	setTaskforUser(
		_id: mongoose.Types.ObjectId,
		status: string
	): Promise<string>;

	getAllTask(page: number): Promise<TasksManagement[]>;

	checkDBDuplicate(
		taskId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	): Promise<boolean>;
}
