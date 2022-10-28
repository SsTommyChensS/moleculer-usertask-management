import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
	@Prop({ type: String, required: true })
	public taskId: string;

	@Prop({ type: String, required: true })
	public taskname: string;

	@Prop({ type: String, required: true })
	public context: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
