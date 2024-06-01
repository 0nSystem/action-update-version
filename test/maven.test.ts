import {version_by_application} from '@action-update-version/proccess';


test('Test case get version maven', () => {
    const fn_get_version = version_by_application["maven"];
    const version = fn_get_version(pom);
    expect(version).toEqual("0.0.1-SNAPSHOT")
});

test('Test update version maven major', () => {

});


const pom = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
    "<project xmlns=\"http://maven.apache.org/POM/4.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n" +
    "         xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd\">\n" +
    "    <modelVersion>4.0.0</modelVersion>\n" +
    "    <parent>\n" +
    "        <groupId>org.springframework.boot</groupId>\n" +
    "        <artifactId>spring-boot-starter-parent</artifactId>\n" +
    "        <version>3.2.3</version>\n" +
    "        <relativePath/> <!-- lookup parent from repository -->\n" +
    "    </parent>\n" +
    "    <groupId>com.onsystem</groupId>\n" +
    "    <artifactId>example</artifactId>\n" +
    "    <version>0.0.1-SNAPSHOT</version>\n" +
    "    <name>example</name>\n" +
    "    <description>code</description>\n" +
    "    <properties>\n" +
    "        <java.version>21</java.version>\n" +
    "    </properties>\n" +
    "    <dependencies>\n" +
    "        <dependency>\n" +
    "            <groupId>org.example</groupId>\n" +
    "            <artifactId>example</artifactId>\n" +
    "            <optional>true</optional>\n" +
    "            <version>2.16.1</version>\n" +
    "        </dependency>\n" +
    "    </dependencies>\n" +
    "\n" +
    "    <build>\n" +
    "        <plugins>\n" +
    "\n" +
    "        </plugins>\n" +
    "    </build>\n" +
    "\n" +
    "</project>\n"