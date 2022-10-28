import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { Task, TaskSchema } from "./schemas/tasks.schema";
import { TasksRepository } from "./tasks.repository";

export class TasksHandler implements TasksRepository {
	public constructor(
		@InjectModel(Task.name) private taskModel: mongoose.Model<Task>
	) {}

	public async getTaskModel() {
		if (!this.taskModel) {
			this.taskModel = mongoose.model("task", TaskSchema);
		}

		return this.taskModel;
	}

	public async createTask(
		taskname: string,
		context: string
	): Promise<string> {
		const model = await this.getTaskModel();

		const taskId = uuidv4();

		const task = await model.create({
			taskId,
			taskname,
			context,
		});

		await task.save();

		return `Created task ${taskname} successfully`;
	}

	public async update(
		_id: mongoose.Types.ObjectId,
		taskname?: string,
		context?: string
	): Promise<string> {
		const model = await this.getTaskModel();

		await model.updateOne({ _id }, { taskname, context });

		return "Update task successfully";
	}

	public async delete(taskId: mongoose.Types.ObjectId): Promise<string> {
		const model = await this.getTaskModel();

		await model.deleteOne({ taskId });

		return "Delete Task successfully";
	}

	public async checkIdTask(_id: mongoose.Types.ObjectId): Promise<boolean> {
		const model = await this.getTaskModel();

		const result = await model.findById(_id);

		if (!result) {
			return false;
		}

		return true;
	}

	public async getAllTasks(): Promise<Task[]> {
		const model = await this.getTaskModel();

		const result = await model.find();

		return result;
	}
}
