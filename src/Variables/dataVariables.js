/**
 * @description - We need some variables that are global to the whole project. To avoid creating
 * a global scope variable this class implements getter and setter functions for variable that 
 * hold data either numeric, string or object. 
 * @exports dataVariables
 */
export default class dataVariables {
  constructor(codeEditorCont) {
    /**
     * @type {HTMLDivElement} - code editor DOM
     */
    this.codeEditorCont = codeEditorCont;
    /**
     * A variable to keep track of line Number on which the cursor is placed.
     * use getLineNumber() to get the value of variable and setLineNumber() to set the value of variable.
     * @type {number}
     */
    this.lineNumber = 1;
    /**
     * A variable to keep track of character number on which the cursor is placed.
     * use getCharNumber() to get the value of variable and setCharNumber() to set the value of variable.
     * @type {number}
     */
    this.charNumber = 0;
    /**
     * A variable to store the lineHeight of a code line in code editor.
     * use getLineHeight() to get the value of variable and setLineHeight() to set the value of variable.
     * @type {number}
     */
    this.lineHeight = 18.2;
    /**
     * A variable to store the width of the Number Line.
     * use getNumberLineWidth() to get the value of variable and setNumberLineWidth() to set the value of variable.
     * @type {number}
     */
    this.numberLineWidth = 35;
    /**
     * A variable to store the character size of a code line in code editor.
     * use getCharSize() to get the value of variable and setCharSize() to set the value of variable.
     * @type {number}
     */
    this.charSize = 0;
    /**
     * A variable to store the start line data when text is being selected.
     * use getLineStart() to get the value of variable and setLineStart() to set the value of variable.
     * @type {JSON}
     */
    this.lineStart = {
      line: 0,
      char: 0,
    };
    /**
     * A variable to store the end line data when text is being selected.
     * use getLineEnd() to get the value of variable and setLineEnd() to set the value of variable.
     * @type {JSON}
     */
    this.lineEnd = {
      line: 0,
      char: 0,
    };
  }

  /**
   *
   * @returns {Number}
   */
  getLineNumber() {
    return this.lineNumber;
  }
  /**
   *
   * @returns {Number}
   */
  setLineNumber(LineNumber) {
    const lineChangeEvent = new Event("lineChangetriggered");
    this.lineNumber = LineNumber;
    this.codeEditorCont.dispatchEvent(lineChangeEvent);
    return this.lineNumber;
  }
  /**
   *
   * @returns {String}
   */
  getCharNumber() {
    return this.charNumber;
  }
  /**
   *
   * @returns {String}
   */
  setCharNumber(CharNumber) {
    const charChangeEvent = new Event('charChangetriggered');
    this.charNumber = CharNumber;
    this.codeEditorCont.dispatchEvent(charChangeEvent);
    return this.charNumber;
  }
  /**
   *
   * @returns {Number}
   */
  getLineHeight() {
    return this.lineHeight;
  }
  /**
   *
   * @returns {Number}
   */
  setLineHeight(LineHeight) {
    this.lineHeight = LineHeight;
    return this.lineHeight;
  }

  /**
   *
   * @returns {Number}
   */
  getCharSize() {
    return this.charSize;
  }
  /**
   *
   * @returns {Number}
   */
  setCharSize(CharSize) {
    this.charSize = CharSize;
    return this.charSize;
  }

  /**
   *
   * @returns {Object}
   */
  getLineStart() {
    return this.lineStart;
  }
  /**
   *
   * @returns {Object}
   */
  setLineStart(LineStart) {
    this.lineStart = LineStart;
    return this.lineStart;
  }

  /**
   *
   * @returns {Object}
   */
  getLineEnd() {
    return this.lineEnd;
  }
  /**
   *
   * @returns {Object}
   */
  setLineEnd(LineEnd) {
    this.lineEnd = LineEnd;
    return this.lineEnd;
  }

  /**
   *
   * @returns {Number}
   */
  getNumberLineWidth() {
    return this.numberLineWidth;
  }
  /**
   *
   * @returns {Number}
   */
  setNumberLineWidth(NumberLineWidth) {
    this.numberLineWidth = NumberLineWidth;
    return this.numberLineWidth;
  }
}