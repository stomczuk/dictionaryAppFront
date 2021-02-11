import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {DictionaryService} from '../dictionary/dictionary.service';
import {EnglishWord} from '../model/englishWord';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {ChallengeResult} from '../model/ChallengeResult';
import {ChallengeTime} from '../model/ChallengeTime';
import {ChallengeService} from './challenge.service';

@Component({
  selector: 'app-dictionary-test',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ChallengeComponent implements OnInit, OnDestroy {

  hover;
  fullListOfWordsTest: EnglishWord[] = [];
  decreasingListOfWordsTest: EnglishWord[] = [];
  listOfTranslationsTest: string[] = [];
  listOfThreeTranslationsTest: string[] = [];
  shownWord: EnglishWord;
  randomElement;
  sub: Subscription;
  subjectFullListOfWords = new BehaviorSubject<any>('');
  subjectDecreasingListOfWords = new BehaviorSubject<any>('');
  isBottomStartClicked: boolean = false;
  correctAnswers: number = 0;
  wrongAnswers: number = 0;
  isTheTestOver = false;
  numberOfQuestion = 0;
  controlBtnText = 'Start';
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  start = false;
  pause = false;
  x = 10;
  intervalId;
  placeInRanking: number;
  subjectPlaceInRanking: Subject<number> = new Subject();
  idOfSavedChallengeResult = null;

  constructor(private dictionaryService: DictionaryService, private challengeService: ChallengeService) {
  }

  ngOnInit(): void {
    this.getWordsToTest();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getListOfTranslationsTest(listOfWords: EnglishWord[]) {
    let array = [];
    let correctTranslation = this.randomElement.translation;
    let listOfThreeTranslation = this.listOfThreeTranslationsTest;
    listOfWords.forEach(function(word) {
      array.push(word.translation);
    });
    this.listOfTranslationsTest = array;
    this.listOfTranslationsTest.forEach(function(translation) {
      if (listOfThreeTranslation.length < 3) {
        if (translation != correctTranslation) {
          listOfThreeTranslation.push(translation);
        }
      }
    });
    this.listOfThreeTranslationsTest = this.shuffleList(listOfThreeTranslation);
  }

  showRandomWord() {
    if (this.decreasingListOfWordsTest.length === 0) {
      this.onStopStopWatch();
      this.isTheTestOver = true;
      this.generateTestResult();
      this.getWordsToTest();
      this.print();
    } else {
      this.numberOfQuestions();
      let array = this.decreasingListOfWordsTest;
      this.randomElement = array[Math.floor(Math.random() * array.length)];
      this.shownWord = this.randomElement;
      this.deleteShownWord(array);
      this.listOfThreeTranslationsTest.push(this.randomElement.translation);
    }
  }

  shuffleList(listOfThreeWords) {
    for (let i = listOfThreeWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = listOfThreeWords[i];
      listOfThreeWords[i] = listOfThreeWords[j];
      listOfThreeWords[j] = temp;
    }
    return listOfThreeWords;
  }

  deleteShownWord(array) {
    console.log('array before ' + array.length);
    for (let i = 0; i < array.length; i++) {
      if (array[i] === this.shownWord) {
        console.log('this is my word' + array[i].word);
        array.splice(i, 1);
      }
    }
    console.log('array after ' + array.length);
    return array;
  }

  getWordsToTest() {
    this.sub = this.dictionaryService.getListOfWords().subscribe(response => {
      this.fullListOfWordsTest = response;
      this.decreasingListOfWordsTest = this.fullListOfWordsTest.slice();
      this.subjectFullListOfWords.next(this.fullListOfWordsTest);
      this.subjectDecreasingListOfWords.next(this.decreasingListOfWordsTest);
    });
  }

  loadDataForTest() {
    this.listOfThreeTranslationsTest = [];
    this.showRandomWord();
    this.getListOfTranslationsTest(this.fullListOfWordsTest);

  }

  onStartTest() {
    this.isTheTestOver = false;
    this.isBottomStartClicked = true;
    this.loadDataForTest();
  }

  isAnswerCorrect(answer) {
    if (answer === this.shownWord.translation) {
      this.correctAnswers++;
    } else {
      this.wrongAnswers++;
    }
    this.loadDataForTest();
  }

  numberOfQuestions() {
    this.numberOfQuestion++;
  }

  onTryAgain() {
    this.numberOfQuestion = 1;
    this.isTheTestOver = false;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
  }

  onStartStopWatch() {
    this.x = 10;
    this.start = true;
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 100);
  }

  onStopStopWatch() {
    this.pause = true;
    this.controlBtnText = 'Resume';
    clearInterval(this.intervalId);
  }

  resetStopWatch() {
    this.x = 0;
    this.controlBtnText = 'Start';
    this.hour = this.minute = this.second = this.millisecond = 0;
    this.start = false;
    this.pause = false;
  }

  onResume() {
    this.controlBtnText = 'Stop';
    this.pause = false;
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 100);

  }

  updateTime() {

    this.millisecond += this.x;
    if (this.millisecond > 90) {
      this.millisecond = 0;
      this.second++;
    }
    if (this.second > 59) {
      this.second = 0;
      this.minute++;
    }
    if (this.minute > 59) {
      this.minute = 0;
      this.hour++;
    }
  }

  print() {
    let element: HTMLElement = document.getElementById('test1') as HTMLElement;
    element.click();
  }

  generateTestResult() {
    const time: string = this.convertTimeToString(this.hour, this.minute, this.second, this.millisecond);
    const challengeResult = new ChallengeResult(null, this.correctAnswers, time, null);
    this.challengeService.saveChallengeResult(challengeResult).subscribe(idOfChallengeResult => {
    this.idOfSavedChallengeResult = idOfChallengeResult;
    console.log('ididididididid   ' + idOfChallengeResult)
      this.onGetPlaceInRanking(idOfChallengeResult)
    });
  }

  convertTimeToString(hour, minute, second, millisecond) {
    let newHour = hour.toString();
    let newMinute = minute.toString();
    let newSecond = second.toString();
    let newMillisecond = millisecond.toString();
    if (newHour.length != 2) {
      newHour = '0' + newHour;
    }
    if (newMinute.length != 2) {
      newMinute = '0' + newMinute;
    }
    if (newSecond.length != 2) {
      newSecond = '0' + newSecond;
    }
    if (newMillisecond.length != 2) {
      newMillisecond = '0' + millisecond;
    }
    return newHour + ':' + newMinute + ':' + newSecond + ':' + newMillisecond;
  }

  onGetPlaceInRanking(id) {
    this.challengeService.fetchPlaceInRanking(id).subscribe(place => {
      this.placeInRanking = place;
      this.subjectPlaceInRanking.next(this.placeInRanking);
      console.log(this.placeInRanking + 'gdfgfdgdgdfgdf')
    })
  }
}







