import focusOnCursor from "./focusOnCursor";

export default function performUndo(codeEditorCont,dataVariables,conditionalVariables,arrayVariables){

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
      focusOnCursor(codeEditorCont,dataVariables);
  }
}