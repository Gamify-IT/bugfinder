import { BugFinderGame } from '@/models/bugfindergame';
import { Word, Code, WordType } from '@/models/models';

function exampleCodes(): Code[] {
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

describe('bugfindergame.ts', () => {
  let bugfindergame: BugFinderGame;
  beforeEach(() => {
    bugfindergame = new BugFinderGame(exampleCodes());
  });
  it('Error when codes are empty', () => {
    expect(() => {
      new BugFinderGame([]);
    }).toThrow();
  });
  it('Fails when want to go to next code but did not finish current code', () => {
    expect(() => {
      bugfindergame.nextCode();
    }).toThrow();
  });
  it('Succeed to submit right bug word', () => {
    const result = bugfindergame.submitWrongCode(1);
    expect(result).toBe(true);
  });
  it('Succeed to submit wrong bug word', () => {
    const result = bugfindergame.submitWrongCode(4);
    expect(result).toBe(false);
  });
  it('Succed to get hasSubmitted false when not submitted', () => {
    expect(bugfindergame.hasSubmitted()).toBe(false);
  });
  it('Succed to get hasSubmitted true when already submitted', () => {
    bugfindergame.submitWrongCode(1);
    expect(bugfindergame.hasSubmitted()).toBe(true);
  });
  it('Fails when submits twice', () => {
    bugfindergame.submitWrongCode(1);
    expect(() => bugfindergame.submitWrongCode(1)).toThrow();
  });
  it('Succeed when want to go to next code and finished current', () => {
    const result = bugfindergame.submitWrongCode(1);
    bugfindergame.nextCode();
    expect(result).toBe(true);
  });
  it('Fails when we run out of codes', () => {
    const result1 = bugfindergame.submitWrongCode(1);
    bugfindergame.nextCode();
    const result2 = bugfindergame.submitWrongCode(3);
    expect(result1).toBe(true);
    expect(result2).toBe(true);
    expect(() => bugfindergame.nextCode()).toThrow();
  });
});
