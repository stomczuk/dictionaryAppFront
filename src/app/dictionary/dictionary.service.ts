import {Injectable} from '@angular/core';
import {RestApiService} from '../shared/restApi.service';
import {environment} from '../../environments/environment.prod';
import {Test} from '../model/test';
import {catchError, map, tap} from 'rxjs/operators';
import {EnglishWord} from '../model/englishWord';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {parseJsonSchemaToOptions} from '@angular/cli/utilities/json-schema';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  endpoint = environment.test;
  getListOfAllWords_endpoint = environment.listOfWords;
  addWord_endpoint = environment.saveWord;
  deleteWord_endpoint = environment.deleteWord;
  getWord_endpoint = environment.getWord;
  getEditWord_endpoint = environment.editWord;
  refreshListOfWords = new Subject();

  constructor(private restApiService: RestApiService, private route: Router) {
  }

  getTest() {
    return this.restApiService.getMethod(this.endpoint);
  }

  getListOfWords() {
    return this.restApiService.getMethod(this.getListOfAllWords_endpoint);
  }

  addWord(words: EnglishWord[]) {
    return this.restApiService.postMethod(this.addWord_endpoint, words)
      .pipe(tap(
        () => {
          this.refreshListOfWords.next();
        }
      ));
    ;
  }

  deleteWord(id: number) {
    this.restApiService.postMethod(this.deleteWord_endpoint, id)
      .pipe(tap(
        () => {
          this.refreshListOfWords.next();
        }
      )).subscribe(response => {
      console.log(response);
    });
  }

  getWord(id: number) {
    return this.restApiService.postMethod(this.getWord_endpoint, JSON.stringify(id));
  }

  editWord(englishWord: EnglishWord) {
    this.restApiService.postMethod(this.getEditWord_endpoint, englishWord)
      .pipe(tap(
      () => {
        this.refreshListOfWords.next();
      }
    )).subscribe()
  }
}
