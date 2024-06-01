import * as core from '@actions/core';
import execute_process from "@action-update-version/proccess";
import {Command} from "@action-update-version/command";

async function run() {
    try {
        //const command = build_command();

        //execute_process(command);

        /*
        const nameToGreet = core.getInput('exampleInput');
        console.log(`Hello ${nameToGreet}!`);
        const time = (new Date()).toTimeString();
        core.setOutput('time', time);
        // Puedes acceder al contexto del evento de GitHub Actions así:
        const context = github.context;
        console.log(`El evento es: ${context.eventName}`);
         */

    } catch (error) {
        core.setFailed(`Action failed with error ${error}`);
    }
}

function build_command(): Command {
    return {
        application_type: parse_params_input_action('application_type'),
        update_version_mode: parse_params_input_action('update_version_mode'),
        path: core.getInput('path'),
        github_token: core.getInput('github_token'),
    }
}

function parse_params_input_action<T>(value: string): T {
    try {
        return core.getInput(value) as T;
    } catch (error) {
        core.setFailed(`Failed parse params for ${value}`);
        throw error
    }
}

run();
