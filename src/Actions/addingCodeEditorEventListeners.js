import getMousePosition from "../Tasks/getMousePosition";
import SelectTextByMouse from "../Tasks/selectTextByMouse";

export default function addingCodeEditorEventListeners(codeEditorCont, intervalVariables, conditionalVariables, dataVariables){
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
    if(!drag){
      getMousePosition(codeEditorCont, conditionalVariables, dataVariables, e);
    } 
    if(drag){
      let rect = codeEditor.getBoundingClientRect();
      let x = e.clientX - rect.left - numberLineWidth;
      let y = e.clientY - rect.top;

      lineNumber = parseInt(y/lineHeight) +1;
      charNumber = parseInt(x/charSize);
      dataVariables.setLineNumber(lineNumber);
      dataVariables.setCharNumber(charNumber);

      lineEnd = {
          line:lineNumber,
          char:charNumber
      }
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


    conditionalVariables.setMouseDown(true);
    conditionalVariables.setDrag(false);
    mouseDown = true;
    drag = false;
    let rect = codeEditor.getBoundingClientRect();
    let x = e.clientX - rect.left - numberLineWidth;
    let y = e.clientY - rect.top;

    lineNumber = parseInt(y/lineHeight) + 1 ;
    charNumber = parseInt(x/charSize);
    dataVariables.setLineNumber(lineNumber);
    dataVariables.setCharNumber(charNumber);

    lineStart = {
        line:lineNumber,
        char:charNumber
    }
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
      drag= true;
      clearInterval(MouseMoveSelection);
      MouseMoveSelection = setTimeout(()=>{
          let rect = codeEditor.getBoundingClientRect();
          let x = e.clientX - rect.left - numberLineWidth;
          let y = e.clientY - rect.top;

          lineNumber = parseInt(y/lineHeight) +1;
          charNumber = parseInt(x/charSize);
          dataVariables.setLineNumber(lineNumber);
          dataVariables.setCharNumber(charNumber);
      
          lineEnd = {
              line:lineNumber,
              char:charNumber
          }
          dataVariables.setLineEnd(lineEnd);
          SelectTextByMouse(codeEditorCont,dataVariables,conditionalVariables);
      },1)
    }
    
  });


  let setTimeoutforWidthInc;
  codeEditorCont.addEventListener("scroll",()=>{
    clearInterval(setTimeoutforWidthInc);
    setTimeoutforWidthInc = setTimeout(()=>{
        const numberLineCont = codeEditorCont.getElementsByClassName('number_line_cont')[0];
        if(!(numberLineCont.clientWidth == codeEditorCont.scrollWidth)){
            numberLineCont.style.width = codeEditorCont.scrollWidth+"px";
        }
        if(!(codeEditor.clientWidth == codeEditorCont.scrollWidth)){
            codeEditor.style.width = codeEditorCont.scrollWidth+"px";
        }
        
    },500)
    
  });

}