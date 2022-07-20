import runSyntaxHighlighter from "../MusicBlock_v4_Support/runSyntaxHighlighter";
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

export default function addingInputEventListeners(codeEditorCont,dataVariables,conditionalVariables,arrayVariables){
  let textInputBox = codeEditorCont.querySelector('#code-editor-cursor-input');

  textInputBox.addEventListener('input',(e) => {
    handleInputChange(e, codeEditorCont,dataVariables,conditionalVariables,arrayVariables);
  });

  textInputBox.addEventListener("blur",()=>{
    codeEditorCont.getElementsByClassName('code_editor_cursor')[0].style.width = "0px";
  });
  textInputBox.addEventListener("focus",()=>{
    codeEditorCont.getElementsByClassName('code_editor_cursor')[0].style.width = "1px";
  });

  textInputBox.addEventListener("keydown",(e)=>{
    console.log(e)
    if(e.key == "Enter"){
      createNewLine(codeEditorCont,conditionalVariables,dataVariables,arrayVariables);
      runSyntaxHighlighter("enter",codeEditorCont,dataVariables,conditionalVariables);
    } 
    
    else if(e.key == "Backspace"){
      deleteCurrentLineOrLeftText(codeEditorCont,conditionalVariables,dataVariables,arrayVariables);
    } 
    
    else if(e.key == "Delete"){
      deleteNextLineOrRightText(codeEditorCont,conditionalVariables,dataVariables,arrayVariables);
    } 
    
    else if(e.key == "ArrowUp"){
      if(e.shiftKey){
          e.preventDefault();
          cursorNavigationSelectUp(codeEditorCont,dataVariables,conditionalVariables);
      }else {
          cursorNavigationUp(codeEditorCont,dataVariables,conditionalVariables);
      }
      
    } 
    
    else if(e.key == "ArrowDown"){
      if(e.shiftKey){
          e.preventDefault();
          cursorNavigationSelectDown(codeEditorCont,dataVariables,conditionalVariables);
      }else {
          cursorNavigationDown(codeEditorCont,dataVariables,conditionalVariables);
      } 
    } 
    
    else if(e.key == "ArrowLeft"){
      if(e.shiftKey){
          cursorNavigationSelectLeft(codeEditorCont,dataVariables,conditionalVariables);
      }else {
          cursorNavigationLeft(codeEditorCont,dataVariables,conditionalVariables);
      }
    } 
    
    else if(e.key == "ArrowRight"){
      if(e.shiftKey){
          cursorNavigationSelectRight(codeEditorCont,dataVariables,conditionalVariables);
      }else {
          cursorNavigationRight(codeEditorCont,dataVariables,conditionalVariables);
      }
    } 
    
    else if(e.key == "c" || e.key == "C"){
        
      if(e.ctrlKey){
          e.preventDefault();
          // we need to copy selected text
          copySelectedText(codeEditorCont);
      }
    } 
    
    else if(e.key == "v" || e.key == "V"){
        
      if(e.ctrlKey){
          e.preventDefault();
          pasteCopiedText(codeEditorCont,dataVariables,conditionalVariables,arrayVariables);
      }
    }

    else if(e.key == "z" || e.key == "Z"){
      if(e.ctrlKey){
          e.preventDefault();
          // we need to undo 
          performUndo(codeEditorCont,dataVariables,conditionalVariables,arrayVariables);
      }
    }

    else if(e.key == "y" || e.key == "Y"){
      if(e.ctrlKey){
          e.preventDefault();
          performRedo(codeEditorCont,dataVariables,conditionalVariables,arrayVariables);
      }
    }

    else if(e.key == "a" || e.key == "A"){
      if(e.ctrlKey){
          e.preventDefault();
          selectAllText(codeEditorCont,dataVariables,conditionalVariables);
      }
    }
  });
} 

