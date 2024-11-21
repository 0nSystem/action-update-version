import {generate_new_content, get_version_file_data_by_application} from '@action-update-version/proccess';


test('Test case get version maven', () => {
    const fn_get_version = get_version_file_data_by_application["maven"];
    const pom_version_0_0_1_snapshot = fn_get_version(pom_0_0_1_snapshot);
    const pom_version_0_0_2 = fn_get_version(pom_0_0_2)
    const pom_version_0_1_0 = fn_get_version(pom_0_1_0)
    const pom_version_1_0_0 = fn_get_version(pom_1_0_0)
    const pom_version_inherent = fn_get_version(pom_inherent);

    expect(pom_version_0_0_1_snapshot.version).toEqual("0.0.1-SNAPSHOT")
    expect(pom_version_0_0_1_snapshot.package_name).toEqual("com.onsystem.example-artifact")

    expect(pom_version_0_0_2.version).toEqual("0.0.2")
    expect(pom_version_0_0_1_snapshot.package_name).toEqual("com.onsystem.example-artifact")

    expect(pom_version_0_1_0.version).toEqual("0.1.0")
    expect(pom_version_0_0_1_snapshot.package_name).toEqual("com.onsystem.example-artifact")

    expect(pom_version_1_0_0.version).toEqual("1.0.0")
    expect(pom_version_0_0_1_snapshot.package_name).toEqual("com.onsystem.example-artifact")

    expect(pom_version_inherent.version).toEqual("1.0.1-SNAPSHOT");
    expect(pom_version_inherent.package_name).toEqual("com.onsystem.inherent-example")

});

test('Test update version maven major', async () => {
    const new_content_major_version = await generate_new_content(pom_0_0_1_snapshot, "maven", "major");
    expect(new_content_major_version).toEqual(pom_1_0_0)
});

test('Test update version maven minor', async () => {
    const new_content_minor_version = await generate_new_content(pom_0_0_1_snapshot, "maven", "minor");
    expect(new_content_minor_version).toEqual(pom_0_1_0)
});

