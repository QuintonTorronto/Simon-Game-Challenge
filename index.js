const buttonColours=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level =0;

function nextSequence(){
    userClickedPattern=[];
    $("#level-title").text("Level "+level++);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

} 

$(document).keydown(function(){
    if(!started){
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var clickedBtn=$(this).attr("id");
    playSound(clickedBtn);
    userClickedPattern.push(clickedBtn);
    animatePress(clickedBtn);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var colorSound= new Audio("./sounds/"+name+".mp3");
    colorSound.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }

    else{
        console.log("wrong");
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}

function startOver(){
    gamePattern=[];
    level=0;
    started=false;
}
