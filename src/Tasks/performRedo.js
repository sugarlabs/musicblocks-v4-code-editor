import focusOnCursor from "./focusOnCursor";

export default function performRedo(
  codeEditorCont,dataVariables,conditionalVariables,arrayVariables
  ){
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
    focusOnCursor(codeEditorCont,dataVariables);
  }
  
  
}