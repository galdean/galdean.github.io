///////
// creates vert line and adds to body 
// create element first
const vertical_line = document.createElement("div");
//add styles in css
vertical_line.className = "vertical_line";
// append to body
document.body.appendChild(vertical_line);

/// repeats the above for horizontal line
const horizontal_line = document.createElement("div");
horizontal_line.className = "horizontal_line";
document.body.appendChild(horizontal_line);


let isMoving = 0;
let vpos = 0, hpos = 0;

// ==== Create keyboard container ====// ===== CREATE KEYBOARD CONTAINER =====
const keyboard = document.createElement("div");
keyboard.id = "keyboard";
keyboard.style.position = "fixed";
keyboard.style.bottom = "20px";
keyboard.style.left = "50%";
keyboard.style.transform = "translateX(-50%)";
keyboard.style.zIndex = "199";
keyboard.style.background = "#f1f1f1";
keyboard.style.padding = "10px";
keyboard.style.border = "2px solid #aaa";
keyboard.style.borderRadius = "10px";
keyboard.style.display = "inline-block";
keyboard.style.fontFamily = "sans-serif";

// ===== KEY LAYOUT =====
const layout = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M'],
  ['1','2','3','4','5','6','7','8','9','0'],
  ['Space','Backspace','Submit']
];


// =====  copying template keyboard. REDO later
// to learn and personalize. Also, seperate css code
// into it's own file. =====
const textDisplay = document.createElement("div");
textDisplay.id = "typedText";
textDisplay.style.minHeight = "30px";
textDisplay.style.marginBottom = "10px";
textDisplay.style.padding = "5px 10px";
textDisplay.style.background = "#fff";
textDisplay.style.border = "1px solid #ccc";
textDisplay.style.fontSize = "18px";
textDisplay.textContent = "";  // user text input goes here
keyboard.appendChild(textDisplay);

// ===== CREATE BUTTONS FROM LAYOUT =====
layout.forEach(row => {
  const rowDiv = document.createElement("div");
  rowDiv.style.display = "flex";
  rowDiv.style.justifyContent = "center";
  rowDiv.style.marginBottom = "5px";

  row.forEach(key => {
    const btn = document.createElement("button");
    btn.textContent = key;
    btn.setAttribute("data-key", key);
    btn.className = "key";
    btn.style.margin = "2px";
    btn.style.padding = "10px 14px";
    btn.style.fontSize = "16px";
    btn.style.border = "1px solid #888";
    btn.style.background = "#fff";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";

btn.onclick = () => {
  if (key === "Backspace") {
    textDisplay.textContent = textDisplay.textContent.slice(0, -1);
  } else if (key === "Space") {
    textDisplay.textContent += " ";
  } else if (key === "Submit") {
    const input = document.activeElement;
    if (input && (input.tagName === "INPUT" || input.tagName === "TEXTAREA")) {
      input.value = textDisplay.textContent;
      input.form?.requestSubmit(); // If inside a form, submit it
      console.log("Submitted to form:", input.value);
    } else {
      alert("Submitted: " + textDisplay.textContent);
    }
  } else {
    textDisplay.textContent += key;
  }

  console.log("Key clicked:", key);
};


    rowDiv.appendChild(btn);
  });

  keyboard.appendChild(rowDiv);
});

// ===== ADD TO PAGE =====
document.body.appendChild(keyboard);




/* _____________TO DO:__________________________________________________

    - stop the automatic browser response to spacebar
    - add isMoving 3 and back to 0
    - add keyboard to type
    - add a way to scroll up and down
    - if time, add way to turn on/off extension with one button 
    ____________________________________________________________________*/

document.addEventListener("keydown", (event) => {
    if( event.key == " " && isMoving == 0) {
        event.preventDefault();
        //turn on the vertical line
        vertical_interval_loop = setInterval(() => {
        vertical_line.style.left = vpos++ + "px";
        isMoving = 1;
        }, 5); // runs every blank millisecond
    };
    if (event.key == " " && isMoving == 1){
        event.preventDefault();
        clearInterval(vertical_interval_loop);
         horizontal_interval = setInterval(() => {
                horizontal_line.style.top = hpos++ + "px";
                isMoving = 2;
        }, 5);
    }
    if(event.key == " " && isMoving == 2) {
        //turn off the vertical line and save position
        event.preventDefault();

        clearInterval(horizontal_interval);
        const objToClick = document.elementFromPoint(vpos, hpos);
        objToClick.click();
        console.log("Clicked on: ", objToClick);
        console.log("Vertical Position: ", vpos);
         
        // reset the position of the lines
        vpos = 0;
        hpos = 0;
        vertical_line.style.left = "0px";
        horizontal_line.style.top = "0px";
        isMoving = 0; 

    };
//  clearInterval(vertical_interval_loop);
}); //end of keydown event

const firstInput = document.querySelector("input, textarea");
if (firstInput) firstInput.focus();
