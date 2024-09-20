/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const baseDir = "./src";
const domainEntitiesDir = path.join(baseDir, "Domain/entities");
const outputPrismaPath = path.join(
  baseDir,
  "Infrastructure/database/prisma/schema.prisma"
);

// Get all .prisma files in the domain/entities directory
const getPrismaFiles = (dir) => {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".prisma"))
    .map((file) => path.join(dir, file));
};

const prismaFiles = getPrismaFiles(domainEntitiesDir);
let combinedSchema = "";
prismaFiles.forEach((file) => {
  combinedSchema += fs.readFileSync(file, "utf-8") + "\n";
});

fs.writeFileSync(outputPrismaPath, combinedSchema);