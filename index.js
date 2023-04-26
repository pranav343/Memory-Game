buttonColors=["red","blue","green","yellow"];

gamePattern=[];
userClickPattern=[];

var started=false;
var level=0;

function nextSequence()
{
    
    userClickPattern=[];
    level=level+1;

    $("h1").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
  
var randomChoosenColor = buttonColors[randomNumber];
gamePattern.push(randomChoosenColor);

$("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChoosenColor);




};

$(".btn").click(function()
{
    
    var userChosenColour=$(this).attr("id");
    userClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length-1);
    
});

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
};

function animatePress(currentColour)
{
 $("#"+ currentColour).addClass("pressed");
 setTimeout(function()
 {
     $("#"+currentColour).removeClass("pressed");
 },100);
}

$(document).keypress( function()
{
    if (!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
}
);

function checkAnswer(currentlevel)
{
if (gamePattern[currentlevel]===userClickPattern[currentlevel])
{
    console.log("success");

if (userClickPattern.length===gamePattern.length)
{
    setTimeout(function()
    {
        nextSequence();

    },1000);
}
}
else{
    console.log("wrong");
    
    playSound("wrong");
    
    $("body").addClass("game-over");
   
    setTimeout(function()
    {
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
}
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}