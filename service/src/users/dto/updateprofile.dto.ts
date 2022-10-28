import { mongoose } from "mongoose";
export class updateProfileDto {
	_id: mongoose.Types.ObjectId;
	username?: string;
	address: string;
}
