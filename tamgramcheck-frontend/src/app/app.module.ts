import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpellCheckComponent } from './spell-check/spell-check.component';
import { GrammarCheckComponent } from './grammar-check/grammar-check.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ContenteditableModule } from '@ng-stack/contenteditable';

@NgModule({
  declarations: [
    AppComponent,
    SpellCheckComponent,
    GrammarCheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ContenteditableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
