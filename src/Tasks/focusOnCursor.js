import { codeEditorCont,dataVariables } from "../store";

/**
 * This method makes the cursor stay in the visible area by automatically scrolling the
 * code Editor container to always keep the curson in the visible area when user uses 
 * keys to move the cursor to non visible area of codeEditor.
 * @function focusOnCursor
 */
export default function focusOnCursor(){
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();
  let codeEditorContSub = codeEditorCont.getElementsByClassName('code_editor_sub')[0];
  let cursorTop = (lineNumber-1)*lineHeight;
  let cursorLeft = (charNumber)*charSize + numberLineWidth;

  // getting the top,left,right and bottom of the code editor container to compare it with
  // the postion of cursor and scroll the container if the cursor is not in the visible area
  let codeEditorContLeft = codeEditorContSub.scrollLeft + numberLineWidth;
  let codeEditorContRight = codeEditorContSub.scrollLeft + codeEditorContSub.clientWidth;

  let codeEditorContTop = codeEditorContSub.scrollTop;
  let codeEditorContBottom =
    codeEditorContSub.scrollTop + codeEditorContSub.clientHeight - lineHeight;

  
  if(cursorLeft >= codeEditorContLeft && cursorLeft >= codeEditorContRight){
      codeEditorContSub.scrollLeft = cursorLeft - codeEditorContSub.clientWidth + 5;
  } else if(cursorLeft <= codeEditorContLeft && cursorLeft <= codeEditorContRight){
      codeEditorContSub.scrollLeft = cursorLeft - numberLineWidth;
  }

  if(cursorTop <= codeEditorContTop && cursorTop <= codeEditorContBottom){
      codeEditorContSub.scrollTop = cursorTop;
  } else if (cursorTop >= codeEditorContTop && cursorTop >= codeEditorContBottom){
      codeEditorContSub.scrollTop = cursorTop - codeEditorContSub.clientHeight + lineHeight;
  }

}