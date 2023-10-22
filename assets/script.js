//All questions in the Quiz
const questions = [
    {
        id: 0,
        // Commonly used data types DO NOT include : Booleans
        question: "Commonly used data types DO NOT include:",
        answer: [
            {text: "Strings", isCorrect: false},
            {text: "Booleans", isCorrect: true},
            {text: "Alerts", isCorrect: false},
            {text: "Numbers", isCorrect: false},
        ]

    },
    {
        id: 1,
        // The condition in an if/else statement is enclosed within ________. : Parenthesis
        question: "The condition in an if/else statement is enclosed within ________.",
        answer: [
            {text: "Quotes", isCorrect: false},
            {text: "Square brackets", isCorrect: false},
            {text: "Curly brackets", isCorrect: false},
            {text: "Parenthesis", isCorrect: true},
        ]
    },
    {
        id: 2,
        // Arrays in JavaScript can be used to store ________. : All of the above
        question: "Arrays in JavaScript can be used to store ________.",
        answer: [
            {text: "Numbers & Strings", isCorrect: false},
            {text: "Other arrays", isCorrect: false},
            {text: "booleans", isCorrect: false},
            {text: "All of the above", isCorrect: true},
        ]
    },
    {
        id: 3,
       // String values must be enclosed within ________ when being assigned to variables. : Quotes
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answer: [
            {text: "Commas", isCorrect: false},
            {text: "Curly brackets", isCorrect: false},
            {text: "Quotes", isCorrect: true},
            {text: "Parenthesis", isCorrect: false},
        ]
    },
    {
        id: 4,
     // A very useful tool used during the development and debugging for printing content to the debugger is: Console log
    question: "A very useful tool used during the development and debugging for printing content to the debugger is:",
    answer: [
        {text: "JavaScript", isCorrect: false},
        {text: "Terminal/bash", isCorrect: false},
        {text: "For loops", isCorrect: false},
        {text: "Console log", isCorrect: true},
    ]
},
{
    id: 5,
    // How do you write 'Hello World' in an alert box? : alert('Hello World')
    question: "How do you write 'Hello World' in an alert box",
    answer: [
        {text: "alertBox('Hello World')", isCorrect: false},
        {text: "alert('Hello World')", isCorrect: true},
        {text: "msg('Hello World')", isCorrect: false},
        {text: "msgBox('Hello World", isCorrect: false},
    ]
},
{
    id: 6,
   // How do you create a function in JavaScript : function = myFunction()
   question: "How do you create a function in JavaScript",
    answer: [
        {text: "function myFunction(){}", isCorrect: true},
        {text: "function = myFunction()", isCorrect: false},
        {text: "function: myFunction()", isCorrect: false},
        {text: "function[]", isCorrect: false}
    ]
},
{
    id: 7,
    question: "END OF QUIZ",
    answer: [{ text: "Thank You", isCorrect: true },
    { text: "For Taking", isCorrect: true },
    { text: "My", isCorrect: true },
    { text: "Coding Quiz", isCorrect: true }
    ]
}
    ];

// ----------------------------------------------------------------


    //Main Variables
var timer = document.getElementById("timer");
var start = document.querySelector("#quizStartButton");
var quiz = document.getElementById("quiz");
var timeLeft = 90;


// Question/Answer Variables
var question = document.getElementById("question");
var id = 0;

var answers = document.querySelectorAll(".answer")
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var results = document.getElementById("result");

// Highscore board at end of quiz
var scoreWrapper = document.getElementById("score");
var scoreText = document.getElementById("score-text");

// Scoreboard variables
var scoreBoard = document.querySelector(".score-board");
var form = document.getElementById("form");
var userInitials = document.getElementById("intials");
var scoreList = document.getElementById("score-list");
var userScores = [];

// Button Variables
var viewHighscoresBtn = document.querySelector(".highscore");
var tryAgain = document.querySelector(".try-again");
var startButton = document.getElementById("quizStartButton");
var returnBtn = document.getElementById("returnButton");
var clearBtn = document.getElementById("clearButton");
var returnStrtBtn = document.querySelector(".return-start");


// -----------Functions---------


//Remove all previous answers and replace with JavaScript answers.
function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


//Display the score out of the length of questions 
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block";
}
//After answering a question it will take you to the next question

function showUserScores() {
    scoreList.innerHTML = "";

    for (var i = 0; i < userScores.length; i++) {
        var score = userScores[i];

        var li = document.createElement("li");
        li.textContent = score;
        li.setAttribute("data-index", i);

        scoreList.appendChild(li);
    }
};

// Show scores on start of page
function showScores() {
    var storedScores = JSON.parse(localStorage.getItem("userScores"));
    if (storedScores !== null) {
        userScores = storedScores;
    };
    // add the scores on page start
    showUserScores();
};
// Saves user scores
function storeScore() {
    localStorage.setItem("userScores", JSON.stringify(userScores));
};


