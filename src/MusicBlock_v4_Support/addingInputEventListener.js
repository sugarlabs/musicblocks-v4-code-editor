import runSyntaxHighlighter from "./runSyntaxHighlighter";
import { codeEditorCont } from "../store";
/**
 * this function adds custom eventlisteners on codeEditor needed to run
 * taks for musicBlock v4 code.
 * @function addingInputEventListenersMB
 */
export default function addingInputEventListenersMB(
    _specificationSnapshot,syntaxColorConfigObj
  ){
  let textInputBox = codeEditorCont.querySelector('#code-editor-cursor-input');
  textInputBox.addEventListener("InputTriggered",(e)=>{
    if(e.detail.data == " "){
      runSyntaxHighlighter("Space",_specificationSnapshot,syntaxColorConfigObj,undefined);
    } else if(e.detail.data == "Enter"){
      runSyntaxHighlighter("Enter",_specificationSnapshot,syntaxColorConfigObj,undefined);
    } else if(e.detail.data == "BackSpace"){
      runSyntaxHighlighter("BackSpace",_specificationSnapshot,syntaxColorConfigObj,undefined);
    } else if(e.detail.data == "Delete"){
      runSyntaxHighlighter("Delete",_specificationSnapshot,syntaxColorConfigObj,undefined);
    } else if(e.detail.data){
      runSyntaxHighlighter("Input",_specificationSnapshot,syntaxColorConfigObj,undefined);
    }
  });
}