import runSyntaxHighlighter from "./runSyntaxHighlighter";

export default function addingInputEventListenersMB(codeEditorCont,dataVariables){
  let textInputBox = codeEditorCont.querySelector('#code-editor-cursor-input');
  textInputBox.addEventListener("keydown",(e)=>{
    if(e.key == " "){
      runSyntaxHighlighter("space",codeEditorCont,dataVariables);
    }
  });
}