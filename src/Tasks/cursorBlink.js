export default function cursorBlink(codeEditorCont){
  let cursorVisible = true;
  setInterval(()=>{
    let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor_blink')[0];
    cursorVisible ? cursor.style.visibility = "hidden" : cursor.style.visibility = "visible";
    cursorVisible ? cursorVisible = false : cursorVisible = true;
  },500);
}