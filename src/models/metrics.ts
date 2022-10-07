import { Sequelize, DataTypes } from 'sequelize-cockroachdb';

export class MetricsModel{

    constructor(private _sequelize:Sequelize){}
    
    buildModel(){
        const metricsModel = this._sequelize.define('metrics',{
            id_repository:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            coverage:{
                type:DataTypes.DOUBLE,
                allowNull: false,
            },
            bugs:{
                type:DataTypes.INTEGER,
                allowNull: false,
            },
            vulnerabilities:{
                type:DataTypes.INTEGER,
                allowNull: false,
            },
            hotspot:{
                type:DataTypes.INTEGER,
                allowNull: false,
            },
            code_smells:{
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        });
        return metricsModel;
    }
};

