import { ISolution } from './code';

export class Result {
  submittedSolutions: ISubmittedSolution[] = [];


  // besteht jetzt auch score und rewards
  constructor(public configurationId: string, public score: number,
              public rewards: number) {}

  addSolution(codeId: string, solution: ISolution) {
    this.submittedSolutions.push({ codeId, solution });
  }

  static fromDTO(dto: any): Result {
    return new Result(dto.configurationId, dto.score, dto.rewards);
  }
}

export interface ISubmittedSolution {
  codeId: string;
  solution: ISolution;
}

