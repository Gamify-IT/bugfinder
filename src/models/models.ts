export enum WordType {
  TAB = '<tab>',
  SPACE = ' ',
  NEWLINE = '\n',
}

export interface ICode {
  id: number;
  words: IWord[];
}

export interface IWord {
  id: number;
  word: string | WordType;
}

export interface ISolution {
  id: number;
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
  wordId: number;
  errorType: string;
  correctValue: string;
}

export class Word implements IWord {
  id: number;
  word: string | WordType;

  public constructor(id: number, word: string | WordType) {
    this.id = id;
    this.word = word;
  }
}

export class Code implements ICode {
  id = 0;
  words: IWord[] = [];

  public constructor(id: number, words: IWord[]) {
    this.id = id;
    this.words = words;
  }
}

export class Solution implements ISolution {
  id: number;
  bugs: IBug[];

  public constructor(id: number, bugs: IBug[]) {
    this.id = id;
    this.bugs = bugs;
  }
}

export class Bug implements IBug {
  wordId: number;
  errorType: ErrorType;
  correctValue: string;

  public constructor(wordId: number, errorType: ErrorType, correctValue: string) {
    this.wordId = wordId;
    this.errorType = errorType;
    this.correctValue = correctValue;
  }
}
