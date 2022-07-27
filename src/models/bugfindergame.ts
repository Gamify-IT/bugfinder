import { ICode, ISolution, IBug } from './models';
import { CodeFeedback, WordFeedback } from './code-feedback';
import codesJson from '@/dummy/codes.json';
import solutionJson from '@/dummy/solution.json';
const codes: ICode[] = codesJson;
const solutions: ISolution[] = solutionJson;

export class BugFinderGame {
  // list whether player successful solved a code or not. Empty on entry if not submitted yet.
  private solved: Array<boolean> = [];

  private currentCodeNumber = 0;
  private currentCode = codes[0];

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
   * @returns a list with feedback which contains detailed information what the player did wrong in the code
   */
  public submitWrongCode(submittedSolution: ISolution): CodeFeedback {
    if (this.hasSubmitted()) {
      throw Error('You already submitted this code.');
    }
    const playerBugs: IBug[] = submittedSolution.bugs;
    const realSolution: ISolution = solutions[this.currentCodeNumber];
    const bugs: IBug[] = realSolution.bugs;

    const wordFeedbacks: WordFeedback[] = [];

    bugs.forEach((bug) => {
      const playerSpecificBug = playerBugs.find((playerBug) => playerBug.wordId == bug.wordId);
      const feedback = new WordFeedback(bug, true, true, true, true);

      if (playerSpecificBug == null) {
        feedback.success = false;
        feedback.codeSelectedSuccessful = false;
        feedback.codeErrorTypeSuccessful = false;
        feedback.codeFixedSuccessful = false;
      } else {
        if (playerSpecificBug.errorType != bug.errorType) {
          feedback.success = false;
          feedback.codeErrorTypeSuccessful = false;
        }
        if (playerSpecificBug.correctValue != bug.correctValue) {
          feedback.success = false;
          feedback.codeFixedSuccessful = false;
        }
      }
      wordFeedbacks.push(feedback);
    });

    const falseSubmittedBugs = playerBugs.filter((playerBug) => bugs.filter((bug) => bug.wordId == playerBug.wordId).length == 0);

    falseSubmittedBugs.forEach((falseBug) => {
      const feedback = new WordFeedback(falseBug, false, false, false, false);
      wordFeedbacks.push(feedback);
    });
    this.solved[this.currentCodeNumber] = wordFeedbacks.find((feedback) => !feedback.success) == null;

    return new CodeFeedback(wordFeedbacks);
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
