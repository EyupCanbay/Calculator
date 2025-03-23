class Calculator {
    static instance;

    constructor() {

        if (Calculator.instance) {
            return Calculator.instance;
        }
        Calculator.instance = this;

      this.display = document.getElementById("display");
      this.clear();
      this.initButtons();
      this.initKeyboard();
    }
  
    clear() { this.display.value = ""; }
    append(value) { this.display.value += value; }
    getLastCharacter() { return this.display.value.slice(-1); }
    changeLastCharacter(value) { this.display.value = this.display.value.slice(0, -1) + value; }
    deleteLastCharacter() { this.display.value = this.display.value.slice(0, -1); }
    calculate() {
      try { 
        if(this.display.value === "") return;
        this.display.value = eval(this.display.value); }
      catch( error ) { 
        console.log(error)
        this.display.value = "Error"; }
    }

    initButtons() {
      document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", () => {

          const value = button.getAttribute("data-value");
         
          if (value === ".") {
            let lastCar = this.getLastCharacter()
            if(!lastCar) this.display.value = 0;
            this.display.value += value
          }
          if (value === "del") return this.deleteLastCharacter()
          if (value === "C") return this.clear();
          if (value === "="){
          if(isNaN(Number(this.getLastCharacter())))  this.deleteLastCharacter()
            return this.calculate();
          }
          
          if (!isNaN(Number(this.getLastCharacter())) && !isNaN(Number(value))) this.append(value);
          else if (!isNaN(Number(this.getLastCharacter())) && isNaN(Number(value))) this.append(value);
          else if (isNaN(Number(this.getLastCharacter())) && !isNaN(Number(value))) this.append(value);
          else this.changeLastCharacter(value);
        });
      });
    }
   
    initKeyboard() {
        document.addEventListener("keydown",  (event) => {
            const calculatorKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
                    "+", "-", "*", "/", "Enter", "Backspace", "Escape", "."]
            
            const key = event.key;

            if(!calculatorKeys.includes(key)) return ;
            if (key === ".") {
                if(this.display.value === "") this.display.value = 0
                return this.display.value +=  "."
            }
            if (key === "Enter") {
                if(isNaN(Number(this.getLastCharacter()))) this.deleteLastCharacter()    
                return this.calculate();
            }
            else if (key === "Backspace") return this.deleteLastCharacter()
            else if (key === "Escape")return this.clear();
            else if (!isNaN(Number(this.getLastCharacter())) && !["+", "-", "*", "/", "."].includes(key)) this.append(key);
            else if (!isNaN(Number(this.getLastCharacter())) && ["+", "-", "*", "/", "."].includes(key)) this.append(key);
            else if (isNaN(Number(this.getLastCharacter())) && !["+", "-", "*", "/", "."].includes(key)) this.append(key);
            else this.changeLastCharacter(key);
        })
    }


  }
  
  new Calculator();
