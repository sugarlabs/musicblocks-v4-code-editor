import runSyntaxHighlighter from "./runSyntaxHighlighter";

export default function addingCodeEditorEventListenersMB(codeEditorCont,dataVariables,_specificationSnapshot,syntaxColorConfigObj,conditionalVariables){

  codeEditorCont.addEventListener("TextSelection",(e)=>{
    console.log(conditionalVariables)
    runSyntaxHighlighter("TextSelection",codeEditorCont,dataVariables,_specificationSnapshot,syntaxColorConfigObj,conditionalVariables);
  });
}