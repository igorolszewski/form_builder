export class QuestionSection{
    public id: string;
    public RowNo: string;
    public condition: string;
    public conditionOp: string;
    public conditionValue: string;
    public question: string;
    public type: string;
    public parentid: string;
    public parentType: string;


    public n1:string;
    public n2:string;
    public n3:string;
    public n4:string;
    public n5:string;

    public SubQuestions: QuestionSection[];


    public questionid: string;
    public questiontypeid: string;
    public conditionselectid: string;
    public conditiontextid: string;
    public conditionyesnoid: string;
}