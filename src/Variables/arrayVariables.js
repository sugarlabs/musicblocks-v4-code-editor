/**
 * @description - We need some variables that are global to the whole project. To avoid creating
 * a global scope variable this class implements getter and setter functions for variable that 
 * hold arrays. 
 * @exports arrayVariables
 */
 export default class arrayVariables {
   constructor() {
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
     /**
      * A variable to store objects of errors occured in the code.
      * @type {Array}
      */
     this.errorStore = [];
     /**
      * A variable to store all the objects of warning occured in the code
      * @type {Array}
      */
     this.warningStore = [];
   }

   /**
    * @returns {Array} - returns undoStore which is an array for snapshot of codeEditor.
    */
   getUndoStore() {
     return this.undoStore;
   }
   /**
    *
    * @param {Aray} UndoStore - an array which will replace the current undoStore array
    * @returns {Array} - returns undoStore which is an array for snapshot of codeEditor.
    */
   setUndoStore(UndoStore) {
     this.undoStore = UndoStore;
     return this.undoStore;
   }
   /**
    *
    * @param {HTMLDivElement} ele - the code container DOM snapshot that will be pushed into undoStore array
    */
   pushIntoUndoStore(ele) {
     this.undoStore.push(ele);
   }
   /**
    * @description - thsi method will pop an HTMLDivELement from the undoStore Array
    */
   popFromUndoStore() {
     this.undoStore.pop();
   }
   /**
    * @description - thsi method will shift an HTMLDivELement from the undoStore Array
    */
   shiftUndoStore() {
     this.undoStore.shift();
   }

   /**
    * @returns {Array} - returns redoStore which is an array for snapshot of codeEditor.
    */
   getRedoStore() {
     return this.redoStore;
   }
   /**
    *
    * @param {Array} RedoStore - an array which will replace the current redoStore array
    * @returns {Array} - returns redoStore which is an array for snapshot of codeEditor.
    */
   setRedoStore(RedoStore) {
     this.redoStore = RedoStore;
     return this.redoStore;
   }
   /**
    *
    * @param {HTMLDivElement} ele - the code container DOM snapshot that will be pushed into redoStore array
    */
   pushIntoRedoStore(ele) {
     this.redoStore.push(ele);
   }
   /**
    * @description - thsi method will pop an HTMLDivELement from the redoStore Array
    */
   popFromRedoStore() {
     this.redoStore.pop();
   }
   /**
    * @description - thsi method will shift an HTMLDivELement from the redoStore Array
    */
   shiftRedoState() {
     this.redoStore.shift();
   }

   /**
    * @returns {Array} - returns errorStore which is an array for errors in the code.
    */
   getErrorStore() {
     return this.errorStore;
   }
   /**
    *
    * @param {Array} errorStore - an array which will replace the current errorStore array
    * @returns {Array} - returns errorStore which is an array for errors in the code.
    */
   setErrorStore(errorStore) {
     this.errorStore = errorStore;
     return this.errorStore;
   }
   /**
    *
    * @param {Object} err - an error object that will be pushed into errorStore.
    */
   pushIntoErrorStore(err) {
     this.errorStore.push(err);
   }
   /**
    * @description - thsi method will pop an Object from the errorStore Array
    */
   popFromErrorStore() {
     this.errorStore.pop();
   }
   /**
    * @description - thsi method will shift an Object from the errorStore Array
    */
   shiftErrorStore() {
     this.errorStore.shift();
   }

   /**
    * @returns {Array} - returns warningStore which is an array for warnings in the code.
    */
   getWarningStore() {
     return this.warningStore;
   }
   /**
    *
    * @param {Array} warningStore - an array which will replace the current warningStore array
    * @returns {Array} - returns warningStore which is an array for warnings in the code.
    */
   setWarningStore(warningStore) {
     this.warningStore = warningStore;
     return this.warningStore;
   }
   /**
    *
    * @param {Object} warn - an error object that will be pushed into warningStore.
    */
   pushIntoWarningStore(warn) {
     this.warningStore.push(warn);
   }
   /**
    * @description - thsi method will pop an Object from the warningStore Array
    */
   popFromWarningStore() {
     this.warningStore.pop();
   }
   /**
    * @description - thsi method will shift an Object from the warningStore Array
    */
   shiftWarningStore() {
     this.warningStore.shift();
   }
 }