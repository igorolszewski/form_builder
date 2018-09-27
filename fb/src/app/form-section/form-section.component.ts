import { Component, Input, EventEmitter, Output } from '@angular/core';
import { QuestionSection } from '../_models/DynSection';

@Component({
    selector: 'form-section',
    templateUrl: './form-section.component.html',
    styleUrls: ['./form-section.component.scss']
})
export class FormSectionComponent {
    @Input() question: QuestionSection;

    @Output() addSubInput = new EventEmitter<any>();
    @Output() deleteSubInput = new EventEmitter<any>();
    @Output() onTypeChange = new EventEmitter<any>();
    
    onChange(question,type) {
        
        // console.log(type);
        let data = {
            question : question,
            level : "parent",
            type : type
        };
        this.onTypeChange.emit(data);

        // var currentQuestion = this.NEW_QUESTIONS.find(x => x.RowNo == RowNo);
        // currentQuestion.type = type;// "text";
    }

    onSubChange(question,type) {
        
        // console.log(type);
        let data = {
            question : question,
            level : "sub",
            type : type
        };
        this.onTypeChange.emit(data);

        // var currentQuestion = this.NEW_QUESTIONS.find(x => x.RowNo == RowNo);
        // currentQuestion.type = type;// "text";
    }

    //onChildChange
    onChildChange(question,type) {
        
        // console.log(type);
        let data = {
            question : question,
            level : "child",
            type : type
        };
        this.onTypeChange.emit(data);

        // var currentQuestion = this.NEW_QUESTIONS.find(x => x.RowNo == RowNo);
        // currentQuestion.type = type;// "text";
    }

    public AddSubSection(question) {
        let data = {
            question : question,
            mode : "sub"
        };
        
        this.addSubInput.emit(data);
    }

    public deleteSection(question) {
        
        let data = {
            question : question,
            mode : "sub"
        };
        this.deleteSubInput.emit(data);
    }

    public addChildSection(question) {
        
        let data = {
            question : question,
            mode : "child"
        };
        this.addSubInput.emit(data);
    }

    public deleteChildSection(question) {
        let data = {
            question : question,
            mode : "child"
        };
        this.deleteSubInput.emit(data);
    }

    public addLastSection(question) {
        
        let data = {
            question : question,
            mode : "last"
        };
        this.addSubInput.emit(data);
    }

    public deleteLastSection(question) {
        
        let data = {
            question : question,
            mode : "last"
        };
        this.deleteSubInput.emit(data);
    }


}
