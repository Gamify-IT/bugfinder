import { WordType, ICode, IWord, Code } from './models';

export class CodeVisualizer {
  private code: ICode;

  /**
   * Helper class to help to render the code snippet in vue
   *
   * @param code
   */
  public constructor(code: ICode) {
    this.code = code;
  }

  /**
   * Useful to enumerate in vue components
   *
   * @returns list of lines with list of words
   */
  public getCodeLineWords(): Array<Array<IWord>> {
    const lines: Array<Array<IWord>> = [];
    let currentLineWords: Array<IWord> = [];
    for (const wordObj of this.code.words) {
      const word = wordObj.word;
      if (word == WordType.NEWLINE) {
        lines.push(currentLineWords);
        currentLineWords = [];
      } else if (word == WordType.TAB) {
        currentLineWords.push(wordObj);
      } else {
        currentLineWords.push(wordObj);
      }
    }
    lines.push(currentLineWords);
    return lines;
  }

  /**
   * Helpfull to get all words that are in a specific line
   *
   * @param line the id of the line from you want the words
   * @returns the words that stand in the line
   */
  public getLineWordsAsList(line: number): Array<IWord> {
    const list: Array<IWord> = [];
    let currentLine = 0;
    for (const wordObj of this.code.words) {
      const word = wordObj.word;
      if (word == WordType.NEWLINE) {
        currentLine++;
      } else {
        if (currentLine == line) {
          list.push(wordObj);
        }
      }
    }
    return list;
  }

  /**
   * Get the code in right format.
   *
   * Not helpfull to display in vue, because there is not chance (yet) to identify single words that will be clicked.
   *
   * @returns the full code in right format.
   */
  public getInFormat(): string {
    let currentLine = '';
    for (const wordObj of this.code.words) {
      const word = wordObj.word;
      if (word == WordType.NEWLINE) {
        currentLine += '\n';
      } else if (word == WordType.TAB) {
        currentLine += '  ';
      } else {
        currentLine += (currentLine.length <= 0 || currentLine.endsWith('\n') ? '' : ' ') + word;
      }
    }
    return currentLine;
  }
}
