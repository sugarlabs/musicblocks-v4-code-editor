import { codeEditorCont, dataVariables, conditionalVariables } from "../store";

/**
 * This method gets triggered when ctrl+a is runned which indicates that the user wants to select the whole code.
 * This methods selects all the lines by adding a background_selected_text class on all the pre Tags.
 * @function selectAllText
 */
export default function selectAllText(){

  let drag = conditionalVariables.getDrag();
  let lineEnd = dataVariables.getLineEnd();
  let lineStart = dataVariables.getLineStart();

  let codeLines = codeEditorCont.getElementsByClassName("line");
  for(let i=0;i<codeLines.length;i++){
      let textCont = codeLines[i].childNodes[0].childNodes[0];
      textCont.classList.add("background_selected_text");
  }
  
  lineStart = dataVariables.setLineStart({
      line:1,
      char:0,
  });
  lineEnd = dataVariables.setLineEnd({
      line:codeLines.length,
      char:codeLines[codeLines.length - 1].innerText.length
  });
  drag = conditionalVariables.setDrag(true);
}