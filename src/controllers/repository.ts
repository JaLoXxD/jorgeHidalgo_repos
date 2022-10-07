import { Request, Response } from "express";
import { repositoryModel } from "../models/repository";

//MOCK DATA
const repositories = [
	{
		id: 1,
		state: 604,
	},
	{
		id: 2,
		state: 605,
	},
	{
		id: 3,
		state: 606,
	},
];

const createRepositories = async (req: Request, res: Response) => {
	try {
		await repositoryModel.create({
			name: "test",
			state: "D",
			create_time: new Date(),
			status: "A",
		});
		return res.status(200).json({
			success: true,
			message: "Repository created successfully.",
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "An error was ocurred in the repository creation.",
			err,
		});
	}
};

const mockRepositories = async (req: Request, res: Response) => {
	try {
		return res.status(200).json({
			success: true,
			message: "Mock obtained successfully.",
			repositories,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "An error was ocurred getting the repositories mock.",
			err,
		});
	}
};

export { createRepositories, mockRepositories };
