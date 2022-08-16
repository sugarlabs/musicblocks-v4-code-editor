import focusOnCursor from "./focusOnCursor";
import { codeEditorCont, dataVariables, conditionalVariables, arrayVariables } from "../store";

/**
 * this function gets triggered when ctrl+x is pressed indicating a undo action on text editor.
 * Currently this methods follows a memorization procedure to store exact copy of the DOM in an array.
 * Undo just takes the last saved state of codeEditor DOM inside undoStore and replaces the active state of code lines 
 * with the previously saved state. It also store the active state into redoStore incase Redo is triggered later.
 * @function performUndo
 */
export default function performUndo(){

  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let lineEnd = dataVariables.getLineEnd();
  let lineStart = dataVariables.getLineStart();
  let undoStore = arrayVariables.getUndoStore();

  textSelectionInProgress = conditionalVariables.setTextSelectionInProgress(false);
  let codeLinesCont = codeEditorCont.getElementsByClassName("code_editor_lines_container")[0];
  let numberLineCont = codeEditorCont.getElementsByClassName("number_line_cont")[0];
  if(undoStore.length){
      arrayVariables.pushIntoRedoStore({
          lineNumber:lineNumber,
          charNumber:charNumber,
          lineEnd:lineEnd,
          lineStart:lineStart,
          data:codeLinesCont.innerHTML,
          numberLineData:numberLineCont.innerHTML
      });
      if(undoStore.length){
          lineNumber = dataVariables.setLineNumber(undoStore[undoStore.length - 1].lineNumber);
          charNumber = dataVariables.setCharNumber(undoStore[undoStore.length - 1].charNumber);
          lineEnd = dataVariables.setLineEnd(undoStore[undoStore.length - 1].lineEnd);
          lineStart = dataVariables.setLineStart(undoStore[undoStore.length - 1].lineStart);
          codeLinesCont.innerHTML = undoStore[undoStore.length - 1].data;
          numberLineCont.innerHTML = undoStore[undoStore.length - 1].numberLineData;
          let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
          cursor.style.left = (charNumber)*charSize + 35  + "px";
          cursor.style.top = (lineNumber-1)*lineHeight  + "px";
      }
      
      arrayVariables.popFromUndoStore();
      focusOnCursor();
  }
}