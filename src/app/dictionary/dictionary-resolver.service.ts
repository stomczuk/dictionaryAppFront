import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EnglishWord} from '../model/englishWord';
import {Injectable} from '@angular/core';
import {DictionaryService} from './dictionary.service';
import {DictionaryComponent} from './dictionary.component';


@Injectable({
  providedIn: 'root'
})
export class DictionaryResolverService implements Resolve<any> {

  constructor(private dictionaryService: DictionaryService, private dictionaryComponent: DictionaryComponent) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('odpalam resolver');
    return this.dictionaryComponent.showListOfWords();
  }
}
