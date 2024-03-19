import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SpellCheckComponent} from "./spell-check/spell-check.component";
import {GrammarCheckComponent} from "./grammar-check/grammar-check.component";

const routes: Routes = [
{path: 'grammar-checking', component: GrammarCheckComponent},{path: 'checking', component: SpellCheckComponent}];
// ,
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
