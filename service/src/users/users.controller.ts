import { Controller } from "@nestjs/common";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

import { UsersHandler } from "./users.handler";

@Controller()
export class UsersController {
	public static usersHandler: UsersHandler;

	public constructor(usersHandler: UsersHandler) {
		UsersController.usersHandler = usersHandler;
	}

	public static signin(username: string, password: string): Promise<string> {
		return UsersController.usersHandler.signin(username, password);
	}

	public static signup(
		username: string,
		password: string,
		address?: string
	): Promise<string> {
		return UsersController.usersHandler.signup(username, password, address);
	}

	public static update(
		_id: mongoose.Types.ObjectId,
		address?: string
	): Promise<string> {
		return UsersController.usersHandler.update(_id, address);
	}

	public static checkIdUser(id: string) {
		return UsersController.usersHandler.checkIdUser(id);
	}

	public static verifyToken(token: string): JwtPayload | string {
		return UsersController.usersHandler.verifyToken(token);
	}

	public static getAllUser() {
		return UsersController.usersHandler.getAllUser();
	}
}
