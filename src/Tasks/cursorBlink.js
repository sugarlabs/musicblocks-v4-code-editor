import { codeEditorCont } from "../store";

/**
 * this method toggles the visible property of cursor div between hidden and visible giving the
 * cursor blink effect 
 * @function cursorBlink
 */
export default function cursorBlink(){
  let cursorVisible = true;
  setInterval(()=>{
    let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor_blink')[0];
    cursorVisible ? cursor.style.visibility = "hidden" : cursor.style.visibility = "visible";
    cursorVisible ? cursorVisible = false : cursorVisible = true;
  },500);
}