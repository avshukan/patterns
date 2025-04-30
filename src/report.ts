import * as fs from 'fs';

import * as path from 'path';

const folderPath = process.argv[2];

const reportFilePath = path.join(__dirname, '..', 'report.txt');

function readFilesRecursively(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(readFilesRecursively(filePath));
        } else {
            results.push(filePath);
        }
    });
    return results;
}

function saveContentToReport(files: string[]) {
    const writeStream = fs.createWriteStream(reportFilePath);
    writeStream.write(`
Review my code.
Focus on:

code cleanliness (readability, simplicity, no duplication);

clean architecture (proper layering, correct dependencies);

GRASP and SOLID principles;

correct use of GoF patterns.

Suggest specific improvements.
Highlight what is done well.
Don't rewrite everything — just comment and suggest.

`);
    files.forEach((file) => {
        const content = fs.readFileSync(file, 'utf8');
        const filename = file.split('/').pop();
        writeStream.write(`Content of ${filename}:\n`);
        writeStream.write('```' + `\n`);
        writeStream.write(content);
        writeStream.write('\n' + '```' + `\n\n`);
    });
    writeStream.write(`\n\n\nUse the review guidelines.\n`);
    writeStream.end();
}

if (!folderPath) {
    console.error('Please provide a folder path as an argument.');
    process.exit(1);
}

const files = readFilesRecursively(folderPath);

saveContentToReport(files);

console.log(`Report saved to ${reportFilePath}`);