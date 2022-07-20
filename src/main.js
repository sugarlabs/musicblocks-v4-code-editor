import generateCodeEditor from "./Actions";
import codeEditorDom from "./Actions/codeEditorDom";
import addMusicBlocksSupport from "./MusicBlock_v4_Support";
import syntaxColorConfig from "./MusicBlock_v4_Support/color.config";
import arrayVariables from "./Variables/arrayVariables";
import conditionalVariables from "./Variables/conditionalVariables";
import dataVariables from "./Variables/dataVariables";
import intervalVariables from "./Variables/intervalVariables";
export default class codeEditor {

  constructor(codeEditorCont){
    this.codeEditorCont = codeEditorCont;
    this.codeEditor = new codeEditorDom();
    this.dataVariables = new dataVariables();
    this.conditionalVariables = new conditionalVariables();
    this.arrayVariables = new arrayVariables();
    this.intervalVariables = new intervalVariables();
    
    this.codeEditorNodeObject =  new generateCodeEditor(this.codeEditor,
      this.dataVariables,this.conditionalVariables,this.arrayVariables,this.intervalVariables);
    
    this.syntaxColorConfigObj = new syntaxColorConfig();
    this.musicBlocksv4Support = new addMusicBlocksSupport(this.syntaxColorConfigObj);
  }

  createCodeEditorDom(){
    const codeEditorNode = this.codeEditorNodeObject.generateCodeEditorDOM();
    this.codeEditorCont.appendChild(codeEditorNode);
    this.codeEditorNodeObject.setupInitialDomData();
    this.musicBlocksv4Support.initializeSupport(this.codeEditor.getCodeEditor(),this.dataVariables);
  }

  setCode(codeText){
    this.codeEditorNodeObject.setCode(codeText);
  }

  getCode(){
    return this.codeEditorNodeObject.getCode(codeText);
  }

  setSyntaxColorConfig(newColorConfig){
    return this.syntaxColorConfigObj.setConfig(newColorConfig)
  }

  resetSyntaxColorConfig(newColorConfig){
    return this.syntaxColorConfigObj.resetConfig(newColorConfig);
  }
}