import { NextFunction, Request, Response } from "express";
import { organizationModel } from "../models/organization";

const checkIfOrganizationExists = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	const organization = await organizationModel.findOne({ where: { id_organization: id } });
	if (!organization) {
		return res.status(400).json({
			success: false,
			message: "The organization is not registered",
		});
	}
	return next();
};

export { checkIfOrganizationExists };
