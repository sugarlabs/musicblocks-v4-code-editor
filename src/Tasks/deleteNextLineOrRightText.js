import focusOnCursor from "./focusOnCursor";
import removeLine from "./removeLine";
import removeSelected from "./removeSelected";
import storeCurrentState from "./storeCurrentState";
import { codeEditorCont, conditionalVariables, dataVariables } from "../store";

/**
 * This methods runs when delete key is triggered intending to remove the text right to it, this method
 * also removes the next line if the cursor reached the end of the line.
 * @returns {undefined} - nothing
 * @function deleteNextLineOrRightText
 */
export default function deleteNextLineOrRightText(){
  let drag = conditionalVariables.getDrag();
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();

  textSelectionInProgress = false;
  conditionalVariables.setTextSelectionInProgress(false);

  let codeLines = codeEditorCont.getElementsByClassName('line');
  if (lineNumber > codeLines.length) {
    lineNumber = dataVariables.setLineNumber(codeLines.length);
  }

  let activeline = codeEditorCont.getElementsByClassName('text')[lineNumber - 1];
  let textVal = activeline.innerText;
  // drag true means there is some text selected and we need to remove those selected
  // text when delete is triggered.
  if (drag) {
    //console.log('inside drag')
    removeSelected('');
    lineNumber = dataVariables.getLineNumber();
    charNumber = dataVariables.getCharNumber();
    console.log(charNumber);
    textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
    drag = false;
    conditionalVariables.setDrag(false);
  } else {
    if ((!textVal.length || charNumber == textVal.length) && lineNumber != codeLines.length) {
      storeCurrentState();
      let nextLineText = codeLines[lineNumber].innerText;
      
      removeLine(lineNumber + 1);
      // copying any text the next line had and adding it to active line
      let preTag = document.createElement('pre');
      preTag.innerText = textVal + nextLineText;
      activeline.innerHTML = '';
      activeline.appendChild(preTag);
    } else {
      // removing text from right  side
      let preTag = document.createElement('pre');
      preTag.innerText = textVal.slice(0, charNumber) + textVal.slice(charNumber + 1);
      activeline.innerHTML = '';
      activeline.appendChild(preTag);
    }
  }
  focusOnCursor();
}