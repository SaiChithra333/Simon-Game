var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
userClickedPattern = [];
var lvl = 0;
var isStarted = 0;

$(document).on("keypress", function () {
  if(!isStarted){ 
    isStarted = 1;
    $("h1").text("Level "+lvl);
    setTimeout(function(){
        nextSequence();
    },1000);
  }
});
function Playsound(sound){
     a1 = new Audio(`./sounds/${sound}.mp3`);
  a1.play();
}
function nextSequence() {
    lvl++;
    $("h1").text("Level "+lvl);
    userClickedPattern=[];
  var randomChosenColour = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColours[randomChosenColour]);
  console.log(randomChosenColour);

  $(`#${buttonColours[randomChosenColour]}`).fadeOut(100).fadeIn(100);
  Playsound(buttonColours[randomChosenColour]);
}

$(document).on("click", function (e) {
    var userChosenColour = e.target.id;
    $(`#${userChosenColour}`).addClass("pressed");
    setTimeout(function () {
      $(`#${userChosenColour}`).removeClass("pressed");
    }, 100);
    Playsound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(gamePattern);
    console.log(userClickedPattern);
    checkanswer(userClickedPattern.length-1);
    
  });
  function checkanswer(currlvl){
    if(gamePattern[currlvl] != userClickedPattern[currlvl] ){
        Playsound("wrong")
        $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 100);
      setTimeout(function(){
        $("h1").text("Game Over, Press Any Key to Restart");
      },1000);
      lvl = 0;
      isStarted=0;
      gamePattern = [];
      userClickedPattern = [];
    }
    else if(userClickedPattern.length == gamePattern.length){
        console.log("BOth");
        setTimeout(function(){
            nextSequence();
        },1000);
    }
  }
