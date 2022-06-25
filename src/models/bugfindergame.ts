import { WordType, ICode, Code, Word } from './models';

// TODO: Definitely make it work without manually specifying id
export function exampleCodes(): Code[] {
  const codes: Code[] = [
    new Code(1, [
      new Word(1, 'prublic'),
      new Word(2, 'void'),
      new Word(3, 'sayHello()'),
      new Word(4, '{'),
      new Word(5, WordType.NEWLINE),
      new Word(6, WordType.TAB),
      new Word(7, 'String'),
      new Word(8, 'test'),
      new Word(9, '='),
      new Word(10, '"HALLO";'),
      new Word(11, WordType.NEWLINE),
      new Word(12, WordType.TAB),
      new Word(13, 'System.out.println("HELLO THERE!");'),
      new Word(14, WordType.NEWLINE),
      new Word(15, '}'),
    ]),
    new Code(3, [
      new Word(1, 'public'),
      new Word(2, 'void'),
      new Word(3, '4You()'),
      new Word(4, '{'),
      new Word(5, WordType.NEWLINE),
      new Word(6, '}'),
    ]),
    new Code(2, [
      new Word(1, 'public'),
      new Word(2, 'Dog'),
      new Word(3, 'getNewHamster()'),
      new Word(4, '{'),
      new Word(5, WordType.NEWLINE),
      new Word(6, WordType.TAB),
      new Word(7, 'Hamster'),
      new Word(8, 'paule'),
      new Word(9, '='),
      new Word(10, 'new'),
      new Word(11, 'Hamster();'),
      new Word(12, WordType.NEWLINE),
      new Word(13, WordType.TAB),
      new Word(14, 'return'),
      new Word(15, 'paule;'),
      new Word(16, WordType.NEWLINE),
      new Word(17, '}'),
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
   * @returns the current code
   */
  public getCurrentCode(): ICode {
    return this.currentCode;
  }

  /**
   *
   * Checks if the submitted bug word is really a bug word or not.
   *
   * @param bugWordId the number of the clicked word
   *
   * @throws {Error} when player already submitted bug for this code
   *
   * @returns true when found right bug word and false when not
   */
  public submitWrongCode(bugWordId: number): boolean {
    if (this.hasSubmitted()) {
      throw Error('You already submitted this code.');
    }
    this.solved[this.currentCodeNumber] = this.currentCode.bugWordId == bugWordId;
    return this.solved[this.currentCodeNumber];
  }
  /**
   *
   * @returns whether the player submitted a bug for the current code or not
   */
  public hasSubmitted(): boolean {
    return this.solved[this.currentCodeNumber] != undefined;
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
    if (!this.hasSubmitted()) {
      throw Error('You did not complete this code!');
    }
    this.currentCodeNumber++;
    this.currentCode = this.codes[this.currentCodeNumber];
  }
}
