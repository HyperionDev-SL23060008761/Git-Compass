/* eslint-disable @typescript-eslint/no-explicit-any */
//External Imports
import { UserData } from "../types/types";

//Setup the API URL
const apiURL = "https://api-gitcompass.jacknytely.com/user";

//Finds a User from the API
export default async function findUsers(username: string): Promise<UserData | Error> {
	//Setup the Full URL
	const url = `${apiURL}?username=${username}`;

	//Fetch the Data from the API
	const response = await fetch(url).catch(error => new Error(error.message));

	//Check if the Response is a Type of Error
	if (response instanceof Error) return response;

	//Check if the Data Fetch Failed
	if (!response.ok) return new Error(response.status.toString());

	//Get the Data from the Response
	const data = await response.json();

	//Check if the Data is not Valid
	if (!data) return new Error("Requested User could not be Found");

	//Setup the User
	const user = data as UserData;

	//Return the User
	return user;
}
