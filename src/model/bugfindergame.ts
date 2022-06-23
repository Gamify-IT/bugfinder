import { WordType, ICode, IWord, Code, Word } from './models';

// TODO: Definitely make it work without manually specifying id
export function exampleCodes(): Code[] {
  const codes: Code[] = [
    new Code(1, [
      new Word(1, 'prublic'),
      new Word(2, 'void'),
      new Word(3, 'sayHello'),
      new Word(4, '{'),
      new Word(5, WordType.NEWLINE),
      new Word(6, WordType.TAB),
      new Word(7, 'System.out.println("HELLO THERE!");'),
      new Word(8, WordType.NEWLINE),
      new Word(9, '}'),
    ]),
    new Code(3, [
      new Word(1, 'public'),
      new Word(2, 'void'),
      new Word(3, 'HALLLOOO'),
      new Word(4, '{'),
      new Word(5, WordType.NEWLINE),
      new Word(6, '}'),
    ]),
  ];

  return codes;
}

export class BugFinderGame {
  private codes: ICode[];

  // list whether player successful solved a code or not. Empty on entry if not submitted yet.
  private solved: Array<boolean> = [];

  private currentCodeNumber: number;
  private currentCode: ICode;

  public constructor(codes: ICode[]) {
    if (codes.length == 0) {
      throw Error('Codes are empty!');
    }
    this.codes = codes;
    this.currentCodeNumber = 0;
    this.currentCode = this.codes[0];
  }

  /**
   *
   * Checks if the submitted bug word is really a bug word or not.
   *
   * @param bugWordId the number of the clicked word
   * @returns true when found right bug word and false when not
   */
  public submitWrongCode(bugWordId: number): boolean {
    this.solved[this.currentCodeNumber] = this.currentCode.bugWordId == bugWordId);
    return this.solved[this.currentCodeNumber];
  }

  /**
   *
   * @returns the current code
   */
  public getCurrentCode(): ICode {
    return this.currentCode;
  }

  /**
   *
   * @returns the current codes in a list. Per list entry will be one line.
   */
  public getCurrentCodePerLine(): Array<string> {
    const list: Array<string> = [];
    let currentLine = '';
    for (let i = 0; i < this.currentCode.words.length; i++) {
      const wordObj: IWord = this.currentCode.words[i];
      const word = wordObj.word;
      if (word == WordType.NEWLINE) {
        list.push(currentLine);
        currentLine = '';
      } else {
        if (word == WordType.TAB) {
          currentLine += '    ';
        } else {
          currentLine += ' ' + word;
        }
      }
    }
    list.push(currentLine);
    return list;
  }

  /**
   *
   * @returns whether game has at least one more code to play or not
   */
  public hasNextCode(): boolean {
    return this.currentCodeNumber + 1 < this.codes.length;
  }

  /**
   * Switch to the next code.
   *
   * @throws {Error} when game has not one more code to play
   * @throws {Error} when player does not submitted current code and wants to play next
   */
  public nextCode(): void {
    if (!this.hasNextCode()) {
      throw Error('There are no more codes left!');
    }
    // Did not finish last task
    if (this.solved[this.currentCodeNumber] === undefined) {
      throw Error('You did not complete this code!');
    }
    this.currentCodeNumber++;
    this.currentCode = this.codes[this.currentCodeNumber];
  }
}
