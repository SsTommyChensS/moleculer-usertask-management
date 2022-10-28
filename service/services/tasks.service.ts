import { Service, ServiceBroker } from "moleculer";
import { setTaskDto } from "src/task/dto/create-tasks.dto";

import { TasksController } from "../src/task/tasks.controller";
import { updateTaskDto } from "./../src/task/dto/update-tasks-dto";

export default class TasksService extends Service {
	// @ts-ignore
	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "task",

			settings: {},

			hooks: {},

			actions: {
				create: {
					params: {
						taskname: { type: "string", optional: false },
						context: { type: "string", optional: false },
					},
					handler: this.create,
				},

				update: {
					params: {
						taskId: { type: "string", optional: false },
						taskname: { type: "string", optional: true },
						context: { type: "string", optional: true },
					},

					handler: this.update,
				},

				getAll: {
					handler: this.getAllTask,
				},

				async checkIdTask(cxt: any) {
					const result = await this.checkTask(cxt);

					return result;
				},
			},

			events: {
				"user.signin": {
					params: {
						username: "string",
						password: "string",
					},
					async handler(ctx: any) {
						this.logger.info(
							`TASK --> ${ctx.params.username} <-- Sign In In System`
						);
					},
				},
			},

			methods: {},

			dependencies: ["gateway"],
		});
	}

	public async checkTask(ctx: any) {
		const { taskId } = ctx.params;

		const result: boolean = await TasksController.checkIdTask(taskId);

		return result;
	}

	private async create(ctx: any) {
		const { taskname, context }: setTaskDto = ctx.params;

		const creted = await TasksController.createTask(taskname, context);

		return creted;
	}

	private async update(ctx: any) {
		const { taskId, taskname, context }: updateTaskDto = ctx.params;

		const updateTask = await TasksController.update(
			taskId,
			taskname,
			context
		);

		return updateTask;
	}

	private async getAllTask() {
		const resulst = await TasksController.getAllTask();

		return resulst;
	}
}
