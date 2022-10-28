import { mongoose } from "mongoose";
export class updateTaskDto {
	taskId: mongoose.Types.ObjectId;
	taskname?: string;
	context?: string;
}
