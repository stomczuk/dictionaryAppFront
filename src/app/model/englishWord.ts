export class EnglishWord {

  id?: number
  word: string;
  translation: string;


  constructor(id: number, word: string, translation: string) {
    this.id = id;
    this.word = word;
    this.translation = translation;
  }
}
