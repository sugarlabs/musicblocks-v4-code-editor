import focusOnCursor from "./focusOnCursor";
import removeLine from "./removeLine";
import removeSelected from "./removeSelected";
import storeCurrentState from "./storeCurrentState";

export default function deleteNextLineOrRightText(codeEditorCont,conditionalVariables,dataVariables,arrayVariables){
  
  
  let drag = conditionalVariables.getDrag();
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();

  textSelectionInProgress =false;
  conditionalVariables.setTextSelectionInProgress(false);

  let codeLines = codeEditorCont.getElementsByClassName("line");
  if(lineNumber > codeLines.length){
    lineNumber = dataVariables.setLineNumber(codeLines.length)
  }

  let activeline = codeEditorCont.getElementsByClassName("text")[lineNumber - 1];
  let textVal = activeline.innerText;

  if(drag){
    //console.log('inside drag')
    removeSelected("",dataVariables,conditionalVariables,codeEditorCont,arrayVariables);
    lineNumber = dataVariables.getLineNumber();
    charNumber = dataVariables.getCharNumber();
    textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
    drag = false;
    conditionalVariables.setDrag(false);
  } else {
    if((!(textVal.length) || charNumber == textVal.length) && lineNumber != codeLines.length){
      storeCurrentState(codeEditorCont,dataVariables,arrayVariables);
      let nextLineText = codeLines[lineNumber].innerText;
      removeLine(lineNumber+1,codeEditorCont);
      // copying any text the next line had and adding it to active line 
      activeline.innerHTML = "<pre>" + textVal + nextLineText + "</pre>";
        
    } else {
      // removing text from right  side
      activeline.innerHTML ="<pre>" + textVal.slice(0,charNumber) + textVal.slice(charNumber+1) + "</pre>";
    }
  }
  focusOnCursor(codeEditorCont,dataVariables);
}