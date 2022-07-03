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
    bugfindergame = new BugFinderGame();
  });
  it('Fails when want to go to next code but did not finish current code', () => {
    expect(() => {
      bugfindergame.nextCode();
    }).toThrow();
  });
});
