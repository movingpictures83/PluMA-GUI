/* ReadME Parsing to get input/output file types *Bhavyta */

const testPath = '/Users/edwardpalermo/Desktop/seniorProject/PluMA/plugins';
// array containing names of (LOCAL) plugin folders
const pluginFolderNames = fs.readdirSync(testPath);
console.log(pluginFolderNames); // debugging
console.log(pluginFolderNames[0]); // debugging
// array containing full paths of plugin folders
const pluginFullPaths = pluginFolderNames
.map(function (folder_name) {
    return testPath + '/' + folder_name;
});
console.log(pluginFullPaths[0]); // full path of first plugin folder; debugging
// array containing plugin folder paths filtered to make sure only those plugins are included whose readme files exist
const filtered = pluginFullPaths
.filter(function (full_path) {
    const folderInfo = fs.statSync(full_path);
    if (!folderInfo.isDirectory()) {
        return false;
    }
    return fs.existsSync(full_path + '/README.md');
});
console.log(filtered);

// array containing name of each plugin 
const pluginNames = filtered
.map(function (folder_path){
    var readmeContent = fs.readFileSync(folder_path + '/README.md', 'utf8');
    // console.log(readmeContent);
    readmeContent = readmeContent.split("\n");   
    var firstLine = readmeContent[0];
    // console.log(firstLine);
    firstLine = firstLine.split(" ");
    // console.log(firstLine);
    var pluginName = firstLine[1];
    return pluginName;
});
console.log(pluginNames);

// array containing input file types for each plugin 
const pluginInputTypes = filtered
.map(function (folder_path){
    var readmeContent = fs.readFileSync(folder_path + '/README.md', 'utf8');
    // console.log(readmeContent);
    readmeContent = readmeContent.split("\n");   
    inputLineIndex = readmeContent.reduce(function (index, readmeContent, actual_index) {
        if (index !== -1) 
            return index;
        if (readmeContent.substr(0, 10).toLowerCase().indexOf("input:") > -1)
            return actual_index;
        return -1;
    }, -1);
    var inputLine = readmeContent[inputLineIndex];
    // console.log(inputLine);
    inputLine = inputLine.split(" ");
    // console.log(inputLine);
    const inputFileType = inputLine[2];
    return inputFileType.toLowerCase();
});
console.log(pluginInputTypes);

// array containing output file types for each plugin 
const pluginOutputTypes = filtered
.map(function (folder_path){
    var readmeContent = fs.readFileSync(folder_path + '/README.md', 'utf8');
    readmeContent = readmeContent.split("\n");   
    outputLineIndex = readmeContent.reduce(function (index, readmeContent, actual_index) {
        if (index !== -1) 
            return index;
        if (readmeContent.substr(0, 10).toLowerCase().indexOf("output:") > -1)
            return actual_index;
        return -1;
    }, -1);
    var outputLine = readmeContent[outputLineIndex];
    // console.log(outputLine);
    outputLine = outputLine.split(" ");
    // console.log(outputLine);
    const outputFileType = outputLine[2];
    return outputFileType.toLowerCase();
});
console.log(pluginOutputTypes); 