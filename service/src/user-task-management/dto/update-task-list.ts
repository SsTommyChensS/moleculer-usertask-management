import mongoose from "mongoose";
export class setTaskListDto {
	userId: mongoose.Types.ObjectId;
	taskId: mongoose.Types.ObjectId;
	status: string;
}
