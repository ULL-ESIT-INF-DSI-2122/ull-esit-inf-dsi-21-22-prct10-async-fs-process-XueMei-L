import * as chokidar from 'chokidar';
import * as fs from 'fs';
import * as yargs from 'yargs';

/**
 * @description Command utilitie from yargs package that allows us to
 * interpret command line commands easily
 */
yargs.command({
  command: 'watch',
  describe: 'Watches a file and gives information about all the changes',
  builder: {
    user: {
      describe: 'Name of a notes app user',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      fs.access(`./database/${argv.user}`, (err) => {
        if (err) {
          console.log(`${argv.user} no such as a directory or a file.`);
        } else {
          const watcher = chokidar.watch(`./database/${argv.user}`);
          watcher.on('add', (file, _) => {
            if ( fs.existsSync(file)) {
              console.log(`${file} has been added!`);
            }
          });

          watcher.on('change', (file, _) => {
            if ( fs.existsSync(file)) {
              console.log(`${file} has been changed!`);
            }
          });

          watcher.on('unlink', (file) => {
            console.log(`${file} has been deleted!`);
          });
        }
      });
    }
  },
}).demandCommand(1, 'You should try using a command');

yargs.parse();
