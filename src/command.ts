


export type ApplicationType = "maven";

export type UpdateVersionMode = "major" | "minor" | "patch" | "pr-snapshot";

export interface Command {
    application_type: ApplicationType,
    update_version_mode: UpdateVersionMode
    github_token: string
    path: string
}

