import {ApplicationType, Command, UpdateVersionMode} from '@action-update-version/command';
import * as fs from 'fs';
import * as path from 'path';

const target_file_application = {
    maven: "pom.xml",
}
export const version_by_application = {
    maven: (content_file: string): string => require('xml-js').xml2js(content_file, {compact: true}).project.version._text,
}

export const create_new_content = {
    "maven": (content_file: string, version: string): string => require('xml-js').js2xml(
        require('xml-js').xml2js(content_file, {compact: true}),
        {compact: true, spaces: 4})
}

/*
export const regex_by_mode_version = {
    major: /^(\d+)/,
    minor: /^\d+\.(\d+)\.\d+/,
    patch: /^\d+\.\d+\.(\d+)/,
    "pr-snapshot": /-SNAPSHOT-(.*)/,
}
*/

const regex_take_version_number = /^(\d+)\.(\d+)\.(\d+)(?:-.*)?$/

function execute_process(command: Command) {
    const target = target_file_application[command.application_type];
    const path_files = scan_path_by_name_file(command.path, target);
    for (const path of path_files) {
        const content = fs.readFileSync(path, 'utf-8');
        const new_content = generate_new_content(content, command.application_type, command.update_version_mode)
        fs.writeFileSync(path, new_content, 'utf-8');
    }

}


function generate_new_content(
    content: string,
    application_type: ApplicationType,
    update_version_mode: UpdateVersionMode
) {
    const fn_get_version_file_content = version_by_application[application_type];
    const fn_create_new_content = create_new_content[application_type];


    const version = fn_get_version_file_content(content);
    const new_version = generate_new_version(version, update_version_mode);
    return fn_create_new_content(content, new_version);
}


export function generate_new_version(version: string, update_version_mode: UpdateVersionMode): string {
    const matcher = version.match(regex_take_version_number);

    if (matcher) {
        //const number_version_to_change_by_mode = (parseInt(matcher[0]) + 1).toString();
        //return version.replace(regExp, number_version_to_change_by_mode);

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


function scan_path_by_name_file(path_directory_or_file: string, name_file: string): string[] {
    let archivosEncontrados: string[] = [];
    const stats = fs.statSync(path_directory_or_file);
    if (stats.isDirectory()) {
        const archivos = fs.readdirSync(path_directory_or_file);
        archivos.forEach(value => {
            const rutaArchivo = path.join(path_directory_or_file, value);
            const inner = fs.statSync(rutaArchivo);
            if (inner.isDirectory()) {
                archivosEncontrados = archivosEncontrados.concat(scan_path_by_name_file(rutaArchivo, name_file));
            } else if (inner.isFile() && value === name_file) {
                archivosEncontrados.push(fs.realpathSync(value));
            }
        });
    } else if (stats.isFile() && path_directory_or_file === name_file) {
        archivosEncontrados.push(fs.realpathSync(path_directory_or_file));
    }

    return archivosEncontrados
}


export default execute_process;