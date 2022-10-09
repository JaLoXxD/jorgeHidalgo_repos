import { Request, Response } from "express";
import { repositoryModel } from "../models/repository";
import { createMockTribe } from "./tribe";
import { createMetricsBody } from "./metrics";
import { Op } from "sequelize-cockroachdb";

//MOCK DATA
const repositories: Array<createRepositoryBody> = [
	{
		id_repository: 1,
		name: "cd-common-utils",
		state: "E",
		status: "A",
	},
	{
		id_repository: 2,
		name: "cd-common-text",
		state: "D",
		status: "I",
	},
	{
		id_repository: 3,
		name: "cd-common-test",
		state: "A",
		status: "A",
	},
];

export interface createRepositoryBody {
	id_repository?: number;
	name: string;
	state: "E" | "D" | "A";
	create_time?: Date;
	status: "A" | "I";
	metrics?: createMetricsBody;
}

const stateEnum = {
	E: 604,
	D: 605,
	A: 606,
};

const createRepository = async (tribeId: number, body: createRepositoryBody, res: Response) => {
	try {
		const newRepository = await repositoryModel.create({
			name: body.name,
			state: body.state,
			create_time: body.create_time,
			status: body.status,
			id_tribe: tribeId,
		});
		await newRepository.save();
		const savedRepository = await newRepository.get();
		return savedRepository;
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "An error ocurred in the repository creation.",
			err,
		});
	}
};

const mockRepositories = async (req: Request, res: Response) => {
	try {
		const reposData = await repositoryModel.findAll({
			where: {
				[Op.or]: [{ id_repository: 1 }, { id_repository: 2 }, { id_repository: 3 }],
			},
			attributes: [["id_repository", "id"], "state"],
			replacements: ["D"],
		});

		const reposMock = reposData.map((repo) => {
			const repoData = repo.get();
			return { ...repoData, state: stateEnum[repoData.state] };
		});

		return res.status(200).json({
			success: true,
			message: "Mock obtained successfully.",
			repositories: reposMock,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "An error ocurred getting the repositories mock.",
			err,
		});
	}
};

const createMockRepositories = async (req: Request, res: Response) => {
	try {
		const mockTribe = await createMockTribe(res);
		for (const repository of repositories) {
			repositoryModel.create({
				...repository,
				create_time: new Date(),
				id_tribe: mockTribe.id_tribe,
			});
		}
		res.status(200).json({
			success: true,
			message: "Mock data created successfully",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: "An error ocurred creating the mock data.",
			err,
		});
	}
};

export { createRepository, mockRepositories, createMockRepositories };
