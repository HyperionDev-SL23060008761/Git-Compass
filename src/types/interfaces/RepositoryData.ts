//External Imports
import { Repository } from "@octokit/webhooks-types";
import { CommitData } from "../types";

//Export the Interface
export interface RepositoryData extends Repository {
	commits: Array<CommitData> | null;
}
