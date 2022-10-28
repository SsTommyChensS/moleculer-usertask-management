import mongoose from "mongoose";

export class updateTaskListDto {
	_id: mongoose.Types.ObjectId;
	status: string;
}
