//External Imports
import React, { useState } from "react";

//Internal Imports
import { SearchBarProps } from "../types/types";

//Setup the Component
export default function SearchBar({ onSearch, onChange }: SearchBarProps) {
	//Setup the Search Term State
	const [searchTerm, setSearchTerm] = useState<string>("");

	//Setup the Last Input Time State
	const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>();

	//Handles Change Events for the Search Form
	const handleChange = (value: string) => {
		//Check if the Search Timer is still Valid and Stop it
		if (searchTimer) clearTimeout(searchTimer);

		//Update the Search Term
		setSearchTerm(value);

		//Run the Change Handler provided by the User
		onChange(value);

		//Start the Timeout and run the Search Handler
		const timeout = setTimeout(() => onSearch(value), 3000);

		//Save the Timeout in the State
		setSearchTimer(timeout);
	};

	//Return the Component's Content
	return (
		<div className="flex items-center rounded-md bg-gray-800 overflow-hidden border-gray-900/30 border-2">
			<input
				type="text"
				placeholder="Search for a Github User..."
				name="searchInput"
				value={searchTerm}
				onChange={e => handleChange(e.target.value)}
				className="w-full bg-transparent border-none text-white focus:ring-0 focus:outline-none mx-4 px-3 py-2"
			/>
		</div>
	);
}
