import { Request, Response } from "express";
import { organizationModel } from "../models/organization";
import { tribeModel } from "../models/tribe";
import { repositoryModel } from "../models/repository";
import { createTribe, createTribeBody } from "./tribe";
import { createRepository, createRepositoryBody } from "./repository";
import { createMetrics } from "./metrics";
import { metricsModel } from "../models/metrics";

export interface createOrganizationBody {
	id_organization?: number;
	name: string;
	status: number;
}

export interface createBody {
	organization: createOrganizationBody;
	tribe: createTribeBody;
	repositories: Array<createRepositoryBody>;
}

const createOrganization = async (req: Request, res: Response) => {
	try {
		const { organization, tribe, repositories }: createBody = req.body;
		const newOrganization = await organizationModel.create({
			...organization,
		});

		await newOrganization.save();

		const savedOrganization = await newOrganization.get();

		const newTribe = await createTribe(savedOrganization.id_organization, tribe, res);

		const newRepositories = [];

		let newMetrics;

		for (const repository of repositories) {
			if (!repository.create_time) {
				repository.create_time = new Date();
			}
			const newRepository = await createRepository(newTribe.id_tribe, repository, res);
			newRepositories.push(newRepository);
			newMetrics = await createMetrics(newRepository.id_repository, repository.metrics, res);
		}

		return res.status(200).json({
			success: true,
			message: "Organization created successfully.",
			organization: { organization: savedOrganization, tribe: newTribe, repository: newRepositories, metrics: newMetrics },
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "An error was ocurred creating the organization.",
			err,
		});
	}
};

const getOrganizations = async (req: Request, res: Response) => {
	try {
		const organizations = await organizationModel.findAll({
			include: [{ model: tribeModel, include: [{ model: repositoryModel, include: [{ model: metricsModel }] }] }],
		});
		return res.status(200).json({
			success: true,
			message: "Organizations obtained successfully.",
			organizations,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "An error was ocurred getting the organizations.",
			err,
		});
	}
};

const updateOrganization = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, status }: createOrganizationBody = req.body;
		const updatedOrganization = await organizationModel.update(
			{
				name,
				status,
			},
			{
				where: { id_organization: id },
				returning: true,
			}
		);
		return res.status(200).json({
			success: true,
			message: "Organization updated successfully.",
			updatedOrganization,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "An error ocurred updating the organization.",
			err,
		});
	}
};

const deleteOrganization = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await organizationModel.destroy({
			where: { id_organization: id },
		});
		return res.status(200).json({
			success: true,
			message: "Organization deleted successfully.",
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "An error ocurred deleting the organization.",
			err,
		});
	}
};

export { createOrganization, getOrganizations, updateOrganization, deleteOrganization };
