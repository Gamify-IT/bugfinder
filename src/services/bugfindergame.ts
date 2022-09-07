import { ICode, ISolution, IBug } from '@/models/code';
import { CodeFeedback, WordFeedback } from '@/services/code-feedback';
import { BASE_URL } from '@/app';

export class BugFinderGame {
  // list whether player successful solved a code or not. Empty on entry if not submitted yet.
  private solved: Array<boolean> = [];

  private currentCodeNumber: number;
  private currentCode?: ICode;

  public constructor() {
    this.currentCodeNumber = 0;
  }

  /**
   * @returns the current code
   */
  public async getCurrentCode(): Promise<ICode> {
    if (this.currentCode === undefined) {
      return await this.fetchCurrentCode();
    }
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
  public async submitWrongCode(submittedSolution: ISolution): Promise<CodeFeedback> {
    if (this.hasSubmitted()) {
      throw Error('You already submitted this code.');
    }
    const playerBugs: IBug[] = submittedSolution.bugs;
    const realSolution = await this.fetchSolution();
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
  public async hasNextCode(): Promise<boolean> {
    const length = await this.fetchCodeLength();
    return this.currentCodeNumber + 1 < length;
  }

  /**
   * Switch to the next code.
   *
   * @throws {Error} when game has not one more code to play
   * @throws {Error} when player does not submitted current code and wants to play next
   */
  public async nextCode(): Promise<void> {
    if (!this.hasNextCode()) {
      throw Error('There are no more codes left!');
    }
    // Did not finish last task
    if (!this.hasSubmitted()) {
      throw Error('You did not complete this code!');
    }
    this.currentCodeNumber++;
    this.currentCode = await this.fetchCurrentCode();
  }

  /**
   * fetches the current code from the server and sets it as currentCode
   */
  private async fetchCurrentCode() {
    const configuration = window.location.pathname.split('/').pop();
    if (configuration == null) {
      throw Error('No configuration selected!');
    }
    this.currentCode = (await this.getCodes())[this.currentCodeNumber];
    return this.currentCode;
  }

  /**
   * fetches the length of all codes
   */
  private async fetchCodeLength() {
    const configuration = window.location.pathname.split('/').pop();
    if (configuration == null) {
      throw Error('No configuration selected!');
    }
    return (await this.getCodes()).length;
  }

  private codeCache?: ICode[];
  private async getCodes(): Promise<ICode[]> {
    const configuration = window.location.pathname.split('/').pop();
    if (configuration == null) {
      throw Error('No configuration selected!');
    }
    if (this.codeCache === undefined) {
      const res = await fetch(`${BASE_URL}/configuration/${configuration}/codes`);
      this.codeCache = (await res.json()) as ICode[];
    }
    return this.codeCache;
  }

  /**
   * fetches the solution for the current code
   */
  private async fetchSolution() {
    const configuration = window.location.pathname.split('/').pop();
    if (configuration == null) {
      throw Error('No configuration selected!');
    }
    const res = await fetch(`${BASE_URL}/code/${this.currentCode?.id}/solution`);
    const json = (await res.json()) as ISolution;
    return json;
  }
}
