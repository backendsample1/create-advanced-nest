#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { createSpinner } from 'nanospinner';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_REPO_URL = 'https://github.com/backendsample1/create-advanced-nest.git';

async function main() {
    // Get project name from command line arguments
    const projectName = process.argv[2];
    
    if (!projectName) {
        console.log('Please specify a project name:');
        console.log('  npx create-advanced-nest my-app');
        process.exit(1);
    }

    const currentPath = process.cwd();
    const projectPath = path.join(currentPath, projectName);
    
    try {
        fs.mkdirSync(projectPath);
    } catch (err) {
        if (err.code === 'EEXIST') {
            console.log(`The directory ${projectName} already exists. Please use another name.`);
        } else {
            console.log(err);
        }
        process.exit(1);
    }

    const spinner = createSpinner('Creating your NestJS project...').start();

    try {
        // Clone your template
        execSync(`git clone --depth 1 ${GITHUB_REPO_URL} ${projectPath}`);
        
        // Remove .git folder
        execSync(`cd ${projectPath} && rm -rf .git`);
        
        // Install dependencies
        execSync(`cd ${projectPath} && npm install`);
        
        spinner.success({ text: 'Project created successfully!' });
        
        console.log('\n🚀 To get started:');
        console.log(`\n  cd ${projectName}`);
        console.log('  npm run start:dev\n');
        
    } catch (error) {
        spinner.error({ text: 'Failed to create project' });
        console.log(error);
        process.exit(1);
    }
}

main();