test('Test update version maven patch', async () => {
    const new_content_patch_version = await generate_new_content(pom_0_0_1_snapshot, "maven", "patch");
    expect(new_content_patch_version).toEqual(pom_0_0_2)
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
test('Test update version maven pr snapshot', async () => {
    const new_content_snapshot_version_pr_1_1 = await generate_new_content(pom_0_0_1_snapshot, "maven", "pr-snapshot");
    expect(new_content_snapshot_version_pr_1_1).toEqual(pom_0_0_1_snapshot_pr_1_1)
    const new_content_snapshot_version_pr_1_2 = await generate_new_content(pom_0_0_1_snapshot_pr_1_1, "maven", "pr-snapshot");
    expect(new_content_snapshot_version_pr_1_2).toEqual(pom_0_0_1_snapshot_pr_1_2)

    const new_content_snapshot_version_pr_1_1_by_pr_34 = await generate_new_content(pom_0_0_1_snapshot_pr_34_1, "maven", "pr-snapshot");
    expect(new_content_snapshot_version_pr_1_1_by_pr_34).toEqual(new_content_snapshot_version_pr_1_1)

})

const pom_0_0_1_snapshot = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">\n' +
    '    <modelVersion>4.0.0</modelVersion>\n' +
    '    <groupId>com.onsystem</groupId>\n' +
    '    <artifactId>example-artifact</artifactId>\n' +
    '    <version>0.0.1-SNAPSHOT</version>\n' +
    '    <name>example</name>\n' +
    '    <description>example_code</description>\n' +
    '    <properties>\n' +
    '        <java.version>21</java.version>\n' +
    '    </properties>\n' +
    '    <dependencies/>\n' +
    '    <build>\n' +
    '        <plugins/>\n' +
    '    </build>\n' +
    '</project>'
const pom_0_0_2 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">\n' +
    '    <modelVersion>4.0.0</modelVersion>\n' +
    '    <groupId>com.onsystem</groupId>\n' +
    '    <artifactId>example-artifact</artifactId>\n' +
    '    <version>0.0.2</version>\n' +
    '    <name>example</name>\n' +
    '    <description>example_code</description>\n' +
    '    <properties>\n' +
    '        <java.version>21</java.version>\n' +
    '    </properties>\n' +
    '    <dependencies/>\n' +
    '    <build>\n' +
    '        <plugins/>\n' +
    '    </build>\n' +
    '</project>'
const pom_1_0_0 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">\n' +
    '    <modelVersion>4.0.0</modelVersion>\n' +
    '    <groupId>com.onsystem</groupId>\n' +
    '    <artifactId>example-artifact</artifactId>\n' +
    '    <version>1.0.0</version>\n' +
    '    <name>example</name>\n' +
    '    <description>example_code</description>\n' +
    '    <properties>\n' +
    '        <java.version>21</java.version>\n' +
    '    </properties>\n' +
    '    <dependencies/>\n' +
    '    <build>\n' +
    '        <plugins/>\n' +
    '    </build>\n' +
    '</project>'
const pom_0_1_0 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">\n' +
    '    <modelVersion>4.0.0</modelVersion>\n' +
    '    <groupId>com.onsystem</groupId>\n' +
    '    <artifactId>example-artifact</artifactId>\n' +
    '    <version>0.1.0</version>\n' +
    '    <name>example</name>\n' +
    '    <description>example_code</description>\n' +
    '    <properties>\n' +
    '        <java.version>21</java.version>\n' +
    '    </properties>\n' +
    '    <dependencies/>\n' +
    '    <build>\n' +
    '        <plugins/>\n' +
    '    </build>\n' +
    '</project>'

const pom_0_0_1_snapshot_pr_1_1 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">\n' +
    '    <modelVersion>4.0.0</modelVersion>\n' +
    '    <groupId>com.onsystem</groupId>\n' +
    '    <artifactId>example-artifact</artifactId>\n' +
    '    <version>0.0.1-SNAPSHOT-PR1+1</version>\n' +
    '    <name>example</name>\n' +
    '    <description>example_code</description>\n' +
    '    <properties>\n' +
    '        <java.version>21</java.version>\n' +
    '    </properties>\n' +
    '    <dependencies/>\n' +
    '    <build>\n' +
    '        <plugins/>\n' +
    '    </build>\n' +
    '</project>'
const pom_0_0_1_snapshot_pr_1_2 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">\n' +
    '    <modelVersion>4.0.0</modelVersion>\n' +
    '    <groupId>com.onsystem</groupId>\n' +
    '    <artifactId>example-artifact</artifactId>\n' +
    '    <version>0.0.1-SNAPSHOT-PR1+2</version>\n' +
    '    <name>example</name>\n' +
    '    <description>example_code</description>\n' +
    '    <properties>\n' +
    '        <java.version>21</java.version>\n' +
    '    </properties>\n' +
    '    <dependencies/>\n' +
    '    <build>\n' +
    '        <plugins/>\n' +
    '    </build>\n' +
    '</project>'

const pom_0_0_1_snapshot_pr_34_1 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">\n' +
    '    <modelVersion>4.0.0</modelVersion>\n' +
    '    <groupId>com.onsystem</groupId>\n' +
    '    <artifactId>example-artifact</artifactId>\n' +
    '    <version>0.0.1-SNAPSHOT-PR34+1</version>\n' +
    '    <name>example</name>\n' +
    '    <description>example_code</description>\n' +
    '    <properties>\n' +
    '        <java.version>21</java.version>\n' +
    '    </properties>\n' +
    '    <dependencies/>\n' +
    '    <build>\n' +
    '        <plugins/>\n' +
    '    </build>\n' +
    '</project>'

const pom_inherent = '<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">\n' +
    '    <modelVersion>4.0.0</modelVersion>\n' +
    '    <parent>\n' +
    '        <groupId>com.onsystem</groupId>\n' +
    '        <artifactId>code</artifactId>\n' +
    '        <version>1.0.1-SNAPSHOT</version>\n' +
    '    </parent>\n' +
    '    <artifactId>inherent-example</artifactId>\n' +
    '    <packaging>pom</packaging>\n' +
    '    <name>modelo-example-test</name>\n' +
    '    <url>http://maven.apache.org</url>\n' +
    '    <properties>\n' +
    '        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>\n' +
    '    </properties>\n' +
    '    <dependencies/>\n' +
    '</project>'
