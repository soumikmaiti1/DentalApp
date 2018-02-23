import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as $ from 'jquery';
import { ScoreCardPage } from '../ScoreCard/ScoreCard';
import { Dialogs } from '@ionic-native/dialogs';

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var marksObtained: number = 0;
var f: number = 0;
var timeoutHandle;
@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})

export class QuizPage {
  public CategoryName: any;
  public SubCategoryName: any;
  public myarr: any[];
  public mcqSingleOption: any;
  public mcqMultipleOption: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, private dialogs: Dialogs) {
    this.SubCategoryName = navParams.get('param1');
    this.CategoryName = navParams.get('param2');
    //this.myarr = navParams.get('quizarr').questions;
    this.myarr = navParams.get('quizarr');
  }

  ionViewDidLoad() {
    //this.countdown(2);
    //console.log(this.SubCategoryName);
    console.log(this.myarr);
    //console.log((this.navParams.data).questions);
    //this.myarr=(this.navParams.data).questions;


  }
  addclass(event) {
    //alert(event);

  }
  evaluateMcss(event, qid, correctans) {

    /*  if (!(event.target.classList.contains('activeparent'))) {
        // event.target.classList.remove('colorClass');
        var abc = event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
  
        event.target.classList.toggle('activeparent');
       // event.target.classList.add('Active');
        $.each(this.myarr, function (k1, v1) {
          if (qid == v1.qid) {
            if (v1.correct == correctans) {
              ++marksObtained;
    
              console.log(marksObtained);
            }
            else if (qid == v1.qid && v1.correct != correctans) {
              console.log(--marksObtained);
    
            }
            else {
              console.log(marksObtained);
            }
          }
    
        });  
      } else { 
        alert('111');
      } 
  */
    $.each(this.myarr, function (k1, v1) {
      if (qid == v1.qid) {
        if (v1.correct == correctans) {
          ++marksObtained;

          console.log(marksObtained);
        }
        else if (qid == v1.qid && v1.correct != correctans) {
          console.log(--marksObtained);

        }
        else {
          console.log(marksObtained);
        }
      }

    });
    console.log(qid + "   " + correctans);



  }//end evaluateMcss
  answers() {
    var chkArray = [], z = [];
    var qidd, correctanss, p = '';
    var qidwithoptions, res = '', sum = 0, j, k;
    $(".mcms:checked").each(function () {
      chkArray.push($(this).val());
      //console.log(this.myarr);

    });
    //console.log(chkArray.length);

    for (var i = 0; i < chkArray.length; i++) {
      qidwithoptions = chkArray[i].split('^^');
      qidd = qidwithoptions[0];
      correctanss = qidwithoptions[1];
      $.each(this.myarr, function (k1, v1) {
        if (qidd == v1.qid) {
          p += correctanss;
          z.push(correctanss);
          //res = "\"'" + v1.correct + "'\"";
          res = v1.correct;
          //var n = res.indexOf(correctanss);

          //alert(n);
          /*
          if (n >= 1) {
            logicArr.push(1);
          }
          else {
            logicArr.push(0);
          } */
        }
      });
    }
    console.log("res=>" + res + res.length);
    console.log("z=>" + z + z.length);
    if (res.length == z.length) {
      for (k = 0; k < res.length; k++) {
        for (j = 0; j < res.length; j++) {
          if (z[k] == res[j]) {
            ++sum;
          }
        }
      }
      if (sum == z.length) {
        console.log(++marksObtained);
      }
      else
        console.log(marksObtained);
    }
    else
      console.log(marksObtained);
    z = [];
    //alert(z);

    /*
    qidwithoptions = ($(this).val()).split('^^');
      //console.log($(this).val());
      qidd = qidwithoptions[0];
      correctanss = qidwithoptions[1];
      console.log(qidd + "   " + correctanss);
      console.log(this.myarr);
      $.each(this.myarr, function (k1, v1) {
        console.log(v1);
        if (qidd == v1.qid) {
          console.log("correct=> "+correctanss);
        }
      });*/
    //var selected;
    //selected = chkArray.join(',') ;

    //var qidwithoption = selected.split(',');


    /*  
    if(selected.length > 1){
      console.log("You have selected " + selected);	
    }else{
      alert("Please select at least one of the checkbox");	
    }*/
  }
  /************Timer code starts*******************/

  /*************Timer code ends******************/


}
