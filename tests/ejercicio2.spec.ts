import 'mocha';
import {expect} from 'chai';
import * as fs from 'fs';
import {execSync} from 'child_process';
import {} from '../src/ejercicio04';

console.log = function() {};
const test = (args: string): string => {
  return execSync(`node dist/ejercicio04.js ${args}`)
      .toString();
};


describe('Ejercicio4 - Tests', () => {
  it(`test('check --path ./database/eje2.txt') should return is a file`, () => {
    expect(test('check --path ./database/eje2.txt')).to.equal('./database/eje2.txt is a file\n');
  });

  it(`test('check --path ./database/user1') should return is a Directory`, () => {
    expect(test('check --path ./database/user1')).to.equal('./database/user1 is a Directory\n');
  });
  
  it(`test('check --path ./database/user7') should return There is no path called ./database/user7`, () => {
    expect(test('check --path ./database/user7')).to.equal('There is no path called ./database/user7\n');
  });

  it(`test('mkdir --path ./database/user3') should return Directory ./database/user3 created succesfully`, () => {
    expect(test('mkdir --path ./database/user3')).to.equal('Directory ./database/user3 created succesfully\n');
  });

  it(`test('cat --path ./database/helloworld.txt') should return Directory ./database/user2 created succesfully`, () => {
    expect(test('cat --path ./database/helloworld.txt')).to.equal('hello world');
  });

  it(`test('rm --path ./database/user3') should return Directory ./database/user3 deleted succesfully`, () => {
    expect(test('rm --path ./database/user3')).to.equal('Directory ./database/user3 deleted succesfully.\n');
  });
//   it(`test('mkdir --path ./database/user2') should return Directory ./database/user2 deleted succesfully`, () => {
//     expect(test('rm --path ./database/user2')).to.equal('Directory ./database/user2 deleted succesfully\n');
//   });
});

// fs.rmdirSync('./database', {recursive: true});