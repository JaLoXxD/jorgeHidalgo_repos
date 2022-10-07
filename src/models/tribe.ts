import { Sequelize, DataTypes } from 'sequelize-cockroachdb';

export class TribeModel{

    constructor(private _sequelize:Sequelize){}
    
    buildModel(){
        const tribeModel = this._sequelize.define('tribe',{
            id_tribe:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name:{
                type:DataTypes.STRING(50),
                allowNull: false,
            },
            status:{
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        });
        return tribeModel;
    }
};

