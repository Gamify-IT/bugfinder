import { CodeFeedback, WordFeedback } from '@/services/code-feedback';
import { Bug, ErrorType } from '@/models/code';

function exampleCodeFeedback(): CodeFeedback {
  return new CodeFeedback([new WordFeedback(new Bug(1, ErrorType.LEXICAL, 'public'), false, false, false, false)]);
}

describe('code-feedback.ts', () => {
  let codeFeedback: CodeFeedback;
  beforeEach(() => {
    codeFeedback = exampleCodeFeedback();
  });
  it('Success that selected bug has feedback', () => {
    expect(codeFeedback.hasFeedback(1)).toBeTruthy();
  });
  it('Success that not selected bug has no feedback', () => {
    expect(codeFeedback.hasFeedback(2)).toBeFalsy();
  });
  it('Success when get feedback from a word by id', () => {
    const feedback = codeFeedback.getFeedback(1);
    expect(feedback.bug.wordId).toBe(1);
    expect(feedback.success).toBeFalsy();
    expect(feedback.codeErrorTypeSuccessful).toBeFalsy();
    expect(feedback.codeFixedSuccessful).toBeFalsy();
    expect(feedback.codeSelectedSuccessful).toBeFalsy();
  });
  it('Success when get feedback from a word by id that was not selected as bug', () => {
    expect(() => codeFeedback.getFeedback(2)).toThrow();
  });
});
