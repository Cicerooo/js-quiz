/* global quiz */

var loadedQuiz;
var canSelect = true;

var quizType = "sport";
var quizNumber = 0;
var quizAnswerCount = 3;
var quizLogs=[];

var points = 0;

var evaluation = false;

// UTILLITY IN ORDER  
function error(text){
  var err = document.getElementsByClassName("question-error")[0];
  err.classList.add("visible");
  err.innerHTML = text;
  err.addEventListener("click",function(){
    document.getElementsByClassName("question-error")[0].classList.remove("visible");
  });
}
function showSummary(){
  document.getElementsByClassName("summary")[0].classList.remove("hidden");
  document.getElementsByClassName("question")[0].classList.add("hidden");
  displayRatios();
}
function displayRatios(){
  var correct = 0;
  var wrong = 0;
  for(var i=0 ; i<quizLogs.length; i++){
    if(quizLogs[i] == quiz[quizType][i].answer+1){
      correct++;
    }
    else{
      wrong++;
    }
  }
  document.getElementById("correct-amount").innerHTML = "Correct answers: "+correct;
  document.getElementById("wrong-amount").innerHTML = "Wrong answers: "+wrong;
  document.getElementById("points-earned").innerHTML = "Points earned: "+calcPoints();
  document.getElementById("correct-ratio").style.width = ""+getPercent(correct,quizLogs.length).toString()+"%";
  document.getElementById("wrong-ratio").style.width = ""+getPercent(wrong,quizLogs.length).toString()+"%";
}
//----------------
// START OF QUIZ
// ---------------
function calcPoints(){
  var pointsSum = 0;
  for(var i=0 ; i<quizLogs.length; i++){
    if(quizLogs[i] == quiz[quizType][i].answer+1){
      pointsSum += quiz[quizType][i].points;
      console.log("answer "+i+ (quizLogs[i] == quiz[quizType][i].answer+1));
    }
  }
  return pointsSum;
}
function totalPoints(){

  points += calcPoints();
  updatePoints();
  localStorage.setItem("trophy-points",points);
}

// SELECT QUESTIONS
function select(selected){
  if(canSelect){
    for(var i=0;i<(loadedQuiz.options.length+1);i++){
      document.getElementsByClassName("option")[i].classList.remove("selected");
      document.getElementsByClassName("option")[i].classList.remove("correct");
      document.getElementsByClassName("option")[i].classList.remove("wrong");
    }
    document.getElementsByClassName("option")[selected].classList.add("selected");
    quizLogs[quizNumber] = selected;
    //checkSelection();
  }
}
// SPAWN CURRENT OPTION ELEMENTS FROM ORIGINAL
function loadQuestion(type,number){
  loadedQuiz = quiz[type][number];
  var q = document.getElementsByClassName("option");
  var qClone;
  quizNumber = number;
  for(var j=1; j<quizAnswerCount+1; j++){
    if(q.length>1)
    q[0].parentNode.removeChild(q[1]);
  }
  document.getElementsByTagName("title")[0].innerHTML = loadedQuiz.question;
  document.getElementsByClassName("question-text")[0].innerHTML = loadedQuiz.question;
  document.getElementsByClassName("question-counter")[0].innerHTML = "QUESTION "+(quizNumber+1)+" OUT OF "+quiz[type].length;
  quizAnswerCount = loadedQuiz.options.length;
  loadedQuiz.options.forEach(function(option,i){
    qClone = q[0].cloneNode(true);
    qClone.addEventListener("click",function(){
      select(i+1);
    });
    qClone.classList.add("visible");
    document.getElementsByClassName("options")[0].appendChild(qClone);
    qClone.getElementsByClassName("option-circle")[0].innerHTML = i+1;
    qClone.getElementsByClassName("option-text")[0].innerHTML = option;
  });

}
// SETS THE QUIZ LOGS PROPERLY
function initLogs(){
  quizLogs = new Array(quiz[quizType].length).fill(0);
}
// CHECKS IF THE ITEM IS CORRECT
function checkAnswer(question){
  if(question-1===loadedQuiz.answer)
    return true;
  return false;
}
function answerQuestion(){
  canSelect = false;
  for(var i=0;i<loadedQuiz.options.length+1;i++){
    if(document.getElementsByClassName("option")[i].classList.contains("selected")){
      if(checkAnswer(i)){
        document.getElementsByClassName("option")[i].classList.add("correct");
      }
      else{
        document.getElementsByClassName("option")[i].classList.add("wrong");
        document.getElementsByClassName("option")[loadedQuiz.answer+1].classList.add("correct");
      }
      if(quizLogs[quizNumber]===0){
        quizLogs[quizNumber] = i;
      }
      return;
    }
  }
}
// CHECK THE LOG VARIABLE IF CURRENT QUESTION HAS BEEN ANSWERED BEFORE
function checkLogs(){
  if(quizLogs[quizNumber]>0){
    document.getElementsByClassName("option")[quizLogs[quizNumber]].classList.add("selected");
  }
  if(evaluation){
    answerQuestion();
  }
}
// NEXT FUNCTION
function next(){
  if(quizNumber>=quiz[quizType].length-1){
  }
  if(quizNumber<quiz[quizType].length-1){
    quizNumber++;
    loadQuestion(quizType,quizNumber);
  }
  if(quizNumber===quiz[quizType].length-1){
    document.getElementById("review").disabled = false;
  }
  canSelect = true;
  checkLogs();
}
// BACK FUNCTION
function back(){
  if(quizNumber>0){
    quizNumber--;
    loadQuestion(quizType,quizNumber);
  }
  checkLogs();
}
function review(){
  evaluation = true;
  document.getElementById("review").disabled = true;
  totalPoints();
  loadQuestion(quizType,0);
  checkLogs();
  setButtons();
  document.getElementById("review").classList.add("hidden");
  document.getElementById("close").classList.remove("hidden");
  showSummary();
}
//END OF QUIZ
function setButtons(){
  if(quizNumber>0){
    document.getElementById("back").disabled = false;
  }
  if(quizNumber <= 0){
    document.getElementById("back").disabled = true;
  }
  if(quizNumber >= quiz[quizType].length-1){
    document.getElementById("next").disabled = true;
  }
  if(quizNumber < quiz[quizType].length-1){
    document.getElementById("next").disabled = false;
  }
}
function startListeners(){
  // Summary
  document.getElementById("show-answers").addEventListener("click",function(){
    document.getElementsByClassName("summary")[0].classList.add("hidden");
    document.getElementsByClassName("question")[0].classList.remove("hidden");
  });
  // Quiz interaction
  document.getElementById("close").addEventListener("click",function(){
    showSummary();
  });
  document.getElementById("review").addEventListener("click",function(){
    review();
  });
  document.getElementById("next").addEventListener("click",function(){
    next();
    setButtons();
  });
  document.getElementById("back").addEventListener("click",function(){
    back();
    setButtons();
  });
  // Quiz interaction by keypresses
  document.addEventListener("keydown",function(e){
    // Checks for L/R arrow keys
    if(e.key==="ArrowLeft")
      back();
      setButtons();
    if(e.key==="ArrowRight"){
      next();
      setButtons();
    }
    // Checks for space bar
    if(e.keyCode===32){
      if(document.getElementById("review").disabled===false)  
      review();
    }
  });
}
function start(){
  quizType = localStorage.getItem("quiz-type");
  initLogs();
  startListeners();
  loadQuestion(quizType,quizNumber);
  setButtons();
  document.getElementById("review").disabled = true;
}
document.addEventListener("DOMContentLoaded", function() {
  start();
  // registerEvents();
});