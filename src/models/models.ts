export enum WordType {
  TAB = ' ',
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
  STATIC_SEMANTIC = 'STATIC_SEMANTIC',
  SYNTAX = 'SYNTAX',
  DYNAMIC_SEMANTIC = 'DYNAMIC_SEMANTIC',
  LEXICAL = 'LEXICAL',
  PRACMATIC = 'PRACMATIC',
}

export interface IBug {
  wordId: number;
  errorType: string;
}

export class Word implements IWord {
  id: number;
  word: string | WordType;

  public constructor(id: number, word: string | WordType) {
    this.id = id;
    this.word = word;
  }
}

export enum ChatParticipant {
  ME,
  OTHER,
}

export class ChatElement {
  from: ChatParticipant;
  message: string;

  public constructor(from: ChatParticipant, message: string) {
    this.from = from;
    this.message = message;
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

  public constructor(wordId: number, errorType: ErrorType) {
    this.wordId = wordId;
    this.errorType = errorType;
  }
}
