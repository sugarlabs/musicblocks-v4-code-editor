/**
 * @description - We need some variables that are global to the whole project. To avoid creating
 * a global scope variable this class implements getter and setter functions for variable that 
 * hold arrays. 
 */
 export default class arrayVariables {
  constructor(){
    /**
     * A variable to store an undo event data to be accessed later to replace current code with saved code.
     * use getDrag() to get the value of variable and setDrag() to set the value of variable.
     * @type {Array}
     */
    this.undoStore = [];
    /**
     * A variable to store an redo event data to be accessed later to replace current code with saved code.
     * use getTextSelectionInProgress() to get the value of variable and setTextSelectionInProgress() to set the value of variable.
     * @type {Array}
     */
    this.redoStore = [];
    
  }

  getUndoStore(){
    return this.undoStore;
  }
  setUndoStore(UndoStore){
    this.undoStore = UndoStore;
    return this.undoStore;
  }
  pushIntoUndoStore(ele){
    this.undoStore.push(ele);
  }
  popFromUndoStore(){
    this.undoStore.pop();
  }
  shiftUndoStore(){
    this.undoStore.shift();
  }

  getRedoStore(){
    return this.redoStore;
  }
  setRedoStore(RedoStore){
    this.redoStore = RedoStore;
    return this.redoStore;
  }
  pushIntoRedoStore(ele){
    this.redoStore.push(ele);
  }
  popFromRedoStore(){
    this.redoStore.pop();
  }
  shiftRedoState(){
    this.redoStore.shift();
  }

}