import Router from "express-promise-router";
import { checkIfTribeExists, checkIfOrganizationExists } from "../middlewares";
import { findMetricsByTribe, generateCsv } from "../controllers/metrics";
import { createOrganization, deleteOrganization, getOrganizations, updateOrganization } from "../controllers/organization";
import { createMockRepositories, mockRepositories } from "../controllers/repository";

export const router = Router();

/* TASK 1 MOCK */
router.post("/api/v1/repository-mock", createMockRepositories);
router.get("/api/v1/repository-mock", mockRepositories);
/* TASK 2 CRUD */
router.get("/api/v1/organization", getOrganizations);
router.post("/api/v1/organization", createOrganization);
router.put("/api/v1/organization/:id", checkIfOrganizationExists, updateOrganization);
router.delete("/api/v1/organization/:id", checkIfOrganizationExists, deleteOrganization);
/* TASK 3 METRICS */
router.get("/api/v1/metrics/:id", checkIfTribeExists, findMetricsByTribe);
/* TASK 4 CSV */
router.get("/api/v1/metrics-csv/:id", generateCsv);
