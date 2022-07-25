import runSyntaxHighlighter, { runSyntaxHighlighterOnAllLines } from "./runSyntaxHighlighter";

export default function addingCodeEditorEventListenersMB(codeEditorCont,dataVariables,_specificationSnapshot,syntaxColorConfigObj,conditionalVariables){

  codeEditorCont.addEventListener("TextSelection",(e)=>{
    runSyntaxHighlighter("TextSelection",codeEditorCont,dataVariables,_specificationSnapshot,syntaxColorConfigObj,conditionalVariables);
  });

  codeEditorCont.addEventListener("TextDeselect",(e)=>{
    runSyntaxHighlighterOnAllLines(codeEditorCont,dataVariables,_specificationSnapshot,syntaxColorConfigObj);
  });
}