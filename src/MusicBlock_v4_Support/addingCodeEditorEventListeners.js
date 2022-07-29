import runSyntaxHighlighter, { runSyntaxHighlighterOnAllLines } from "./runSyntaxHighlighter";
import {codeEditorCont, dataVariables, conditionalVariables} from "../store";
/**
 * this function adds custom eventlisteners on codeEditor needed to run
 * taks for musicBlock v4 code. 
 * @function addingCodeEditorEventListenersMB
 */
export default function addingCodeEditorEventListenersMB(
    _specificationSnapshot,syntaxColorConfigObj
  ){

  codeEditorCont.addEventListener("TextSelection",(e)=>{
    runSyntaxHighlighter(
      "TextSelection",_specificationSnapshot,syntaxColorConfigObj
    );
  });

  codeEditorCont.addEventListener("TextDeselect",(e)=>{
    runSyntaxHighlighterOnAllLines(
      _specificationSnapshot,syntaxColorConfigObj
    );
  });
}