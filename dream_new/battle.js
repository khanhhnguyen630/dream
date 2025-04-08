player.loadState();  // Load player state from localStorage
team.loadState();
console.log(team);
player.displayStatus();  // Update UI based on loaded data
        

const difficulty = localStorage.getItem('selectedDifficulty');
console.log('Battle Difficulty:', difficulty);
    
function getBossFromDifficulty() {
    const difficulty = localStorage.getItem('selectedDifficulty');
    console.log('Battle Difficulty:', difficulty);
    switch (difficulty) {
        case "easy": return bossData[0];
        case "medium": return bossData[1];
        case "hard": return bossData[2];
        case "boss": return bossData[3];
    }
}

let boss = getBossFromDifficulty();
    
const characterStatus = document.getElementById('character-status');
const bossStatus = document.getElementById('boss-status');

characterInTeam = team.getTotalStats();
console.log(characterInTeam);

// Display player character image
const playerContainer = document.getElementById('display-player-container');
const playerImage = document.createElement('img');
const weaponContainer = document.getElementById('display-weapon-container-2');
const weaponImage = document.createElement('img');

playerImage.src = team.character.imagePath;
playerImage.alt = "Player Character";
playerImage.style.width = "100%";  // Set image width to fit container
playerContainer.appendChild(playerImage);

weaponImage.src = team.weapon.imagePath;
weaponImage.alt = "Player Weapon";
weaponContainer.appendChild(weaponImage);

// Display boss image
const bossContainer = document.getElementById('display-boss-container');
const bossImage = document.createElement('img');
bossImage.src = boss.imagePath;
bossImage.alt = "Boss";
bossImage.style.width = "100%";  // Set image width to fit container
bossContainer.appendChild(bossImage);

function updateStatusBars() {
    const playerHpBar = document.getElementById('player-hp-bar');
    const bossHpBar = document.getElementById('boss-hp-bar');

    let playerHpPercent = (team.character.hp / team.character.maxHp) * 100;
    playerHpBar.style.width = `${playerHpPercent}%`;

    let bossHpPercent = (boss.hp / boss.maxHp) * 100;
    bossHpBar.style.width = `${bossHpPercent}%`;
}

let gemsReward; // Default to 0 for safety, in case of an unexpected difficulty value.

// reward gems
function rewardGems(difficulty) {
    debugger;
    gemsReward = 0;
    switch (difficulty) {
        case "easy":
            gemsReward = 2;
            break;
        case "medium":
            gemsReward = 5;
            break;
        case "hard":
            gemsReward = 10;
            break;
        case "boss":
            gemsReward = 100;
            break;
        default:
            console.error("Unknown difficulty level:", difficulty);
            return; // Exit the function if the difficulty is unknown to prevent unintended behavior.
    }
    player.addGems(gemsReward);
    console.log(`Rewarded ${gemsReward} gems for defeating the ${difficulty} level.`);
    player.saveState();
    player.displayStatus();
}


// Initialize and update status bars
updateStatusBars();

console.log("character: ", team.character.name)
console.log("hp: ", characterInTeam.hp)

// Initialize status displays
function updateStatus() {
    characterStatus.textContent = `${team.character.name}: ${characterInTeam.hp} HP`;
    bossStatus.textContent = `${boss.name}: ${boss.hp} HP`;

    if (boss.hp <= 0) {
        clearInterval(bossAttackInterval); // Stop the game/boss attacks
        rewardGems(difficulty);
        document.getElementById('game-result-modal').style = ""
        document.getElementById('game-result-message').innerHTML = `
        <p>You've defeated Nightmare...</p><br>
        <p>You are rewarded ${gemsReward} gems</p>
        `;
        document.getElementById('game-result-modal').style.display = 'flex'; // Show the result modal
    }

    if (characterInTeam.hp <= 0) {
        clearInterval(bossAttackInterval); // Stop the game/boss attacks
        document.getElementById('game-result-modal').style = ""
        document.getElementById('game-result-message').textContent = "Game Over! You woke up to professor Jason.";
        document.getElementById('game-result-modal').style.display = 'flex'; // Show the result modal
    }
}

updateStatus();

// Boss attacks every 2 seconds
const bossAttackInterval = setInterval(() => {
    characterInTeam.hp -= boss.atk;
    console.log(`ATK ${boss.atk} damage!`);
    updateStatus();
    if (characterInTeam.hp <= 0) {
        clearInterval(bossAttackInterval);
        // alert("Character defeated!");
    }
}, 1500);
