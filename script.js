const questions=[
    {
        question : "What is the capital of France?",
    
        answers:[
        {text : "Paris", correct: true},
        {text : "London", correct: false},
        {text : "Rome", correct: false},
        {text : "Berlin", correct: false},
        
        ]
    },

    {
        question : "Who wrote the play Romeo and Juliet?",
    
        answers:[
        {text : " William Shakespeare", correct: true},
        {text : "Charles Dickens", correct: false},
        {text : "Jane Austen", correct: false},
        {text : "Mark Twain", correct: false},
        
        ]
    },

    {
        question : "What is the chemical symbol for water?",
    
        answers:[
        {text : " Wa", correct: false},
        {text : "H2O", correct: true},
        {text : "O2", correct: false},
        {text : "H2", correct: false},
        
        ]
    },

    {
        question : "In which year did the Titanic sink?",
    
        answers:[
        {text : "1908", correct: false},
        {text : " 1912", correct: true},
        {text : "1920", correct: false},
        {text : "1916", correct: false},
        
        ]
    },

    {
        question : "What is the largest mammal in the world?",
    
        answers:[
        {text : " Elephant", correct: false},
        {text : "Giraffe", correct: false},
        {text : " Blue whale", correct: true},
        {text : "Hippopotamus", correct: false},
        
        ]
    },
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
