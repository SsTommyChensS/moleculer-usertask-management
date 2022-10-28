import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot("mongodb://localhost:27017/neox"),
	],
})
export class AppModule {}
