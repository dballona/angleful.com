const command = process.argv[2];

import { execSync } from "child_process";
// Has to be a relative path otherwise fails in production
import { migrateToLatest, migrateDown, migrateNew } from "./migrate";
import { seedQuestions } from "./seed";


function exportTypes() {
  if (process.env.NODE_ENV !== "development") return;
  execSync("pnpm db:export:types", { stdio: "inherit" });
}

async function main() {
  switch (command) {
    case "migrate:latest":
      await migrateToLatest();
      exportTypes();
      break;
    case "migrate:down":
      await migrateDown();
      exportTypes();
      break;
    case "migrate:new":
      const name = process.argv[3];
      await migrateNew(name);
      break;

    case "seed:questions":
      await seedQuestions();
      break;
  }
}

main();
