import { codeEditorCont } from "../store";

/**
 * This methods removes the number from the number line and the actual line from the code lines container
 * @param {Number} lineNumberToremove - line Number to remove from the code Editor Lines. 
 * @function removeLine
 */
export default function removeLine(lineNumberToremove){
  // removing number from number line
  let numberLines = codeEditorCont.getElementsByClassName('number_line');
  numberLines[numberLines.length-1].parentNode.removeChild(numberLines[numberLines.length-1]);

  // removing text line
  let codeLines = codeEditorCont.getElementsByClassName("line");
  codeLines[lineNumberToremove - 1].parentNode.removeChild(codeLines[lineNumberToremove - 1]);
}