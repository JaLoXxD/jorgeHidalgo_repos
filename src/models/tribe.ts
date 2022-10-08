import { DataTypes, ModelStatic, Model } from "sequelize-cockroachdb";
import { client } from "../config/database";

export const tribeModel: ModelStatic<Model> = client.define(
	"tribe",
	{
		id_tribe: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{ createdAt: false, updatedAt: false }
);
