import * as express from "express";
import { Express /*,  Request, Response  */ } from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { client, Database } from "./database";
import { router } from "../routes/index";

export class Server {
	private _port: string | number;
	private _app: Express = express();
	private _database: Database = new Database();

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

	// private _buildModels(sequelize: Sequelize) {
	//     return new Promise((resolve, reject)=>{
	//         this._organizationModel = new OrganizationModel(sequelize);
	//         const organization = this._organizationModel.buildModel();
	//         this._tribeModel = new TribeModel(sequelize);
	//         const tribe = this._tribeModel.buildModel();
	//         this._repositoryModel = new RepositoryModel(sequelize);
	//         this._repository = this._repositoryModel.buildModel();
	//         this._metricsModel = new MetricsModel(sequelize);
	//         const metrics = this._metricsModel.buildModel();
	//         /* RELATIONSHIP */
	//         organization.hasMany(tribe);
	//         tribe.hasMany(this._repository);
	//         this._repository.hasMany(metrics);
	//         console.log('finish')
	//         resolve(true);
	//     })
	// }

	startServer() {
		this._setMiddlewares();
		this._database.startConnection();
		this._setPort();
		/* this._buildModels(this._database.client).then(()=>{
        }); */ this._app.use(router);
		this._app.listen(this._app.get("port"), () => {
			console.log(`Server listening on port ${this._app.get("port")}`);
		});
		// this._database.client.sync({ force: true });
		client.sync({ force: true });
	}
}
