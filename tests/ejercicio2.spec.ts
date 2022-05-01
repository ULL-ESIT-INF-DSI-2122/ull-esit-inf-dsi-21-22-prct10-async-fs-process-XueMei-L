import 'mocha';
import {expect} from 'chai';
import {execSync} from 'child_process';

console.log = function() {};
const test = (args: string): string => {
  return execSync(`node dist/ejercicio02.js cat ${args}`)
      .toString();
};

describe('Ejercicio2 - Tests', () => {
  // With pipe
  it(`test('cat --file ./database/eje2.txt --pipe --grep hello') should Command with pipe mode....\
  ! Accessing file [./database/eje2.txt]!\n
  File execise01, hello world.\r\n`, () => {
    expect(test('cat --file ./database/eje2.txt --pipe --grep hello')).
        to.equal(`Command with pipe mode....\nGreat! Accessing file [./database/eje2.txt]!\nFile execise01, hello world.\r\n`);
  });

  // Without pipe
  it(`test('cat --file ./database/eje14.txt --pipe --grep false hello') should return is a file`, () => {
    expect(test('cat --file ./database/eje2.txt --pipe false --grep hello')).
        to.equal(`Command without pipe mode....\nGreat! Accessing file [./database/eje2.txt]!\nSentences with the keyword [hello] \n\nFile execise01, hello world.\r\n\n`);
  });
});
