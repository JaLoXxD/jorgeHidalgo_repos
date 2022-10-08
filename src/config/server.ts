import express from "express";
import { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { client, Database } from "./database";
import { router } from "../routes/index";
import { organizationModel, tribeModel } from "../models";
import { repositoryModel } from "../models/repository";
import { metricsModel } from "../models/metrics";

export class Server {
	private _port: string | number;
	private _app: Express = express();
	private _database: Database = new Database();

	constructor() {}

	private _setMiddlewares() {
		dotenv.config();
		this._app.use(cors());
		this._app.use(bodyParser.urlencoded({ extended: true }));
		this._app.use(bodyParser.json());
	}

	private _setPort() {
		this._port = process.env.API_PORT || 8080;
		this._app.set("port", this._port);
	}

	private _createAssociations() {
		organizationModel.hasMany(tribeModel, { foreignKey: "id_organization", onDelete: "CASCADE" });
		tribeModel.belongsTo(organizationModel, { foreignKey: "id_organization", onDelete: "CASCADE" });
		tribeModel.hasMany(repositoryModel, { foreignKey: "id_tribe", onDelete: "CASCADE" });
		repositoryModel.belongsTo(tribeModel, { foreignKey: "id_tribe", onDelete: "CASCADE" });
		repositoryModel.hasOne(metricsModel, { foreignKey: "id_repository", onDelete: "CASCADE" });
		metricsModel.belongsTo(repositoryModel, { foreignKey: "id_repository", onDelete: "CASCADE" });
	}

	startTestingServer() {
		this._setMiddlewares();
		this._createAssociations();
		this._app.use(router);
		return this._app;
	}

	startServer() {
		this._setMiddlewares();
		this._database.startConnection();
		this._setPort();
		this._app.use(router);
		this._createAssociations();
		client.sync({ force: false });
		this._app.listen(this._app.get("port"), () => {
			console.log(`Server listening on port ${this._app.get("port")}`);
		});
	}
}
