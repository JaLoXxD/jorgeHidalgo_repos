import { DataTypes, ModelStatic, Model } from "sequelize-cockroachdb";
import { client } from "../config/database";

export const organizationModel: ModelStatic<Model> = client.define(
	"organization",
	{
		id_organization: {
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
	{ tableName: "organizations", createdAt: false, updatedAt: false }
);
