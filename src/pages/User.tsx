//External Imports
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import { FaStar } from "react-icons/fa";
import { UserData } from "../types/interfaces/UserData";

//Internal Imports
import findUser from "../api/findUser";

//Setup the Page
export default function UserPage() {
	//Setup the State
	const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [username, setUsername] = useState<string>(
		new URLSearchParams(window.location.search).get("username") as string
	);

	//Check if there is no User and the app is not loading or has not errored
	if (!selectedUser && !isLoading && !error) updateUser();

	//Finds the User from the username query paremeter and update's the details in the state
	async function updateUser() {
		//Check if no Username was provided and send the user back to the home page
		if (!username) return (window.location.href = "/");

		//Update the Loading State
		setIsLoading(true);

		//Reset the User
		setSelectedUser(null);

		//Reset the Error State
		setError(null);

		//Get the User from the API
		const data = await findUser(username);

		//Check if the Data is a type of Error and save the Error in the State
		if (data instanceof Error) setError(data);

		//Check if the Data is not a type of Error and save the Data in the State
		if (!(data instanceof Error)) setSelectedUser(data);

		//Mark the Loading as Complete
		return setIsLoading(false);
	}

	//Setup the Loader
	const loader = <PuffLoader color="#ffffff" size={24}></PuffLoader>;

	//Return the Page's Content
	return (
		<div className="bg-gray-950 text-gray-50 min-h-screen flex flex-col">
			{/*Setup the Header*/}
			<header className="bg-[#6B46C1] px-4 py-6 flex items-center gap-4">
				{/*Setup the Avatar*/}
				{selectedUser && (
					<img
						alt={selectedUser?.login}
						src={selectedUser?.avatar_url}
						className="aspect-square h-12 rounded-full"
					/>
				)}

				{/*Setup the Loader*/}
				{isLoading && loader}

				{/*Setup the User's Name*/}
				<div className="text-lg font-semibold">{selectedUser?.login || username}</div>
			</header>

			{/*Setup the Body if no Error has Ocurred*/}
			{!error && (
				<main className="flex-1 px-4 py-8 grid gap-8">
					{/*Setup the Profile URL Section*/}
					<div className="grid gap-2">
						<div className="text-sm text-gray-400">Profile URL</div>
						<a className="text-[#A78BFA] hover:underline" href={selectedUser?.html_url}>
							{selectedUser?.html_url}
						</a>

						{/*Setup the Loader*/}
						{isLoading && loader}
					</div>
					{/*Setup the Profile Statistics Section*/}
					<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
						{/*Setup the Follower Details*/}
						<div className="bg-[#1F2937] rounded-lg p-4 flex flex-col gap-2">
							<div className="text-sm text-gray-400">Followers</div>
							<div className="text-2xl font-semibold">{selectedUser?.followers}</div>

							{/*Setup the Loader*/}
							{isLoading && loader}
						</div>

						{/*Setup the Following Details*/}
						<div className="bg-[#1F2937] rounded-lg p-4 flex flex-col gap-2">
							<div className="text-sm text-gray-400">Following</div>
							<div className="text-2xl font-semibold">{selectedUser?.following}</div>

							{/*Setup the Loader*/}
							{isLoading && loader}
						</div>

						{/*Setup the Gist Details*/}
						<div className="bg-[#1F2937] rounded-lg p-4 flex flex-col gap-2">
							<div className="text-sm text-gray-400">Gists</div>
							<div className="text-2xl font-semibold">{selectedUser?.public_gists}</div>

							{/*Setup the Loader*/}
							{isLoading && loader}
						</div>

						{/*Setup the Repo Details*/}
						<div className="bg-[#1F2937] rounded-lg p-4 flex flex-col gap-2">
							<div className="text-sm text-gray-400">Repos</div>
							<div className="text-2xl font-semibold">{selectedUser?.public_repos}</div>

							{/*Setup the Loader*/}
							{isLoading && loader}
						</div>
					</div>

					{/*Setup the Profile Organizations Section*/}
					<div className="grid gap-4">
						<div className="text-sm text-gray-400">Organizations</div>

						{/*Setup the List of Organizations*/}
						<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{/*Loop through the List of Organizations*/}
							{selectedUser?.organizations &&
								selectedUser.organizations.map(organization => (
									<div
										className="bg-[#1F2937] rounded-lg p-4 flex items-center gap-3 hover:bg-[#1F2937]/80 cursor-pointer"
										onClick={event =>
											(window.location.href = `/user?username=${organization.login}`)
										}
									>
										{/*Setup the Current Organization's Image*/}
										<img
											alt="Organization Logo"
											className="rounded-full"
											height={32}
											src={organization.avatar_url}
											style={{
												aspectRatio: "32/32",
												objectFit: "cover",
											}}
											width={32}
										/>

										{/*Setup the Current Organization's Name*/}
										<div className="text-sm font-medium">{organization.login}</div>
									</div>
								))}

							{/*Setup the Loader*/}
							{isLoading && loader}
						</div>
					</div>

					{/*Setup the Profile Repositories Section*/}
					<div className="grid gap-4">
						<div className="text-sm text-gray-400">Repositories</div>

						{/*Setup the List of Repositories*/}
						<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{/*Loop through the List of Repositories*/}
							{selectedUser?.repositories &&
								selectedUser.repositories.map(repository => (
									<div
										className="bg-[#1F2937] rounded-lg p-4 flex flex-col gap-2 hover:bg-[#1F2937]/80 cursor-pointer"
										onClick={event => (window.location.href = repository.html_url)}
									>
										{/*Setup the Current Repository's Name*/}
										<div className="text-sm font-medium">{repository.name}</div>

										{/*Setup the Current Repository's Description*/}
										<div className="text-xs text-gray-400">{repository.description}</div>

										{/*Setup the Current Repository's Start Count*/}
										<div className="flex items-center gap-2 text-xs text-[#A78BFA]">
											<FaStar className="h-4 w-4" />
											<span>{repository.stargazers_count}</span>
										</div>
									</div>
								))}

							{/*Setup the Loader*/}
							{isLoading && loader}
						</div>
					</div>
				</main>
			)}

			{/*Setup the Error Message*/}
			{error && (
				<div className="w-full h-full flex flex-col justify-center items-center">
					<p className="text-4xl text-red-500 font-bold">An Error has Ocurred</p>
					<p className="text-lg text-red-400/50 font-bold">{error.message}</p>
				</div>
			)}
		</div>
	);
}
