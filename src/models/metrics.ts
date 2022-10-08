import { DataTypes, ModelStatic, Model } from "sequelize-cockroachdb";
import { client } from "../config/database";

export const metricsModel: ModelStatic<Model> = client.define(
	"metrics",
	{
		id_repository: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		coverage: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		bugs: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		vulnerabilities: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		hotspot: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		code_smells: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{ createdAt: false, updatedAt: false }
);
