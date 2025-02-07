#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const GITHUB_REPO_URL = 'https://github.com/backendsample1/create-advanced-nest.git';

async function main() {
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

    console.log('Creating your NestJS project...');

    try {
        // Clone your template without git history
        execSync(`git clone --depth 1 ${GITHUB_REPO_URL} ${projectPath}`);
        
        // Remove unnecessary files
        execSync(`cd ${projectPath} && rm -rf .git index.js package-lock.json`);
        
        // Install dependencies
        execSync(`cd ${projectPath} && npm install`);
        
        console.log('\n🚀 Project created successfully!');
        console.log(`\nTo get started:`);
        console.log(`  cd ${projectName}`);
        console.log('  npm run start:dev\n');
        
    } catch (error) {
        console.error('Failed to create project:', error);
        process.exit(1);
    }
}

main().catch(console.error);