//External Imports
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import { UserData } from "../types/types";

//Internal Imports
import SearchBar from "../components/SearchBar";
import findUsers from "../api/findUsers";
import UserItem from "../components/UserItem";

//Setup the Page
export default function Home() {
	//Setup the State
	const [users, setUsers] = useState<Array<UserData> | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	//Handle Search Events
	async function handleSearch(searchTerm: string) {
		//Reset the User List
		setUsers(null);

		//Reset the Error State
		setError(null);

		//Get the User List from the API
		const data = await findUsers(searchTerm);

		//Check if the Data is a type of Error and save the Error in the State
		if (data instanceof Error) setError(data);

		//Check if the Data is not a type of Error and save the Data in the State
		if (!(data instanceof Error)) setUsers(data);

		//Mark the Loading as Complete
		return setIsLoading(false);
	}

	//Handle Change Events
	async function handleChange(value: string) {
		//Update the Loading State
		if (!isLoading) setIsLoading(true);
	}

	//Return the Page's Content
	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-20">
			<header className="text-center mb-10">
				<h1 className="text-6xl font-bold text-purple-400">Git Compass</h1>
			</header>
			<main className="relative">
				<SearchBar onSearch={handleSearch} onChange={handleChange} />
				{isLoading && (
					<div className="absolute top-[110%] p-6 bg-gray-800 rounded-lg shadow-lg w-full h-2 flex justify-center items-center">
						<PuffLoader color="#2563eb" id="loader" size={40} />
					</div>
				)}

				{!isLoading && error && <p>Error fetching data: {error.message}</p>}
				{!isLoading && users && (
					<div className="absolute top-[110%] bg-gray-800 rounded-lg shadow-lg w-full min-h-2 flex flex-col max-h-[30vh] overflow-y-scroll">
						{users.map(user => (
							<UserItem user={user} />
						))}
					</div>
				)}
			</main>
		</div>
	);
}
