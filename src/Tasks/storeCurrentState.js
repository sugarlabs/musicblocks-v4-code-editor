export default function storeCurrentState(codeEditorCont,dataVariables,arrayVariables){
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let lineStart = dataVariables.getLineStart();
  let lineEnd = dataVariables.getLineEnd();
  // emptying the redo store as some changes have happened after undo and redo's shouldn't exist.
  arrayVariables.setRedoStore([]);
  let undoStore = arrayVariables.getUndoStore();

  let codeLinesCont = codeEditorCont.getElementsByClassName("code_editor_lines_container")[0];
  let numberLineCont = codeEditorCont.getElementsByClassName("number_line_cont")[0];
  // we are storing the current data of code Editor into undo array so we can replace this data
  // with the future data and achieve undo functionality. Currently we are using memory intensive method 
  // to achieve undo and redo because we are storing the snapshot of DOM into undo array. Later we need 
  // to implement action based undo i.e store enough data to predict what was deleted and undo the action
  // with that data, this way we won't be storing the whole DOM but just enough data to undo the action.
  if(undoStore.length > 20){
    arrayVariables.shiftUndoStore();
    arrayVariables.pushIntoUndoStore({
        lineNumber:lineNumber,
        charNumber:charNumber,
        lineEnd:lineEnd,
        lineStart:lineStart,
        data:codeLinesCont.innerHTML,
        numberLineData:numberLineCont.innerHTML
    })
  } else {
    arrayVariables.pushIntoUndoStore({
        lineNumber:lineNumber,
        charNumber:charNumber,
        lineEnd:lineEnd,
        lineStart:lineStart,
        data:codeLinesCont.innerHTML,
        numberLineData:numberLineCont.innerHTML
    });
  }  
} 