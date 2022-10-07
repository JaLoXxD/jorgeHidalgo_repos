import {Sequelize} from "sequelize-cockroachdb";

export class Database{
    private _client: Sequelize;

    async startConnection(){
        try {
            this._client = new Sequelize(process.env.DATABASE_URL);
            console.log('database connected...');
        } catch (error) {
            console.log('connection error...');
        }
    }
    
    public get client() : Sequelize {
        return this._client;
    }
    
}