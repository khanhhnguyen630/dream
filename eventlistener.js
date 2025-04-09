document.addEventListener('DOMContentLoaded', function() {  
    // // --------------------------------------------
    // // -------------- EVENT LISTENER --------------
    // // --------------------------------------------

    console.log("Event listener is ready");
    let hasAudioPlayed = false; // This flag will determine if the audio has been played already


    document.addEventListener('keydown', function(event) {
        // console.log("Event listener is firing.");
        // console.log("Boss data from eventlistener", boss);
        
        if (event.key === ' ') {
            storyIntro.innerHTML = '';
            event.preventDefault(); // Prevent the default space key action (scrolling)
            nextPart();
        }

        if (event.key === "j") {
            // Play attack sound only if it has not been played before
            if (!hasAudioPlayed) {
                const attackAudio = document.getElementById('attack-audio');
                attackAudio.currentTime = 0; // Rewind to the start if already playing
                attackAudio.play();
                hasAudioPlayed = true; // Set the flag to true after playing the sound
            }


            team.displayStatus();
            boss.hp -= characterInTeam.atk;
            console.log(`ATK ${characterInTeam.atk} damage!`);
            updateStatus();
            if (boss.hp <= 0) {
                // alert("Boss defeated!");
                return;
            }
        }
    });
});