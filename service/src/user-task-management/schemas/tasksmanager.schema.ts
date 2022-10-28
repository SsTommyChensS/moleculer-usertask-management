import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import mongoose from "mongoose";

export type TasksManagementDocument = TasksManagement & Document;

@Schema({ timestamps: true })
export class TasksManagement {
	@Prop({ type: String, required: true })
	public taskId: mongoose.Types.ObjectId;

	@Prop({ type: String, required: true })
	public userId: mongoose.Types.ObjectId;

	@Prop({ type: String, required: true })
	public status: string;
}

export const TasksManagementSchema =
	SchemaFactory.createForClass(TasksManagement);
