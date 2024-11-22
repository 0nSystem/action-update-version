import {ApplicationType, Command, UpdateVersionMode, VersionedFileData} from '@action-update-version/model';
import * as fs from 'fs';
import {scan_paths_and_filter_by_file_name} from "@action-update-version/custom_fs";
import * as core from "@actions/core";
import {get_number_pr} from "@action-update-version/github_helper";

const target_file_application = {
    maven: "pom.xml",
}
export const get_version_file_data_by_application = {
    maven: (content_file: string): VersionedFileData => get_versionated_file_data_maven(content_file),
}

const create_new_content = {
    maven: (content_file: string, version: string): string => generate_new_content_maven(content_file, version),
}

const REGEX_TAKE_VERSION_DATA = /^(\d+)\.(\d+)\.(\d+)(?:-([A-Za-z]+(?:[-_\w+\d]*)?))?(?:-([A-Za-z]+\d*\+\d+))?$/;
const REGEX_TAKE_SNAPSHOT_PR_VERSION = /SNAPSHOT-PR(\d+)\+(\d+)/

async function execute_process(command: Command) {
    const target = target_file_application[command.application_type];
    const path_files = scan_paths_and_filter_by_file_name(command.path, target);

    for (const path of path_files) {
        core.debug(`Changing file: ${path}`);
        const content = fs.readFileSync(path, 'utf-8');
        const new_content = await generate_new_content(content, command.application_type, command.update_version_mode)
        fs.writeFileSync(path, new_content, 'utf-8');
    }

}


export async function generate_new_content(
    content: string,
    application_type: ApplicationType,
    update_version_mode: UpdateVersionMode
) {
    core.debug(`Generating new version with content: ${content}`);
    core.debug(`Generating new version application_type: ${application_type}`);
    core.debug(`Generating new version mode: ${update_version_mode}`);
    const fn_get_version_file_content = get_version_file_data_by_application[application_type];
    const fn_create_new_content = create_new_content[application_type];

    const versioned_file_data = fn_get_version_file_content(content);
    core.debug(`VersionedFileData Version Detected: ${versioned_file_data.version}`);
    core.debug(`VersionedFileData Package Detected: ${versioned_file_data.package_name}`);

    const new_version = await generate_new_version(versioned_file_data, update_version_mode);
    core.debug(`New version: ${new_version}`);

    const new_content_file = fn_create_new_content(content, new_version);
    core.debug(`New Content File: ${new_content_file}`);
    return new_content_file;
}


export async function generate_new_version(versionated_file_data: VersionedFileData, update_version_mode: UpdateVersionMode): Promise<string> {
    const matcher = versionated_file_data.version.match(REGEX_TAKE_VERSION_DATA);
    //TODO now require format X.X.X*,
    if (matcher) {
        const major_version = parseInt(matcher[1])
        const minor_version = parseInt(matcher[2])
        const patch_version = parseInt(matcher[3])

        switch (update_version_mode) {
            case "major":
                return Promise.resolve(`${major_version + 1}.0.0`)
            case "minor":
                return Promise.resolve(`${major_version}.${minor_version + 1}.0`)
            case "patch":
                return Promise.resolve(`${major_version}.${minor_version}.${patch_version + 1}`)
            case "pr-snapshot":
                return get_number_pr().then(pr_number => {
                    const data_snapshot_pr_version = matcher[4]

                    if (!data_snapshot_pr_version)
                        return Promise.resolve(`${matcher[1]}.${matcher[2]}.${parseInt(matcher[3])}-SNAPSHOT-PR${pr_number}+1`)

                    const matcher_snapshot_pr_version = data_snapshot_pr_version.match(REGEX_TAKE_SNAPSHOT_PR_VERSION)
                    //TODO match pr number and compare if not equals set new number pr and starting +1
                    if (matcher_snapshot_pr_version) {
                        const current_pr_version = parseInt(matcher_snapshot_pr_version[1]);
                        const current_increment_pr_version = parseInt(matcher_snapshot_pr_version[2]);

                        if (current_pr_version !== pr_number) {
                            return Promise.resolve(`${matcher[1]}.${matcher[2]}.${parseInt(matcher[3])}-SNAPSHOT-PR${pr_number}+1`);
                        }

                        return Promise.resolve(`${matcher[1]}.${matcher[2]}.${parseInt(matcher[3])}-SNAPSHOT-PR${pr_number}+${current_increment_pr_version + 1}`);

                    } else {
                        return Promise.resolve(`${matcher[1]}.${matcher[2]}.${parseInt(matcher[3])}-SNAPSHOT-PR${pr_number}+1`)
                    }
                });
        }

    }
    core.setFailed("Error matcher to modify version version format.");
    return Promise.reject()
    //throw "Error not found version";
}


function generate_new_content_maven(content_file: string, version: string): string {
    const create_json_content = require('xml-js')
        .xml2js(content_file, {compact: true, explicitArray: false});
    create_json_content.project.version._text = version

    return require('xml-js').js2xml(
        create_json_content, {compact: true, spaces: 4}
    )
}

function get_versionated_file_data_maven(content_file: string): VersionedFileData {
    const json_content = require('xml-js').xml2js(content_file, {compact: true});

    let version_artifact;
    if (json_content.project.version) {
        version_artifact = json_content.project.version._text;
    } else {
        version_artifact = json_content.project.parent.version._text;
    }

    let artifactId;
    if (json_content.project.artifactId) {
        artifactId = json_content.project.artifactId._text;
    } else {
        artifactId = json_content.project.parent.artifactId._text
    }

    let groupId;
    if (json_content.project.groupId) {
        groupId = json_content.project.groupId._text;
    } else {
        groupId = json_content.project.parent.groupId._text;
    }

    return {
        version: version_artifact,
        package_name: `${groupId}.${artifactId}`,
    }
}

export default execute_process;