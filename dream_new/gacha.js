// -------------------------------------------------
// ------------------ PLAYER INFO ------------------
// -------------------------------------------------

console.log("Gacha.js is executing");

var player = {
    name: "Default Player",
    gems: 0,
    inventory: [],

    initialize: function(name, gems, inventory) {
        this.name = name;
        this.gems = gems;
        this.inventory = inventory || []; 
    },

    saveState: function() {
        localStorage.setItem('playerData', JSON.stringify({
            name: this.name,
            gems: this.gems,
            inventory: this.inventory
        }));
    },

    loadState: function() {
        var data = JSON.parse(localStorage.getItem('playerData'));
        if (data) {
            this.initialize(data.name, data.gems, data.inventory);
        }
    },

    changeName: function(name) {
        this.name = name;
    },

    addGems: function(amount) {
        this.gems += amount;
        console.log("Added gems:", amount);
    },
    
    spendGems: function(amount) {
        if (this.gems >= amount) {
            this.gems -= amount;
            console.log("Spend gems: ", amount);
            this.displayGemCount();
            return true;
        } else {
            alert("Not enough gems.");
            return false;
        }
    },
    
    addToInventory: function(items) {
        this.inventory.push(items);
    },

    displayInventory: function() {
        this.inventory.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="item-container">
                    <span class="item-name">${item.name}</span>
                    <br>
                    <span class="item-atk">${item.atk} ATK</span>
                    <span class="item-hp">${item.hp} HP</span>
                </div>
            `;
            document.getElementById('display-inventory').appendChild(li);
        });
    },

    displayGemCount: function() {
        document.getElementById('gems-count').textContent = this.gems;
    },

    displayStatus: function() {
        console.log(`Player: ${this.name}, Gems: ${this.gems}, Inventory Items: ${this.inventory.length}`);
    }
};

// -------------------------------------------------
// ------------------ PLAYER INFO ------------------
// -------------------------------------------------

function createCharacter(name, type, atk, hp, imagePath) {
    return {
        name: name,
        type: type,
        atk: atk,
        hp: hp,
        imagePath: imagePath,

        // Displays the character information
        displayStatus: function() {
            console.log(`Name: ${this.name}, Type: ${this.type}, Base ATK: ${this.atk}, Base HP: ${this.hp}, Image Path: ${this.imagePath}`);
        }
    };
};

// Populating characters using the new factory function
let charactersData = [
    createCharacter("Marshmallow (5☆)", "5-star", 70, 90, "resources/Character/marshmallow.png"),
    createCharacter("Strawman (5☆)", "5-star", 95, 70, "resources/Character/strawman.png"),
    createCharacter("Crybaby (4☆)", "4-star", 30, 50, "resources/Character/crybaby.png"),
    createCharacter("Mushmush (4☆)", "4-star", 50, 30, "resources/Character/mushmush.png"),
    createCharacter("Pebble (4☆)", "4-star", 30, 30, "resources/Character/pebble.png")
];

// Populating bosses using the same factory function but with boss types
let bossData = [
    createCharacter("Homework", "easy", 5, 500, "resources/Background/homework.png"),
    createCharacter("Exam", "normal", 8, 3000, "resources/Background/exam.png"),
    createCharacter("Final", "hard", 20, 5000, "resources/Background/final.png"),
    createCharacter("Professor Jason", "final boss", 30, 15000, "resources/Background/boss.png")
];


// --------------------------------------------
// ------------------ WEAPON ------------------
// --------------------------------------------

// Weapon factory function to create and return new weapon instances
function createWeapon(name, atk, hp, imagePath) {
    return {
        name: name,
        type: "weapon",  // Ensure all weapons have a type attribute set to "weapon"
        atk: atk,
        hp: hp,
        imagePath: imagePath,
        displayStatus: function() {
            console.log(`Weapon: ${this.name}, ATK Boost: ${this.atk}, HP Boost: ${this.hp}, Image Path: ${this.imagePath}`);
        }
    };
}

// ------------------------------------------
// ------------------ TEAM ------------------
// ------------------------------------------

var team = {
    character: charactersData[4],
    weapon: createWeapon("Flowee", Math.floor(Math.random() * 101 + 50), Math.floor(Math.random() * 101 + 50), "resources/Weapon/flowee.png"),

    initialize: function(character, weapon) {
        this.character = character;
        this.weapon = weapon;
    },

    saveState: function() {
        localStorage.setItem('teamData', JSON.stringify({
            character: this.character,
            weapon: this.weapon,
        }));
    },

    loadState: function() {
        var data = JSON.parse(localStorage.getItem('teamData'));
        if (data) {
            this.initialize(data.character, data.weapon);
        }
    },

    // Calculates total stats considering both character and weapon
    getTotalStats: function() {
        const totalAtk = this.character.atk + (this.character.atk * this.weapon.atk / 100);
        const totalHp = this.character.hp + (this.character.hp * this.weapon.hp / 100);
        return {atk: totalAtk, hp: totalHp};
    },

    changeCharacter: function(character) {
        this.character = character;
    },

    changeWeapon: function(weapon) {
        this.weapon = weapon;
    },

    // Displays full status of the team member
    displayStatus: function() {
        console.log(`Character: ${this.character.name}, Weapon: ${this.weapon.name}`);
        const stats = this.getTotalStats();
        console.log(`Total ATK: ${stats.atk}, Total HP: ${stats.hp}`);
        console.log(`Character Image: ${this.character.imagePath}, Weapon Image: ${this.weapon.imagePath}`);
    }
}

function addWeaponToTeam(weapon) {
    console.log(`Selected weapon: ${weapon.name}, ATK: ${weapon.atk}, HP: ${weapon.hp}`);
    
    var displayContainer = document.getElementById("display-weapon-container");
    displayContainer.innerHTML = `
        <p style="color: black">ATK: ${weapon.atk}</p>
        <p style="color: black">HP: ${weapon.hp}</p>
        <img src="${weapon.imagePath}" alt="${weapon.name}" style="width: 30%; height: auto;"> 
    `;

    team.changeWeapon(weapon)
}

function addCharacterToTeam(character) {
    console.log(`Selected character: ${character.name}, ATK: ${character.atk}, HP: ${character.hp}`);
    
    var displayContainer = document.getElementById("display-character-container");
    displayContainer.innerHTML = `
        <p style="color: black">ATK: ${character.atk}</p>
        <p style="color: black">HP: ${character.hp}</p>
        <img src="${character.imagePath}" alt="${character.name}" style="width: 100%; height: auto;"> 
    `;

    team.changeCharacter(character)
}


// function addWeaponToTeam(weapon) {
//     console.log(`Selected weapon: ${weapon.name}, ${weapon.atk}, ${weapon.hp}`);
//     // Additional functionality can be added here, such as updating UI or character weapon selections
//     var imgContainer = document.getElementById("display-weapon-container");
//     imgContainer.innerHTML = `
//         <img src="${weapon.imagePath}" alt="${weapon.name} id="display-in-inventory">   
//     `  
// }

// var teamSelection = {
//     selectedCharacters: {},
//     selectedWeapons: {},
//     name: '',
//     charBaseAtk: 0,
//     charBaseHp: 0,
//     weaponAtkBoost: 0,
//     weaponHpBoost: 0,
//     totalHp: 0,
//     totalAtk: 0,

//     // Initializes the team selection with a character and a weapon
//     initialize: function(character, weapon) {
//         this.selectedCharacters = character;
//         this.name = character.name;
//         this.charBaseAtk = character.baseAtk;
//         this.charBaseHp = character.baseHp;
//         this.selectedWeapons = weapon;
//         this.weaponAtkBoost = weapon.atkBoost;
//         this.weaponHpBoost = weapon.hpBoost;
//         this.updateTotalStats();
//     },

//     // Updates total stats based on the character's base stats and the weapon's boosts
//     updateTotalStats: function() {
//         this.totalAtk = this.charBaseAtk + (this.charBaseAtk * this.weaponAtkBoost / 100);
//         this.totalHp = this.charBaseHp + (this.charBaseHp * this.weaponHpBoost / 100);
//     },

//     // Displays the total stats
//     displayTotalStats: function() {
//         console.log(`Total ATK: ${this.totalAtk}\nTotal HP: ${this.totalHp}`);
//         return { totalAtk: this.totalAtk, totalHp: this.totalHp };
//     }
// };

// // teamSelection.initialize(character, weapon);
// // teamSelection.displayTotalStats(); // Outputs the total stats to the console
// // console.log(teamSelection.toString()); // Outputs the string representation

console.log()

// // --------------------------------------------------
// // ------------------ BATTLE SYSTEM -----------------
// // --------------------------------------------------


function updateHP(currentHP, maxHP) {
    const hpPercent = (currentHP / maxHP) * 100;  // Calculate the percentage of health remaining
    const hpBar = document.getElementById('hp-bar');
    hpBar.style.width = `${hpPercent}%`;  // Set the width of the hp bar

    // Optional: Change color based on health percentage
    if (hpPercent < 25) {
        hpBar.style.backgroundColor = 'red';  // Health is critically low
    } else if (hpPercent < 50) {
        hpBar.style.backgroundColor = 'orange';  // Health is moderately low
    } else {
        hpBar.style.backgroundColor = 'green';  // Health is sufficient
    }
}



// // --------------------------------------------------
// // ------------------ GACHA SYSTEM ------------------
// // --------------------------------------------------

var pullCounter = 0;

function isAtPity() {
    return pullCounter === 50;  // Simplified return statement
}

function determinePullType() {
    let rng;
    if (isAtPity()) {
        rng = Math.floor(Math.random() * 10);  // Generate a number from 0 to 9
        if (rng < 3) {
            console.log('5 star');
            return "5-star";  // 30% chance
        } else {
            console.log('4 star');
            return "4-star";  // Remaining 70% chance within pity
        }
    } else {
        rng = Math.floor(Math.random() * 100);  // Generate a number from 0 to 99
        if (rng < 3) {
            console.log('5 star');
            return "5-star";  // 3% chance
        } else if (rng < 10) {
            console.log('4 star');
            return "4-star";  // Additional 7% chance, totaling 10% for 4-star
        } else {
            console.log('weapon');
            return "weapon";  // Remaining 90% chance for weapons
        }
    }
}

function doesCharacterExistInInventory(character) {
    return player.inventory.some(item => item.name === character.name);  // Assuming each item has a 'name' property
}

function select5StarCharacter() {
    let characters = [charactersData[0], charactersData[1]]; // Assuming charactersData is defined elsewhere correctly
    let selectedCharacter = characters[Math.floor(Math.random() * characters.length)];
    console.log("character: ", selectedCharacter);
    return doesCharacterExistInInventory(selectedCharacter) ? null : selectedCharacter;
}

function select4StarCharacter() {
    console.log("character: ", [charactersData[2], charactersData[3]]);
    let characters = [charactersData[2], charactersData[3]]; // Assuming charactersData is defined elsewhere correctly
    let selectedCharacter = characters[Math.floor(Math.random() * characters.length)];
    console.log("character: ", selectedCharacter);
    return doesCharacterExistInInventory(selectedCharacter) ? null : selectedCharacter;
}

function selectWeapon() {
    let rngWeapon = Math.floor(Math.random() * 100);
    if (rngWeapon < 1) {
        return createWeapon("Emotional Damage", 200, 200, "resources/Weapon/ed.png");
    } else if (rngWeapon < 33.33) {
        return createWeapon("Flowee", Math.floor(Math.random() * 101 + 50), Math.floor(Math.random() * 101 + 50), "resources/Weapon/flowee.png");
    } else if (rngWeapon < 66.66) {
        return createWeapon("Band aid", Math.floor(Math.random() * 101), Math.floor(Math.random() * 101 + 100), "resources/Weapon/bandaid.png");
    } else {
        return createWeapon("Toy Knife", Math.floor(Math.random() * 101 + 100), Math.floor(Math.random() * 101), "resources/Weapon/toyknife.png");
    }
}

function pull() {
    // clear result
    document.getElementById('display-inventory').textContent = ' ';
    
    const typingSound = document.getElementById('typing-sound');

    // spend gem
    player.spendGems(10);

    let result = [];
    while (result.length < 5) {
        let pullType = determinePullType();
        let newItem;
        if (pullType === "5-star") {
            newItem = select5StarCharacter();
        } else if (pullType === "4-star") {
            newItem = select4StarCharacter();
        } else {
            newItem = selectWeapon();
        }

        if (newItem !== null) {
            result.push(newItem);
            player.addToInventory(newItem);
        }

        pullCounter++;  // Increment pull counter after each attempt
        if (pullCounter >= 50) pullCounter = 0;  // Reset after reaching pity
    }

    console.log(result);

    function processItemsSequentially(items, index = 0) {
        if (index < items.length) {  // Check if there are more items to process
            const item = items[index];
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="item-container">
                    <span class="item-name"></span><br>
                    <span class="item-atk"></span>
                    <span class="item-hp"></span>
                    <p></p>
                </div>
            `;
            document.getElementById('display-inventory').appendChild(li);
    
            // Capture the elements where the text will be typed
            const itemName = li.querySelector('.item-name');
            const itemAtk = li.querySelector('.item-atk');
            const itemHp = li.querySelector('.item-hp');
            
            
            // Start typing the item name
            typeText(item.name, itemName, 100, () => {
                // After name, type the ATK
                typeText(`${item.atk} ATK`, itemAtk, 100, () => {
                    // After ATK, type the HP
                    typeText(`${item.hp} HP`, itemHp, 100, () => {
                        // Proceed to the next item after the current item is fully processed
                        processItemsSequentially(items, index + 1);
                    });
                });
            });
        }
    }
    
    function typeText(text, element, speed, callback) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
                typingSound.play();
            } else if (callback) {
                callback(); // Call the callback function if provided
                typingSound.pause();
            }
        }
        type();
    }
    
    processItemsSequentially(result);
    player.saveState();
    
    
    // player.displayInventory();
    // result.forEach(item => {
    //     const li = document.createElement('li');
    //     li.innerHTML = `
    //         <div class="item-container">
    //             <span class="item-name">${item.name}</span>
    //             <br>
    //             <span class="item-atk">${item.atk} ATK</span>
    //             <span class="item-hp">${item.hp} HP</span>
    //             <p></p>
    //         </div>
    //     `;
    //     document.getElementById('display-inventory').appendChild(li);
    // });

    // function animateTyping(element, text, index, callback) {
    //     if (index < text.length) {
    //         element.textContent += text.charAt(index);
    //         setTimeout(() => {
    //             animateTyping(element, text, index + 1, callback);
    //         }, 50); // Adjust speed of typing here
    //     } else if (callback) {
    //         callback(); // Callback after finished typing
    //     }
    // }
    
    // result.forEach(item => {
    //     const li = document.createElement('li');
    //     li.innerHTML = `
    //         <div class="item-container">
    //             <span class="item-name"></span>
    //             <br>
    //             <span class="item-atk"></span>
    //             <span class="item-hp"></span>
    //             <p></p>
    //         </div>
    //     `;
    //     document.getElementById('display-inventory').appendChild(li);
    
    //     // Animate typing for item name
    //     animateTyping(li.querySelector('.item-name'), item.name, 0, () => {
    //         // Continue with ATK and HP after name is typed
    //         animateTyping(li.querySelector('.item-atk'), `${item.atk} ATK`, 0, () => {
    //             animateTyping(li.querySelector('.item-hp'), `${item.hp} HP`, 0);
    //         });
    //     });
    // });
}

// // UTILITY
// function isAtPity(user) {
//     if (user.pull_counter == 50) {
//         return True;
//     } else {
//         return False;
//     }
// }


// function isAtInventoryLimit(inventory) {
//     if (inventory.length >= 20) {
//         console.log("Please remove items from your inventory!");
//         return true;
//     } else {
//         return false;
//     }
// }

// function doesCharacterExistInInventory(character) {
//     return player.inventory.some(item => item === character);
// }

// function determinePullType(user) {
//     let rng;
//     if (isAtPity(user)) {
//         rng = Math.floor(Math.random() * 10);  // Generate a number from 0 to 9
//         if (rng < 3) {
//             return "5-star";  // 30% chance
//         } else {
//             return "4-star";  // Remaining 70% chance within pity
//         }
//     } else {
//         rng = Math.floor(Math.random() * 100);  // Generate a number from 0 to 99
//         if (rng < 3) {
//             return "5-star";  // 3% chance
//         } else if (rng < 10) {
//             return "4-star";  // Additional 7% chance, totaling 10% for 4-star
//         } else {
//             return "weapon";  // Remaining 90% chance for weapons
//         }
//     }
// }

// function select5StarCharacter() {
//     let rng5star = Math.floor(Math.random() * 100);
//     if (rng5star < 50) {
//         let marshmallow = charactersData[0];
//         if (doesCharacterExistInInventory(marshmallow) === True) {
//             return null;
//         } else {
//             return charactersData[0];
//         }
//     } else {
//         let strawman = charactersData[1];
//         if (doesCharacterExistInInventory(strawman) === True) {
//             return null;
//         } else {
//             return charactersData[1];
//         }
//     }
// }

// function select4StarCharacter() {
//     let rng4star = Math.floor(Math.random() * 100);
//     if (rng4star < 50) {
//         let crybaby = charactersData[2];
//         if (doesCharacterExistInInventory(crybaby) === True) {
//             return null;
//         } else {
//             return charactersData[2];
//         }
//     } else {
//         let mushmush = charactersData[3];
//         if (doesCharacterExistInInventory(mushmush) === True) {
//             return null;
//         } else {
//             return charactersData[3];
//         }
//     }
// }

// function selectWeapon() {
//     let rngWeapon = Math.floor(Math.random() * 100);

//     if (rngWeapon < 1) {
//         atkBoost = 200;
//         hpBoost = 200;
//         return new Weapon("Emotional Damage", "resources/Weapon/ed.jpg", atkBoost, hpBoost);
//     } else if (rngWeapon < 33.33) {
//         atkBoost = Math.floor(Math.random() * 101 + 50);
//         hpBoost = Math.floor(Math.random() * 101 + 50);
//         return new Weapon("Flowee", "resources/Weapon/flowee.jpg", atkBoost, hpBoost);
//     } else if (rngWeapon < 66.66) {
//         atkBoost = Math.floor(Math.random() * 101);
//         hpBoost = Math.floor(Math.random() * 101 + 100);
//         return new Weapon("Slap", "resources/Weapon/slap.jpg", atkBoost, hpBoost);
//     } else {
//         atkBoost = Math.floor(Math.random() * 101 + 100);
//         hpBoost = Math.floor(Math.random() * 101);
//         return new Weapon("Toy Knife", "resources/Weapon/toyknife.jpg", atkBoost, hpBoost);
//     }
// }


// function pull(user) {
//     let result = [];
//     let counter = 0;
//     while (counter < 5) {
//         let pullType = determinePullType(player);

//         let newItem;
//         if (pullType === "5-star") {
//             newItem = select5StarCharacter(player);
//         } else if (pullType === "4-star") {
//             newItem = select4StarCharacter(player);
//         } else {
//             newItem = selectWeapon();
//         }

//         if (newItem !== null) {
//             result.push(newItem);
//             counter++;
//         }

//         user.pullCounter++;
//     }


    
//     // update to front end
console.log()

// // ------------------------------------------------------
// // ------------------ INVENTORY SYSTEM ------------------
// // ------------------------------------------------------


// function sortWeapons(inventory, sortBy = 'atkBoost') {
//     if (!['atkBoost', 'hpBoost', 'name'].includes(sortBy)) {
//         throw new Error("Invalid sort_by value. Must be 'atkBoost', 'hpBoost', or 'name'.");
//     }

//     return inventory.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1));
// }




// function displayWeaponsOnly(inventory) {
//     inventory.forEach(item => {
//         if (item instanceof Weapon) {
//             console.log(`${item.name} - ATK: ${item.atkBoost} - HP: ${item.hpBoost}`);
//             // Assuming 'name', 'atkBoost', and 'hpBoost' are properties of Weapon
//         }
//     });
// }