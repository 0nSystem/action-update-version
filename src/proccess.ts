import {ApplicationType, Command, UpdateVersionMode, VersionedFileData} from '@action-update-version/model';
import * as fs from 'fs';
import {scan_paths_and_filter_by_file_name} from "@action-update-version/fs";
import github from "@actions/github";

const target_file_application = {
    maven: "pom.xml",
}
export const get_version_file_data_by_application = {
    maven: (content_file: string): VersionedFileData => get_versionated_file_data_maven(content_file),
}

const create_new_content = {
    maven: (content_file: string, version: string): string => generate_new_content_maven(content_file, version),
}

const REGEX_TAKE_VERSION_DATA = /^(\d+)\.(\d+)\.(\d+)(?:-.*)?$/

async function execute_process(command: Command) {
    const target = target_file_application[command.application_type];
    const path_files = scan_paths_and_filter_by_file_name(command.path, target);
    for (const path of path_files) {
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
    const fn_get_version_file_content = get_version_file_data_by_application[application_type];
    const fn_create_new_content = create_new_content[application_type];

    //TODO create funtion to create packagename todo show if example with maven is "<group>+<artifactId>"

    const version = fn_get_version_file_content(content);
    const new_version = await generate_new_version(version, update_version_mode);
    return fn_create_new_content(content, new_version);
}


export async function generate_new_version(versionated_file_data: VersionedFileData, update_version_mode: UpdateVersionMode): Promise<string> {
    const matcher = versionated_file_data.version.match(REGEX_TAKE_VERSION_DATA);

    if (matcher) {

        switch (update_version_mode) {
            case "major":
                return Promise.resolve(`${parseInt(matcher[1]) + 1}.0.0`)
            case "minor":
                return Promise.resolve(`${matcher[1]}.${parseInt(matcher[2]) + 1}.0`)
            case "patch":
                return Promise.resolve(`${matcher[1]}.${matcher[2]}.${parseInt(matcher[3]) + 1}`)
            case "pr-snapshot":
                await generate_version_pr_snapshot(versionated_file_data, "maven") //TODO
                //throw `pr-snapshot not implemented`
                return Promise.resolve("example")
        }

    }
    return Promise.reject()
    //throw "Error not found version";
}

async function generate_version_pr_snapshot(versionated_file_data: VersionedFileData, application_type: ApplicationType): Promise<string> {
    const context = github.context;
    const github_pr_data = github.context.payload.pull_request;
    if (github_pr_data) {
        const number_pr = github_pr_data.number;

        const token = github_pr_data.token; //TODO token is correct?

        //TODO change to user and organization
        const a = await github.getOctokit(token).rest.packages.getAllPackageVersionsForPackageOwnedByOrg({
            org: context.repo.owner,
            package_type: application_type,
            package_name: versionated_file_data.package_name,
        })

        console.log(a.data)

        return Promise.resolve("mock_data")
    } else {
        //throw "Mode update version pr-snapshot require execute in PR"
        return Promise.reject();
    }

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