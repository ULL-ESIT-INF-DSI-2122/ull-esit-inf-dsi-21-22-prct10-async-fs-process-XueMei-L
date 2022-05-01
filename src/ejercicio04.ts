/* eslint-disable indent */
import {spawn} from "child_process";
import * as fs from "fs";
import {existsSync, lstatSync} from "fs";
import yargs from "yargs";

/**
 * Command that check is it a file or a directory
 */
yargs.command({
  command: 'check',
  describe: 'Check is it a file or a directory',
  builder: {
    path: {
      describe: 'Path to check is a file or directory',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
        fs.lstat(`${argv.path}`, (err, stats) => {
            if (err) {
                console.log(`There is no path called ${argv.path}`);
            } else {
                if (stats.isDirectory()) {
                    console.log(`${argv.path} is a Directory` );
                } else {
                    console.log(`${argv.path} is a file`);
                }
            }
        });
    }
  },
}).demandCommand(1, 'You should try using a command');

/**
 * Command that to create a new directory
 */
yargs.command({
    command: 'mkdir',
    describe: 'Add a new directory',
    builder: {
      path: {
        describe: 'Create a new directory',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.path === 'string' && !existsSync(argv.path)) {
        const mkdir = spawn('mkdir', [argv.path]);
        mkdir.on('close', () => {
          process.stdout.write('Directory ' + argv.path +
            ' created succesfully\n');
        });
      } else {
        console.log('Cannot create the directory ' +
          argv.path + ': Already exists');
      }
    },
}).demandCommand(1, 'You should try using a command');

/**
 * Command that to list all files of directory
 */
yargs.command({
  command: 'ls',
  describe: 'List all files of directory',
  builder: {
    path: {
      describe: 'path',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string' && existsSync(argv.path)) {
      const ls = spawn('ls', [argv.path]);
      ls.stdout.on('data', (output) => {
        process.stdout.write(output);
      });
    } else {
      console.log('Error opening the directory: Unexisting path');
    }
  },
}).demandCommand(1, 'You should try using a command');

/**
 * Command that show a file's content
 */
yargs.command({
  command: 'cat',
  describe: 'Show file s content',
  builder: {
    path: {
      describe: 'file',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string' && existsSync(argv.path)) {
      const cat = spawn('cat', [argv.path]);
      cat.stdout.on('data', (output) => {
        process.stdout.write(output);
      });
    } else {
      console.log('Error opening the file: Unexisting path');
    }
  },
}).demandCommand(1, 'You should try using a command');

/**
 * Command that to remove a directory or a file
 */
yargs.command({
  command: 'rm',
  describe: 'Given a path to a file or directory, removes it',
  builder: {
    path: {
      describe: 'Path to the file or directory',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string' && existsSync(argv.path)) {
      if (lstatSync(argv.path).isDirectory()) {
        const rmdir = spawn('rmdir', [argv.path]);
        rmdir.on('close', () => {
          process.stdout.write('Directory ' + argv.path +
            ' deleted succesfully.\n');
        });
      } else {
        const rm = spawn('rm', [argv.path]);
        rm.on('close', () => {
          process.stdout.write('File ' + argv.path +
            ' deleted succesfully.\n');
        });
      }
    } else {
      console.log('Error removing the file/directory: Unexisting path');
    }
  },
}).demandCommand(1, 'You should try using a command');


yargs.command({
  command: 'move',
  describe: 'Moves contents from files or directory from an ' +
    'origin route to a destiny route',
  builder: {
    origin: {
      describe: 'Path to the file or directory to be copied/moved',
      demandOption: true,
      type: 'string',
    },
    destiny: {
      describe: 'Path where data is copied/moved to',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.origin === 'string' && typeof argv.destiny === 'string' &&
      existsSync(argv.origin)) {
      // Si la ruta de origen es un diretorio, se debe copiar dicho directorio
      // y todo su contenido en la ruta destino
      if (lstatSync(argv.origin).isDirectory()) {
        const cp = spawn('cp', ['-r', argv.origin, argv.destiny]);
        cp.on('close', () => {
          process.stdout.write('Content copied succesfully!\n');
        });
      } else {
        const mv = spawn('mv', [argv.origin, argv.destiny]);
        mv.on('close', () => {
          process.stdout.write('File moved succesfully!\n');
        });
      }
    } else {
      console.log('Error moving/copying the file/directory: Unexisting path');
    }
  },
}).demandCommand(1, 'You should try using a command');

yargs.parse();
