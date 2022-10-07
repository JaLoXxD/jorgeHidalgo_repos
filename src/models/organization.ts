import { Sequelize, DataTypes } from 'sequelize-cockroachdb';

export class OrganizationModel{
    constructor(private _sequelize:Sequelize){}
    
    buildModel(){
        const organizationModel = this._sequelize.define('organization',{
            id_organization:{
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
        return organizationModel;
    }
};

