/**
 * @description - We need some variables that are global to the whole project. To avoid creating
 * a global scope variable this class implements getter and setter functions for variable that 
 * hold will hold setinterval functions. 
 */
 export default class intervalVariables {
  constructor(){
    /**
     * A variable to hold setInterval function that will scroll the code Editor in X direction every 10ms.
     * use getDrag() to get the value of variable and setDrag() to set the value of variable.
     * @type {setInterval}
     */
    this.codeEditorAutoScrollX = null;
    /**
     * A variable to hold setInterval function that will scroll the code Editor in Y direction every 10ms.
     * use getTextSelectionInProgress() to get the value of variable and setTextSelectionInProgress() to set the value of variable.
     * @type {setInterval}
     */
    this.codeEditorAutoScrollY = null;
    
  }

  getCodeEditorAutoScrollX(){
    return this.codeEditorAutoScrollX;
  }
  setCodeEditorAutoScrollX(CodeEditorAutoScrollX){
    this.codeEditorAutoScrollX = CodeEditorAutoScrollX;
    return this.codeEditorAutoScrollX;
  }
  clearCodeEditorAutoScrollX(){
    clearInterval(this.codeEditorAutoScrollX);
  }

  getCodeEditorAutoScrollY(){
    return this.codeEditorAutoScrollY;
  }
  setCodeEditorAutoScrollY(CodeEditorAutoScrollY){
    this.codeEditorAutoScrollY = CodeEditorAutoScrollY;
    return this.codeEditorAutoScrollY;
  }
  clearCodeEditorAutoScrollY(){
    clearInterval(this.codeEditorAutoScrollY);
  }

}