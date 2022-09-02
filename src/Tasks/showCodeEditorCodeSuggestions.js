import { codeEditorCont, conditionalVariables, dataVariables } from "../store";
/**
 * This function sets the position of the code suggestion box relative to the cursor
 * and displays the code Sugeestion Box.
 * @function showCodeEditorCodeSuggestions
 */
export default function showCodeEditorCodeSuggestions(){
  const codeEditorSub = codeEditorCont.getElementsByClassName('code_editor_sub')[0];
  const suggestionsCont = codeEditorCont.getElementsByClassName('code_editor_code_suggestion_cont')[0];
  const codeLines = codeEditorCont.getElementsByClassName('code_editor_lines_container')[0];
  const cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
  const containerHeight = codeLines.getBoundingClientRect().height;
  const containerWidth = codeLines.getBoundingClientRect().width;
  const suggestionBoxLimits = {
    bottom : containerHeight - (cursor.getBoundingClientRect().top + dataVariables.getLineHeight()) > suggestionsCont.getBoundingClientRect().height,
    right : containerWidth - (cursor.getBoundingClientRect().right) > suggestionsCont.getBoundingClientRect().width
  }
  if(suggestionBoxLimits.bottom && suggestionBoxLimits.right){
    suggestionsCont.style.top = cursor.getBoundingClientRect().top + dataVariables.getLineHeight() + codeEditorSub.scrollTop + "px";
    suggestionsCont.style.left = cursor.getBoundingClientRect().left + codeEditorSub.scrollLeft + "px";
  } else if(!suggestionBoxLimits.bottom && suggestionBoxLimits.right){
    suggestionsCont.style.top = (cursor.getBoundingClientRect().top - suggestionsCont.getBoundingClientRect().height)+ codeEditorSub.scrollTop + "px";
    suggestionsCont.style.left = cursor.getBoundingClientRect().left + codeEditorSub.scrollLeft + "px";
    
  } else if(suggestionBoxLimits.bottom && !suggestionBoxLimits.right){
    suggestionsCont.style.top = cursor.getBoundingClientRect().top + dataVariables.getLineHeight() + codeEditorSub.scrollTop + "px";
    suggestionsCont.style.left = cursor.getBoundingClientRect().left - (suggestionsCont.getBoundingClientRect().width - (containerWidth - (cursor.getBoundingClientRect().right))) + codeEditorSub.scrollLeft + "px";
  } else if(!suggestionBoxLimits.bottom && !suggestionBoxLimits.right){
    suggestionsCont.style.top = (cursor.getBoundingClientRect().top - suggestionsCont.getBoundingClientRect().height)+ codeEditorSub.scrollTop + "px";
    suggestionsCont.style.left = cursor.getBoundingClientRect().left - (suggestionsCont.getBoundingClientRect().width - (containerWidth - (cursor.getBoundingClientRect().right))) + codeEditorSub.scrollLeft + "px";
  }

  conditionalVariables.setSuggestionBoxDisplay(true);
}