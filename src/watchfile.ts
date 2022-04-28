/* eslint-disable no-trailing-spaces */
import {spawn} from "node:child_process";
import * as fs from 'fs';

/**
 * Watchfile
 */
if (process.argv.length < 3) {
  console.log( "Error args.");
} else {
  fs.watchFile(`./txt/${process.argv[2]}`, (curr, prev) => {
    console.log(`Size = ${prev.size} bytes before`);
    console.log(`Size = ${curr.size} bytes after.`);

    const node = spawn('node', ['../dist/suma.js', `${process.argv[2]}`]);
    // console.log(`running sum.js`);
    node.stdout.pipe(process.stdout);
  });
}

// node dist/sum.js file

// fs.watch(`./txt/${process.argv[2]}`, (eventType, filename) => {
//   fs.readFile(`./txt/${filename}`, (err, data) => {
//     if (err) throw err;
//     const node = spawn('node', ['../dist/suma.js', `${process.argv[2]}`]);
//     node.stderr.pipe(process.stdout);
//   });
//   console.log(eventType);
//   console.log(filename);
// });
