import {spawn} from 'child_process';
import * as yargs from 'yargs';
import * as fs from 'fs';
import {constants} from 'fs';

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
        console.log(`Using with pepi mode....`);
        withPipe(argv.file, argv.grep as string);
      } else {
        console.log(`Using without pepi mode....`);
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
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Great! Accessing file [${filename}]!`);

      // Subprocess
      const cat = spawn(`cat`, [`${filename}`]);
      const grep = spawn('grep', [`${word}`]);
      let grepOutput = '';

      cat.stdout.pipe(grep.stdin);

      grep.stdout.on('data', (piece) => {
        grepOutput += piece;
      });

      // Utilizando modo pipe, imprime directamente
      // Si no utiliza el modo pipe seria con console.log
      // console.log(grepOutput);
      grep.stdout.pipe(process.stdout);
    }
  });
}

/**
 * _Method that withoutpipe to filter sentences by a word of a file_
 * @param filename file that to read
 * @param word word that to filter
 */
function withoutPipe(filename: string, word?: string) {
  console.log(`without pipe.....`);

  fs.access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Great! Accessing file [${filename}]!`);
      const cat = spawn(`cat`, [`${filename}`]);
      const grep = spawn('grep', [`${word}`]);
      let grepOutput = '';

      cat.stdout.pipe(grep.stdin);

      grep.stdout.on('data', (piece) => {
        grepOutput += piece;
        console.log(grepOutput);
      });
    }
  });
}

/**
 * Process arguments passed from command line to application.
 */
yargs.parse();
