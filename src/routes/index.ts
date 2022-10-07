import Router from "express-promise-router";
import { createRepositories, mockRepositories } from "../controllers/repository";

export const router = Router();

router.post("/api/v1/repository", createRepositories);
router.get("/api/v1/repository-mock", mockRepositories);
