//External Imports
import { Commit, User } from "@octokit/webhooks-types";

//Export the Interface
export interface CommitData {
	author?: User;
	commit: Commit;
	sha: string;
	url: string;
}
