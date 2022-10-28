import { NestFactory } from "@nestjs/core";
import { AppModule } from "./main.module";

export async function bootrap() {
	await NestFactory.create(AppModule);
}

bootrap();