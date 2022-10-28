import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";

import {
	TasksManagement,
	TasksManagementSchema,
} from "./schemas/tasksmanager.schema";
import { TasksManagementRepository } from "./tasksmanager.repository";

export class TasksManagementHandler implements TasksManagementRepository {
	public constructor(
		@InjectModel(TasksManagement.name)
		private tasksManagementModel: mongoose.Model<TasksManagement>
	) {}

	public async getTasksManagementModel() {
		if (!this.tasksManagementModel) {
			this.tasksManagementModel = mongoose.model(
				"tasksManagement",
				TasksManagementSchema
			);
		}

		return this.tasksManagementModel;
	}

	public async createTaskforUser(
		taskId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId,
		status: string
	): Promise<string> {
		const model = await this.getTasksManagementModel();

		if (
			status.toLocaleLowerCase() === "doing" ||
			status.toLocaleLowerCase() === "done"
		) {
			const setedTask = await model.create({
				taskId,
				userId,
				status,
			});

			await setedTask.save();

			return "Set task for user successfully";
		}

		return "Set Task Failed!";
	}

	public async setTaskforUser(
		_id: mongoose.Types.ObjectId,
		status: string
	): Promise<string> {
		const model = await this.getTasksManagementModel();

		if (
			status.toLocaleLowerCase() === "doing" ||
			status.toLocaleLowerCase() === "done"
		) {
			await model.updateOne({ _id }, { status });

			return "Update Task sucessfully!";
		}

		return "Update Task Faild!";
	}

	public async getTaskListbyUserId(
		userId: mongoose.Types.ObjectId
	): Promise<TasksManagement[]> {
		const model = await this.getTasksManagementModel();

		const taskList = await model.find({ userId }).exec();

		return taskList;
	}

	public async getAllTask(page: number): Promise<TasksManagement[]> {
		const model = await this.getTasksManagementModel();

		const result = model
			.find()
			.limit(5)
			.skip(page * 5);

		return result;
	}

	public async checkDBDuplicate(
		taskId: mongoose.Types.ObjectId,
		userId: mongoose.Types.ObjectId
	): Promise<boolean> {
		const model = await this.getTasksManagementModel();

		const checkUserId = await model.find({ taskId });

		const checkTaskId = await model.find({ userId });

		if (!checkUserId && !checkTaskId) {
			return false;
		}

		return true;
	}
}
