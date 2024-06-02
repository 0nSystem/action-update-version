import fs from "fs";
import path from "path";

export function scan_paths_and_filter_by_file_name(path_directory_or_file: string, name_file: string): string[] {
    let matched_files: string[] = [];
    const stats = fs.statSync(path_directory_or_file);
    if (stats.isDirectory()) {
        const archivos = fs.readdirSync(path_directory_or_file);
        archivos.forEach(value => {
            const path_file = path.join(path_directory_or_file, value);
            const inner = fs.statSync(path_file);
            if (inner.isDirectory()) {
                matched_files = matched_files.concat(scan_paths_and_filter_by_file_name(path_file, name_file));
            } else if (inner.isFile() && value === name_file) {
                matched_files.push(fs.realpathSync(value));
            }
        });
    } else if (stats.isFile() && path_directory_or_file === name_file) {
        matched_files.push(fs.realpathSync(path_directory_or_file));
    }

    return matched_files
}