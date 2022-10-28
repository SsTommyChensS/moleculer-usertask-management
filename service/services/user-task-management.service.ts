import { Service, ServiceBroker } from "moleculer";

import { TasksManagementController } from "../src/user-task-management/tasksmanager.controller";
import { updateTaskListDto } from "./../src/user-task-management/dto/set-task-list.dto";
import { setTaskListDto } from "./../src/user-task-management/dto/update-task-list";

export default class UserTaskManagementService extends Service {
	// @ts-ignore
	public constructor(public broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "user-task-management",

			settings: {},

			hooks: {
				before: {
					create: [this.hookCheckTaskUser],
					"*": [this.hookCheckRole],
				},
			},

			actions: {
				create: {
					params: {
						taskId: { type: "string", optional: true },
						userId: { type: "string", optional: true },
						status: { type: "string", optional: true },
					},

					handler: this.createTaskforUser,
				},

				updateTaskList: {
					params: {
						_id: { type: "string", optional: true },
						status: { type: "string", optional: true },
					},

					handler: this.updateTaskList,
				},

				getTaskList: {
					params: {
						id: { type: "string", optional: true },
					},

					handler: this.getTasksListbyUserId,
				},

				getAllTask: {
					params: {
						page: { type: "number", optional: false },
					},

					handler: this.getAllTask,
				},
			},

			events: {
				"user.signin": {
					params: {
						username: "string",
						password: "string",
					},
					async handler(ctx: any) {
						console.log();

						this.logger.info(
							`User --> ${ctx.params.username} <-- Sign In In System`
						);
					},
				},
			},

			methods: {},

			dependencies: ["gateway"],
		});
	}

	public async hookCheckTaskUser(ctx: any): Promise<void> {
		const { taskId, userId, status }: setTaskListDto = ctx.params;

		const checkUser: boolean = await this.broker.call(
			"user.checkIdUser",
			ctx.params
		);

		const checkTask = await this.broker.call(
			"task.checkIdTask",
			ctx.params
		);

		if (checkUser === false || checkTask === false) {
			throw new Error("User or Task exits");
		}
	}

	public async createTaskforUser(ctx: any) {
		const { taskId, userId, status }: setTaskListDto = ctx.params;

		const create = await TasksManagementController.createTaskforUser(
			taskId,
			userId,
			status
		);

		return create;
	}

	public async updateTaskList(ctx: any) {
		const { _id, status }: updateTaskListDto = ctx.params;

		const update = await TasksManagementController.setTaskforUser(
			_id,
			status
		);

		return update;
	}

	public async getTasksListbyUserId(ctx: any) {
		const { userId } = ctx.params;

		const listTask = await TasksManagementController.getTasksListbyUserId(
			userId
		);

		return listTask;
	}

	public async getAllTask(ctx: any) {
		const { page } = ctx.params;

		const result = await TasksManagementController.getAllTask(page);

		return result;
	}

	public async hookCheckRole(ctx: any): Promise<void> {
		const { role } = ctx.meta.user;

		if (role !== "admin") {
			throw new Error("You must have <admin> role");
		}
	}

	public async checkDbDuplicate(ctx: any) {
		const { userId, taskId } = ctx.params;

		const result = await TasksManagementController.checkDbduplicate(
			userId,
			taskId
		);

		if (result == true) {
			throw new Error("Value have existed");
		}
	}
}
