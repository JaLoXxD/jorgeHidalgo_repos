import { Sequelize, DataTypes } from 'sequelize-cockroachdb';

export class RepositoryModel{
    constructor(private _sequelize:Sequelize){}
    
    buildModel(){
        const repositoryModel = this._sequelize.define('repository',{
            id_repository:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name:{
                type:DataTypes.STRING(50),
                allowNull: false,
            },
            state:{
                type: DataTypes.ENUM('E','D','A'),
                allowNull: false,
            },
            create_time:{
                type: DataTypes.DATE,
                allowNull: false,
            },
            status:{
                type: DataTypes.ENUM('A','I'),
                allowNull: false,
            }
        });
        return repositoryModel;
    }
};