//Timer Code, if time runs out. Show score and Game is over
function countdown() {
    var timeInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timer.textContent = "0";
            quiz.style.display = "none";
            scoreWrapper.style.display = "flex";
            scoreText.innerText = "Sorry you ran out of time, A score of zero cannot be saved. Better luck next time!";
            form.style.display = "none";
            returnStrtBtn.style.display = "flex";
            tryAgain.style.display = "flex";
        } else if (id === 7 && scoreWrapper.style.display === "none") {
            clearInterval(timeInterval);
            timer.textContent = timeLeft;
            quiz.style.display = "none"
            scoreWrapper.style.display = "flex";
            tryAgain.style.display = "none";
            returnStrtBtn.style.display = "none";
            form.style.display = "flex";
            scoreText.innerText = "Congratulations your score is: " + timeLeft;
        };

    }, 1000);
};

// Function to cycle through the questions
function questionCycle(id) {
    var startText = document.getElementById("start-text");
    startText.style.display = "none";
    // Add the text we want to display from our Questions array
    question.innerText = questions[id].question;

    // Add the text we want to display from our Questions array
    answer1.innerText = questions[id].answer[0].text;
    answer2.innerText = questions[id].answer[1].text;
    answer3.innerText = questions[id].answer[2].text;
    answer4.innerText = questions[id].answer[3].text;

    // Add true or false using isCorrect boolean
    answer1.value = questions[id].answer[0].isCorrect;
    answer2.value = questions[id].answer[1].isCorrect;
    answer3.value = questions[id].answer[2].isCorrect;
    answer4.value = questions[id].answer[3].isCorrect;

    if (id === 7) {
        answer1.disabled = true;
        answer2.disabled = true;
        answer3.disabled = true;
        answer4.disabled = true;
    } else {
        answer1.disabled = false;
        answer2.disabled = false;
        answer3.disabled = false;
        answer4.disabled = false;
    };
};

// Clear Score Board
function reloadScoreboard() {
    while (scoreList.hasChildNodes()) {
        scoreList.removeChild(scoreList.firstChild);
    };
    clearScores();
};

// Submit button 
form.addEventListener("submit", function (event) {
    event.preventDefault();

    var initalsText = userInitials.value.trim().toUpperCase() + ":" + " " + timeLeft;
    if (initalsText === "") {
        return;
    };

    if (scoreBoard.style.display === "none") {
        scoreBoard.style.display = "flex";
        scoreWrapper.style.display = "none";
    } else {
        scoreBoard.style.display = "none";
        scoreWrapper.style.display = "flex";
    };

    if (viewHighscoresBtn.disabled = true) {
        viewHighscoresBtn.disabled = false;
    };

    userScores.push(initalsText);

    storeScore();
    loadUserScores();
});

// Start Button
startButton.addEventListener("click", function () {

    if (quiz.style.display === "none" && id <= 9) {
        quiz.style.display = "flex";
    } else {
        quiz.style.display = "none";
    };

    if (scoreWrapper.style.display === "flex") {
        scoreWrapper.style.display = "none";
    };
    viewHighscoresBtn.disabled = true;
    start.setAttribute("style", "display: none;");
    quiz.setAttribute("style", "display: flex;");
    id = 0;
    countdown();
    questionCycle(id);

});

// Answer button
answers.forEach(answer => {
    answer.addEventListener("click", function () {
        if (answer.value == "true" && id <= 10) {
            id++;
            questionCycle(id);
            result.innerText = "True!";
            result.style.color = "green";
        } else if (answer.value == "false") {
            timeLeft -= 10;
            result.innerText = "False!";
            result.style.color = "red";
            id++;
            questionCycle(id);
        };

    });
});

// Try Again Button
tryAgain.addEventListener("click", function () {
    timeLeft = 90;
    id = 0;
    countdown();
    questionCycle(id);
    quiz.style.display = "flex";
    scoreWrapper.style.display = "none";
});
// View Highscores button
viewHighscoresBtn.addEventListener("click", function () {
    if (scoreBoard.style.display === "none") {
        scoreBoard.style.display = "flex";
        start.style.display = "none";
    };
});

// Return button
returnBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (scoreBoard.style.display === "flex") {
        scoreBoard.style.display = "none";
        scoreWrapper.style.display = "none";
        start.style.display = "flex";
        timeLeft = 90;
    };
});

// Return to start button
returnStrtBtn.addEventListener("click", function () {
    if (scoreWrapper.style.display === "flex") {
        scoreWrapper.style.display = "none";
        start.style.display = "flex";
        viewHighscoresBtn.disabled = false;
        timeLeft = 90;
        questionCycle(id);
    };
});

// Add user scores
function addUserScores() {
    scoreList.innerHTML = "";

    for (var i = 0; i < userScores.length; i++) {
        var score = userScores[i];

        var li = document.createElement("li");
        li.textContent = score;
        li.setAttribute("data-index", i);

        scoreList.appendChild(li);
    }
};

// Save user scores
function storeScore() {
    localStorage.setItem("userScores", JSON.stringify(userScores));
};  

function clearScores() {
    localStorage.clear()
    userScores = [];
};
   
// Load Scores Once Done
loadScores();

