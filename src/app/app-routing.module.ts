import {RouterModule, Routes} from '@angular/router';
import {DictionaryComponent} from './dictionary/dictionary.component';
import {NgModule} from '@angular/core';
import {DictionaryResolverService} from './dictionary/dictionary-resolver.service';
import {ChallengeComponent} from './challenge/challenge.component';
import {BootstrapComponent} from './bootstrap/bootstrap.component';
import {AuthComponent} from './auth/auth.component';
import {LpComponent} from './lp/lp.component';



const appRoutes: Routes = [
  {path: '', redirectTo: 'dictionary', pathMatch: 'full'},
  {path: 'dictionary', component: DictionaryComponent, resolve: [DictionaryResolverService]},
  {path: 'test', component: ChallengeComponent},
  {path: '123', component: BootstrapComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'landingpage', component: LpComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}

