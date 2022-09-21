import { ISolution } from './code';

export class Result {
  submittedSolutions: ISubmittedSolution[] = [];

  constructor(public configurationId: string) {}

  addSolution(codeId: string, solution: ISolution) {
    this.submittedSolutions.push({ codeId, solution });
  }
}

export interface ISubmittedSolution {
  codeId: string;
  solution: ISolution;
}
