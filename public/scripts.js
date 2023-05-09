// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver


function toggleShots() {
  let check = document.getElementById("opp");
  let rpsGame = document.getElementById("rps").checked;

  if (check.checked) {
    if (rpsGame) {
      $(".input-container.rps").show();
      $(".input-container.rpsls").hide(); // Hide Lizard and Spock when playing RPS against an opp
      $("label[class='input-container' for='Rock'], label[class='input-container' for='Paper'], label[class='input-container' for='Scissors']").show(); // Show Rock, Paper, and Scissors labels
      $("label[class='input-container' for='Lizard'], label[class='input-container' for='Spock']").hide();
    } else {
      $(".input-container.rps, .input-container.rpsls").show();
      $("label[class='input-container' for='Rock'], label[class='input-container' for='Paper'], label[class='input-container' for='Scissors'], label[class='input-container' for='Lizard'], label[class='input-container' for='Spock']").show(); // Hide the labels      // Show all labels
    }
  } else {
    $(".input-container.rps, .input-container.rpsls").hide();

    $("label[class='input-container' for='Rock'], label[class='input-container' for='Paper'], label[class='input-container' for='Scissors'], label[class='input-container' for='Lizard'], label[class='input-container' for='Spock']").hide(); // Hide the labels
  }

  // Hide the radio inputs and show only the input-container elements
  $("input[type='radio'][name='shot']").hide();
  $(".input-container").removeClass("selected");
  $(".input-container").css("display", "inline-flex");
}

function startOver() {
  document.getElementById('userinput').reset();
  document.getElementById('results').innerHTML = '';
  toggleShots();
}

function reset() {
    let firstShot = 'Rock';

  // Reset the selected shot to a random valid option for the chosen game
  $('input[type=radio][name=shot]').prop('checked', false);
  $(`input[type=radio][name=shot][value=${firstShot}]`).prop('checked', true);
}

function randomize(game) {
  const game_choices = {
    rps: ['Rock', 'Paper', 'Scissors'],
    rpsls: ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock']
  };
  return game_choices[game][Math.floor(Math.random()*game_choices[game].length)]
};

async function playGame() {
  let game;
  if ($('input[type=radio][name=game]:checked').val()) {
    game = 'rpsls';
  } else {
    game = '';
  }

  let shot = $('input[type=radio][name=shot]:checked').val();

  // Check if the user has not selected an opp
  let opponentCheckbox = document.getElementById('opp');
  if (!opponentCheckbox.checked) {
    shot = randomize(game); // Set the user's shot to a random shot
  }


  let temp = window.location.href + 'app/';
  let url = temp + game + '/play_game/' + shot;
  console.log(url);

  let response = await fetch(url);
  let result = await response.json();
  console.log(result);

  // Display the results on the page
  let resultsDiv = document.getElementById('results');
  if (result.error) {
    resultsDiv.innerHTML = result.error;
  } else {
    let you = `You: ${result.player}`;
    let opp = `Opponent: ${result.opp}`;
    let res = `Result: ${result.result}`;
    resultsDiv.innerHTML = `${you}<br>${opp}<br>${res}`;
  }
}

