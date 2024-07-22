import { Bug, Code, ErrorType, IBug, ICode, ISolution, Solution, Word } from '@/models/code';
import { BugFinderGame } from '@/services/bugfindergame';
import mockAxios from 'jest-mock-axios';
import clickSoundSource from '@/assets/music/click_sound.mp3'

jest.mock('axios');

describe('bugfindergame.ts', () => {
  let bugfindergame: BugFinderGame;
  const configurationId = 'uniqueConfigurationID';
  let codes: ICode[];
  beforeEach(() => {
    bugfindergame = new BugFinderGame(configurationId);
    jest.clearAllMocks();
    codes = [
      new Code('code-1', [
        new Word('word-1-1', 'prublic'),
        new Word('word-1-2', ' '),
        new Word('word-1-3', 'void'),
        new Word('word-1-4', 'hello()'),
      ]),
      new Code('code-2', [
        new Word('word-2-1', 'public'),
        new Word('word-2-2', ' '),
        new Word('word2-3', 'void'),
        new Word('word-2-4', 'bye()'),
      ]),
    ];
    const codesResponse = {
      data: codes,
    };
    mockAxios.get.mockResolvedValueOnce(codesResponse);
  });
  it('Resolve first code', async () => {
    const currentCode: ICode = await bugfindergame.getCurrentCode();
    expect(codes).toContain(currentCode);
  });
  it('Submit code and get next', async () => {
    const currentCode: ICode = await bugfindergame.getCurrentCode();
    const bugs: IBug[] = [new Bug(currentCode.words[0].id, ErrorType.LEXICAL, 'public')];
    const solution: ISolution = new Solution(undefined, bugs);
    const submitWrongCode = bugfindergame.submitWrongCode(solution);
    mockAxios.mockResponse({ data: { id: `solution-${currentCode.id}`, bugs: bugs } });
    await submitWrongCode;
    await bugfindergame.nextCode();
  });
  it('Get next code without submitting previous code throws error', async () => {
    await bugfindergame.getCurrentCode();
    let error: boolean;
    try {
      await bugfindergame.nextCode();
      error = false;
    } catch (err) {
      error = true;
    }
    expect(error).toBe(true);
  });
});
