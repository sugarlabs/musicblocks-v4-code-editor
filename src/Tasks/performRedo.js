import focusOnCursor from "./focusOnCursor";
import { codeEditorCont, dataVariables, conditionalVariables, arrayVariables } from "../store";

/**
 * this function gets triggered when ctrl+y is pressed indicating a redo action on text editor.
 * Currently this methods follows a memorization procedure to store exact copy of the DOM in an array.
 * Redo just takes the last saved state of codeEditor DOM inside redoStore and replaces the active state of code lines 
 * with the previously saved state. It also store the active state into undoStore incase undo is triggered later.
 * @function performRedo
 */
export default function performRedo(){
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let lineEnd = dataVariables.getLineEnd();
  let lineStart = dataVariables.getLineStart();
  let redoStore = arrayVariables.getRedoStore();

  textSelectionInProgress = conditionalVariables.setTextSelectionInProgress(false);

  let codeLinesCont = codeEditorCont.getElementsByClassName("code_editor_lines_container")[0];
  let numberLineCont = codeEditorCont.getElementsByClassName("number_line_cont")[0];
  if(redoStore.length){
    arrayVariables.pushIntoUndoStore({
      lineNumber:lineNumber,
      charNumber:charNumber,
      lineEnd:lineEnd,
      lineStart:lineStart,
      data:codeLinesCont.innerHTML,
      numberLineData:numberLineCont.innerHTML
  });
    if(redoStore.length){
      lineNumber = dataVariables.setLineNumber(redoStore[redoStore.length - 1].lineNumber);
      charNumber = dataVariables.setCharNumber(redoStore[redoStore.length - 1].charNumber);
      lineEnd = dataVariables.setLineEnd(redoStore[redoStore.length - 1].lineEnd);
      lineStart = dataVariables.setLineStart(redoStore[redoStore.length - 1].lineStart);
      codeLinesCont.innerHTML = redoStore[redoStore.length - 1].data;
      numberLineCont.innerHTML = redoStore[redoStore.length - 1].numberLineData;
      let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
      cursor.style.left = (charNumber)*charSize + 35  + "px";
      cursor.style.top = (lineNumber-1)*lineHeight  + "px";
    }
    arrayVariables.popFromRedoStore();
    focusOnCursor();
  }
  
  
}