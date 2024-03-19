import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http"

interface ResponseData {
  data: Object;
  code: Object;
}

@Injectable({
  providedIn: 'root'
})
export class SpellCheckService {
  spellCheckAPI = 'http://20.214.186.23:5000/api/checking';
  suggestionAPI = 'http://20.214.186.23:5000/api/suggestion';
  // grammarCheckAPI = 'http://127.0.0.1:5000/api/grammar-checking';
  constructor(private http: HttpClient) { }

  doSpellCheck(text){
    const url = this.spellCheckAPI;
    return this.http.post<ResponseData>(url,text);
  }
  
  // doGrammarCheck(text){
  //   const url = this.grammarCheckAPI;
  //   return this.http.post<ResponseData>(url,text);
  // }

  giveSuggestion(word){
    const url = this.suggestionAPI+ "?word=" + word;
    return this.http.get<ResponseData>(url);
  }

  addNewWord(word){
    const url = " http://20.214.186.23:5000/api/newword"+ "?word=" + word;
    return this.http.get<ResponseData>(url);
  }

}

// export class GrammarCheckService {
  
//   // suggestionAPI = 'http://127.0.0.1:5000/api/suggestion';

//   constructor(private http: HttpClient) { }

//   doGrammarCheck(text){
//     const url = this.grammarCheckAPI;
//     return this.http.post<ResponseData>(url,text);
//   }

//   // giveSuggestion(word){
//   //   const url = this.suggestionAPI+ "?word=" + word;
//   //   return this.http.get<ResponseData>(url);
//   // }

//   // addNewWord(word){
//   //   const url = " http://127.0.0.1:5000/api/newword"+ "?word=" + word;
//   //   return this.http.get<ResponseData>(url);
//   // }

// }
