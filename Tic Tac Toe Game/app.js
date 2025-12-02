let themeBtn = document.querySelector("#themeBtn");
let body = document.querySelector("body");
let gameName = document.querySelector("#gameName");
let main = document.querySelector("main");
let box = document.querySelectorAll(".box");
let resetBtn = document.querySelectorAll(".resetBtn");
let newGameBtn = document.querySelectorAll(".resetBtn");
let container = document.querySelector(".container");
let navBar = document.querySelector("nav");
let congrats_section  = document.querySelector(".congrats_section");
let contratsSpan  = document.querySelector("#contratsSpan");
let WonGame  = document.querySelector("#WonGame");
let gameOver = document.querySelector(".gameOverContainer");
let whosTurn = document.querySelector("#whosTurn");
let themeContainer = document.querySelector(".themeContainer");

let isThemeChange = true;

themeContainer.addEventListener("click", () => {
    body.classList.toggle("changeTheme");
    if(isThemeChange) {
        themeBtn.style.color = "white";
        gameName.style.color = "#ff9e01";
        main.style.borderColor = "white";
        navBar.style.background = "#fca311";
        resetBtn.forEach((btn) => {
            btn.style.background = "white";
            btn.style.color = "black";
        });
        // contratsSpan.style.color = "#f22544";
        contratsSpan.style.color = "#48dd85";
        // WonGame.style.color = "white";
        box.forEach((boxes) => {
            boxes.style.borderColor = "white";
            boxes.childNodes[0].style.color = "white";
        })
        isThemeChange = false;
    }
    else {
        themeBtn.style.color = "black";
        gameName.style.color = "#df5a8a";
        main.style.borderColor = "black";
        contratsSpan.style.color = "#2266d8";
        navBar.style.background = "#fcbf49";
        resetBtn.forEach((btn) => {
            btn.style.background = "#1B1A1A";
            btn.style.color = "white";
        });
        // WonGame.style.color = "black";
        box.forEach((box) => {
            box.style.borderColor = "black";
            box.childNodes[0].style.color = "black";
        })
        isThemeChange = true;
    }
})

const disableBoxes = () => {
    box.forEach((b) => {
        b.style.pointerEvents = "none";
    });
}

let chance = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let count = 0;
const checkWinner = () => {
    for(let patterns of winPatterns) {
        pos1Val = box[patterns[0]].innerText;
        pos2Val = box[patterns[1]].innerText;
        pos3Val = box[patterns[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("Winner: ",pos1Val);
            disableBoxes();
            WonGame.innerText = `${pos1Val} is Won the Game`;

            if(isThemeChange) {
                contratsSpan.style.color = "#2266d8";
            }
            else if(!isThemeChange) {
                // contratsSpan.style.color = "#f22544";
                contratsSpan.style.color = "#48dd85";
            }

            if(WonGame.innerText.includes("X")) {
                WonGame.style.color = "#e22346";
            }
            else if(WonGame.innerText.includes("0")) {
                WonGame.style.color = "#2176ff";
            }
            container.style.display = "none";
            congrats_section.style.display = "flex";
            return true;
        }
    }
}

let removeBoxStyle = (box) => {
    box.style.background = "none";
    box.childNodes[0].innerText ="";
    whosTurn.innerText = "X Turn";
    whosTurn.style.color = "#e22346";
}

box.forEach((box) => {
    box.addEventListener("click", (e) => {
        if(!chance) {
            box.childNodes[0].innerText ="X";
            box.style.background = "#e22346"
            whosTurn.innerText = "0 Turn";
            whosTurn.style.color = "#2176ff";
            box.style.pointerEvents = "none";
            chance = true;
        }
        else {
            box.childNodes[0].innerText = "0"
            box.style.background = "#2176ff"
            box.style.pointerEvents = "none";
            whosTurn.innerText = "X Turn";
            whosTurn.style.color = "#e22346";
            chance = false;
        }
        let isWinning = checkWinner();
        count++;
        if(count==9 && !isWinning) {
            console.log("Game Over");
            container.style.display = "none";
            gameOver.style.display = "flex";
        }
    });
});

resetBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        box.forEach((box) => {
            removeBoxStyle(box);
            box.style.pointerEvents = "auto"
        })
        chance = false;
        count = 0;
    })
})

newGameBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        box.forEach((box) => {
            removeBoxStyle(box);
            box.style.pointerEvents = "auto"
            container.style.display = "flex";
            congrats_section.style.display = "none";
            gameOver.style.display = "none";
        })
        chance = false;
        count = 0;
    });
})
