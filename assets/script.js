//All questions in the Quiz
const questions = [
    {
        // Commonly used data types DO NOT include : Booleans
        question: "Commonly used data types DO NOT include:",
        answers: [
            {text: "Strings", correct: false},
            {text: "Booleans", correct: true},
            {text: "Alerts", correct: false},
            {text: "Numbers", correct: false},
        ]

    },
    {
        // The condition in an if/else statement is enclosed within ________. : Parenthesis
        question: "The condition in an if/else statement is enclosed within ________.",
        answers: [
            {text: "Quotes", correct: false},
            {text: "Square brackets", correct: false},
            {text: "Curly brackets", correct: false},
            {text: "Parenthesis", correct: true},
        ]
    },
    {
        // Arrays in JavaScript can be used to store ________. : All of the above
        question: "Arrays in JavaScript can be used to store ________.",
        answers: [
            {text: "Numbers & Strings", correct: false},
            {text: "Other arrays", correct: false},
            {text: "booleans", correct: false},
            {text: "All of the above", correct: true},
        ]
    },
    {
       // String values must be enclosed within ________ when being assigned to variables. : Quotes
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: [
            {text: "Commas", correct: false},
            {text: "Curly brackets", correct: false},
            {text: "Quotes", correct: true},
            {text: "Parenthesis", correct: false},
        ]
    },
    {
     // A very useful tool used during the development and debugging for printing content to the debugger is: Console log
    question: "A very useful tool used during the development and debugging for printing content to the debugger is:",
    answers: [
        {text: "JavaScript", correct: false},
        {text: "Terminal/bash", correct: false},
        {text: "For loops", correct: false},
        {text: "Console log", correct: true},
    ]
},
{
    // How do you write 'Hello World' in an alert box? : alert('Hello World')
    question: "How do you write 'Hello World' in an alert box",
    answers: [
        {text: "alertBox('Hello World')", correct: false},
        {text: "alert('Hello World')", correct: true},
        {text: "msg('Hello World')", correct: false},
        {text: "msgBox('Hello World", correct: false},
    ]
},
{
   // How do you create a function in JavaScript : function = myFunction()
   question: "How do you create a function in JavaScript",
    answers: [
        {text: "function = myFunction()", correct: true},
        {text: "function myFunction()", correct: false},
        {text: "function: myFunction()", correct: false},
    ]
}
    ];


    //Attach constants to ID elements in the HTML
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn")

//Start questions and score at 0
let currentQuestionIndex = 0;
let score = 0;

//Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    console.log("Quiz Started");
    countDown();
    subtractTime();
};


//Shows the questions and answer buttons' text
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        //If answer is correct in the Java text this will make it correct.
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
        
    });
};

//Remove all previous answers and replace with JavaScript answers.
function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//When user clicks on a button the computer will check if the dataset is true.
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    //If true, add the class name "correct" and increase score
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        //If NOT true, add the class name "incorrect"
    } else {
        selectedBtn.classList.add("incorrect")
        score--;
    }
    
    //For each button, check data set. If true, add class "correct" to highlight
    //the correct answer, then disable the buttons and display the "Next" button.
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
};

//Display the score out of the length of questions 
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block";
}
//After answering a question it will take you to the next question
//If there are no more questions, the game is over and score is shown.
function nextQuestion() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

//When clicking on the "Next" button, it will take you to the next question.
nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        nextQuestion();
    } else {
        startQuiz();
    }
})

//Timer Code, if time runs out. Show score and Game is over

countDown(60,"timer-sec");
function countDown(secs,elem) {
    const timeLeftEl = document.getElementById(elem);
    timeLeftEl.innerHTML = secs;
        secs--;
        var timer = setTimeout('countDown('+secs+',"'+elem+'")', 1000);
        if(secs < 0){
            clearTimeout(timer);
            alert('Time is up!')
            showScore()
        }  
}

//If Incorrect subtract 5 seconds.
function subtractTime() {
    while(!isCorrect){
        secs -= 10;
    }
}
    
   

startQuiz();

