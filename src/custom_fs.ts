import * as core from "@actions/core";
import * as fs from "node:fs";
import * as path from "node:path";

export function scan_paths_and_filter_by_file_name(path_directory_or_file: string, name_file_expected: string): string[] {
    let matched_files: string[] = [];

    let absolute_path_directory_or_file = fs.realpathSync(path_directory_or_file);
    core.debug(`Scan path: ${absolute_path_directory_or_file}`);


    const stats = fs.statSync(absolute_path_directory_or_file);
    if (stats.isDirectory()) {
        core.debug(`Search files in directory: ${absolute_path_directory_or_file}`);
        const files_or_directories_in_entry = fs.readdirSync(absolute_path_directory_or_file);

        files_or_directories_in_entry.forEach(value => {
            const inner_directory_or_file_absolute_path = fs.realpathSync(path.join(absolute_path_directory_or_file, value));
            const inner_directory_or_file_stats = fs.statSync(inner_directory_or_file_absolute_path);

            if (inner_directory_or_file_stats.isDirectory()) {
                core.debug(`Found directory: ${absolute_path_directory_or_file}`);
                matched_files = matched_files.concat(scan_paths_and_filter_by_file_name(inner_directory_or_file_absolute_path, name_file_expected))
            } else if (inner_directory_or_file_stats.isFile() && path.basename(inner_directory_or_file_absolute_path) === name_file_expected) {
                core.debug(`Found file: ${absolute_path_directory_or_file}`);
                matched_files.push(inner_directory_or_file_absolute_path);
            }

        });
    } else if (stats.isFile() && path.basename(absolute_path_directory_or_file) === name_file_expected) {
        core.debug(`Found file: ${absolute_path_directory_or_file}`)
        matched_files.push(absolute_path_directory_or_file)
    }

    return matched_files
}