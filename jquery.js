let playing = false;
let score = 0;
var trialsLeft, timeId;
let step = 0;
let allFruits = ["apple", "bananas", "cherries", "grapes", "mango", "orange", "peach", "pineapple", "watermelon"];
$(function(){
    $("#start").click(function(){
        score = 0;
        $("#gameUp").hide();
        if(playing==true){
            window.location.reload();
        }
        else {
            playing = true;
            $("#trials").show();
            $("#score").html(score);
            trialsLeft = 3;
            addHearts(trialsLeft);
            $("#start").text("Reset Game");
            startPlay();
        }
    });
});
function startPlay(){
    $("#fruits").show();
    chooseFruit();
    $("#fruits").css({'left': Math.floor(Math.random()*$(".upper-box").width()-50), 'top': -50});
    step = Math.floor(Math.random()*5)+1;
    timeId= setInterval(function(){
        $("#fruits").css({'top': $("#fruits").position().top + step});
        if($("#fruits").position().top >= $("#fruitContainer").height()){
            if(trialsLeft>1){
                $("#fruits").show();
                chooseFruit();
                $("#fruits").css({'left': Math.floor(Math.random()*$(".upper-box").width()-50), 'top': -50});
                step = Math.floor(Math.random()*5)+1;
                trialsLeft --;
                addHearts(trialsLeft);
            }
            else {
              playing = false;
              $("#start").html("Start Game");
              $("#trials").hide();
              gameOver();
              stopAction(timeId);
            }
        }
    }, 10);
}
$("#fruits").mouseover(function(){
    score++;
    $("#score").html(score);
    document.getElementById("sound").currentTime = 0;
    document.getElementById("sound").play();
    clearInterval(timeId);
    $("#fruits").hide("explode", 500);
    setTimeout(startPlay, 600);
});

function addHearts(life){
    $("#trials").empty();
    for(let i=0;i<life;i++){
        $("#trials").append('<img src="images/R.png" width="30" height="30">');
    }
}
function stopAction(timer){
    clearInterval(timer);
    $("#fruits").hide();
}
function chooseFruit(){
    $("#fruits").attr('src', "images/"+allFruits[Math.floor(Math.random()*9)]+".png");
}
function gameOver(){
    $("#last-score").text(score);
    $("#gameUp").show();
}
