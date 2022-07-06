import generateCodeEditor from "./Actions";
export default class codeEditor {
  constructor(codeEditorCont){
    this.codeEditorCont = codeEditorCont;
  }

  createCodeEditorDom(){
    const codeEditorNodeClass = new generateCodeEditor();
    const codeEditorNode = codeEditorNodeClass.generateCodeEditorDOM();
    this.codeEditorCont.appendChild(codeEditorNode);
    codeEditorNodeClass.setupInitialDomData();
  }
}