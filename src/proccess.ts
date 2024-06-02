import {ApplicationType, Command, UpdateVersionMode} from '@action-update-version/command';
import * as fs from 'fs';
import {scan_paths_and_filter_by_file_name} from "@action-update-version/fs";

const target_file_application = {
    maven: "pom.xml",
}
export const get_version_by_application = {
    maven: (content_file: string): string => require('xml-js').xml2js(content_file, {compact: true}).project.version._text,
}

const create_new_content = {
    "maven": (content_file: string, version: string): string => generate_new_content_maven(content_file, version),
}

const REGEX_TAKE_VERSION_DATA = /^(\d+)\.(\d+)\.(\d+)(?:-.*)?$/

function execute_process(command: Command) {
    const target = target_file_application[command.application_type];
    const path_files = scan_paths_and_filter_by_file_name(command.path, target);
    for (const path of path_files) {
        const content = fs.readFileSync(path, 'utf-8');
        const new_content = generate_new_content(content, command.application_type, command.update_version_mode)
        fs.writeFileSync(path, new_content, 'utf-8');
    }

}


export function generate_new_content(
    content: string,
    application_type: ApplicationType,
    update_version_mode: UpdateVersionMode
) {
    const fn_get_version_file_content = get_version_by_application[application_type];
    const fn_create_new_content = create_new_content[application_type];


    const version = fn_get_version_file_content(content);
    const new_version = generate_new_version(version, update_version_mode);
    return fn_create_new_content(content, new_version);
}


export function generate_new_version(version: string, update_version_mode: UpdateVersionMode): string {
    const matcher = version.match(REGEX_TAKE_VERSION_DATA);

    if (matcher) {

        switch (update_version_mode) {
            case "major":
                return `${parseInt(matcher[1]) + 1}.0.0`
            case "minor":
                return `${matcher[1]}.${parseInt(matcher[2]) + 1}.0`
            case "patch":
                return `${matcher[1]}.${matcher[2]}.${parseInt(matcher[3]) + 1}`
            case "pr-snapshot":
                throw `pr-snapshot not implemented`
        }

    }
    throw "Error not found version";
}


function generate_new_content_maven(content_file: string, version: string): string {
    const create_json_content = require('xml-js')
        .xml2js(content_file, {compact: true, explicitArray: false});
    create_json_content.project.version._text = version

    return require('xml-js').js2xml(
        create_json_content, {compact: true, spaces: 4}
    )
}

export default execute_process;