const exec = require("child_process").execSync;

const branchName = `${exec("git rev-parse --abbrev-ref HEAD")}`.trim();
const shortCommitHash = `${exec("git rev-parse --short HEAD")}`.trim();
const branchDirty = `${exec("git status --porcelain")}`.trim() === "";

const command1 = `cd client && mkdir environments;  cd environments && echo 'NEXT_PUBLIC_BRANCH = ${branchName}' >> .prod.env && echo 'NEXT_PUBLIC_HASH = ${shortCommitHash}' >> .prod.env && echo 'NEXT_PUBLIC_ISDIRTY = ${branchDirty}' >> .prod.env `;

exec(command1);
