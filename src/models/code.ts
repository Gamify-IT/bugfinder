export enum WordType {
  TAB = '<tab>',
  SPACE = ' ',
  NEWLINE = '\n',
}

export interface ICode {
  id: string;
  words: IWord[];
}

export interface IWord {
  id: string | number;
  word: string | WordType;
}

export interface ISolution {
  id?: string;
  bugs: IBug[];
}

export enum ErrorType {
  UNDEFINED = 'UNDEFINED',
  STATIC_SEMANTIC = 'STATIC_SEMANTIC',
  SYNTAX = 'SYNTAX',
  DYNAMIC_SEMANTIC = 'DYNAMIC_SEMANTIC',
  LEXICAL = 'LEXICAL',
  PRAGMATIC = 'PRAGMATIC',
}

export interface IBug {
  wordId: number | string;
  errorType: string;
  correctValue: string;
}

export class Word implements IWord {
  id: string;
  word: string | WordType;

  public constructor(id: string, word: string | WordType) {
    this.id = id;
    this.word = word;
  }
}

export class Code implements ICode {
  id = '0';
  words: IWord[] = [];

  public constructor(id: string, words: IWord[]) {
    this.id = id;
    this.words = words;
  }
}

export class Solution implements ISolution {
  id?: string;
  bugs: IBug[];

  public constructor(id: string | undefined, bugs: IBug[]) {
    this.id = id;
    this.bugs = bugs;
  }
}

export class Bug implements IBug {
  wordId: number | string;
  errorType: ErrorType;
  correctValue: string;

  public constructor(wordId: number | string, errorType: ErrorType, correctValue: string) {
    this.wordId = wordId;
    this.errorType = errorType;
    this.correctValue = correctValue;
  }
}
