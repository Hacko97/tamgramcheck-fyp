import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GrammarCheckService} from "./grammar-check.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-grammar-check',
  templateUrl: './grammar-check.component.html',
  styleUrls: ['./grammar-check.component.css']
})
export class GrammarCheckComponent implements OnInit {

  fValue;
  doGrammarCheckForm: FormGroup;
  inputValue;
  words;
  misspelled;
  suggestionList;
  selectedWord;
  theText;
  clicked;
  suggestionWait;
  suggBox;
  cantiMistake;
  cantiCorrection;

  errorType;
  svaError;
  isError;
  sentenceList;
  errorSentenceList;
  errorTypeList;
  wordListofList;

  thisCantiCorr;
  finished;
  noSugg;
  temp;

  constructor(private formBuilder: FormBuilder,
              private grammarCheckService: GrammarCheckService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeTheWork();
  }

  initializeTheWork(){
    window.localStorage.setItem('selectedMisspelled', '');
    window.localStorage.setItem('openedPopupId', '');
    this.temp = this.route.snapshot.queryParamMap.get('text');
    console.log('sdaf',this.temp);
    this.doGrammarCheckForm = this.formBuilder.group({
      'grammarArea': this.temp
    });
    this.inputValue = '';
    this.selectedWord='';
    this.theText="";
    this.suggestionList=[];
    this.sentenceList =[];
    this.errorSentenceList=[];
    this.errorTypeList=[];
    this.wordListofList=[];
    // document.getElementById('spellAns').style.display = "none";
    document.getElementById('grammarAns').style.display = "none";
    //document.getElementById('noSuggMsg').style.display = "none";--------------------------------------------------------
    this.clicked = false;
    // this.clicked = false;
    this.finished = false;
    this.suggestionWait = false;
    this.suggBox = false;
    this.thisCantiCorr = '';
    this.noSugg = false;
  }
  

  DoGrammarCheck(formValue){
    console.log('', formValue);
    this.fValue = {
      'text' : formValue.grammarArea
    };
    let wordCount = formValue.grammarArea.split(' ').length;
    //console.log('wc-> ', wordCount);
    if(wordCount==0){
    }else{
      this.clicked = true;
      this.grammarCheckService.doGrammarCheck(this.fValue)
      .subscribe(res=>{
        console.log('res->>> ', res);
        
        res.forEach(element => {
          console.log(element.Sentence)
          this.sentenceList.push(element.Sentence)
          this.errorTypeList.push(element.ErrorType)
          this.wordListofList.push(element.wordList)
          if (element.isError){
            this.errorSentenceList.push(element.Sentence)
          }
        });
       // Object.keys(res).forEach((key: any) => console.log(key + ":" + res[key]['svaError']))

        // this.words = res['wordList'];
        this.svaError = res['svaError'];
        this.isError = res['isError'];
        // // this.cantiMistake = res['cantiResult'][0];
        // // this.cantiCorrection = res['cantiResult'][1];
        this.errorType =res["ErrorType"] ;
        // // res['errorType'];
        console.log('sentence list-> ',this.sentenceList);
        console.log('error sentence list -> ',this.errorSentenceList);

        console.log('mss--> ', this.errorSentenceList.includes(this.sentenceList[0]));
        // // console.log('words bef ans-> ', this.words);
        document.getElementById('grammarArea').style.display = "none";
        document.getElementById('grammarAns').style.display = "block";
        // //document.getElementById('grammarAns').textContent = this.errorType;
        // // console.log('words aft ans-> ', this.words);
        document.getElementById('check').style.display = "none";
        this.finished = true;
      })
    }

  }
  
