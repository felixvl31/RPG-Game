class Character {
  constructor(Name,HP,attack,counter) {
    this.Name = Name;
    this.HP = HP;
    this.attack = attack;
    this.counter = counter;
  }
}

var game = {
  playableChars : [
    new Character("Snoke", 180, 15, 50),
    new Character("Finn", 120, 8, 30),
    new Character("Rey", 160, 9, 35),
    new Character("Kylo Ren", 160, 9, 40)
  ],
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

  //Append Restart Button Function
  function AppendRestartButton(target){
    var RestartButton = $("<button>");
    RestartButton.addClass("restart btn btn-dark");
    RestartButton.text("Restart");
    $(target).append(RestartButton);
  }

  //Create character cards
  for (i=0; i<game.playableChars.length; i++) {
    var cardChar = $("<div>");
    var imageChar = $("<img>");
    var nameChar= $("<h4>");
    var hpChar=$("<h4>");
    cardChar.addClass("select cardChar "+i);
    cardChar.attr("name",game.playableChars[i].Name);
    cardChar.attr("health-points",game.playableChars[i].HP);
    cardChar.attr("attack",game.playableChars[i].attack);
    cardChar.attr("counter",game.playableChars[i].counter);
    cardChar.attr("number",i);
    imageChar.attr("src","assets/images/"+game.playableChars[i].Name+".png");
    nameChar.text(game.playableChars[i].Name);
    hpChar.addClass("HP");
    hpChar.text(game.playableChars[i].HP);
    $(".characters").append(cardChar);
    $("."+i).append(nameChar,imageChar,hpChar);
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
      $( ".characters" ).remove();
      $(".enemyZone").css("visibility","visible");
      $(".charZone").css("visibility","visible");
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
      $(".defenderZone").css("visibility","visible");
    }
  });

  //Attack functions
  $(".Attack").on("click", function(){
    //Check it click on Attack button is permitted
    if (game.attackPermit){
      //Clean Information Div, create H3 tags and get Defender name
      $(".Information").empty();
      var userAction = $("<h3>");
      var defenderAction = $("<h3>");
      var currentDefender = ($(".defender").attr("name"));

      //Attack to Enemy calculation
      game.enemyHP -= game.userAttack;
      
      //Atack from Enemy calculation & Display attack from enemy
      if (game.enemyHP <0){
        game.userHP;
      }
      else{
        game.userHP -= game.enemyAttack;
        defenderAction.text($(".defender").attr("name")+ " attacked you back for "+game.enemyAttack+ " damage. ")
      }

      //Assign User & Defender HP on cards and display User Attack    
      $(".user>.HP").text(game.userHP);
      $(".defender>.HP").text(game.enemyHP);
      userAction.text("You attacked " + currentDefender + " for "+ game.userAttack+ " damage. " );
      
      //Display user and defender attacks if needed
      $(".Information").append(userAction);
      $(".Information").append(defenderAction);

      //If user HP gets lower than 0, Display that user has been defeated and create a Restart Button, remove permit to attack.
      if (game.userHP<=0){
        $(".Information").append("<h3>"+"You have been defeated....Game Over. "+"</h3>");
        AppendRestartButton(".Information");
        game.attackPermit = false;
      }

      //If enemy HP gets to 0
      if (game.enemyHP<=0){
        //Increase won battles
        game.battlesCounter+=1;
        //Create a Restart button & display that user defeated all enemies available
        if (game.battlesCounter==3){
          $(".Information").append("<h3>"+"You have defeated all the enemies"+"</h3>");
          AppendRestartButton(".Information");
        }
        //Display that user defeated the enemy
        else{
          $(".Information").append("<h3>"+"You have defeated "+$(".defender").attr("name")+", you can choose to fight another enemy. "+"</h3>");
        }

        //Clean Defender Div, Permit to attack revocked and user can select another enemy
        $(".Defender").empty();
        game.enemySelected = false;
        game.attackPermit = false;
      }

      //Increase User Attack
      game.userAttack = parseInt(game.userAttack) + parseInt(game.userBaseAttack);
    }
  });

  //Use Restart Button
  $("body").on("click",".restart",function() {
    location.reload();
  });

});