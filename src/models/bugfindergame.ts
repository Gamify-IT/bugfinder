import { ICode, ISolution, IBug } from './models';
import codesJson from '@/dummy/codes.json';
import solutionJson from '@/dummy/solution.json';
const codes: ICode[] = codesJson;
const solutions: ISolution[] = solutionJson;

export class BugFinderGame {
  // list whether player successful solved a code or not. Empty on entry if not submitted yet.
  private solved: Array<boolean> = [];

  private currentCodeNumber: number;
  private currentCode: ICode;

  public constructor() {
    this.currentCode = codes[0];
    this.currentCodeNumber = 0;
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
   * @param submittedSolution list of bugs
   *
   * @throws {Error} when player already submitted bug for this code
   *
   * @returns a list with mistakes in the code
   */
  public submitWrongCode(submittedSolution: ISolution): Array<boolean> {
    if (this.hasSubmitted()) {
      throw Error('You already submitted this code.');
    }
    const playerBugs: IBug[] = submittedSolution.bugs;
    const realSolution: ISolution = solutions[this.currentCodeNumber];
    const bugs: IBug[] = realSolution.bugs;

    const solutionFeedback: Array<boolean> = [];

    bugs.forEach((bug) => {
      const playerSpecificBug = playerBugs.find((playerBug) => playerBug.wordId == bug.wordId);

      if (playerSpecificBug == null) {
        solutionFeedback[bug.wordId] = false;
      } else if (playerSpecificBug.errorType != bug.errorType) {
        solutionFeedback[bug.wordId] = false;
      } else if (playerSpecificBug.correctValue != bug.correctValue) {
        solutionFeedback[bug.wordId] = false;
      } else {
        solutionFeedback[bug.wordId] = true;
      }
    });

    const falseSubmittedBugs = playerBugs.filter((playerBug) => bugs.filter((bug) => bug.wordId == playerBug.wordId).length == 0);

    falseSubmittedBugs.forEach((falseBug) => {
      solutionFeedback[falseBug.wordId] = false;
    });
    this.solved[this.currentCodeNumber] = solutionFeedback.find((bool) => bool == false) == null;

    return solutionFeedback;
  }

  /**
   *
   * @returns wether the player passed the current code or not
   */
  public passedCurrentCode(): boolean {
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
    return this.currentCodeNumber + 1 < codes.length;
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
    this.currentCode = codes[this.currentCodeNumber];
  }
}
