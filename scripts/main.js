/* global quiz */
var toggle;
var myStorage = window.localStorage;

var points = 0;

// UTILLITY IN ORDER  
function error(text){
  var err = document.getElementsByClassName("question-error")[0];
  err.classList.add("visible");
  err.innerHTML = text;
  err.addEventListener("click",function(){
    document.getElementsByClassName("question-error")[0].classList.remove("visible");
  });
}
// GET LOCAL STORAGE ITEM AS BOOL
function getLocalStorageAsBool(pre) {
  return localStorage.getItem(pre) === 'true' ? true : false;
}
function getPercent(percentFor,percentOf)
{
    return Math.floor(percentFor/percentOf*100);
}
// START OF DARK THEME
// ---------------------
// TOGGLE DARK THEME FUNCTION
function toggleDark(myToggle){
  // Updates class
  if(myToggle){
    document.getElementById("toggle").classList.add("toggle-on");
    document.getElementsByTagName("body")[0].classList.add("dark-theme");
  }
  else{
    document.getElementById("toggle").classList.remove("toggle-on");
    document.getElementsByTagName("body")[0].classList.remove("dark-theme");
  }
  // Updates variables
  toggle = myToggle;
  myStorage.setItem("dark-theme",toggle);
}
// LOAD DARK THEME --- Checks for stored config
function initBlackMan(){
  if(getLocalStorageAsBool("dark-theme")){
    toggleDark(true);
  }
  else{
    toggleDark(false);
  }
}
// END OF DARK THEME
// ---------------
// START OF QUIZ
// ---------------

// LOAD POINTS
function updatePoints(){
  document.getElementById("trophy-count").innerHTML = points;
}
function startToggle(){
  // Change theme when clicking toggle & set local storage
  document.getElementById("toggle").addEventListener("click",function(){
    toggle=!toggle;
    toggleDark(toggle);
  });
}
function updateUsername(){
  var username = localStorage.getItem("quiz-name");
  if(document.getElementsByClassName("username")[0]!=undefined)
  if(username != undefined)
  document.getElementsByClassName("username")[0].innerHTML = "Hello, " + username;
  else
  document.getElementsByClassName("username")[0].innerHTML = "Hello, stranger";
}
function loadMain(){
  // Init dark theme or not based on local storage
  initBlackMan();

  startToggle(); 
  // Init quiz logs
  updatePoints();
  points += JSON.parse(localStorage.getItem("trophy-points"));
  updatePoints();
  updateUsername();
}
document.addEventListener("DOMContentLoaded", function() {
  loadMain();
});
function capitalizeFirstLetter(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}