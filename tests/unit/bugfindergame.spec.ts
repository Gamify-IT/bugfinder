import { BugFinderGame } from '@/services/bugfindergame';

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
