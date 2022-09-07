import { IBug } from '@/models/code';

export class CodeFeedback {
  wordFeedbacks: WordFeedback[];

  public constructor(wordFeedbacks: WordFeedback[]) {
    this.wordFeedbacks = wordFeedbacks;
  }

  /**
   *
   * @param wordId id of the word searching for
   * @returns whether word with wordId has a feedback in list or not
   */
  public hasFeedback(wordId: number | string): boolean {
    return this.wordFeedbacks.find((feedback) => feedback.bug.wordId == wordId) != null;
  }

  /**
   *
   * @param wordId id of the word searching for
   * @throws {Error} when word with wordId has no feedback
   * @returns the feedback of the word with id wordId
   */
  public getFeedback(wordId: number | string): WordFeedback {
    const wordFeedback = this.wordFeedbacks.find((feedback) => feedback.bug.wordId == wordId);
    if (wordFeedback == null) {
      throw Error('Word with id ' + wordId + ' has no feedback.');
    }
    return wordFeedback;
  }
}

export class WordFeedback {
  bug: IBug;
  success: boolean;
  codeSelectedSuccessful: boolean;
  codeErrorTypeSuccessful: boolean;
  codeFixedSuccessful: boolean;

  public constructor(
    bug: IBug,
    success: boolean,
    codeSelectedSuccessful: boolean,
    codeErrorTypeSuccessful: boolean,
    codeFixedSuccessful: boolean
  ) {
    this.bug = bug;
    this.success = success;
    this.codeSelectedSuccessful = codeSelectedSuccessful;
    this.codeErrorTypeSuccessful = codeErrorTypeSuccessful;
    this.codeFixedSuccessful = codeFixedSuccessful;
  }
}
