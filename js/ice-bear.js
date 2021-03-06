$.ajax({
  url: 'https://api.imgur.com/3/album/ixfMR/json',
  method: 'GET',
  headers: {
    'Authorization': 'Client-ID 0be6c5892b795ca'
  }
})
.done(function(res) {
  pix = res.data.images;
  console.log(pix);
})
.fail(function(err) {
  console.log(err);
});

var newGameMessage = '<h2>Click to begin</h2>';

var begin = function() {
    // if (JSON.parse(localStorage.iceBearAttempts)) == null) {
    //     var iceBearAttempts=0;
    //     return iceBearAttempts;
    //     } else {       
    //     var iceBearAttempts=JSON.parse(localStorage.iceBearAttempts);
    //     return iceBearAttempts;
    // };
    // iceBearAttempts +=;
    // localStorage.iceBearAttempts = JSON.stringify(iceBearAttempts);
    // $('attempt').children().remove();
    // $('attempt').append('<h6><small>plays: ' + iceBearAttempts + '</small></h6>');
    $('.erasable').children().remove();
    $('#dice-place').append('<img class=\"dice\" src=\"images/hiver.png\"/>');
    $('#dice-place').append(newGameMessage);
    $('.dice').on({'click': function() {
      play.game();
    }});
}

var Icebear = function () {
    this.dice = [];
};

Icebear.prototype.game = function() {
    console.log("game function initiated");
    this.roll();
    this.renderDice();
    this.iceBearQuestion();
};

Icebear.prototype.roll = function() {
    var bears = 0;
    var fish = 0;
    var plankton = 0;
    var holes = 0;
    for (var i = 0; i < 5; i++) {
      this.dice[i]=Math.floor(Math.random()*6 +1);
      switch (this.dice[i]) {

        case 1:
        fish+=6;
        holes+=1;
        break;

        case 2:
        fish+=5;
        break;

        case 3:
        bears+=2;
        plankton+=14;
        holes+=1;
        break;

        case 4:
        fish+=3;
        break;

        case 5:
        bears+=4
        plankton+=14
        holes+=1
        break;

        default:
        fish +=1
      } 
    }
    this.dice.push(bears,fish,plankton,holes);
    console.log(this.dice);
    console.log("b", bears, "f", fish, "p", plankton, "h", holes);
    return this.dice;
};

Icebear.prototype.renderDice = function() {
    console.log("rendering dice");
    $('.erasable').children().remove();
    for (var i = 0; i < 5; i++) {
        console.log(this.dice[i]);
    $('#dice-place').append('<li> <img class=\"dice\" src=\"' + pix[(this.dice[i])-1].link + '\"/></li>');
    }
};

Icebear.prototype.iceBearQuestion = function() {
    console.log("bears: ", play.dice[5])  
    $('#question').append('<h3>How many polar bears do you see? </h3>');
    $('#question').append('<input type ="number" id="input" required=true></input>');
    $('#question').append('<button type=button id="submit">?</button>');
    $('#submit').on({'click': function() {
         var input = $('#input').val();
         console.log("input: ", input);
         if (input == play.dice[5]) {
            play.renderCorrectAnswer(pix[6].link, play.dice[5], "polar bears");
            console.log("bear win");
            play.fishQuestion();
        } else {
            console.log("bear loss");
            play.loseGame();
        }
    }});
};

Icebear.prototype.fishQuestion = function() {
    console.log("fish: ", play.dice[6]);
    $('#question').children().remove();
    $('#question').append('<h3>How many fish are in the sea? </h3>');
    $('#question').append('<input type="number" id="input" required=true></input>');
    $('#question').append('<button type=button id="submit">?</button>');
    $('#submit').on({'click': function() {
        var input = $('#input').val();
        console.log("input: ", input);
        if (input == play.dice[6]) {
            play.renderCorrectAnswer(pix[7].link, play.dice[6], "fish");
            console.log("fish win");
            play.planktonQuestion();
        } else {
            console.log("fish loss");
            play.loseGame();
        }
    }});
};

Icebear.prototype.planktonQuestion = function() {
    console.log("plankton: ", play.dice[7]);
    $('#question').children().remove();
    $('#question').append('<h3>What about the plankton? </h3>');
    $('#question').append('<input type="number" id="input" required=true></input>');
    $('#question').append('<button type=button id="submit">?</button>');
    $('#submit').on({'click': function() {
        var input = $('#input').val();
        console.log("input: ", input);
        if (input == play.dice[7]) {
            play.renderCorrectAnswer(pix[8].link, play.dice[7], "plankton");
            console.log("plankton win");
            play.holesQuestion();
        } else {
            console.log("plankton loss");
            play.loseGame();
        }
    }});
};

Icebear.prototype.holesQuestion = function() {
    console.log("holes: ", play.dice[8]);
    $('#question').children().remove();
    $('#question').append('<h3>Of course you know how many holes are in the ice.</h3>');
    $('#question').append('<input type="number" id="input" required=true></input>');
    $('#question').append('<button type=button id="submit">?</button>');
    $('#submit').on({'click': function() {
        var input = $('#input').val();
        console.log("input: ", input);
        if (input == play.dice[8]) {
            play.renderCorrectAnswer(pix[9].link, play.dice[8], "holes");
            console.log("hole win");
            play.winGame();
        } else {
            console.log("hole loss");
            play.loseGame();
        }
    }})
}

Icebear.prototype.winGame = function() {
    $('#question').children().remove();
    $('#question').append('<h3>Congratulations on solving the riddle. Winter is free.</h3>')
    $('#question').append('<button type=button id="submit">FIN</button>');
    localStorage.iceBearWin;
    $('#submit').on({'click': function() {
        newGameMessage="<h2>Click to play again</h2>";
        begin();
    }});
};

Icebear.prototype.renderCorrectAnswer = function(picture, number, item) {
    console.log("rendering correct answer");
    $('#answer').append('<img class=\"dice\" src=\"' + picture + '\"/><h4 class=\"answer\">' + number + ' ' + item + '</h4>');
};

Icebear.prototype.loseGame = function() {
    newGameMessage = '<h2>Keep trying and you will understand</h2>';
    play.dice = [];
    begin();
};

var play = new Icebear();
console.log("new game started");
begin();