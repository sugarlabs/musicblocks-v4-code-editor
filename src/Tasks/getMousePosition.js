import deselectText from "./deselectText";
import { codeEditorCont, dataVariables,conditionalVariables } from "../store";

/**
 * This method gets the mosue click position on the codeEditor canvas,
 * converts the position into line number and char number and moves the cursor to that
 * position.
 * @param {Event} event - mouse click event data
 * @function getMousePosition
 */
export default function getMousePosition(event) {
  const TextDeselectEvent = new Event('TextDeselect');
  let numberLineWidth = dataVariables.getNumberLineWidth();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let lineHeight = dataVariables.getLineHeight();

  let canvas = codeEditorCont.getElementsByClassName('code_editor_lines_container')[0];
  // remove selected text if any
  conditionalVariables.setTextSelectionInProgress(false);
  deselectText();

  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left - numberLineWidth;
  let y = event.clientY - rect.top;

  let charSize = dataVariables.getCharSize();

  lineNumber = parseInt(y / lineHeight) + 1;
  charNumber = parseInt(x / charSize);
  dataVariables.setCharNumber(charNumber);
  dataVariables.setLineNumber(lineNumber);

  let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
  let textlines = codeEditorCont.getElementsByClassName('text');
  if (!textlines[lineNumber - 1]) {
    lineNumber = textlines.length;
    dataVariables.setLineNumber(lineNumber);
  }
  let lineTextLength = textlines[lineNumber - 1].innerText.length;
  // when the line is emepty only then ZEROWidthSpace will exists during which we
  // to make the cursor be at position 0 on the line so making lineTextLength =0
  if (textlines[lineNumber - 1].innerText == '\u200B') {
    lineTextLength = 0;
  }

  if (charNumber > lineTextLength) {
    cursor.style.left = lineTextLength * charSize + numberLineWidth + 'px';
    charNumber = lineTextLength;
    dataVariables.setCharNumber(charNumber);
  } else if (charNumber < 0) {
    cursor.style.left = numberLineWidth + 'px';
    charNumber = 0;
    dataVariables.setCharNumber(charNumber);
  } else {
    cursor.style.left = charNumber * charSize + numberLineWidth + 'px';
  }
  codeEditorCont.dispatchEvent(TextDeselectEvent);
  cursor.style.top = (lineNumber - 1) * lineHeight + 'px';
  let input = codeEditorCont.querySelector('#code-editor-cursor-input');
  input.focus();
}