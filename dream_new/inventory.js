document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('weapon-container');
    let hasInvenAudioPlayed = false; // This flag will determine if the audio has been played already

    console.log(player.inventory);

    // Filter only items of type 'weapon' from the inventory
    const weaponsOnly = player.inventory.filter(item => item.type === "weapon");
    console.log(weaponsOnly);
    const charactersOnly = player.inventory.filter(item => item.type !== "weapon");
    console.log(charactersOnly);

    // Assuming you have already populated the weaponsData
    // player.inventory.forEach((item, index) => {
    //     if (item.type === "weapon") {
    //         let div = document.createElement('div');
    //         div.className = 'weapon-item';
    //         div.innerHTML = `
    //             <div class="image-container">
    //                 <img src="${item.imagePath}" alt="${item.name}" style="width: 100px; height: auto;">
    //                 <div class="overlay">${item.name}</div>
    //             </div>
    //             <input type="checkbox" class="remove-checkbox" data-index="${index}" style="display: none;">
    //         `;
    //         container.appendChild(div);
    //     }
    // });

    // function toggleCheckboxes() {
    //     const checkboxes = document.querySelectorAll('.remove-checkbox');
    //     checkboxes.forEach(checkbox => {
    //         checkbox.style.display = checkbox.style.display === 'none' ? 'inline' : 'none';
    //     });
    // }
    
    // function removeFromInventory() {
    //     const checkedCheckboxes = document.querySelectorAll('.remove-checkbox:checked');
    //     checkedCheckboxes.forEach(checkbox => {
    //         const index = parseInt(checkbox.getAttribute('data-index'), 10);
    //         player.inventory.splice(index, 1); // Remove the item from inventory
    //         checkbox.parentElement.remove(); // Remove the item's element
    //     });
    //     toggleCheckboxes(); // Optionally hide checkboxes after removal
    // }
    weaponsOnly.forEach(weapon => {
        let button = document.createElement('button');
        button.className = 'weapon-button';
        button.innerHTML = `
            <div class="image-container">
                <img src="${weapon.imagePath}" alt="${weapon.name}">
                <div class="overlay">${weapon.name}</div>
            </div>
            <div class="weapon-stats">
                <span>ATK: ${weapon.atk}%</span>
                <br>
                <span>HP: ${weapon.hp}%</span>
            </div>
        `;
        button.onclick = function() { 
            // Play attack sound only if it has not been played before
            if (!hasInvenAudioPlayed) {
                const invenAudio = document.getElementById('inven-audio');
                invenAudio.currentTime = 0; // Rewind to the start if already playing
                invenAudio.play();
                hasInvenAudioPlayed = true; // Set the flag to true after playing the sound
            }

            addWeaponToTeam(weapon); 
            team.saveState();
        };
        container.appendChild(button);
    });

    document.getElementById('toggle-character-list').addEventListener('click', function() {
        const dropdown = document.getElementById('character-dropdown');
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';  // Toggle display
    });
    
    // Function to populate the dropdown
    function populateCharacterDropdown() {
        const dropdown = document.getElementById('character-dropdown');
    
        charactersOnly.forEach(character => {
            console.log(character);
            const option = document.createElement('div');
            option.innerHTML = `<p>${character.name}</p>`;
            option.classList.add('dropdown-item');
        
            option.onclick = (function(localCharacter) {
                return function() {
                    displayCharacterImage(localCharacter);
                    addCharacterToTeam(localCharacter);
                    // team.saveState();
                    console.log()
                    dropdown.style.display = 'none';  // Hide dropdown after selection
                };
            })(character);
        
            if (dropdown) {
                dropdown.appendChild(option);
            } else {
                console.error('Dropdown element not found');
            }
        });
        
    }
    
    // Function to display the character image
    function displayCharacterImage(character) {
        const container = document.getElementById('display-character-container');
        container.innerHTML = `<img src="${character.imagePath}" alt="${character.name}" style="width: auto; height: 60%;">`;
    }

    populateCharacterDropdown();
});