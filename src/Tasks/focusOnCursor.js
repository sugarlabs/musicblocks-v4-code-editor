export default function focusOnCursor(codeEditorCont, dataVariables){
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();
  
  let cursorTop = (lineNumber-1)*lineHeight;
  let cursorLeft = (charNumber)*charSize + numberLineWidth;

  // getting the top,left,right and bottom of the code editor container to compare it with
  // the postion of cursor and scroll the container if the cursor is not in the visible area
  let codeEditorContLeft = codeEditorCont.scrollLeft + numberLineWidth;
  let codeEditorContRight = codeEditorCont.scrollLeft + codeEditorCont.clientWidth;

  let codeEditorContTop = codeEditorCont.scrollTop;
  let codeEditorContBottom = codeEditorCont.scrollTop + codeEditorCont.clientHeight - lineHeight;

  
  if(cursorLeft >= codeEditorContLeft && cursorLeft >= codeEditorContRight){
      codeEditorCont.scrollLeft = cursorLeft - codeEditorCont.clientWidth + 5;
  } else if(cursorLeft <= codeEditorContLeft && cursorLeft <= codeEditorContRight){
      codeEditorCont.scrollLeft = cursorLeft - numberLineWidth;
  }

  if(cursorTop <= codeEditorContTop && cursorTop <= codeEditorContBottom){
      codeEditorCont.scrollTop = cursorTop
  } else if (cursorTop >= codeEditorContTop && cursorTop >= codeEditorContBottom){
      codeEditorCont.scrollTop = cursorTop - codeEditorCont.clientHeight + lineHeight;
  }    

}