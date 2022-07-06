/**
 * @description - We need some variables that are global to the whole project. To avoid creating
 * a global scope variable this class implements getter and setter functions for variable that 
 * hold conditional data either true or false. 
 */
 export default class conditionalVariables {
  constructor(){
    /**
     * A variable to know whether or not the mouse is being dragged.
     * use getDrag() to get the value of variable and setDrag() to set the value of variable.
     * @type {boolean}
     */
    this.drag = false;
    /**
     * A variable to know whether or not text is selected in the editor.
     * use getTextSelectionInProgress() to get the value of variable and setTextSelectionInProgress() to set the value of variable.
     * @type {boolean}
     */
    this.textSelectionInProgress = false;
    /**
     * A variable to know whether or not mouse Button is clicked inside the code editor.
     * use getMouseDown() to get the value of variable and setMouseDown() to set the value of variable.
     * @type {boolean}
     */
     this.mouseDown = false;
    
  }

  getDrag(){
    return this.drag;
  }
  setDrag(Drag){
    this.drag = Drag;
    return this.drag;
  }

  getTextSelectionInProgress(){
    return this.textSelectionInProgress;
  }
  setTextSelectionInProgress(TextSelectionInProgress){
    this.textSelectionInProgress = TextSelectionInProgress;
    return this.textSelectionInProgress;
  }

  getMouseDown(){
    return this.mouseDown;
  }
  setMouseDown(MouseDown){
    this.mouseDown = MouseDown;
    return this.mouseDown;
  }

}