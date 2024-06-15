const command = process.argv[2];

// Has to be a relative path otherwise fails in production
import { migrateToLatest, migrateDown, migrateNew } from './migrate';

async function main() {
  switch (command) {
    case 'migrate:latest':
      await migrateToLatest();
      break;
    case 'migrate:down':
      await migrateDown();
      break;
    case 'migrate:new':
      const name = process.argv[3];
      await migrateNew(name);
      break;
  }
}

main();
