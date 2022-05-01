/* eslint-disable no-unused-vars */
import * as fs from 'fs';
const chalk = require('chalk');

/**
 * colours types
 */
export enum colours {
  red = 'red',
  green = 'green',
  blue = 'blue',
  yellow = 'yellow'
}

/**
 * _Class Notes_
 */
export class Notes {
  private static notes:Notes;

  /**
     * _Constructor of the class Notes_
     */
  constructor() {}

  /**
     * _Method that to return a note_
     */
  public static getNotes(): Notes {
    if (!fs.existsSync(`./database`)) {
      fs.mkdirSync(`./database`, {recursive: true});
    };
    if (!Notes.notes) {
      Notes.notes = new Notes();
    };
    return Notes.notes;
  }

  /**
     * _Method that to list all notes_
     * @param username username (to find the user dir)
     */
  listNotes(username:string):string {
    if (fs.existsSync(`./database/${username}`)) {
      const fileDatabase = fs.readdirSync(`./database/${username}/`);
      let aux = '';
      fileDatabase.forEach((Note) => {
        const noteData = fs.readFileSync(`./database/${username}/${Note}`);
        const noteDataToJsonObj = JSON.parse(noteData.toString());
        console.log(chalk.keyword(noteDataToJsonObj.color)(`${noteDataToJsonObj.title}: ${noteDataToJsonObj.body}`));
        aux += `- ${noteDataToJsonObj.title}: ${noteDataToJsonObj.body}` + '\n';
      });
      return aux;
    } else {
      console.log(`Error, User {${username}} not found!`);
      return `Error, User [${username}] not found!`;
    }
  }

  /**
     * _Method that to read a note specify_
     * @param username username (to find the user dir)
     * @param noteTitle title of note
     */
  readNote(username:string, noteTitle:string):string {
    if (fs.existsSync(`./database/${username}`)) {
      if (fs.existsSync(`./database/${username}/${noteTitle}.json`)) {
        const noteData = fs.readFileSync(`./database/${username}/${noteTitle}.json`);
        const dataNote = JSON.parse(noteData.toString());
        console.log(chalk.keyword(dataNote.color)(`- Title: ${dataNote.title}: ` + `Body: ${dataNote.body}`));
        return `- Title: ${dataNote.title}: ` + `Body: ${dataNote.body}`;
      } else {
        console.log(chalk.red(`There is no note with the title ${noteTitle}`));
        return `There is no note with the title [${noteTitle}]`;
      }
    } else {
      console.log(chalk.red(`User [${username}] not found!`));
      return `Error, User [${username}] not found!`;
    }
  }

  /**
     * _Method that to add a new note_
     * @param username username (to find the user dir)
     * @param title title of note
     * @param body body of note
     * @param color color of note
     */
  addNote(username:string, title:string, body:string, color:string):string {
    const structure = `{ "title": "${title}", "body": "${body}" , "color": "${color}" }`;
    if (fs.existsSync(`./database/${username}`)) {
      if (!fs.existsSync(`./database/${username}/${title}.json`)) {
        fs.writeFileSync(`./database/${username}/${title}.json`, structure);
        console.log(chalk.green(`Sucesfully to add the new note with title: [${title}].`));
        return `Sucesfully to add the new note with title: [${title}].`;
      } else {
        console.log(chalk.red('Could not add the new note, there is a note has the same title.'));
        return 'Could not add the new note, there is a note has the same title.';
      }
    } else {
      fs.mkdirSync(`./database/${username}`);
      fs.writeFileSync(`./database/${username}/${title}.json`, structure);
      console.log(chalk.green(`New User ${username}, Sucesfully to add the new note with title: [${title}].`));
      return `New User [${username}], Sucesfully to add the new note with title: [${title}].`;
    }
  }

  /**
     * _Method that to remove a note with title_
     * @param username username (to find the user dir)
     * @param title title of note
     */
  removeNote(username:string, title:string): string {
    if (fs.existsSync(`./database/${username}`)) {
      if (fs.existsSync(`./database/${username}/${title}.json`)) {
        fs.unlinkSync(`./database/${username}/${title}.json`);
        console.log(chalk.green(`Sucesfully to remove the [${title}] notes.`));
        return `Sucesfully to remove the [${title}] notes.`;
      } else {
        console.log(chalk.red(`Error, there is no one note called [${title}].`));
        return `Error, there is no one note called [${title}].`;
      }
    } else {
      console.log(chalk.red(`Error, User {${username}} not found!`));
      return `Error, User [${username}] not found!`;
    }
  }

  /**
     * _Method that to modify a note specify_
     * @param username username (to find the user dir)
     * @param title title of note
     * @param type type of data to change
     * @param content content to change
     */
  modifyNote(username:string, title:string, type:string, content:string) {
    if (fs.existsSync(`./database/${username}`)) {
      if (fs.existsSync(`./database/${username}/${title}.json`)) {
        const noteData = fs.readFileSync(`./database/${username}/${title}.json`);
        const dataNote = JSON.parse(noteData.toString());
        let aux:string = '';
        switch (type) {
          case 'title':
            const structureTitle = `{ "title": "${content}", "body": "${dataNote.body}" , "color": "${dataNote.color}" }`;
            const beforeTitle:string = dataNote.title;
            fs.renameSync(`./database/${username}/${dataNote.title}.json`, `./database/${username}/${content}.json`);
            fs.writeFileSync(`./database/${username}/${content}.json`, structureTitle);
            aux = `Changed title [${beforeTitle}] to [${content}]`;
            console.log(chalk.green(`Changed title [${beforeTitle}] to [${content}]`));
            break;
          case 'body':
            const structureBody = `{ "title": "${dataNote.title}", "body": "${content}" , "color": "${dataNote.color}" }`;
            aux = `Changed body [${dataNote.body}] to [${content}]`;
            console.log(chalk.green(`Changed body [${dataNote.body}] to [${content}]`));
            fs.writeFileSync(`./database/${username}/${title}.json`, structureBody);
            break;
          case 'color':
            const structureColor = `{ "title": "${dataNote.title}", "body": "${dataNote.body}" , "color": "${content}" }`;
            aux = `Changed color [${dataNote.color}] to [${content}]`;
            console.log(chalk.green(`Changed color [${dataNote.color}] to [${content}]`));
            fs.writeFileSync(`./database/${username}/${title}.json`, structureColor);
            break;
        }
        return aux;
      } else {
        console.log(chalk.red(`Error, there is no one note called [${title}].`));
        return `Error, there is no one note called [${title}].`;
      }
    } else {
      console.log(chalk.red(`Error, User {${username}} not found!`));
      return `Error, User [${username}] not found!`;
    }
  }
}