  GiveSuggestion(sentence, sentenceIndex){

    this.suggestionList=[this.errorTypeList[sentenceIndex]];

    console.log(sentence, this.suggestionList, '%%%');

    this.suggBox = false;
    //this.thisCantiCorr = '';
    window.localStorage.setItem('selectedMisspelled', sentenceIndex);

    let openedPopIDM = window.localStorage.getItem('openedPopupId');
    console.log('givesuggestion',openedPopIDM);

    if(openedPopIDM != ''){
      console.log('check ',openedPopIDM);
      let openedPopup = document.getElementById(openedPopIDM);
      if(openedPopup != null){
        openedPopup.classList.toggle("close");
      }
      window.localStorage.setItem('openedPopupId', '');
    }else{
      console.log('givesuggestionokok');

      // this.suggestionWait = true;
      this.suggestionWait = false;
      let openedPopIDM2 = window.localStorage.getItem('openedPopupId');
      console.log('givesuggestion',openedPopIDM2);
      if(openedPopIDM2 != ''){
        let openedPopup = document.getElementById(openedPopIDM2);
        if(openedPopup != null){
          openedPopup.classList.toggle("close");
        }
        window.localStorage.setItem('openedPopupId', '');
        }
        this.suggestionList = [this.errorTypeList[sentenceIndex]];
        //console.log('suggessss---> ', this.suggestionList);
        console.log(sentence, this.suggestionList, '$$$');
        this.suggBox = true;
        let popupId = sentenceIndex + 'm';
        window.localStorage.setItem('openedPopupId', popupId);
        let popup = document.getElementById(popupId);
        if(popup != null){
          popup.classList.toggle("show");
        }

      // this.spellCheckService.giveSuggestion(word).subscribe(res => {
      // this.suggestionWait = false;
      // let openedPopIDM2 = window.localStorage.getItem('openedPopupId');
      // console.log('givesuggestion',openedPopIDM2);
      // if(openedPopIDM2 != ''){
      //   let openedPopup = document.getElementById(openedPopIDM2);
      //   if(openedPopup != null){
      //     openedPopup.classList.toggle("close");
      //   }
      //   window.localStorage.setItem('openedPopupId', '');
      //   }
      //   this.suggestionList = res['suggestion'];
      //   //console.log('suggessss---> ', this.suggestionList);
      //   console.log(word, this.suggestionList, '$$$');
      //   this.suggBox = true;
      //   let popupId = wordIndex + 'm';
      //   window.localStorage.setItem('openedPopupId', popupId);
      //   let popup = document.getElementById(popupId);
      //   if(popup != null){
      //     popup.classList.toggle("show");
      //   }

      // })
    }
  }


  // DoGrammarCheck(formValue){
  //   console.log('', formValue);
  //   this.fValue = {
  //     'text' : formValue.spellArea
  //   };
  //   let wordCount = formValue.spellArea.split(' ').length;
  //   //console.log('wc-> ', wordCount);
  //   if(wordCount==0){
  //   }else{
  //     this.clicked = true;
  //     this.spellCheckService.doGrammarCheck(this.fValue)
  //     .subscribe(res=>{
  //       //console.log('res->>> ', res);
  //       // this.words = res['wordList'];
  //       // this.misspelled = res['resultList'];
  //       // this.cantiMistake = res['cantiResult'][0];
  //       // this.cantiCorrection = res['cantiResult'][1];
  //       this.errorType ="Number" ;
  //       // res['errorType'];
  //       console.log('hh-> ',this.errorType);
  //       //console.log('mss--> ', this.misspelled);
  //       // console.log('words bef ans-> ', this.words);
  //       document.getElementById('spellArea').style.display = "none";
  //       document.getElementById('spellAns').style.display = "block";
  //       // console.log('words aft ans-> ', this.words);
  //       document.getElementById('check').style.display = "none";
  //       this.finished = true;
  //     })
  //   }

  //}

