import { Response } from "express";
import { tribeModel } from "../models/tribe";

export interface createTribeBody {
	name: string;
	status: number;
}

//MOCK DATA
const mockTribe = {
	id_tribe: 1,
	name: "Centro Digital",
	status: 2,
};

const createTribe = async (organizationId: number, body: createTribeBody, res: Response) => {
	try {
		const newTribe = await tribeModel.create({
			name: body.name,
			status: body.status,
			id_organization: organizationId,
		});
		await newTribe.save();
		const savedTribe = await newTribe.get();
		return savedTribe;
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "An error ocurred creating the tribe.",
			err: err,
		});
	}
};

const createMockTribe = async (res: Response) => {
	try {
		const newTribe = await tribeModel.create({
			...mockTribe,
		});

		await newTribe.save();

		const savedTribe = await newTribe.get();

		return savedTribe;
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "An error ocurred in the mock creation.",
		});
	}
};

export { createTribe, createMockTribe };
