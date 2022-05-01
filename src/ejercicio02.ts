import {spawn} from 'child_process';
import * as yargs from 'yargs';
import * as fs from 'fs';
import {constants} from 'fs';
const chalk = require('chalk');

/**
 * Yargs commands
 */
yargs.command({
  command: 'cat',
  describe: 'Shows the information of a file',
  builder: {
    file: {
      describe: 'File\'s path',
      demandOption: true,
      type: 'string',
    },
    pipe: {
      describe: 'Whether to use a pipe or not',
      demandOption: true,
      default: true,
      type: 'boolean',
    },
    grep: {
      alias: 'g',
      describe: 'search files for the occurrence of a string of characters that matches a specified pattern.',
      demand: false,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.file === 'string' && typeof argv.pipe === 'boolean') {
      if (argv.pipe) {
        console.log(chalk.blue(`Command with pipe mode....`));
        withPipe(argv.file, argv.grep as string);
      } else {
        console.log(chalk.blue(`Command without pipe mode....`));
        withoutPipe(argv.file, argv.grep as string);
      }
    }
  },
});


/**
 * _Method that withPipe to filter sentences by a word of a file_
 * @param filename file that to read
 * @param word word that to filter
 */
function withPipe(filename: string, word?: string) {
  fs.access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(chalk.red(`File ${filename} does not exist`));
    } else {
      console.log(chalk.green(`Great! Accessing file [${filename}]!`));

      // Subprocess
      const cat = spawn(`cat`, [`${filename}`]);
      const grep = spawn('grep', [`${word}`]);

      // Using pipe mode
      cat.stdout.pipe(grep.stdin);

      grep.stdout.on('data', (piece) => {
        process.stdout.write(piece);
      });
    }
  });
}

/**
 * _Method that withoutpipe to filter sentences by a word of a file_
 * @param filename file that to read
 * @param word word that to filter
 */
function withoutPipe(filename: string, word?: string) {
  fs.access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(chalk.red(`File ${filename} does not exist`));
    } else {
      console.log(chalk.green(`Great! Accessing file [${filename}]!`));
      const cat = spawn(`cat`, [`${filename}`]);
      const grep = spawn('grep', [`${word}`]);
      let grepOutput = '';

      cat.stdout.on('data', (piece) => {
        grep.stdin.write(piece);
      });
      
      cat.on('close', () => {
        grep.stdin.end();
      });

      grep.stdout.on('data', (piece) => {
        grepOutput += piece;
        console.log(`Sentences with the keyword [${word}] \n`);
        console.log(chalk.yellow(grepOutput));
      });
    }
  });
}

/**
 * Process arguments passed from command line to application.
 */
yargs.parse();
