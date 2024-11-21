import github from "@actions/github";
import * as core from "@actions/core";


export async function get_number_pr(): Promise<number> {
    const github_pr_data = github.context.payload.pull_request;
    if (!github_pr_data) {
        core.setFailed("Error getting PR Number");
        return Promise.reject()
    }
    return Promise.resolve(github_pr_data.number);
}
