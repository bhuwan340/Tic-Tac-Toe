//Selecting all Required elements
const selectBox = document.querySelector(".select-box"),
    selectXBtn = selectBox.querySelector(".playerX"),
    selectYBtn = selectBox.querySelector(".playerY"),
    playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultbox = document.querySelector(".result-box"),
    wonText = resultbox.querySelector(".won-text"),
    replayBtn = resultbox.querySelector("button");

window.onload = () => {//once window loaded
    for (let i = 0; i < allBox.length; i++) {//add onclick attribute in all available section's spans
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add("hide");//hide the select box on playerX button clicked
        playBoard.classList.add("show");
    }
    selectYBtn.onclick = () => {
        selectBox.classList.add("hide");//hide the select box on playerY button clicked
        playBoard.classList.add("show");//show the playboard section on playerY button clicked
        players.setAttribute("class", "players active player");//adding three class name in player element
    }
}

let playerXIcon = "fas fa-times";//cross Icon
let playerYIcon = "far fa-circle";//Circle Icon
let playerSign = "X";//suppose player will be X
let runBot = true;

//user click function
function clickedBox(element) {
    // console.log(element);
    if (players.classList.contains("player")) {//if players element has contains .player
        element.innerHTML = `<i class="${playerYIcon}"></i>`;//adding cross icon tag inside user element
        players.classList.add("active");
        //if player select Y then we'll change the player signvalue to Y
        playerSign = "Y";
        element.setAttribute("id", playerSign);
    }
    else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;//adding circle icon tag inside user element
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();//calling the winner function
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none";//once user select any box then that box can't be selected again
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();

    setTimeout(() => {
        bot(runBot);//calling bot function
    }, randomDelayTime); //passing random delay time
}

//bot click function
function bot(runBot) {
    if (runBot) {//if runbot is true then run the following code
        //first change the playersign   so if user has X value in id then bot will have Y
        playerSign = "Y";
        let array = [];//creating empty array...we'll store unselected box index in this array
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {//if span has no any child element 
                array.push(i);//inserting unclicked or unselected boxes inside array means that span has no children
                //  console.log(i+" "+"has no children");  
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];//getting random index from array sp bot will select random unselected box

        if (array.length > 0) {
            if (players.classList.contains("player")) {//if player element has contains .player
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;//adding cross icon tag inside bot element
                players.classList.remove("active");
                //if user is Y then the bot id will be X
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerYIcon}"></i>`;//adding circle icon tag inside bot clicked element
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();//calling the winner
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";//once bot select any box then user can't select or click on that box
        playerSign = "X";//passing the X value
    }
}

//Winner-part
function getClass(idname) {
    return document.querySelector(".box" + idname).id;//returning id name
}

function checkClass(val1, val2, val3, sign) {
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }
}

function selectWinner() {//if one combination of them matched then select the winner
    if (checkClass(1, 2, 3, playerSign) || checkClass(4, 5, 6, playerSign) || checkClass(7, 8, 9, playerSign) || checkClass(1, 5, 9, playerSign) || checkClass(3, 5, 7, playerSign) || checkClass(1, 4, 7, playerSign) || checkClass(2, 5, 8, playerSign) || checkClass(3, 6, 9, playerSign)) {
        console.log(playerSign + " " + "is the winner");
        //once match won by someone then stop the bot
        runBot = false;
        bot(runBot);
        setTimeout(() => {//we'll delay to show the result box
            playBoard.classList.remove("show");
            resultbox.classList.add("show");
        }, 700);

        wonText.innerHTML = `player <p> ${playerSign}</p> won the Game!`;
    }
    else {
        //if match draw
        //first we'll check all id. if all span has id and no one won the game then we'll draw the game
        if (getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout(() => {//we'll delay to show the result box
                playBoard.classList.remove("show");
                resultbox.classList.add("show");
            }, 700);

            wonText.textContent = `Match has been Drawn!`;
        }
    }
}

replayBtn.onclick=()=>{
window.location.reload();//to reload the current page
}