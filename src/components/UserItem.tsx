//External Imports
import React, { useState } from "react";
import { UserData } from "../types/types";

//Setup the Component
export default function UserItem({ user }: { user: UserData }) {
	//Handle Click Events
	function handleClick() {
		//Redirect the User to the User Details Page
		window.location.href = `/user?username=${user.login}`;
	}

	//Return the Component's Content
	return (
		<div
			onClick={() => handleClick()}
			className="w-full h-10 flex items-center gap-5 hover:bg-gray-900/50 cursor-pointer border-b-2 border-gray-900"
		>
			<img src={user.avatar_url} className="aspect-square h-full" />
			<p className="font-bold">{user.login}</p>
		</div>
	);
}
