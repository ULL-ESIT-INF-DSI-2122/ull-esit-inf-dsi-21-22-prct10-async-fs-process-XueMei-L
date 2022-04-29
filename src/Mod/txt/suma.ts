/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable indent */
import * as fs from 'fs';

/**
 * Class SumOfListInFile
 */
class SumOfListInFile {
    constructor() {}

    /**
     * Metodo para escuchar el fichero numberlist.txt y detectar el cambio
     */
    calculateSum() {
        if (process.argv.length < 3) {
            console.log( "Error args.");
        } else {
            // console.log(process.argv[2]); change / remake
            fs.access(`../src/Mod/txt/${process.argv[2]}`, fs.constants.R_OK, (err) => {
                console.log('\n> Checking Permission for reading the file');
                if (err) {
                    console.error('There is not file to access');
                } else {
                    console.log(`There is a file called ${process.argv[2]}`);
                    fs.watchFile(`../src/Mod/txt/${process.argv[2]}`, (curr, prev) => {
                        console.log(`File was ${prev.size} bytes before it was modified.`);
                        console.log(`Now file is ${curr.size} bytes.`);
                        const filename = `${process.argv[2]}`;
                        fs.readFile(`../src/Mod/txt/${filename}`, (err, data) => {
                            if (err) throw err;
                            const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
                            let sum = 0;
                            for (let i = 0; i < arr.length; i++) {
                                sum += parseInt(arr[i]);
                            }
                            console.log(`sum = ${sum}`);
                        });
                    });
                }
              });
        }
    }
}

// Call instance of the class SumOfListInFile
const a = new SumOfListInFile();
a.calculateSum();