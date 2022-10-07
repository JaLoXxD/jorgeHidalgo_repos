import { DataTypes } from "sequelize-cockroachdb";
import { client } from "../config/database";

export const repositoryModel = client.define("repository", {
	id_repository: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},
	state: {
		type: DataTypes.ENUM("E", "D", "A"),
		allowNull: false,
	},
	create_time: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	status: {
		type: DataTypes.ENUM("A", "I"),
		allowNull: false,
	},
});
