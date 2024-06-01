import {generate_new_version} from '@action-update-version/proccess'

test('Test generate new version major', () => {
    const new_version_1 = generate_new_version("0.0.1-SNAPSHOT", 'major');
    const new_version_2 = generate_new_version("0.0.1-SNAPSHOT-PR34+1", 'major');
    const new_version_3 = generate_new_version("0.0.1", 'major');

    expect(new_version_1).toEqual("1.0.0");
    expect(new_version_2).toEqual("1.0.0");
    expect(new_version_3).toEqual("1.0.0");
});


test('Test generate new version minor', () => {
    const new_version_1 = generate_new_version("0.0.1-SNAPSHOT", 'minor');
    const new_version_2 = generate_new_version("0.0.1-SNAPSHOT-PR34+1", 'minor');
    const new_version_3 = generate_new_version("0.0.1", 'minor');

    expect(new_version_1).toEqual("0.1.0");
    expect(new_version_2).toEqual("0.1.0");
    expect(new_version_3).toEqual("0.1.0");
});


test('Test generate new version patch', () => {
    const new_version_1 = generate_new_version("0.0.1-SNAPSHOT", 'patch');
    const new_version_2 = generate_new_version("0.0.1-SNAPSHOT-PR34+1", 'patch');
    const new_version_3 = generate_new_version("0.0.1", 'patch');

    expect(new_version_1).toEqual("0.0.2");
    expect(new_version_2).toEqual("0.0.2");
    expect(new_version_3).toEqual("0.0.2");
});
