//Internal Imports
import { expect, describe, it, beforeAll, afterEach, afterAll } from "vitest";
import findUsers from "../../src/api/findUsers";
import { server } from "../server";

//Start the server before running any test
beforeAll(() => server.listen());

//Reset the handlers after each test
afterEach(() => server.resetHandlers());

//Close the server after all the tests are completed
afterAll(() => server.close());

//Start testing the findUser function
describe("findUsers", () => {
	//Test the API to fetch data successfully
	it("fetches data successfully", async () => {
		//Fetch data for the User "Vercel"
		const data = await findUsers("vercel");

		//Check if the Data is an instance of error and fail the test
		if (data instanceof Error) throw new Error(`Error fetching data: ${data.message}`);

		//Test to see if the data has a correct login
		expect(data.length).toBeGreaterThan(0);
	});
});
