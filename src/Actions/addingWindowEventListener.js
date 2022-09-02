import SelectTextByMouse from "../Tasks/selectTextByMouse";
import { codeEditorCont, conditionalVariables, intervalVariables, dataVariables } from '../store';
/**
 * This function adds "mousemove", "mouseup" eventListner on codeEditor.
 * The purpose of all this eventlisteners is to achieve
 * auto scroll when a user drags the mouse outside of code Editor area usually intented to 
 * select lines which are not in the visible area by autoscrolling.
 * @function addingCodeEditorEventListeners
 */
export default function addingWindowEventListener(){

  
  window.addEventListener("mouseup",(e) =>{
    conditionalVariables.setMouseDown(false);
    intervalVariables.clearCodeEditorAutoScrollX();
    intervalVariables.clearCodeEditorAutoScrollY();
  });

  // gets cursor on focus when window loads up.
  window.onload = ()=>{
    let input = codeEditorCont.querySelector('#code-editor-cursor-input');
    input.focus();
  };

  window.addEventListener("mousemove",(e) => {
    let charSize = dataVariables.getCharSize();
    let lineEnd = dataVariables.getLineEnd();
    let mouseDown = conditionalVariables.getMouseDown();
    let drag = conditionalVariables.getDrag();
    let codeEditorContSub = codeEditorCont.getElementsByClassName('code_editor_sub');
    // user is dragging the mouse inside code editor.
    if(mouseDown && drag){
      console.log(codeEditorCont.offsetTop + codeEditorCont.clientHeight);
      let codeEditorContTop = codeEditorCont.offsetTop;
      //  (- lineHeight) because the height of status bar is lineHeight so we are removing
      // it from codeEditorContBottom to start scrolling even when the mouse is over statusbar
      let codeEditorContBottom =
        codeEditorCont.offsetTop + codeEditorCont.clientHeight - dataVariables.getLineHeight();
      let codeEditorContLeft = codeEditorCont.offsetLeft;
      let codeEditorContRight = codeEditorCont.offsetLeft + codeEditorCont.clientWidth;
      let codeLines = codeEditorCont.getElementsByClassName('line');
      // autoscroll left to right
      if (e.clientX > codeEditorContRight) {
        intervalVariables.clearCodeEditorAutoScrollX();
        intervalVariables.clearCodeEditorAutoScrollY();
        intervalVariables.setCodeEditorAutoScrollX(
          setInterval(() => {
            // codeEditorCont.scrollLeft = codeEditorCont.scrollLeft + 10;
            let noOfCharTobeSelected = Math.floor(10 / charSize);
            if (lineEnd.char <= codeLines[lineEnd.line - 1].innerText.length) {
              lineEnd.char = lineEnd.char + noOfCharTobeSelected;
              dataVariables.setLineEnd(lineEnd);
              SelectTextByMouse(codeEditorCont, dataVariables, conditionalVariables);
            }
          }, 10),
        );
      }
      // autoscroll right to left
      if (e.clientX < codeEditorContLeft) {
        intervalVariables.clearCodeEditorAutoScrollX();
        intervalVariables.clearCodeEditorAutoScrollY();
        intervalVariables.setCodeEditorAutoScrollX(
          setInterval(() => {
            // codeEditorCont.scrollLeft = codeEditorCont.scrollLeft - 10;
            let noOfCharTobeSelected = Math.floor(10 / charSize);
            //console.log(lineEnd.char)
            if (lineEnd.char >= 0) {
              lineEnd.char = lineEnd.char - noOfCharTobeSelected;
              dataVariables.setLineEnd(lineEnd);
              SelectTextByMouse(codeEditorCont, dataVariables, conditionalVariables);
            }
          }, 10),
        );
      }
      // autoscroll to to bottom
      if (e.clientY > codeEditorContBottom) {
        intervalVariables.clearCodeEditorAutoScrollX();
        intervalVariables.clearCodeEditorAutoScrollY();
        intervalVariables.setCodeEditorAutoScrollY(
          setInterval(() => {
            // codeEditorCont.scrollTop = codeEditorCont.scrollTop + 18.2;
            if (lineEnd.line <= codeLines.length) {
              lineEnd.line = lineEnd.line + 1;
              dataVariables.setLineEnd(lineEnd);
              SelectTextByMouse(codeEditorCont, dataVariables, conditionalVariables);
            }
          }, 100),
        );
        // //console.log("moving down");
      }
      // autoscroll bottom to top.
      if (e.clientY < codeEditorContTop) {
        intervalVariables.clearCodeEditorAutoScrollX();
        intervalVariables.clearCodeEditorAutoScrollY();
        intervalVariables.setCodeEditorAutoScrollY(
          setInterval(() => {
            // codeEditorCont.scrollTop = codeEditorCont.scrollTop - 18.2;
            if (lineEnd.line > 1) {
              lineEnd.line = lineEnd.line - 1;
              dataVariables.setLineEnd(lineEnd);
              SelectTextByMouse(codeEditorCont, dataVariables, conditionalVariables);
            }
          }, 100),
        );
      }
    }
  });


}