import { CodeVisualizer } from '@/models/code-visualizer';
import { IWord, Word, Code, WordType } from '@/models/models';

function exampleCode(): Code {
  return new Code(1, [
    new Word(1, 'prublic'),
    new Word(2, 'void'),
    new Word(3, 'sayHello()'),
    new Word(4, '{'),
    new Word(5, WordType.NEWLINE),
    new Word(6, WordType.TAB),
    new Word(7, 'System.out.println("HELLO THERE!");'),
    new Word(8, WordType.NEWLINE),
    new Word(9, '}'),
  ]);
}

describe('code-visualizer.ts', () => {
  let codeVisualizer: CodeVisualizer;
  beforeEach(() => {
    codeVisualizer = new CodeVisualizer(exampleCode());
  });
  it('Success when returns line list with words of code', () => {
    const codeLines: Array<Array<IWord>> = codeVisualizer.getCodeLineWords();
    expect(codeLines.length).toBe(3);

    const firstLine = codeLines[0];
    const secondLine = codeLines[1];
    const thirdLine = codeLines[2];

    expect(firstLine.length).toBe(4);
    expect(secondLine.map((word) => word.word)).toContain(WordType.TAB);
    expect(secondLine.length).toBe(2);
    expect(thirdLine.length).toBe(1);

    let firstLineString = '';
    for (const word of firstLine) {
      firstLineString += (firstLineString.length > 0 ? ' ' : '') + word.word;
    }
    expect(firstLineString).toBe('prublic void sayHello() {');
  });
});
