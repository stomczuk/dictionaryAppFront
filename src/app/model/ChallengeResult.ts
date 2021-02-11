export class ChallengeResult {

  id: number;
  correctAnswer: number;
  time: string;
  ranking: number;

  constructor(id: number, correctAnswer: number, time: string, ranking: number) {
    this.id = id;
    this.correctAnswer = correctAnswer;
    this.time = time;
    this.ranking = ranking;
  }
}
