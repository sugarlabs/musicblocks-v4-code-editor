import focusOnCursor from "./focusOnCursor";
import removeSelected from "./removeSelected";

export default function handleInputChange(e, codeEditorCont, dataVariables, conditionalVariables, arrayVariables){
  e.preventDefault();
  const InputEvent = new CustomEvent("InputTriggered",{detail:{data:e.data}});
  let textInputBox = codeEditorCont.querySelector('#code-editor-cursor-input');
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let drag = conditionalVariables.getDrag();
  let charNumber = dataVariables.getCharNumber();
  let lineNumber = dataVariables.getLineNumber();
  let charSize = dataVariables.getCharSize();
  let numberLineWidth = dataVariables.getNumberLineWidth();

  textSelectionInProgress = false;
  conditionalVariables.setTextSelectionInProgress(false);
  // //console.log(drag,e.data);
  if(drag){
      if(e.data.length){
        removeSelected(e.data,dataVariables,conditionalVariables,codeEditorCont,arrayVariables);
        lineNumber = dataVariables.getLineNumber();
        charNumber = dataVariables.getCharNumber();
        textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
        textInputBox.dispatchEvent(InputEvent);
      } else {
        removeSelected("",dataVariables,conditionalVariables,codeEditorCont);
        lineNumber = dataVariables.getLineNumber();
        charNumber = dataVariables.getCharNumber();
        textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
      }
      drag = false;
      conditionalVariables.setDrag(false);
      e.target.value = "";
  } else {
      let activeline = codeEditorCont.getElementsByClassName("text")[lineNumber - 1];
      let textVal = activeline.innerText;
      if((e.data.length)){
        console.log(e.data,textVal.slice(0,charNumber) + e.data + textVal.slice(charNumber),charNumber)
        // remove ZeroWhiteSpace and add the text.
        if(textVal == "\u200B"){
            let preTag = document.createElement('pre');
            preTag.innerText = e.data
            activeline.innerHTML = "";
            activeline.appendChild(preTag); 
        } else{
            let preTag = document.createElement('pre');
            preTag.innerText = `${textVal.slice(0,charNumber)}${e.data}${textVal.slice(charNumber)}`
            console.log(preTag)
            activeline.innerHTML = "";
            activeline.appendChild(preTag); 
        }
        
        charNumber = charNumber + 1;
        dataVariables.setCharNumber(charNumber);
        textInputBox.dispatchEvent(InputEvent);
      }
      
      let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
      if(charNumber > activeline.innerText.length){
          cursor.style.left = (activeline.innerText.length)*charSize + numberLineWidth  + "px";
      } else {
          cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
      }
      e.target.value = "";
  }
  focusOnCursor(codeEditorCont, dataVariables);
  
}