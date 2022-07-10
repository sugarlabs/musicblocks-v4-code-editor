import generateCodeEditor from "./Actions";
export default class codeEditor {

  constructor(codeEditorCont){
    this.codeEditorCont = codeEditorCont;
    this.codeEditorNodeObject =  new generateCodeEditor();
  }

  createCodeEditorDom(){
    const codeEditorNode = this.codeEditorNodeObject.generateCodeEditorDOM();
    this.codeEditorCont.appendChild(codeEditorNode);
    this.codeEditorNodeObject.setupInitialDomData();
  }

  setCode(codeText){
    this.codeEditorNodeObject.setCode(codeText);
  }

  getCode(){
    return this.codeEditorNodeObject.getCode(codeText);
  }
}