  // GiveSuggestion(word, wordIndex){
  //   this.suggestionList=[];
  //   console.log(word, this.suggestionList, '%%%');
  //   this.suggBox = false;
  //   this.thisCantiCorr = '';
  //   window.localStorage.setItem('selectedMisspelled', wordIndex);
  //   let openedPopIDM = window.localStorage.getItem('openedPopupId');
  //   console.log('givesuggestion',openedPopIDM);
  //   if(openedPopIDM != ''){
  //     console.log('check ',openedPopIDM);
  //     let openedPopup = document.getElementById(openedPopIDM);
  //     if(openedPopup != null){
  //       openedPopup.classList.toggle("close");
  //     }
  //     window.localStorage.setItem('openedPopupId', '');
  //   }else{
  //     console.log('givesuggestionokok');
  //     this.suggestionWait = true;
  //     this.spellCheckService.giveSuggestion(word).subscribe(res => {
  //     this.suggestionWait = false;
  //     let openedPopIDM2 = window.localStorage.getItem('openedPopupId');
  //     console.log('givesuggestion',openedPopIDM2);
  //     if(openedPopIDM2 != ''){
  //       let openedPopup = document.getElementById(openedPopIDM2);
  //       if(openedPopup != null){
  //         openedPopup.classList.toggle("close");
  //       }
  //       window.localStorage.setItem('openedPopupId', '');
  //       }
  //       this.suggestionList = res['suggestion'];
  //       //console.log('suggessss---> ', this.suggestionList);
  //       console.log(word, this.suggestionList, '$$$');
  //       this.suggBox = true;
  //       let popupId = wordIndex + 'm';
  //       window.localStorage.setItem('openedPopupId', popupId);
  //       let popup = document.getElementById(popupId);
  //       if(popup != null){
  //         popup.classList.toggle("show");
  //       }

  //     })
  //   }
  // }

  // GiveSuggestionCanti(word, wordIndex){
  //   this.suggestionList=[];
  //   this.suggestionWait = false;
  //   window.localStorage.setItem('selectedMisspelled', wordIndex);
  //   this.suggBox = true;
  //   this.suggestionList =[];
  //   let openedPopID = window.localStorage.getItem('openedPopupId');
  //   console.log('canti open popup', openedPopID);
  //   if(openedPopID != ''){
  //     let openedPopup = document.getElementById(openedPopID);
  //     if(openedPopup != null){
  //       openedPopup.classList.toggle("close");
  //     }
  //     window.localStorage.setItem('openedPopupId', '');
  //   }else{
  //     this.thisCantiCorr = this.cantiCorrection[this.cantiMistake.indexOf(word)];//=================================
  //     let popupIdc = wordIndex + 'c';
  //     window.localStorage.setItem('openedPopupId', popupIdc);
  //     let popupc = document.getElementById(popupIdc);
  //     if(popupc != null){
  //       popupc.classList.toggle("show");
  //     }
  //   }
  // }


  // changeMisspelled(val, id){
  //   if(id[id.length-1]=='d'){
  //     this.addToDictionary(val);
  //   }
  //   let idd = id.substring(0,id.length-1);
  //   console.log('i am changed', idd);
  //   this.selectedWord = val;
  //   let missIndex = window.localStorage.getItem('selectedMisspelled');
  //   console.log('missIndex', missIndex);
  //   if (missIndex != ''){
  //     document.getElementById(idd).innerText = this.selectedWord + ' ';
  //   }
  //   this.suggBox = false;
  //   this.thisCantiCorr = '';
  //   window.localStorage.setItem('openedPopupId', id);
  // }

  hideSuggestion(){
    this.suggBox = false;
    this.thisCantiCorr = '';
    this.noSugg = false;
    //document.getElementById('noSuggMsg').style.display = "none";-------------------------------------------------------
  }

  clickOnContent(){
    this.noSugg = false;
    //document.getElementById('noSuggMsg').style.display = "none";-----------------------------------------------------------
  }

  myFunction(msg, $even){
    console.log('lalala00');
    if($even){
      console.log(msg+' hahaha');
    }else{
      console.log(msg+' see u');
    }
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  // addToDictionary(word){
  //   console.log(word);
  //   if(word != ''){
  //     this.grammarCheckService.addNewWord(word).subscribe(res => {
  //     })
  //   }
  // }

}
