import { Component, OnInit } from '@angular/core';
import { QuestionSection } from '../_models/DynSection';

@Component({
  selector: 'survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  inputs: ['model']
})
export class SurveyComponent implements OnInit {

  public NEW_QUESTIONS: QuestionSection[];
  public currentRowNo: number;
  public id: number = 0;

  constructor() {
    this.NEW_QUESTIONS = [];
    this.currentRowNo = 0;
    //let db = new AngularIndexedDB('myDb', 1);
    this.id = Math.floor(Math.random() * 100000);
    localStorage.setItem('form_id', this.id.toString());

  }

  // createCollections(db) {
  //   db.currentTarget.result.createObjectStore('forms');
  // }

  ngOnInit(): void {
    this.onAddInput();
  }


  public onSave() {
    var json = JSON.stringify(this.NEW_QUESTIONS);
    var questions = this.NEW_QUESTIONS;

    // // old method
    let db: any;
    let idbSupported = false;

    if ("indexedDB" in window) {
      idbSupported = true;
    }

    var indexedDB = window.indexedDB;

    if (idbSupported) {
      var openRequest = indexedDB.open("test", 1);

      openRequest.onupgradeneeded = function () {
        ////console.log("Upgrading...");
        db = openRequest.result;


        if (!db.objectStoreNames.contains("forms")) {
          var objectStore = db.createObjectStore("forms")//, { keyPath: "id", autoIncrement: true });
          //objectStore.createIndex("id", "id", { unique: true });
        }
      }

      openRequest.onsuccess = function () {

        //console.log("Success!");
        db = openRequest.result;
        var transaction = db.transaction(["forms"], "readwrite");
        var store = transaction.objectStore("forms");

        store.clear();

        var request = store.add(questions, localStorage.getItem('form_id'));

        request.onerror = function () {
          //console.log("Error", e.target.error.name);
          //some type of error handler
        }

        request.onsuccess = function () {
          //console.log("Woot! Did it");
          alert('form has been saved in indexeddb. Check this key: ' + localStorage.getItem('form_id'));
        }
      }

      openRequest.onerror = function (e) {
        //console.log("Error");
        console.dir(e);
      }

    }
  }

  onChangeType(data: any) {

    if (data.level == "parent") {
      var cq = this.NEW_QUESTIONS.find(p => p.id == data.question.id);
      cq.type = data.type;
    }
    else if (data.level == "sub") {
      var cs = data.question;//.find(p => p.id == data.question.id);
      cs.type = data.type;
    }
    else if (data.level == "child") {
      var cs = data.question;//.find(p => p.id == data.question.id);
      cs.type = data.type;
    }
  }

  onAddFirstLevelInput(data: any) {

    let question = data.question;
    let mode = data.mode;

    var currentQuestion = question;// this.NEW_QUESTIONS.find(x => x.id == question.id);

    let n = question.SubQuestions.length + 1;

    let q = new QuestionSection();

    if (mode == "sub") {
      var newid = question.n1 + "_" + question.n2 + "_" + n.toString() + "_" + question.n4 + "_" + question.n5;
      q.n1 = question.n1;
      q.n2 = question.n2;
      q.n3 = n.toString();
      q.n4 = question.n4;
      q.n5 = question.n5;
    }
    else if (mode == "child") {
      var newid = question.n1 + "_" + question.n2 + "_" + question.n3 + "_" + n.toString() + "_" + question.n5;
      q.n1 = question.n1;
      q.n2 = question.n2;
      q.n3 = question.n3;
      q.n4 = n.toString();
      q.n5 = question.n5;
    }
    else if (mode == "last") {
      var newid = question.n1 + "_" + question.n2 + "_" + question.n3 + "_" + question.n4 + "_" + n.toString();
      q.n1 = question.n1;
      q.n2 = question.n2;
      q.n3 = question.n3;
      q.n4 = question.n4;
      q.n5 = n.toString();
    }


    q.id = newid;
    q.condition = "";
    q.conditionOp = "";
    q.conditionValue = "";
    q.parentid = question.id;
    q.question = "";
    q.type = "text";
    q.RowNo = n.toString();
    q.SubQuestions = [];

    q.parentType = question.type;

    q.questionid = "txtQuestion_" + newid;
    q.questiontypeid = "ddlQuestionType_" + newid;
    q.conditionselectid = "ddlCondition_" + newid;
    q.conditiontextid = "txtCondition_" + newid;
    q.conditionyesnoid = "ddlConditionYesNo_" + newid;

    currentQuestion.SubQuestions.push(q);
  }

