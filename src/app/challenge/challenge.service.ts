import {Injectable} from '@angular/core';
import {RestApiService} from '../shared/restApi.service';
import {environment} from '../../environments/environment.prod';
import {ChallengeResult} from '../model/ChallengeResult';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  saveChallenge_endpoint = environment.saveChallenge;
  fetchRanking_endpoint = environment.fetchRanking;
  fetchPlaceInRanking_endpoint = environment.fetchPlaceInRanking;


  constructor(private restApiService: RestApiService) {
  }

  saveChallengeResult(challengeResult: ChallengeResult) {
    return this.restApiService.postMethod(this.saveChallenge_endpoint, challengeResult);
  }

  fetchRanking() {
     return this.restApiService.getMethod(this.fetchRanking_endpoint);
  }

  fetchPlaceInRanking(idOfChallengeResult: number) {
    return this.restApiService.postMethod(this.fetchPlaceInRanking_endpoint, idOfChallengeResult);
  }
}
