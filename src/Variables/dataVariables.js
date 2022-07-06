/**
 * @description - We need some variables that are global to the whole project. To avoid creating
 * a global scope variable this class implements getter and setter functions for variable that 
 * hold data either numeric, string or object. 
 */
export default class dataVariables {
  constructor(){
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
      line:0,
      char:0
    };
    /**
     * A variable to store the end line data when text is being selected.
     * use getLineEnd() to get the value of variable and setLineEnd() to set the value of variable.
     * @type {JSON}
     */
    this.lineEnd = {
      line:0,
      char:0
    };

  }

  getLineNumber(){
    return this.lineNumber;
  }
  setLineNumber(LineNumber){
    this.lineNumber = LineNumber;
    return this.lineNumber;
  }

  getCharNumber(){
    return this.charNumber;
  }
  setCharNumber(CharNumber){
    this.charNumber = CharNumber;
    return this.charNumber;
  }

  getLineHeight(){
    return this.lineHeight;
  }
  setLineHeight(LineHeight){
    this.lineHeight = LineHeight;
    return this.lineHeight;
  }

  getCharSize(){
    return this.charSize;
  }
  setCharSize(CharSize){
    this.charSize = CharSize;
    return this.charSize;
  }

  getLineStart(){
    return this.lineStart;
  }
  setLineStart(LineStart){
    this.lineStart = LineStart;
    return this.lineStart;
  }

  getLineEnd(){
    return this.lineEnd;
  }
  setLineEnd(LineEnd){
    this.lineEnd = LineEnd;
    return this.lineEnd;
  }

  getNumberLineWidth(){
    return this.numberLineWidth;
  }
  setNumberLineWidth(NumberLineWidth){
    this.numberLineWidth = NumberLineWidth;
    return this.numberLineWidth;
  }
}