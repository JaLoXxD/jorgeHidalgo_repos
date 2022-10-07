import { Model, ModelStatic } from 'sequelize-cockroachdb';

export class RepositoryController{
    constructor(private _repositoryModel: ModelStatic<Model>){}

    createRepositories(){
        this._repositoryModel.create({
            name:'test',
            state:'D',
            create_time:new Date(),
            status:'A'
        })
    }
}