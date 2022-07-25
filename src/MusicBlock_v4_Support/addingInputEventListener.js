import runSyntaxHighlighter from "./runSyntaxHighlighter";

export default function addingInputEventListenersMB(
  codeEditorCont,dataVariables,_specificationSnapshot,syntaxColorConfigObj
  ){
  let textInputBox = codeEditorCont.querySelector('#code-editor-cursor-input');
  textInputBox.addEventListener("InputTriggered",(e)=>{
    if(e.detail.data == " "){
      runSyntaxHighlighter("Space",codeEditorCont,dataVariables,_specificationSnapshot,syntaxColorConfigObj,undefined);
    } else if(e.detail.data == "Enter"){
      runSyntaxHighlighter("Enter",codeEditorCont,dataVariables,_specificationSnapshot,syntaxColorConfigObj,undefined);
    } else if(e.detail.data == "BackSpace"){
      runSyntaxHighlighter("BackSpace",codeEditorCont,dataVariables,_specificationSnapshot,syntaxColorConfigObj,undefined);
    } else if(e.detail.data == "Delete"){
      runSyntaxHighlighter("Delete",codeEditorCont,dataVariables,_specificationSnapshot,syntaxColorConfigObj,undefined);
    } else if(e.detail.data){
      runSyntaxHighlighter("Input",codeEditorCont,dataVariables,_specificationSnapshot,syntaxColorConfigObj,undefined);
    }
  });
}