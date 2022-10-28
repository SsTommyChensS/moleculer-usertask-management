import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { compare, hash } from "bcryptjs";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import mongoose from "mongoose";

import { User, UserSchema } from "./schemas/users.schemas";
import { UserRepository } from "./users.repository";

@Injectable()
export class UsersHandler implements UserRepository {
	public constructor(
		@InjectModel(User.name) private userModel: mongoose.Model<User>
	) {}

	/*public async getUserModel() {
		if (!this.userModel) {
			this.userModel = mongoose.model("user", UserSchema);
		}

		return this.userModel;
	}*/

	public async getUserbyName(username: string): Promise<User> {
		//const model = await this.getUserModel();

		const user = await this.userModel.findOne({ username });

		return user;
	}

	public async signup(
		username: string,
		password: string,
		address?: string
	): Promise<string> {
		//const model = await this.getUserModel();

		const hashPassword = await hash(password, 12);

		const user = await this.userModel.create({
			username,
			password: hashPassword,
			address,
		});

		await user.save();

		return `Sign up ${username} successfully`;
	}

	public async signin(username: string, password: string): Promise<string> {
		const user = await this.getUserbyName(username);

		if (!user) {
			return `User ${username} of password invalid`;
		}

		const checkedPassword = await compare(password, user.password);

		if (!checkedPassword) {
			return "User or password invalid";
		}

		const accessToken = sign(
			{ _id: user.username, role: user.role },
			process.env.SECRET_KEY,
			{ algorithm: "HS256", expiresIn: "24h" }
		);

		return accessToken;
	}

	public async update(
		_id: mongoose.Types.ObjectId,
		address?: string
	): Promise<string> {
		//const model = await this.getUserModel();

		await this.userModel.updateOne({ _id }, { address });

		return `Update user have value {  ${address} }`;
	}

	public async checkIdUser(id: string): Promise<boolean> {
		//const model = await this.getUserModel();

		const checkId = await this.userModel.findById(id);

		if (!checkId) {
			return false;
		}

		return true;
	}

	public async verifyToken(token: string): Promise<JwtPayload | string> {
		const decoded = verify(token, process.env.SECRET_KEY);
		return decoded;
	}

	public async getAllUser(): Promise<User[]> {
		//const model = await this.getUserModel();
		const users = await this.userModel.find();
		return users;
	}
}
