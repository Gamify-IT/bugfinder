import { BugFinderGame } from '@/services/bugfindergame';

describe('bugfindergame.ts', () => {
  let bugfindergame: BugFinderGame;
  beforeEach(() => {
    bugfindergame = new BugFinderGame('');
  });
  it('True is true', () => {
    expect(true).toBe(true);
  });
});
