import {generate_new_version} from '@action-update-version/proccess'

test('Test generate new version major', async () => {

    const new_version_1 = await generate_new_version({
        version: "0.0.1-SNAPSHOT",
        package_name: ""
    }, 'major');
    const new_version_2 = await generate_new_version({
        version: "0.0.1-SNAPSHOT-PR34+1",
        package_name: ""
    }, 'major');
    const new_version_3 = await generate_new_version({
        version: "0.0.1",
        package_name: ""
    }, 'major');

    expect(new_version_1).toEqual("1.0.0");
    expect(new_version_2).toEqual("1.0.0");
    expect(new_version_3).toEqual("1.0.0");
});


test('Test generate new version minor', async () => {
    const new_version_1 = await generate_new_version({
        version: "0.0.1-SNAPSHOT",
        package_name: ""
    }, 'minor');
    const new_version_2 = await generate_new_version({
        version: "0.0.1-SNAPSHOT-PR34+1",
        package_name: ""
    }, 'minor');
    const new_version_3 = await generate_new_version({
        version: "0.0.1",
        package_name: ""
    }, 'minor');

    expect(new_version_1).toEqual("0.1.0");
    expect(new_version_2).toEqual("0.1.0");
    expect(new_version_3).toEqual("0.1.0");
});


test('Test generate new version patch', async () => {
    const new_version_1 = await generate_new_version({
        version: "0.0.1-SNAPSHOT",
        package_name: ""
    }, 'patch');
    const new_version_2 = await generate_new_version({
        version: "0.0.1-SNAPSHOT-PR34+1",
        package_name: ""
    }, 'patch');
    const new_version_3 = await generate_new_version({
        version: "0.0.1",
        package_name: ""
    }, 'patch');

    expect(new_version_1).toEqual("0.0.2");
    expect(new_version_2).toEqual("0.0.2");
    expect(new_version_3).toEqual("0.0.2");
});


jest.mock('@actions/github', () => ({
    context: {
        payload: {
            pull_request: {
                number: 1,
            },
        },
    },
}));
test('Test generate new version snapshot version', async () => {
    const new_version_1 = await generate_new_version({
        version: "0.0.1-SNAPSHOT",
        package_name: ""
    }, "pr-snapshot");
    const new_version_pr_1_1 = await generate_new_version({
        version: "0.0.1-SNAPSHOT-PR1+1",
        package_name: ""
    }, "pr-snapshot");
    const new_version_pr_34 = await generate_new_version({
        version: "0.0.1-SNAPSHOT-PR34+1",
        package_name: ""
    }, "pr-snapshot");

    expect(new_version_1).toEqual("0.0.1-SNAPSHOT-PR1+1");
    expect(new_version_pr_1_1).toEqual("0.0.1-SNAPSHOT-PR1+2");
    expect(new_version_pr_34).toEqual("0.0.1-SNAPSHOT-PR1+1");
})

