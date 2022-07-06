import codeEditorStyles from "../css/codeEditor.css";



/**
 * @description This function creates the basic DOM for a code editor which 
 *          will be appended to a Node passed by user as a param. The DOM Structure
 *          of the below Function looks like :
 * @example   
 * <div id="code-editor-cont" class="editor_inner_container">
 *   <div class="code_editor_line_measure">
 *     <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
 *   </div>
 *   <div class="code_editor_cursor">
 *      <div class="code_editor_cursor_blink"></div>
 *      <input autocapitalize="none" type="text" id="code_editor_cursor_input" >
 *   </div>
 *      <div class="number_line_cont">
 *      <div class="number_line">
 *        <p>0</p>
 *      </div>
 *      <div class="number_line">
 *        <p>1</p>
 *      </div>
 *         
 *   </div>
 *   <div tabindex="0" class="code_editor_lines_container">
 *      <div class="line"><div class="text"><pre>hello</pre></div>
 *      </div>
 *   </div>
 * </div>
 * 
 * @return {HTMLDivElement} - the main code Editor container. 
 */

function createCodeEditorDom(){
  /**
   * @description - the main container that holds all the elements of an editor.
   *  <div class="editor_inner_container"></div>
   */
  const codeEditor = document.createElement("div");
  codeEditor.id = "code-editor-cont";
  codeEditor.classList.add("editor_inner_container");

  /**
   * @description - the div conatins a sample text of 40 characters.
   *    which will be used at runtime to calculate the length of a single character
   *    in order to move the cursor around.
   *  <div class="code_editor_line_measure">
   *    <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p> 
   * </div>
   */
  const codeEditorLineMeasure = document.createElement("div");
  codeEditorLineMeasure.classList.add("code_editor_line_measure");
  const codeEditorLineMeasureP = document.createElement('p');
  codeEditorLineMeasureP.innerText = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  codeEditorLineMeasure.appendChild(codeEditorLineMeasureP);

   /**
   * @description - the div is the blinking cursor that will be moving around 
   *  the editor taking inputs.
   *  <div class="code_editor_cursor">
        <div class="code_editor_cursor_blink"></div>
        <input autocapitalize="none" type="text" id="code_editor_cursor_input" >
      </div>
   */
  const codeEditorCursor = document.createElement("div");
  codeEditorCursor.classList.add("code_editor_cursor");
  const codeEditorCursorBackground = document.createElement("div");
  codeEditorCursorBackground.classList.add("code_editor_cursor_blink");
  codeEditorCursor.appendChild(codeEditorCursorBackground);
  const codeEditorCursorInput = document.createElement("input");
  codeEditorCursorInput.autocapitalize = "none";
  codeEditorCursorInput.type = "text";
  codeEditorCursorInput.id = "code-editor-cursor-input";
  codeEditorCursor.appendChild(codeEditorCursorInput);

   /**
   * @description - the div contains the number line for code Editor.
   *     It is seperated from lines to make it stay skicky when horizontal scroll 
   *     Happens
   */
  const codeEditorNumberLineCont = document.createElement("div");
  codeEditorNumberLineCont.classList.add("number_line_cont");
  const codeEditorNumberLine0 = document.createElement("div");
  codeEditorNumberLine0.classList.add("number_line");
  const codeEditorNumberLine0P = document.createElement('p');
  codeEditorNumberLine0P.innerText = '0';
  codeEditorNumberLine0.appendChild(codeEditorNumberLine0P);
  codeEditorNumberLineCont.appendChild(codeEditorNumberLine0);
  const codeEditorNumberLine1 = document.createElement("div");
  codeEditorNumberLine1.classList.add("number_line");
  const codeEditorNumberLine1P = document.createElement("p");
  codeEditorNumberLine1P.innerText = '1';
  codeEditorNumberLine1.appendChild(codeEditorNumberLine1P);
  codeEditorNumberLineCont.appendChild(codeEditorNumberLine1);
  
  /**
   * @description - the div contains the lines where the actual code is displayed.
   */
  const codeEditorTextLineCont = document.createElement("div");
  codeEditorTextLineCont.classList.add("code_editor_lines_container");
  codeEditorTextLineCont.tabindex = "0";
  const codeEditorTextLine = document.createElement("div");
  codeEditorTextLine.classList.add("line");
  const codeEditorTextLineTextCont = document.createElement("div");
  codeEditorTextLineTextCont.classList.add("text");
  const codeEditorTextLineText = document.createElement("pre");
  codeEditorTextLineText.innerText = "hello";
  codeEditorTextLineTextCont.appendChild(codeEditorTextLineText);
  codeEditorTextLine.appendChild(codeEditorTextLineTextCont);
  codeEditorTextLineCont.appendChild(codeEditorTextLine);

  /**
   * @description - appending all the elements into the mav container.
   */
  codeEditor.appendChild(codeEditorLineMeasure);
  codeEditor.appendChild(codeEditorCursor);
  codeEditor.appendChild(codeEditorNumberLineCont);
  codeEditor.appendChild(codeEditorTextLineCont);

  // const codeEditorStyleTag = document.createElement("style");
  // console.log(codeEditorStyles[0])
  // codeEditorStyleTag.innerText = codeEditorStyles[0][1];
  // document.head.appendChild(codeEditorStyleTag);

  return codeEditor;
  
}

/**
 * @description - this class provides a getter and setter method for codeEditor DOM so
 * all the changes and listener could be added to one single HTML node which can be 
 * exported at the end.
 */
export default class codeEditorDom {
  constructor(){
    /**
     * A variable to store code editor DOM which will be manipulated and exported at the end.
     * use getCodeEditor() to get the code editor DOM and setCodeEditor() to set the codeEditor DOM.
     * @type {HTMLDivElement}
     */
    this.codeEditor = createCodeEditorDom();
  }

  getCodeEditor(){
    return this.codeEditor;
  }
  setCodeEditor(CodeEditor){
    this.codeEditor = CodeEditor;
  }
}