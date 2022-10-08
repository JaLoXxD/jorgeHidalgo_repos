import { Request, Response } from "express";
import { stateEnum, verificationStateEnum } from "../data/constants";
import { metricsModel, tribeModel, repositoryModel, organizationModel } from "../models/index";
import { Parser } from "json2csv";
import { Op } from "sequelize-cockroachdb";

export interface createMetricsBody {
	coverage: number;
	bugs: number;
	vulnerabilities: number;
	hotspot: number;
	code_smells: number;
}

const repositoriesData = async (id: string) => {
	const metrics = await tribeModel.findAll({
		where: {
			id_tribe: id,
		},
		attributes: { exclude: ["id_tribe", "status", "id_organization"] },
		include: [
			{ model: organizationModel },
			{
				model: repositoryModel,
				where: {
					status: {
						[Op.eq]: "A",
					},
					create_time: {
						[Op.gte]: new Date(`${new Date().getFullYear()}-01-01T00:00:00`),
					},
				},
				attributes: ["name", ["status", "verificationState"], "state"],
				include: [
					{
						model: metricsModel,
						where: {
							coverage: {
								[Op.gte]: 75,
							},
						},
					},
				],
			},
		],
	});
	const repos = metrics.map((repo) => {
		const plainData = repo.get({ plain: true });
		const repoData = [];

		for (const repository of plainData.repositories) {
			console.log(repository);
			const repoInfo = {
				id: repository.metric.id_repository,
				...repository,
				tribe: plainData.name,
				organization: plainData.organization.name,
				verificationState: verificationStateEnum[repository.verificationState],
				state: stateEnum[repository.verificationState],
				...repository.metric,
				coverage: `${repository.metric.coverage}%`,
			};
			delete repoInfo.metric;
			delete repoInfo.id_repository;
			repoData.push(repoInfo);
		}
		return repoData;
	});
	return repos[0];
};

const createMetrics = async (repositoryId: number, body: createMetricsBody, res: Response) => {
	try {
		const newMetrics = await metricsModel.create({
			id_repository: repositoryId,
			...body,
		});
		await newMetrics.save();
		return newMetrics.get();
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "An error ocurred creating the metrics",
			err,
		});
	}
};

const findMetricsByTribe = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const repos = await repositoriesData(id);
		if (!repos) {
			return res.status(500).json({
				success: false,
				message: "The tribe doesn't have repositories that meet the necessary coverage",
			});
		}
		return res.status(200).json({
			success: true,
			message: "Metrics obtained successfully.",
			repositories: repos,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "An error ocurred finding the metrics.",
		});
	}
};

const generateCsv = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const repos = await repositoriesData(id);

		if (!repos) {
			return res.status(500).json({
				success: false,
				message: "The tribe doesn't have repositories that meet the necessary necessary coverage",
			});
		}

		const csvParse = new Parser();
		const csvData = csvParse.parse(repos);

		res.setHeader("Content-Type", "text/csv");
		res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv");

		return res.status(200).end(csvData);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: "An error ocurred finding the metrics.",
		});
	}
};

export { repositoriesData, createMetrics, findMetricsByTribe, generateCsv };
