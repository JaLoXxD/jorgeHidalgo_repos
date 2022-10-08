import { NextFunction, Request, Response } from "express";
import { tribeModel } from "../models/tribe";

const checkIfTribeExists = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const tribe = await tribeModel.findOne({ where: { id_tribe: id } });
	if (!tribe) {
		return res.status(400).json({
			success: false,
			message: "The tribe is not registered",
		});
	}
	return next();
};

export { checkIfTribeExists };
