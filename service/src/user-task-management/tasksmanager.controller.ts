import { Controller } from "@nestjs/common";
import mongoose from "mongoose";
import { TasksManagementHandler } from "./tasksmanager.handler";
import { TasksManagement } from "./schemas/tasksmanager.schema";

@Controller()
export class TasksManagementController {
	public static tasksManagementHandler: TasksManagementHandler;

	public constructor(tasksManagementHandler: TasksManagementHandler) {
		TasksManagementController.tasksManagementHandler =
			tasksManagementHandler;
	}

	public static createTaskforUser(
		taskId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId,
		status: string
	): Promise<string> {
		return TasksManagementController.tasksManagementHandler.createTaskforUser(
			taskId,
			userId,
			status
		);
	}

	public static setTaskforUser(
		_id: mongoose.Types.ObjectId,
		status: string
	): Promise<string> {
		return TasksManagementController.tasksManagementHandler.setTaskforUser(
			_id,
			status
		);
	}

	public static getTasksListbyUserId(
		userId: mongoose.Types.ObjectId
	): Promise<TasksManagement[]> {
		return TasksManagementController.tasksManagementHandler.getTaskListbyUserId(
			userId
		);
	}

	public static getAllTask(page: number): Promise<TasksManagement[]> {
		return TasksManagementController.tasksManagementHandler.getAllTask(
			page
		);
	}

	public static checkDbduplicate(
		taskId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	): Promise<boolean> {
		return TasksManagementController.tasksManagementHandler.checkDBDuplicate(
			taskId,
			userId
		);
	}
}