  onDeleteSubInput(data: any) {

    var id = data.question.id;

    if (data.mode == "sub") {
      //from sub
      //console.log('deleting sub: ' + id);
      var idx = this.NEW_QUESTIONS.findIndex(x => x.id == data.question.id);

      this.NEW_QUESTIONS.splice(idx, 1);

      if (this.NEW_QUESTIONS.length == 0)
        this.currentRowNo = 0;
      else
        this.currentRowNo = this.currentRowNo - 1;

      if (this.currentRowNo < 0)
        this.currentRowNo = 0;
    }
    else if (data.mode == "child") {
      //from child
      //console.log('deleting child: ' + id);
      this.NEW_QUESTIONS.forEach(section => {
        var idx = section.SubQuestions.findIndex(p => p.id == id);
        if (idx >= 0) {
          //delete the subquestion at idx
          section.SubQuestions.splice(idx, 1);
        }
      });
    }
    else if (data.mode == "last") {
      //from last
      //console.log('deleting last: ' + id);
      this.NEW_QUESTIONS.forEach(section => {
        section.SubQuestions.forEach(child => {
          var idx = child.SubQuestions.findIndex(p => p.id == id);
          if (idx >= 0) {
            //delete the subquestion at idx
            child.SubQuestions.splice(idx, 1);
          }
        });

      });
    }
  }

  onAddInput() {

    this.currentRowNo = this.currentRowNo + 1;

    let q = new QuestionSection();

    q.condition = "";
    q.conditionOp = "";
    q.conditionValue = "";
    q.parentid = "0";
    q.question = "";
    q.type = "text";
    q.RowNo = this.currentRowNo.toString();
    q.SubQuestions = [];
    q.parentType = "text";

    q.n1 = "0";
    q.n2 = this.currentRowNo.toString();
    q.n3 = "0";
    q.n4 = "0";
    q.n5 = "0";

    let id = q.n1 + "_" + q.n2 + "_" + q.n3 + "_" + q.n4 + "_" + q.n5;
    q.id = id;

    q.questionid = "txtQuestion_" + id;
    q.questiontypeid = "ddlQuestionType_" + id;
    q.conditionselectid = "ddlCondition_" + id;
    q.conditiontextid = "txtCondition_" + id;
    q.conditionyesnoid = "ddlConditionYesNo_" + id;

    this.NEW_QUESTIONS.push(q);
  }

  onChange(type, RowNo) {

    //console.log(type);

    var currentQuestion = this.NEW_QUESTIONS.find(x => x.RowNo == RowNo);
    currentQuestion.type = type;// "text";
  }

  public AddSubSection(RowNo) {

    //console.log('adding ' + RowNo);

    let q = new QuestionSection();
    q.id = "0";
    q.condition = "";
    q.conditionOp = "";
    q.conditionValue = "";
    q.parentid = RowNo;
    q.question = "";
    q.type = "text";
    q.RowNo = this.currentRowNo.toString();
    q.SubQuestions = [];

    var currentQuestion = this.NEW_QUESTIONS.find(x => x.RowNo == RowNo);

    q.parentType = currentQuestion.type;

    //currentQuestion.SubQuestions = [];
    currentQuestion.SubQuestions.push(q);

    //this.NEW_QUESTIONS[RowNo] = currentQuestion;

  }

  public deleteSection(RowNo) {

    //console.log('deleteing ' + RowNo);
    var idx = this.NEW_QUESTIONS.findIndex(x => x.RowNo == RowNo);
    if (idx >= 0) {

      this.NEW_QUESTIONS.splice(idx, 1);

      if (this.NEW_QUESTIONS.length == 0)
        this.currentRowNo = 0;
      else
        this.currentRowNo = this.currentRowNo - 1;

      if (this.currentRowNo < 0)
        this.currentRowNo = 0;

    }
  }

}
