import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true, unique: true })
	public username: string;

	@Prop({ required: true })
	public password: string;

	@Prop({ default: "" })
	public refreshToken: string;

	@Prop()
	public address: string;

	@Prop({ default: "user" })
	public role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
