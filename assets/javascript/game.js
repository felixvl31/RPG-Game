var game = {
  charName : ["Snoke","Finn","Rey","Kylo Ren"],
  HP : [180, 120, 160, 160],
  attack : [15, 8, 9, 9],
  counter : [50, 30, 35, 40],
  charSelected: false,
  enemySelected: false,
  attackPermit:false,
  userBaseAttack:0,
  userAttack: 0,
  enemyAttack: 0,
  userHP: 0,
  enemyHP: 0,
  battlesCounter:0
}
  
$(document).ready(function() {

//Create character cards
  for (i=0;i<game.charName.length;i++) {
    var cardChar = $("<div>");
    var imageChar = $("<img>");
    var nameChar= $("<h2>");
    var hpChar=$("<h2>");
    cardChar.addClass("select cardChar "+i);
    cardChar.attr("name",game.charName[i]);
    cardChar.attr("health-points",game.HP[i]);
    cardChar.attr("attack",game.attack[i]);
    cardChar.attr("counter",game.counter[i]);
    cardChar.attr("number",i);
    imageChar.attr("src","assets/images/"+game.charName[i]+".png");
    nameChar.text(game.charName[i]);
    hpChar.addClass("HP");
    hpChar.text(game.HP[i]);
    $(".characters").append(cardChar);
    $("."+i).append(nameChar);
    $("."+i).append(imageChar);
    $("."+i).append(hpChar);
  }

//Select User character
  $(".select").on("click", function(){
    if (!game.charSelected){
      var selectedChar = ($(this).attr("number"));
      $(".select").appendTo(".Enemies");
      $(".select").addClass("enemy").removeClass("select");
      $("."+selectedChar).appendTo(".SelectedChar");
      $("."+selectedChar).addClass("user").removeClass("enemy");
      game.charSelected = true;
      game.userAttack = $(".user").attr("attack");
      game.userBaseAttack = $(".user").attr("attack");
      game.userHP =$(".user").attr("health-points");
    };
  });


//Select enemy & assing User/Defender HP & Attack
$("body").on("click",".enemy", function(){
  if (!game.enemySelected){
    $(".Information").empty();
    var selectedDefender = ($(this).attr("number"));
    $("."+selectedDefender).appendTo(".Defender");
    $("."+selectedDefender).addClass("defender").removeClass("enemy");
    game.enemySelected = true
    game.attackPermit = true;
    game.enemyAttack=$(".defender").attr("counter");
    game.enemyHP =$(".defender").attr("health-points");
    $(".FightSection").css("visibility","visible");
  }
});

  $(".Attack").on("click", function(){
    if (game.attackPermit){
    $(".Information").empty();
    var currentInfo = $("<h3>");
    var currentInfo2 = $("<h3>");
    var currentDefender = ($(".defender").attr("name"));

    //Attack to Enemy
    game.enemyHP -= game.userAttack;
    
    //Atack from Enemy
    if (game.enemyHP <0){
      game.userHP;
    }
    else{
      game.userHP -= game.enemyAttack;
      currentInfo2.text($(".defender").attr("name")+ " attacked you back for "+game.enemyAttack+ " damage")
    }

  
    $(".user>.HP").text(game.userHP);
    $(".defender>.HP").text(game.enemyHP);
    currentInfo.text("You attacked " + currentDefender + " for "+ game.userAttack+ " damage" );
    
    $(".Information").append(currentInfo);
    $(".Information").append(currentInfo2);

    if (game.userHP<0){
      $(".Information").append("You have been defeated....Game Over");
      var RestartButton = $("<button>");
      RestartButton.addClass("restart");
      RestartButton.text("Restart");
      $(".Information").append(RestartButton);
      game.attackPermit = false;
      
    }

    if (game.enemyHP<=0){
      game.battlesCounter+=1;
      if (game.battlesCounter==3){
      $(".Information").append("You have defeated all the enemies");
      var RestartButton = $("<button>");
      RestartButton.addClass("restart");
      RestartButton.text("Restart");
      $(".Information").append(RestartButton);
      }
      else{
      $(".Information").append("You have defeated "+$(".defender").attr("name")+", you can choose to fight another enemy");

      }
      $(".Defender").empty();
      game.enemySelected = false;
      game.attackPermit = false;

    }

  $("body").on("click",".restart",function() {
    location.reload();
  });


    //Increase User Attack
    game.userAttack = parseInt(game.userAttack) + parseInt(game.userBaseAttack);
    }
  });

});