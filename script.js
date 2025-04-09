function initialize() {
    // initialize player
    player.initialize("new player", 0);
    player.displayStatus();
}

function play() {
    var audio = document.getElementById('intro-audio');
    var icon = document.getElementById('volume-icon');

    if (audio.paused) {
        audio.play();
        icon.src = './resources/Background/volume_on.png'; // Path to volume on icon
    } else {
        audio.pause();
        icon.src = './resources/Background/volume_off.png'; // Path to volume off icon
    }
}

console.log("script.js is executing")
// --------------------------------------------
// ------------------ story -------------------
// --------------------------------------------

const storyElement = document.getElementById('story');
const storyIntro = document.getElementById("story-intro");
const typingSound = document.getElementById('typing-sound'); // Get the typing sound element

const storyParts = [
    "...tap space my friend, space..",
    "Dreamers, welcome to the world...",
    "The city of thoughts, where boundaries between consciousness no longer exist",
    "...",
    "Dreamers, come join me...",
    "Dreamers, worry not your moral troubles",
    "Dreamers, come join me...",
    "Dreamers, worry not those calls",
    "Dreamers, let me reflect your true self!",
    " "
];

console.log(storyParts);

let currentPart = 0;
let charIndex = 0;
let typingDelay = 50;
let storyIsPlaying = false;

function typeStory() {
    if (charIndex < storyParts[currentPart].length) {
        storyElement.innerHTML += storyParts[currentPart].charAt(charIndex);
        charIndex++;
        setTimeout(typeStory, typingDelay);
    } else {
        storyIsPlaying = false; // Stop the story when finished typing the part
        typingSound.pause();
        if (currentPart === storyParts.length - 1) {
            collectUserName(); // Call to show username input after last part
        }
    }
}

function nextPart() {
    if (!storyIsPlaying && currentPart < storyParts.length - 1) {
        storyIsPlaying = true; // Ensure no typing starts if one is already in progress
        charIndex = 0;
        storyElement.innerHTML = "";
        currentPart++;
        typingSound.play();
        typeStory();
    }
}


function collectUserName() {
    storyElement.innerHTML = "";
    // Creation
    const nameInputContainer = document.createElement('div');
    nameInputContainer.id = 'name-input-container';
    nameInputContainer.innerHTML = `
        <!-- <p>Dreamer, tell me your name and take my hand</p> -->
        <input type="text" id="name-input" placeholder="Enter your name here">
        <button id="submit-name">
            <img src="resources/Background/takemyhand.png" id="name-submission-button" alt="Take My Hand">
        </button>
    `;
    document.getElementById('story-container').appendChild(nameInputContainer);
    const nameInput = document.getElementById('name-input');
    const submitNameButton = document.getElementById('submit-name');
    
    // Handling name submission
    submitNameButton.onclick = function() {
        const name = nameInput.value.trim();
        if (name) {
            // change player's name
            console.log("Script started, checking player:");
            player.changeName(name);
            player.addGems(20);
            player.displayStatus();
            player.addToInventory(charactersData[4]);

            // save to local storage
            player.saveState();

                // Apply the fade-out class to the body or a main container
            document.body.classList.add('fade-out');

            // Set a timeout to redirect after the fade-out animation
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 100); // Adjust the time to match your CSS animation duration
        }
    };        
}



