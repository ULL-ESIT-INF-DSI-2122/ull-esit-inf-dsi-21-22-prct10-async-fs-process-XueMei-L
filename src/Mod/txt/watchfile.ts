/* eslint-disable no-trailing-spaces */
import {spawn} from "node:child_process";
import * as fs from 'fs';

/**
 * Watchfile
 */
if (process.argv.length < 3) {
  console.log( "Error args.");
} else {
  fs.watch(`./txt/${process.argv[2]}`, (eventType, filename) => {
    fs.readFile(`./txt/${filename}`, (err, data) => {
      if (err) throw err;
      const node = spawn('node', ['../dist/suma.js', `${process.argv[2]}`]);
      node.stdout.pipe(process.stdout);
        
      let wcOutput = '';
      node.stdout.on('data', (piece) => wcOutput += piece);
      node.stdout.on('data', (data) => {
        console.log(data);
      });
      const wcOutputAsArray = wcOutput.split(/\s+/);
      console.log(`wc ${wcOutputAsArray[0]}`);

      console.log(eventType);
      console.log(filename);
    });
  });
}

// node dist/sum.js file
