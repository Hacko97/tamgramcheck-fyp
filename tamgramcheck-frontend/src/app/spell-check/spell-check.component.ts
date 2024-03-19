import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SpellCheckService} from "./spell-check.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-spell-check',
  templateUrl: './spell-check.component.html',
  styleUrls: ['./spell-check.component.css']
})
export class SpellCheckComponent implements OnInit {

  fValue;
  doSpellCheckForm: FormGroup;
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
  // errorType;
  thisCantiCorr;
  finished;
  noSugg;
  temp;

  constructor(private formBuilder: FormBuilder,
              private spellCheckService: SpellCheckService,
              private router: Router) { }

  ngOnInit() {
    this.initializeTheWork();
  }

  initializeTheWork(){
    window.localStorage.setItem('selectedMisspelled', '');
    window.localStorage.setItem('openedPopupId', '');
    this.doSpellCheckForm = this.formBuilder.group({
      'spellArea': ''
    });
    this.inputValue = '';
    this.selectedWord='';
    this.theText="";
    this.suggestionList=[];
    document.getElementById('spellAns').style.display = "none";
    // document.getElementById('grammarAns').style.display = "none";
    //document.getElementById('noSuggMsg').style.display = "none";--------------------------------------------------------
    this.clicked = false;
    // this.clicked = false;
    this.finished = false;
    this.suggestionWait = false;
    this.suggBox = false;
    this.thisCantiCorr = '';
    this.noSugg = false;
    
  }
  goToSpell(){
    this.router.navigate(['/grammar-checking'],{queryParams:{text:this.temp}})
  }

  DoSpellCheck(formValue){
    console.log('', formValue);
    this.fValue = {
      'text' : formValue.spellArea
    };
    this.temp = this.fValue.text;
    let wordCount = formValue.spellArea.split(' ').length;
    //console.log('wc-> ', wordCount);
    if(wordCount==0){
    }else{
      this.clicked = true;
      this.spellCheckService.doSpellCheck(this.fValue)
      .subscribe(res=>{
        //console.log('res->>> ', res);
        this.words = res['wordList'];
        this.misspelled = res['resultList'];
        this.cantiMistake = res['cantiResult'][0];
        this.cantiCorrection = res['cantiResult'][1];
        console.log('hh-> ', this.cantiMistake, this.cantiCorrection);
        //console.log('mss--> ', this.misspelled);
        console.log('words bef ans-> ', this.words);
        document.getElementById('spellArea').style.display = "none";
        document.getElementById('spellAns').style.display = "block";
        console.log('words aft ans-> ', this.words);
        document.getElementById('check').style.display = "none";
        this.finished = true;
      })
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

  // }

  GiveSuggestion(word, wordIndex){
    this.suggestionList=[];
    console.log(word, this.suggestionList, '%%%');
    this.suggBox = false;
    this.thisCantiCorr = '';
    window.localStorage.setItem('selectedMisspelled', wordIndex);
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
      this.suggestionWait = true;
      this.spellCheckService.giveSuggestion(word).subscribe(res => {
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
        this.suggestionList = res['suggestion'];
        //console.log('suggessss---> ', this.suggestionList);
        console.log(word, this.suggestionList, '$$$');
        this.suggBox = true;
        let popupId = wordIndex + 'm';
        window.localStorage.setItem('openedPopupId', popupId);
        let popup = document.getElementById(popupId);
        if(popup != null){
          popup.classList.toggle("show");
        }

      })
    }
  }

  GiveSuggestionCanti(word, wordIndex){
    this.suggestionList=[];
    this.suggestionWait = false;
    window.localStorage.setItem('selectedMisspelled', wordIndex);
    this.suggBox = true;
    this.suggestionList =[];
    let openedPopID = window.localStorage.getItem('openedPopupId');
    console.log('canti open popup', openedPopID);
    if(openedPopID != ''){
      let openedPopup = document.getElementById(openedPopID);
      if(openedPopup != null){
        openedPopup.classList.toggle("close");
      }
      window.localStorage.setItem('openedPopupId', '');
    }else{
      this.thisCantiCorr = this.cantiCorrection[this.cantiMistake.indexOf(word)];//=================================
      let popupIdc = wordIndex + 'c';
      window.localStorage.setItem('openedPopupId', popupIdc);
      let popupc = document.getElementById(popupIdc);
      if(popupc != null){
        popupc.classList.toggle("show");
      }
    }
  }


  changeMisspelled(val, id){
    if(id[id.length-1]=='d'){
      this.addToDictionary(val);
    }
    let idd = id.substring(0,id.length-1);
    console.log('i am changed', idd);
    this.selectedWord = val;
    let missIndex = window.localStorage.getItem('selectedMisspelled');
    console.log('missIndex', missIndex);
    if (missIndex != ''){
      document.getElementById(idd).innerText = this.selectedWord + ' ';
    }
    this.suggBox = false;
    this.temp=document.getElementById('spellAns').textContent;
    console.log('asdfasf', document.getElementById('spellAns').textContent);
    this.thisCantiCorr = '';
    window.localStorage.setItem('openedPopupId', id);
  }

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

  addToDictionary(word){
    console.log(word);
    if(word != ''){
      this.spellCheckService.addNewWord(word).subscribe(res => {
      })
    }
  }

}
