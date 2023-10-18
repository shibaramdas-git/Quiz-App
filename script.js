
// let x = document.querySelector('#player-name').value;
// let showPlayerName = document.querySelector('#enter-btn');

// function showName() {
//     console.log(`${x} done or not`);
// }

// Getting all required elements
const category_a =  document.querySelector('#pipes-cistern');
const category_b =  document.querySelector('#probability');
const category_c =  document.querySelector('#age');
const category_d =  document.querySelector('#profit-loss');

const startQuiz_btn = document.querySelector('#start-quiz-btn');
const home_page = document.querySelector('#home-page');
const quiz_page = document.querySelector('#quiz-page');

const result_page = document.querySelector('#result-page');
const restart = document.querySelector('#start-again-btn');
const home_btn = document.querySelector('#home-btn');

const options_list = document.querySelector('#option-container');
const timerVar = document.querySelector("#timer");

// if start quiz button clicked.
startQuiz_btn.onclick = ()=> {
    quiz_page.classList.add('active');  //activate quiz page
    home_page.classList.add('inactiveHome');    //deactivate home page
    showQuestions(0);        //display questions
    queCounter(1);      //Showing Que out of total questions
    timeLeft(300);      //Time left timer
}

// Getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector('.question-container');
    let que_tag = questions_a[index].question;
    que_text.innerHTML = que_tag;       //got the question
    let option_tag =   `<button class="option-btn" id="A" onclick="optionSelected(this)">${questions_a[index].options[0]}</button>
                        <button class="option-btn" id="B" onclick="optionSelected(this)">${questions_a[index].options[1]}</button>
                        <button class="option-btn" id="C" onclick="optionSelected(this)">${questions_a[index].options[2]}</button>
                        <button class="option-btn" id="D" onclick="optionSelected(this)">${questions_a[index].options[3]}</button>`;
    options_list.innerHTML = option_tag;        //got the options
}

let que_count = 0;
let que_numb = 1 ;
let userScore = 0;

//Getting Next question
const next_btn = quiz_page.querySelector('#next-btn');
next_btn.onclick = ()=> {
    if (que_count < questions_a.length - 1 ) {
        que_count++;
        showQuestions(que_count);   
        que_numb++;
        queCounter(que_numb);       //Question no. counter for footer
    } else {
        console.log("Questions completed" );
        clearInterval(time_counter);        //timer stops after last que.'s next btn clicked
        showResultPage();           // Activating Result Page
    }
} 

// Counting Question Numbers on the footer

function queCounter(index) {
    const bottom_que_counter = quiz_page.querySelector('#queNo');
    let totalQueCountTag = index + " of 5 Questions";
    bottom_que_counter.innerHTML = totalQueCountTag;    
}

// verifying user answer - correct or wrong
let queAttempted = 0 ;
function optionSelected(answer) {
    let userAns = answer.textContent;
    let correctAns = questions_a[que_count].answer;
    queAttempted++;
    console.log('Attempted question'+ queAttempted);
    if( userAns == correctAns ){
        userScore += 1 ;
        console.log('Score' + userScore);
        const score_tag = quiz_page.querySelector('#score');
        score_tag.textContent = `SCORE : ${userScore}`;
        answer.classList.add("correct");
        console.log("Correct");
    }else{
        console.log("incorrect");
        answer.classList.add("incorrect");
        //Once wrong ans selected autoShows correct answer
        for (let i = 0; i < 4; i++) {
            if(options_list.children[i].textContent == correctAns) {
                options_list.children[i].classList.add("auto-show-correct");
            }   
        }
    }
    // once selected all options got disabled
    for (let i = 0; i < 4 ; i++) {
        options_list.children[i].classList.add("disabled");      
    }
}

//Activating Time left box 
let time_counter; 
function timeLeft(time){
    time_counter = setInterval(timer, 1000);
    function timer() {
        timerVar.textContent = time;
        time--;
    }
}

//Activating Result page
function showResultPage(){
    quiz_page.classList.remove('active');  //deactivate quiz page
    home_page.classList.add('inactiveHome');
    result_page.classList.add('active');
    const resultVar = result_page.querySelector('#result-parameters');
    resultVar.innerHTML = `<div class="tag score-tag"><span class="results-key">SCORE : </span><span class="results-value">${userScore}</span></div>
                             <div class="tag"><span class="results-key">Total Questions : </span><span class="results-value">10</span></div>
                             <div class="tag"><span class="results-key">Attempted Questions : </span><span class="results-value">${queAttempted}</span></div>
                             <div class="tag"><span class="results-key">Correct : </span><span class="results-value">${userScore}</span></div>
                             <div class="tag"><span class="results-key">Wrong : </span><span class="results-value">${queAttempted - userScore}</span></div>
                             <div class="tag"><span class="results-key">Percentage : </span><span class="results-value">${userScore*10}%</span></div>`;
}

//on clickink start again button
restart.onclick = () => {
    quiz_page.classList.add('active');
    result_page.classList.remove('active');
}
// on clicking Go to home  button
home_btn.onclick = () => {
    home_page.classList.remove('inactiveHome');    //Activate home page
}
