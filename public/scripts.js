// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

var show1 = 0;
var show2 = 0;
var rps = false;
var rpsls = false;
var againstOpponent = false;

function toggleOG() {
  var againstOpponent = document.getElementsByClassName("againstOpponent")[0];
  var lizard = document.getElementsByClassName("rpsls")[0];
  var spock = document.getElementsByClassName("rpsls")[1];
  var play = document.getElementsByClassName("play")[0];
  show1 += 1;

  if (show1 % 2 == 1) {
      if (show2 % 2 == 1) {
          play.style.display = 'inline';
      }
      againstOpponent.style.display = 'inline';
      lizard.style.display = 'none';
      spock.style.display = 'none';
      play.style.display = 'inline';
      rpsls = false;
      rps = true
  }
  else {
      againstOpponent.style.display = 'none';
      play.style.display = 'none';
      rps = false;
  }
}

function toggleNew() {
  var againstOpponent = document.getElementsByClassName("againstOpponent")[0];
  var lizard = document.getElementsByClassName("rpsls")[0];
  var spock = document.getElementsByClassName("rpsls")[1];
  var play = document.getElementsByClassName("play")[0];

  show1 += 1;
  

  if (show1 % 2 == 1) {
       if (show2 % 2 == 1) {
          play.style.display = 'inline';
      }
      againstOpponent.style.display = 'inline';
      lizard.style.display = 'inline';
      spock.style.display = 'inline';
      play.style.display = 'inline';
      rps = false;
      rpsls = true;
  }
  else {
      againstOpponent.style.display = 'none';
      lizard.style.display = 'none';
      spock.style.display = 'none';
      play.style.display = 'none';
      rpsls = false;
  }
}

function toggle_against_opponent() {
  show2 += 1;
  
  if ((show1 % 2 == 1) && (show2 % 2 == 1)) {
    againstOpponent = true;
  }
  else {
    againstOpponent = false;
  }
}

function openRules() {
  var rules = document.getElementsByClassName("rules")[0];

  rules.style.display = 'inline';
}

function closeRules() {
  var rules = document.getElementsByClassName("rules")[0];

  rules.style.display = 'none';
}

function reset() {
  show1 = 0;
  show2 = 0;
  rps = false;
  rpsls = false;
  againstOpponent = false;
  location.reload();
}

async function play() {
  var i = document.getElementById("shot");
  var shot = i.value;  

  var player = document.getElementById("player");
  var opponent = document.getElementById("opponent");
  var result = document.getElementById("result");
  var pop_up = document.getElementsByClassName("results-pop-up")[0];
  
  if (rps) {
    if (shot && againstOpponent) {
      console.log(shot)
      const response = await fetch(`/app/rps/play/${shot}`);
      const data = await response.json();

      player.innerHTML = `Player: ${data.player}.`
      opponent.innerHTML = `Opponent: ${data.opponent}.`
      result.innerHTML = `Result: ${data.result}.`
      pop_up.style.display = 'inline'
      console.log(data);
    } else {
      const response = await fetch(`/app/rps/play`);
      const data = await response.json();
      opponent.innerHTML = `Opponent: ${data.player}.`
      pop_up.style.display = 'inline'
      console.log(data);
    }
  } else {
    if (shot && againstOpponent) {
      const response = await fetch(`/app/rpsls/play/${shot}`);
      const data = await response.json();
      player.innerHTML = `Player: ${data.player}.`
      opponent.innerHTML = `Opponent: ${data.opponent}.`
      result.innerHTML = `Result: ${data.result}.`
      pop_up.style.display = 'inline'
      console.log(data);
    } else {
      const response = await fetch(`/app/rpsls/play`);
      const data = await response.json();
      opponent.innerHTML = `Opponent: ${data.player}.`
      pop_up.style.display = 'inline'
      console.log(data);
    }
  }    
}