/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const baseDir = './src';
const prismixConfigPath = path.join("", 'prismix.config.json');
const domainEntitiesDir = path.join(baseDir, 'Domain/entities');
const basePrismaPath = path.join(baseDir, 'Infrastructure/database/prisma/base.prisma');
const outputPrismaPath = path.join(baseDir, 'Infrastructure/database/prisma/schema.prisma');

// Get all .prisma files in the domain/entities directory
const getPrismaFiles = (dir) => {
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.prisma'))
    .map(file => path.join(dir, file));
};

const prismaFiles = getPrismaFiles(domainEntitiesDir);

// Construct the new configuration
const newConfig = {
  mixers: [
    {
      input: [basePrismaPath, ...prismaFiles],
      output: outputPrismaPath
    }
  ]
};

// Write the new configuration to the prismix config file
fs.writeFileSync(prismixConfigPath, JSON.stringify(newConfig, null, 2), 'utf-8');

console.log('Updated prismix configuration successfully.');
