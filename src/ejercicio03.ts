import {constants, existsSync, fstat} from 'fs';
import {readFile} from 'fs';
import {watch} from 'fs';
import * as fs from 'fs';
import * as yargs from 'yargs';

/**
 * @description Command utilitie from yargs package that allows us to
 * interpret command line commands easily
 */
// yargs.command({
//   command: 'watch',
//   describe: 'Watches a file and gives information about all the changes',
//   builder: {
//     user: {
//       describe: 'Name of a notes app user',
//       demandOption: true,
//       type: 'string',
//     },
//     path: {
//       describe: 'Path to the file',
//       demandOption: true,
//       type: 'string',
//     },
//   },
//   handler(argv) {
//     // Si existe el path al archivo sigue la ejecución
//     const directory = './src/' + argv.path + '/';
//     if (typeof argv.path === 'string' &&
//       typeof argv.user === 'string' &&
//       existsSync(directory)) {
//       // Si se seleccionó alguna opción
//       watch(directory, (eventType, filename) => {
//         if (eventType === 'rename') {
//           readFile(directory + filename, (err, _) => {
//             if (err) {
//               process.stdout.write('\nFile ' + filename +
//                   ' has been deleted from ' + argv.user + ' directory\n');
//             } else {
//               process.stdout.write('\nFile ' + filename +
//                   ' has been added to ' + argv.user + ' directory\n');
//             }
//           });
//         } else if (eventType === 'change') {
//           process.stdout.write('\nFile ' +
//             filename + ' from ' + argv.user + ' directory has been modified\n');
//         }
//       });
//     } else {
//       console.log('Error opening the file: Unexisting path');
//     }
//   },
// }).demandCommand(1, 'You should try using a command');


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
          console.log(`${argv.user} no suc as a directory or a file.`);
        } else {
          fs.watch(`./txt/${process.argv[2]}`, (eventType, filename) => {
            if (eventType == 'rename') {
              readFile(`./database/${argv.user}/${filename}`, (err) => {
                if (err) {
                  process.stdout.write(`${filename} has beed deleted.`);
                } else {
                  process.stdout.write(`${filename} has beed added.`);
                }
              });
            } else if (eventType == 'change') {
              process.stdout.write(`File [${filename}] from ${argv.user} has been modified.`);
            }
          });
        }
      });
    }
  },
}).demandCommand(1, 'You should try using a command');

yargs.parse();
