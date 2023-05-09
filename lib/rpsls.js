const rps_choices = ["rock", "paper", "scissors"];
const rpsls_choices = ["rock", "paper", "scissors", "lizard", "spock"];

function compare(choice1, choice2) {
    if ((choice1 == 'rock' && choice2 == 'rock')
        ||(choice1 == 'paper' && choice2 == 'paper')
        ||(choice1 == 'scissors' && choice2 == 'scissors')
        ||(choice1 == 'lizard' && choice2 == 'lizard')
        ||(choice1 == 'spock' && choice2 == 'spock')) {
            return 'tie';
    } else if ((choice1 == 'rock' && choice2 == 'paper')
                ||(choice1 == 'rock' && choice2 =='spock')
                ||(choice1 == 'paper' && choice2 =='scissors')
                ||(choice1 == 'paper' && choice2 =='lizard')
                ||(choice1 == 'scissors' && choice2 =='rock')
                ||(choice1 == 'scissors' && choice2 =='spock')
                ||(choice1 == 'lizard' && choice2 =='rock')
                ||(choice1 == 'lizard' && choice2 =='scissors')
                ||(choice1 == 'spock' && choice2 == 'paper')
                ||(choice1 == 'spock' && choice2 == 'lizard')) {
                    return 'lose';
    } else {
        return 'win';
    }
}

export function play_game(game_choices, player_choice) {
    const random_choice = game_choices[Math.floor(Math.random()*game_choices.length)];
    
    if (!player_choice) {
        return {player: random_choice};
    }
    
    const opponent_choice = random_choice;
  
    const pchoice_lower = player_choice.toLowerCase();
    const oppchoice_lower = opponent_choice.toLowerCase();

    if (!game_choices.includes(pchoice_lower)) {
        console.error(player_choice + ' is out of range.');
        if(!game_choices.includes('spock')) {
            console.log(
                `
                Rules for Rock Paper Scissors:
                - Scissors CUTS Paper
                - Paper COVERS Rock
                - Rock CRUSHES Scissors
                `
            );
        } else {
            console.log(
                `
                Rules for the Lizard-Spock Expansion of Rock Paper Scissors:
                - Scissors CUTS Paper
                - Paper COVERS Rock
                - Rock SMOOSHES Lizard
                - Lizard POISONS Spock
                - Spock SMASHES Scissors
                - Scissors DECAPITATES Lizard
                - Lizard EATS Paper
                - Paper DISPROVES Spock
                - Spock VAPORIZES Rock
                - Rock CRUSHES Scissors
                `
            );
        }
        process.exit(1); 

    }

    return {player: pchoice_lower, opponent: oppchoice_lower, result: compare(pchoice_lower, oppchoice_lower)}
}
