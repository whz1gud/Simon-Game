var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).on("keydown", function(){
    if(!started){
        started = true;
        addClickListeners();
        nextLevel();
    }
});

function addClickListeners()
{
    $(".btn").on("click", function(){
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
    
        checkAnswer(userClickedPattern.length - 1);
    });
}

function checkAnswer(currentIndex)
{
    if(userClickedPattern.length === gamePattern.length)
    {
        if(userClickedPattern[currentIndex] === gamePattern[currentIndex])
        {
            nextLevel();
        }
        else
        {   
            resetGame();
        }
    }
    else
    {
        if(userClickedPattern[currentIndex] !== gamePattern[currentIndex])
        {
            resetGame();
        }
    }
}

function nextLevel()
{
    level++;
    userClickedPattern = [];
    $("h1").text("Level " + level);
    setTimeout(function()
    {
        nextSequence();
    }, 500);
}

function resetGame()
{
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    var gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();
    started = false;
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    $("h1").text("Game over, Press Any Key to Restart");
    $(".btn").off("click");
}

function nextSequence()
{
    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(chosenColour)
{
    var audio = new Audio("sounds/" + chosenColour + ".mp3");
    audio.play();
}

function animatePress(colour)
{
    $("#" + colour).addClass("pressed");
    setTimeout(function()
    {
        $("#" + colour).removeClass("pressed");
    }, 100);
}