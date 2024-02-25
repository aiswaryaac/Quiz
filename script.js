const questions=[
    {
        question : "Which animal is known as the 'Ship of the Desert?",
    
        answers:[
        {text : "Camel", correct: true},
        {text : "horse", correct: false},
        {text : "giraffe", correct: false},
        {text : "zebra", correct: false},
        
        ]
    },

    {
        question : "Name the National bird of India?",
    
        answers:[
        {text : "peacock", correct: true},
        {text : "parrot", correct: false},
        {text : "penguie", correct: false},
        {text : "sparrow", correct: false},
        
        ]
    }
];

const questionElement=document.getElementById("question")
const answerButton=document.getElementById("answer-button")
const nextButton=document.getElementById("nextbtn")

let currentQuestionindex=0;
let score=0;

function startQuiz(){
    currentQuestionindex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionindex];
    let questionNo = currentQuestionindex + 1;
    questionElement.innerHTML = questionNo + "."+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button")
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if(answer.correct){
            button.dataset.correct=answer.correct;

        }
        button.addEventListener("click",selectAnswer);

    });
    


}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect= selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");

        }
        button.disabled = true;

    })
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}! `;
    nextButton.innerHTML ="play again";
    nextButton.style.display="block";
}


function handleNextButton(){
    currentQuestionindex++;
    if(currentQuestionindex < questions.length)
    {
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click",()=>{
    if(currentQuestionindex < questions.length){

        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();