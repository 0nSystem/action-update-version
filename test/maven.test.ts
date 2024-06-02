import {generate_new_content, get_version_by_application} from '@action-update-version/proccess';


test('Test case get version maven', () => {
    const fn_get_version = get_version_by_application["maven"];
    const version_0_0_1_snapshot = fn_get_version(pom_0_0_1_snapshot);
    const version_0_0_2 = fn_get_version(pom_0_0_2)
    const version_0_1_0 = fn_get_version(pom_0_1_0)
    const version_1_0_0 = fn_get_version(pom_1_0_0)


    expect(version_0_0_1_snapshot).toEqual("0.0.1-SNAPSHOT")
    expect(version_0_0_2).toEqual("0.0.2")
    expect(version_0_1_0).toEqual("0.1.0")
    expect(version_1_0_0).toEqual("1.0.0")

});

test('Test update version maven major', () => {
    const new_content_major_version = generate_new_content(pom_0_0_1_snapshot, "maven", "major");
    expect(new_content_major_version).toEqual(pom_1_0_0)
});

test('Test update version maven minor', () => {
    const new_content_minor_version = generate_new_content(pom_0_0_1_snapshot, "maven", "minor");
    expect(new_content_minor_version).toEqual(pom_0_1_0)
});

test('Test update version maven patch', () => {
    const new_content_patch_version = generate_new_content(pom_0_0_1_snapshot, "maven", "patch");
    expect(new_content_patch_version).toEqual(pom_0_0_2)
});

const pom_0_0_1_snapshot = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
    '         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">\n' +
    '    <modelVersion>4.0.0</modelVersion>\n' +
    '    <groupId>com.onsystem</groupId>\n' +
    '    <artifactId>example-artifact</artifactId>\n' +
    '    <version>0.0.1-SNAPSHOT</version>\n' +
    '    <name>example</name>\n' +
    '    <description>example_code</description>\n' +
    '    <properties>\n' +
    '        <java.version>21</java.version>\n' +
    '    </properties>\n' +
    '    <dependencies/>\n'+
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
