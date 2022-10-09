import request from "supertest";
import { Server } from "../src/config/server";
import { client } from "../src/config/database";

describe("task 3 tests", () => {
	const app = new Server();
	beforeAll(async () => {
		await client.sync({ force: false });
		await client.authenticate();
        jest.setTimeout(30000);
	});

	it("should return an error if the tribe doesn't have repositories that  ", async () => {
		const req = await request(app.startTestingServer()).get("/api/v1/metrics/803459643706867713");
		expect(req.statusCode).toBe(500);
		expect(req.body.success).toEqual(false);
		expect(req.body.message).toEqual("The tribe doesn't have repositories that meet the necessary coverage");
	});

	it("should return an array of repositories", async () => {
		const req = await request(app.startTestingServer()).get("/api/v1/metrics/803475886793883650");
		expect(req.statusCode).toBe(200);
		expect(req.body.success).toEqual(true);
		expect(req.body.message).toEqual("Metrics obtained successfully.");
		expect(req.body).toHaveProperty("repositories");
	});

	it("should return an erroy if the tribe is not registered", async () => {
		const req = await request(app.startTestingServer()).get("/api/v1/metrics/512");
		console.log(req.body);
		expect(req.statusCode).toBe(400);
		expect(req.body.success).toEqual(false);
		expect(req.body.message).toEqual("The tribe is not registered");
	});
});
