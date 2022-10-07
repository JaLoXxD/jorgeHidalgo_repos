import * as express from "express";
import { Express /*,  Request, Response  */ } from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { Database } from "./database";
import { OrganizationModel } from "../models/organization";
import { Sequelize } from "sequelize-cockroachdb";
import { TribeModel } from "../models/tribe";
import { RepositoryModel } from '../models/repository';
import { MetricsModel } from '../models/metrics';

export class Server {
	private _port: string | number;
	private _app: Express = express();
	private _database: Database = new Database();
	private _organizationModel: OrganizationModel;
	private _tribeModel: TribeModel;
    private _repositoryModel: RepositoryModel;
    private _metricsModel: MetricsModel;

	constructor() {}

	private _setMiddlewares() {
		dotenv.config();
		this._app.use(bodyParser.json());
		this._app.use(bodyParser.urlencoded({ extended: true }));
	}

	private _setPort() {
		this._port = process.env.API_PORT || 8080;
		this._app.set("port", this._port);
	}

	private _buildModels(sequelize: Sequelize) {
		this._organizationModel = new OrganizationModel(sequelize);
		const organization = this._organizationModel.buildModel();
		this._tribeModel = new TribeModel(sequelize);
		const tribe = this._tribeModel.buildModel();
        this._repositoryModel = new RepositoryModel(sequelize);
        const repository = this._repositoryModel.buildModel();
        this._metricsModel = new MetricsModel(sequelize);
        const metrics = this._metricsModel.buildModel();
        /* RELATIONSHIP */
		organization.hasMany(tribe);
        tribe.hasMany(repository);
        repository.hasMany(metrics);
        console.log(typeof organization)
	}

	startServer() {
		this._setMiddlewares();
		this._setPort();
		this._database.startConnection();
		this._buildModels(this._database.client);
		this._app.listen(this._app.get("port"), () => {
			console.log(`Server listening on port ${this._app.get("port")}`);
		});
		this._database.client.sync({ force: true });
	}
}
