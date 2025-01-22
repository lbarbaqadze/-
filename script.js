const questions = [
    {
        question: "რომელ წელს შეიქმნა საქართველოს დემოკრატიული რესპუბლიკა?",
        answers:[
            { text: "1917 წელს", correct: false },
            { text: "1918 წელს", correct: true },
            { text: "1927 წელს", correct: false },
            { text: "1914 წელს", correct: false },
        ]
    },
    {
        question: "რომელი წლის მასშტაბური დემონსტრაციების სიმბოლოდ იქცა დედაენის დღე, 14 აპრილი?",
        answers:[
            { text: "1956", correct: false },
            { text: "1965", correct: false },
            { text: "1989", correct: false },
            { text: "1978", correct: true },
        ]
    },
    {
        question: "რა საკითხს ეხებოდა 1991 წლის 31 მარტს გამართული რეფერენდუმი?",
        answers:[
            { text: "პარლამენტთა რაოდენობის შემცირებას", correct: false },
            { text: "საქართველოს დამოუკიდებლობის აღდგენას", correct: true },
            { text: "საქართველოს ევროკავშირში გაწევრიანებას", correct: false },
            { text: "არცერთი პასუხი არ არის სწორი", correct: false },
        ]
    },
    {
        question: "რა სახელით შევიდა ისტორიაში 2003 წლის დემონსტრაციების შედეგად საქართველოს ხელისუფლების ცვლილება?",
        answers:[
            { text: "ნოემბრის რევოლუცია", correct: false },
            { text: "ნოემბრის ვარდები", correct: false },
            { text: "ვარდების რევოლუცია", correct: true },
            { text: "სხვა", correct: false },
        ]
    },
    {
        question: "რომელ წელს მოეწერა ხელი ევროკავშირთან ასოცირების შეთანხმებას?",
        answers:[
            { text: "2014 წელს", correct: true },
            { text: "2000 წელს", correct: false },
            { text: "2020 წელს", correct: false },
            { text: "2001 წელს", correct: false },
        ]
    },
    {
        question: "რომელ მეფეს უკავშირდება თბილისის დაარსება?",
        answers:[
            { text: "ვახტანგ გორგასალს", correct: true },
            { text: "დავით აღმაშენებელს", correct: false },
            { text: "თამარ მეფეს", correct: false },
            { text: "გიორგი III-ს", correct: false },
        ]
    },
    {
        question: "ვინ იყო გაერთიანებული საქართველოს პირველი მეფე?",
        answers:[
            { text: "ვახტანგ გორგასალი", correct: false },
            { text: "ბაგრატ III", correct: true },
            { text: "თამარ მეფე", correct: false },
            { text: "დავით აღმაშენებელი", correct: false },
        ]
    },
    {
        question: "რომელი მნიშვნელოვანი ბრძოლები უკავშირდება თამარ მეფის სახელს? ?",
        answers:[
            { text: "შამქორის და ბატეთის ბრძოლები", correct: false},
            { text: "შამქორის და ბასიანის ბრძოლები", correct: true},
            { text: "შამქერისა და დიდგორის ბრძოლები", correct: false },
            { text: "არცერთი პასუხი არ არის სწორი", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `შენი შედეგი არის ${score} /  8 !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();