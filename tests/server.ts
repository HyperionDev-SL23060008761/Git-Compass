//External Imports
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

//Internal Imports
import vercelMockData from "./mock_data/vercel.json";

//Set up Mock Handlers
const handlers = [
	http.get("https://api-gitcompass.jacknytely.com/user", () => {
		//respond with a successful response with Mock Data
		return HttpResponse.json(vercelMockData);
	}),
	http.get("https://api-gitcompass.jacknytely.com/users", () => {
		//respond with a successful response with Mock Data
		return HttpResponse.json([vercelMockData]);
	}),
];

//Setup and Export the Server
export const server = setupServer(...handlers);

//Start Server when starting Tests
export function startTest() {
	server.listen(); // Start the server
}

//Stop Server when Stopping Tests
export function stopTest() {
	server.close(); // Close the server
}
