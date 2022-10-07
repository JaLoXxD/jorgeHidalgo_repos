import { Sequelize } from "sequelize-cockroachdb";
import * as dotenv from "dotenv";

dotenv.config();
export const client: Sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false });
export class Database {
	async startConnection() {
		try {
			await client.authenticate();
			console.log("database connected...");
		} catch (error) {
			console.log("connection error...");
		}
	}
}
