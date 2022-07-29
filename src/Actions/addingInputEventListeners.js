import copySelectedText from "../Tasks/copySelectedText";
import createNewLine from "../Tasks/createNewLine";
import cursorNavigationDown from "../Tasks/cursorNavigationDown";
import cursorNavigationLeft from "../Tasks/cursorNavigationLeft";
import cursorNavigationRight from "../Tasks/cursorNavigationRight";
import cursorNavigationSelectDown from "../Tasks/cursorNavigationSelectDown";
import cursorNavigationSelectLeft from "../Tasks/cursorNavigationSelectLeft";
import cursorNavigationSelectRight from "../Tasks/cursorNavigationSelectRight";
import cursorNavigationSelectUp from "../Tasks/cursorNavigationSelectUp";
import cursorNavigationUp from "../Tasks/cursorNavigationUp";
import deleteCurrentLineOrLeftText from "../Tasks/deleteCurrentLineOrLeftText";
import deleteNextLineOrRightText from "../Tasks/deleteNextLineOrRightText";
import handleInputChange from "../Tasks/handleInputChange";
import pasteCopiedText from "../Tasks/pasteCopiedText";
import performRedo from "../Tasks/performRedo";
import performUndo from "../Tasks/performUndo";
import selectAllText from "../Tasks/selectAllText";
import { codeEditorCont, dataVariables, conditionalVariables, arrayVariables } from "../store";

/**
 * this function adds eventListeners for keyboard inputs on codeEditor.
 * @fucntion addingInputEventListeners
 */
export default function addingInputEventListeners(){
  let textInputBox = codeEditorCont.querySelector('#code-editor-cursor-input');

  textInputBox.addEventListener('input',(e) => {
    handleInputChange(e);
  });

  textInputBox.addEventListener("blur",()=>{
    codeEditorCont.getElementsByClassName('code_editor_cursor')[0].style.width = "0px";
  });
  textInputBox.addEventListener("focus",()=>{
    codeEditorCont.getElementsByClassName('code_editor_cursor')[0].style.width = "1px";
  });

  textInputBox.addEventListener("keydown",(e)=>{
    if(e.key == "Enter"){
      createNewLine();
      // emitting InputTriggered event on codeEditor after adding text inside the Dom, this
      // event can be used to do additional tasks on text if needed by listening to this event.
      const InputEvent = new CustomEvent('InputTriggered', { detail: { data: 'Enter' } });
      textInputBox.dispatchEvent(InputEvent);
    }
    
    else if(e.key == "Backspace"){
      deleteCurrentLineOrLeftText();
      // emitting InputTriggered event on codeEditor after adding text inside the Dom, this
      // event can be used to do additional tasks on text if needed by listening to this event.
      const InputEvent = new CustomEvent('InputTriggered', { detail: { data: 'BackSpace' } });
      textInputBox.dispatchEvent(InputEvent);
    }
    
    else if(e.key == "Delete"){
      deleteNextLineOrRightText();
      // emitting InputTriggered event on codeEditor after adding text inside the Dom, this
      // event can be used to do additional tasks on text if needed by listening to this event.
      const InputEvent = new CustomEvent('InputTriggered', { detail: { data: 'Delete' } });
      textInputBox.dispatchEvent(InputEvent);
    }
    
    else if(e.key == "ArrowUp"){
      if(e.shiftKey){
          e.preventDefault();
          cursorNavigationSelectUp();
      }else {
          cursorNavigationUp();
      }
      
    }
    
    else if(e.key == "ArrowDown"){
      if(e.shiftKey){
          e.preventDefault();
          cursorNavigationSelectDown();
      }else {
          cursorNavigationDown();
      }
    }
    
    else if(e.key == "ArrowLeft"){
      if(e.shiftKey){
          cursorNavigationSelectLeft();
      }else {
          cursorNavigationLeft();
      }
    }
    
    else if(e.key == "ArrowRight"){
      if(e.shiftKey){
          cursorNavigationSelectRight();
      }else {
          cursorNavigationRight();
      }
    }
    
    else if(e.key == "c" || e.key == "C"){
        
      if(e.ctrlKey){
          e.preventDefault();
          // we need to copy selected text
          copySelectedText();
      }
    }
    
    else if(e.key == "v" || e.key == "V"){
        
      if(e.ctrlKey){
          e.preventDefault();
          pasteCopiedText();
      }
    }

    else if(e.key == "z" || e.key == "Z"){
      if(e.ctrlKey){
          e.preventDefault();
          // we need to undo 
          performUndo();
      }
    }

    else if(e.key == "y" || e.key == "Y"){
      if(e.ctrlKey){
          e.preventDefault();
          performRedo();
      }
    }

    else if(e.key == "a" || e.key == "A"){
      if(e.ctrlKey){
          e.preventDefault();
          selectAllText();
      }
    }
  });
}

