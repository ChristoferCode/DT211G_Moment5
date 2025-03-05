"use strict";

let impossibleEl = document.getElementById("impossiblebutton");
let answerEl = document.getElementById("answer");
let inputEl = document.getElementById("who");
let tackEl = document.getElementById("tackbutton");
let answer2El = document.getElementById("answer2");
let njaaEl = document.getElementById("njaabutton");
let answer3El = document.getElementById("answer3");
let okeeejEl = document.getElementById("okeeejbutton");
let lookalikeEl = document.getElementById("lookalike");
let reactionEl = document.getElementById("reactionbuttons");
let reaction1El = document.getElementById("reaction1button");
let reaction2El = document.getElementById("reaction2button");
let answer4El = document.getElementById("answer4");
let closinggateEl = document.getElementById("closinggate");
let answer5El = document.getElementById("answer5");
let answer6El = document.getElementById("answer6");



let buttonDelay;
let words =[];

// let answerTextFlag = false;
// let answerText2Flag = false;
// let answerText3Flag = false;
// let showLokalikeFlag = false;
// let answerText4Flag = false;
// let regretAnswer = false;
let inputName;



impossibleEl.addEventListener("mouseover", moveButton);
impossibleEl.addEventListener("mouseout", stayButton);

inputEl.addEventListener("keypress", function(name) {
    if (name.key === "Enter") {

        answerEl.innerHTML ="";
        tackEl.style.display = "none";

        answer2El.innerHTML ="";
        njaaEl.style.display = "none";

        answer3El.innerHTML ="";
        okeeejEl.style.display = "none";

        lookalikeEl.style.display = "none";
        reactionEl.style.display = "none";
        answer4El.innerHTML ="";
        
        // answerTextFlag = false;
        // answerText2Flag = false;
        // answerText3Flag = false;
        // showLokalikeFlag = false;
        // answerText4Flag = false;

        inputName = inputEl.value.toLowerCase();

        answerText(inputName);
        inputEl.value ="";    
    }
   
});

tackEl.addEventListener("click", function() {
    answerText2(inputName);
});

njaaEl.addEventListener("click", function() {
    answerText3();
});

okeeejEl.addEventListener("click", function() {
    showLookalike();
});

reaction1El.addEventListener("click", function() {
    answerText4happy();
});

reaction2El.addEventListener("click", function() {
    answerText4mad();
});


function typeText(text, element, delay) {
    
    words = text.split(" ");
    let index = 0;
    
    console.log(words);

    element.innerHTML ="";
    
    function typeWord() {
        if (index < words.length) {
            element.innerHTML += words[index] + " ";
            index++;
            setTimeout(typeWord, delay);
        }  
    }

    console.log("nu fortsätter funktionen...");
    buttonDelay = words.length *100;
    typeWord(); 
}


function showButton(element) {
    if (element.style.display === "none") {
        element.style.display = "flex";
    } 
}


function hideButton(element) {
    if (element.style.display === "flex") {
        element.style.display = "none";
    } 
}


function moveButton () {
    impossibleEl.style.animationPlayState = "running";
}

function stayButton () {
    impossibleEl.style.animationPlayState = "paused";
    impossibleEl.style.animationDelay = "100ms";
}


function answerText(inputName) {
    console.log(inputName);

    if (inputName === "mattias") {
        let text = "Hej <strong>Mattias!</strong> Vad kul att det är du som rättar denna uppgift.";
        typeText(text, answerEl, 100);
        // answerTextFlag = true;
        inputName = "mattias";
        hideButton(tackEl);
        setTimeout(function() {
            showButton(tackEl); 
        }, buttonDelay);
      
    } else if (inputName === "malin") {
        let text = "Hej <strong>Malin!</strong> Vad kul att det är du som rättar denna uppgift.";
        typeText(text, answerEl, 100);
        // answerTextFlag = true;
        inputName = "malin";
        hideButton(tackEl);
        setTimeout(function() {
            showButton(tackEl); 
        }, buttonDelay);

    } else {
        let text = "Oj, vem är du och hur har du hittat hit? Denna sida är för Malin eller Mattias.";
        typeText(text, answerEl, 100);
    }
    console.log(inputName);
}


function answerText2(inputName) {
    console.log(inputName);

    if (inputName === "mattias") {
        let text = "Det hade gått bra med <strong>Malin</strong> också såklart. Ni är <strong>ganska</strong> <strong>lika</strong> trots allt. Har du tänkt på det?";
        typeText (text, answer2El, 100);
        // answerText2Flag = true;
        hideButton(njaaEl);
        setTimeout(function() {
            showButton(njaaEl); 
        }, buttonDelay);

    } else if (inputName === "malin") {
        let text = "Det hade gått bra med <strong>Mattias</strong> också såklart. Ni är <strong>ganska</strong> <strong>lika</strong> trots allt. Har du tänkt på det?";
        typeText(text, answer2El, 100);
        // answerText2Flag = true;
        hideButton(njaaEl);
        setTimeout(function() {
            showButton(njaaEl); 
        }, buttonDelay);
    }
}

function answerText3() {
        let text = "Jo kolla här. Är egentligen bara <strong>håret</strong>, <strong>skägget</strong> och <strong>glasögonen</strong> som skiljer!";
        typeText(text, answer3El, 100);
        // answerText3Flag = true;
        hideButton(okeeejEl);
        setTimeout(function() {
            showButton(okeeejEl); 
        }, buttonDelay);

}


function showLookalike() {
        lookalikeEl.style.display = "flex";
        reactionEl.style.display = "flex";
        // showLokalikeFlag = true;

}

function answerText4happy() {
        let text = "Tjoho! Tack, ni är <strong>bäst</strong>! :)";
        typeText(text, answer4El, 100);
        // answerText4Flag = true;
        // regretAnswer = true;

        closinggateEl.style.animationPlayState = "paused";
}

function answerText4mad() {
        let text = "<strong>Förlåt</strong>...det var bara på skoj :( Ni är inte alls lika!";
        typeText(text, answer4El, 100);
        // answerText4Flag = true;
        // regretAnswer = true;
        setTimeout(function() {
            answerText5mad();
        }, 3000);

}

function answerText5mad() {
    let text = "<strong>Stänger</strong> <strong>ner</strong> <strong>sida</strong> <strong>om...</strong> <br> (avbryt genom att trycka Du är godkänd!) ";
    typeText(text, answer5El, 100);

    setTimeout(function() {
        answerText6mad();
    }, 3000);

}

function answerText6mad() {
    let text = "...10 ...9 ...8 ...7 ...6 ...5 ...4 ...3 ...2 ...1 ...";
    typeText(text, answer6El, 1000);

    closinggateEl.style.animationPlayState = "running";

}







