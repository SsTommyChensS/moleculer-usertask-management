import { Service, ServiceBroker } from "moleculer";

import { signindto } from "../src/users/dto/signin.dto";
import { signupdto } from "../src/users/dto/signup.dto";
import { UsersController } from "../src/users/users.controller";
import { updateProfileDto } from "./../src/users/dto/updateprofile.dto";

export default class UsersService extends Service {
	// @ts-ignore
	public constructor(public broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "user",

			settings: {},

			hooks: {},

			actions: {
				getAllUser: {
					handler: this.getAllUser,
				},

				signup: {
					params: {
						username: { type: "string", optional: true },
						password: { type: "string", min: 6, optional: true },
						address: "string",
					},
					handler: this.signup,
				},

				signin: {
					params: {
						username: { type: "string", optional: true },
						password: { type: "string", optional: true },
					},
					handler: this.signin,
				},

				updateProfile: {
					params: {
						_id: { type: "string", optional: true },
						address: { type: "string", optional: false },
					},
					handler: this.updateProfile,
				},

				checkIdUser: {
					handler: this.getcheckIdUser,
				},

				verifyToken: {
					handler: this.verifyToken,
				},
			},

			events: {},

			methods: {},
			dependencies: ["gateway"],
		});
	}

	public async getcheckIdUser(ctx: any) {
		const { userId } = ctx.params;

		const checkId = await UsersController.checkIdUser(userId);

		return checkId;
	}

	private async signin(ctx: any) {
		const { username, password }: signindto = ctx.params;

		await this.broker.emit("user.signin", ctx.params, [
			"userTaskManagement",
		]);

		const signined = await UsersController.signin(username, password);

		return signined;
	}

	private async signup(ctx: any) {
		const { username, password, address }: signupdto = ctx.params;

		const created = await UsersController.signup(
			username,
			password,
			address
		);

		return created;
	}

	private async verifyToken(ctx: any) {
		const { token } = ctx.params;

		const verify = UsersController.verifyToken(token);

		return verify;
	}

	private async updateProfile(ctx: any) {
		const { _id, address }: updateProfileDto = ctx.params;

		const updatedUser = await UsersController.update(_id, address);

		return updatedUser;
	}

	private async getAllUser() {
		const listusers = await UsersController.getAllUser();

		return listusers;
	}
}
