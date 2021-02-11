import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { ChallengeComponent } from './challenge/challenge.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import {CKEditorModule} from 'ckeditor4-angular';
import { FooterComponent } from './footer/footer.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AuthComponent } from './auth/auth.component';
import { LpComponent } from './lp/lp.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DictionaryComponent,
    ChallengeComponent,
    BootstrapComponent,
    FooterComponent,
    AuthComponent,
    LpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    CKEditorModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
