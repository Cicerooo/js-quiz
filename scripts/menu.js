function loadMenu(type,number){
  var m = document.getElementsByClassName("menu-option");
  var mClone = m[0].cloneNode(true);
  quizNumber = number;
  for(var j=0; j<m.length; j++){
    m[0].parentNode.removeChild(m[0]);
  }
  Object.keys(quiz).forEach(function(menu,i){
    mClone = mClone.cloneNode(true);
    mClone.innerHTML = capitalizeFirstLetter(Object.keys(quiz)[i]);
    mClone.addEventListener("click",function(){
      localStorage.setItem("quiz-type",menu);
    });
    document.getElementsByClassName("menu")[0].appendChild(mClone);
  });
}
function menuSignup(){
  var input = document.getElementsByClassName("login-input")[0].value;
  if(input != ""){
    localStorage.setItem("quiz-name",input);
    document.getElementsByClassName("login")[0].classList.add("hidden");
    document.getElementsByClassName("menu")[0].classList.remove("hidden");
  }
  updateUsername();
}
function loadMenuListeners(){
  document.getElementsByClassName("login-submit")[0].addEventListener("click",function(){
    menuSignup();
  });
  document.getElementsByClassName("login-input")[0].addEventListener("keypress",function(e){
    var key = e.which || e.keyCode;
    //enter key
    if (key === 13) {
      menuSignup();
    }
  });
  document.getElementsByClassName("login-skip")[0].addEventListener("click",function(){
    document.getElementsByClassName("login")[0].classList.add("hidden");
    document.getElementsByClassName("menu")[0].classList.remove("hidden");
  });
  document.getElementsByClassName("username")[0].addEventListener("click",function(){
    document.getElementsByClassName("login")[0].classList.remove("hidden");
    document.getElementsByClassName("menu")[0].classList.add("hidden");
    document.getElementsByClassName("login-skip")[0].innerHTML = "close";
    document.getElementsByClassName("login-header")[0].innerHTML = "Change name?";
  })
}
function checkUsername(){
  var username = localStorage.getItem("quiz-name");
  if(username != undefined){
    document.getElementsByClassName("login")[0].classList.add("hidden");
    document.getElementsByClassName("menu")[0].classList.remove("hidden");
  }
}
// EXECUTE ON START
document.addEventListener("DOMContentLoaded", function(){
  
});
function start(){
  loadMenu();
  loadMenuListeners();
  checkUsername();
}