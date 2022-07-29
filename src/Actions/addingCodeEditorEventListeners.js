import getMousePosition from "../Tasks/getMousePosition";
import SelectTextByMouse from "../Tasks/selectTextByMouse";
import { codeEditorCont, intervalVariables, conditionalVariables, dataVariables } from '../store';

/**
 * This function adds "mousemove", "mouseup", "mousedown" and 
 * "scroll" eventListner on codeEditor. The purpose of all this eventlisteners is to achieve
 * to achieve text selection when user drags the mouse across code editor or move the
 * cursor if the the user just clicks on the editor.
 * @function addingCodeEditorEventListeners
 */
export default function addingCodeEditorEventListeners(){
  let codeEditor = codeEditorCont.getElementsByClassName('code_editor_lines_container')[0];
  
  codeEditor.addEventListener("mouseup",(e)=>{
    let mouseDown = conditionalVariables.getMouseDown();
    let drag = conditionalVariables.getDrag();
    let charSize = dataVariables.getCharSize();
    let lineNumber = dataVariables.getLineNumber();
    let charNumber = dataVariables.getCharNumber();
    let lineEnd = dataVariables.getLineEnd();
    let numberLineWidth = dataVariables.getNumberLineWidth();
    let lineHeight = dataVariables.getLineHeight();


    conditionalVariables.setMouseDown(false);
    mouseDown = false;
    intervalVariables.clearCodeEditorAutoScrollX();
    intervalVariables.clearCodeEditorAutoScrollY();
    // drag is a variable that stores where or  not user is dragging the mouse along with mouse click.
    if(!drag){
      /**
       * get the mouse position and sets the cursor at that particular position.
       * because if the user is not dragging and mouse click is detected then it means 
       * the user wants to move the cursor.
       * @function getMousePosition
       */
      getMousePosition(e);
    }
    if(drag){
      // gets mouse position converts it into line number and char number and sets the position
      // to lineEnd which will be used to follow the drag path and select the text user wants.
      let rect = codeEditor.getBoundingClientRect();
      let x = e.clientX - rect.left - numberLineWidth;
      let y = e.clientY - rect.top;

      lineNumber = parseInt(y/lineHeight) +1;
      charNumber = parseInt(x/charSize);
      let codeLines = codeEditorCont.getElementsByClassName("line");
      if(codeLines[lineNumber - 1].innerText.length < charNumber){
        charNumber = codeLines[lineNumber - 1].innerText.length;
      }
      dataVariables.setLineNumber(lineNumber);
      dataVariables.setCharNumber(charNumber);

      lineEnd = {
          line:lineNumber,
          char:charNumber
      };
      dataVariables.setLineEnd(lineEnd);
    }
    
  });

  codeEditor.addEventListener("mousedown",(e)=>{
    let mouseDown = conditionalVariables.getMouseDown();
    let drag = conditionalVariables.getDrag();
    let charSize = dataVariables.getCharSize();
    let lineNumber = dataVariables.getLineNumber();
    let charNumber = dataVariables.getCharNumber();
    let lineStart = dataVariables.getLineStart();
    let numberLineWidth = dataVariables.getNumberLineWidth();
    let lineHeight = dataVariables.getLineHeight();

    //set drag and  mousedown to false both locally and globally because the user has released the
    //mouse click. assign line start to position of mouse release so it can be used for future
    // references of drag end position.
    conditionalVariables.setMouseDown(true);
    conditionalVariables.setDrag(false);
    mouseDown = true;
    drag = false;
    let rect = codeEditor.getBoundingClientRect();
    let x = e.clientX - rect.left - numberLineWidth;
    let y = e.clientY - rect.top;

    lineNumber = parseInt(y / lineHeight) + 1;
    charNumber = parseInt(x / charSize);
    dataVariables.setLineNumber(lineNumber);
    dataVariables.setCharNumber(charNumber);

    lineStart = {
      line: lineNumber,
      char: charNumber,
    };
    dataVariables.setLineStart(lineStart);
  });

  let MouseMoveSelection ;
  codeEditor.addEventListener("mousemove",(e)=>{
    let mouseDown = conditionalVariables.getMouseDown();
    let drag = conditionalVariables.getDrag();
    let charSize = dataVariables.getCharSize();
    let lineNumber = dataVariables.getLineNumber();
    let charNumber = dataVariables.getCharNumber();
    let lineEnd = dataVariables.getLineEnd();
    let numberLineWidth = dataVariables.getNumberLineWidth();
    let lineHeight = dataVariables.getLineHeight();


    e.preventDefault();
    intervalVariables.clearCodeEditorAutoScrollX();
    intervalVariables.clearCodeEditorAutoScrollY();
    if(mouseDown){
      conditionalVariables.setDrag(true);
      drag = true;
      clearInterval(MouseMoveSelection);
      /**
       * mousemove gets triggered a lot of time per millisecond and running a
       * function for every time it gets triggered will be resource intensive,
       * so added a Timeout which clears itself when mousemove is trigerred before
       * the timeout function runs, which makes the function run at a rate we want
       * so currently this is running the function once for 1 millisecond. this frame makes
       * the selection motion smooth, decrease the rate and selection looks glitchy.
       * the timeout function basically sets lineEnd to mouse position and runs
       *  SelectTextByMouse which basically selects the texts based on lineStart and lineEnd
       * @function MouseMoveSelection
       */
      MouseMoveSelection = setTimeout(() => {
        let rect = codeEditor.getBoundingClientRect();
        let x = e.clientX - rect.left - numberLineWidth;
        let y = e.clientY - rect.top;

        lineNumber = parseInt(y / lineHeight) + 1;
        charNumber = parseInt(x / charSize);
        dataVariables.setLineNumber(lineNumber);
        dataVariables.setCharNumber(charNumber);

        lineEnd = {
          line: lineNumber,
          char: charNumber,
        };
        dataVariables.setLineEnd(lineEnd);
        SelectTextByMouse();
        // const TextSelection = new CustomEvent("TextSelection");
        // codeEditorCont.dispatchEvent(TextSelection);
      }, 1);
    }
    
  });


  let setTimeoutforWidthInc;
  codeEditorCont.addEventListener("scroll",()=>{
    /**
     * scroll gets triggered a lot of time per millisecond and running a
     * function for every time it gets triggered will be resource intensive,
     * so added a Timeout which clears itself when scroll is trigerred before
     * the timeout function runs, which makes the function run at a rate we want
     * so currently this is running the function once for 500 millisecond.
     * @function setTimeoutforWidthInc
     */
    // the below functions increase the width of number line container to match the
    // width of code line container, because the numbers have position:sticky, which
    // only works if the container width is greater than scroll, if this function is
    // not runned then the stickiness of number when scrolling left or right wont work.
    clearInterval(setTimeoutforWidthInc);
    setTimeoutforWidthInc = setTimeout(() => {
      const numberLineCont = codeEditorCont.getElementsByClassName('number_line_cont')[0];
      if (!(numberLineCont.clientWidth == codeEditorCont.scrollWidth)) {
        numberLineCont.style.width = codeEditorCont.scrollWidth + 'px';
      }
      if (!(codeEditor.clientWidth == codeEditorCont.scrollWidth)) {
        codeEditor.style.width = codeEditorCont.scrollWidth + 'px';
      }
    }, 500);
  });

}