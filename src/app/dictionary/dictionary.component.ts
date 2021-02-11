import {ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {DictionaryService} from './dictionary.service';
import {Test} from '../model/test';
import {EnglishWord} from '../model/englishWord';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ChallengeService} from '../challenge/challenge.service';
import {ChallengeResult} from '../model/ChallengeResult';


@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class DictionaryComponent implements OnInit {

  id: number;
  test: Test;
  listOfAllWords: EnglishWord[] = [];
  sub: Subscription;
  filters = {
    keyword: ''
  };
  filterSubject = new Subject();
  dictionaryAddWordForm: FormGroup;
  dictionaryEditWordForm: FormGroup;
  editedWordId: number;
  hiddenRow = true;
  ranking: ChallengeResult[] = [];
  totalRecords:number
  page:number = 1

  constructor(private dictionaryService: DictionaryService, private challengeService: ChallengeService) {

  }

  ngOnInit(): void {
    this.sub = this.dictionaryService.refreshListOfWords.subscribe(() => {
      this.showListOfWords();
    });
    this.filterSubject.subscribe(() => {
      this.showListOfWords();
    });
    this.showListOfWords();
  }

  getTest() {
    this.sub = this.dictionaryService.getTest().subscribe((resp: Test) => {
      this.test = resp;
    });
  }

  showListOfWords() {
    this.sub = this.dictionaryService.getListOfWords().subscribe(response => {
      this.listOfAllWords = this.filterWords(response);
      this.totalRecords = this.listOfAllWords.length;
    });
  }

  onAddWord() {
    const values = this.dictionaryAddWordForm.value.newWord;
    const words: EnglishWord[] = [];
    for (let valuesKey of values) {
      words.push(valuesKey);
    }
    console.log(words)
    this.dictionaryService.addWord(words).subscribe(response => {
    });
  }

  onDeleteWord(id: number) {
    this.dictionaryService.deleteWord(id);
  }

  onEditWord() {
    const word = this.dictionaryEditWordForm.value.word;
    const translation = this.dictionaryEditWordForm.value.translation;
    this.dictionaryService.editWord(new EnglishWord(this.editedWordId, word, translation));
  }

  filterWords(listOfWords: EnglishWord[]) {
    return listOfWords.filter(word => {
      return word.word.toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }
  onCleanFilter() {
    this.filters.keyword = '';
    this.filterSubject.next();
  }

  onInitFormToAddWord() {
    const newWord = new FormArray([
      new FormGroup({
        word: new FormControl('123'),
        translation: new FormControl('123')
      })
    ]);
    this.dictionaryAddWordForm = new FormGroup({
      newWord: newWord,
    });
  }

  get controls() { // a getter!
    return (this.dictionaryAddWordForm.get('newWord') as FormArray);
  }

  onAddMoreWords() {
    this.controls.push(
      new FormGroup({
        word: new FormControl('456'),
        translation: new FormControl('456')
      })
    );
  }

  onAddLessWords(index: number) {
    this.controls.removeAt(index);
  }

  onInitEditForm(word: EnglishWord) {
    this.editedWordId = word.id;
    this.dictionaryEditWordForm = new FormGroup({
      word: new FormControl(word.word),
      translation: new FormControl(word.translation)
  });
 }
 onShowRanking() {
    this.challengeService.fetchRanking().subscribe(ranking => {
      this.ranking = ranking;
      console.log(ranking)
    })
 }
}
