let currentSlide = 1;
let currentAudio = null;
const correctAnswers = {
    1: 'house',
    2: 'ball',
    3: 'bathroom',
    4: 'triangle'
};

// Function to show the current slide
function showSlide(slideIndex) {
    const slides = document.getElementsByClassName('slide');
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    slides[slideIndex - 1].classList.add('active');
    
    const nextButton = document.getElementById(`next-${slideIndex}`);
    if (nextButton) {
        nextButton.style.display = slideIndex === 5 ? 'block' : 'none';
    }
}

// Function to play audio for activity and question (except for Slide 6)
function playAudio(slideIndex) {
    if (slideIndex === 6) return; // Skip audio for Slide 6

    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // Reset to the beginning
    }

    const audioActivity = document.getElementById(`activity-audio-${slideIndex}`);
    const audioQuestion = document.getElementById(`question-audio-${slideIndex}`);

    if (audioActivity) {
        currentAudio = audioActivity;
        currentAudio.play();
        currentAudio.onended = () => {
            if (audioQuestion) {
                currentAudio = audioQuestion;
                currentAudio.play();
            }
        };
    } else if (audioQuestion) {
        currentAudio = audioQuestion;
        currentAudio.play(); // Play question audio directly if no activity audio
    }
}
function playAnswerAudio(audioSrc) {
    // Ensure to stop any currently playing audio before starting a new one
    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(audioSrc);
    currentAudio.play().catch(error => {
        console.error("Audio playback failed:", error); // Log any playback errors
    });
}
function checkAnswer(slideIndex, answer, audioId) {
    console.log(`Slide: ${slideIndex}, Answer: ${answer}, Correct Answer: ${correctAnswers[slideIndex]}`);
    const correctAnswer = correctAnswers[slideIndex];
    console.log(`Audio Source: audio/${answer}.mp3`); // Log the audio source
    
    if (correctAnswer === answer) {
        showFeedback('Jawaban benar!', true);
        document.getElementById(`next-${slideIndex}`).style.display = 'block';
    } else {
        showFeedback('Jawaban salah, coba lagi!', false);
        document.getElementById(`next-${slideIndex}`).style.display = 'none';
    }

    // Ensure the audio ID corresponds to the correct file path
    const audioSrc = `audio/${answer}.mp3`;
    playAnswerAudio(audioSrc); // Pass the audio source based on the answer
}

// Function to show interactive feedback in a modal
function showFeedback(message, isCorrect) {
    const feedbackModal = document.getElementById('feedback-modal');
    const feedbackMessage = document.getElementById('feedback-message');
    const closeButton = document.querySelector('.close-button');

    feedbackMessage.textContent = message;
    feedbackModal.style.display = 'block';

    // Set modal background color based on correctness
    feedbackModal.style.backgroundColor = isCorrect ? 'rgba(76, 175, 80, 0.7)' : 'rgba(244, 67, 54, 0.7)'; // Green for correct, red for incorrect

    closeButton.onclick = function() {
        feedbackModal.style.display = 'none'; // Close the modal when the close button is clicked
    };

    // Close the modal when clicking anywhere outside of the modal content
    window.onclick = function(event) {
        if (event.target == feedbackModal) {
            feedbackModal.style.display = 'none';
        }
    };

    // Automatically close the modal after 2 seconds
    setTimeout(() => {
        feedbackModal.style.display = 'none';
    }, 2000); // Adjust the timing as necessary
}


// Function to move to the next slide
function nextSlide(nextSlideIndex) {
    const slides = document.getElementsByClassName('slide');
    slides[currentSlide - 1].classList.remove('active'); // Hide current slide
    currentSlide = nextSlideIndex;
    showSlide(currentSlide);

    if (currentSlide === 6) {
        playFinalAudio(); // Special case for Slide 6
    } else {
        playAudio(currentSlide); // Play audio for other slides
    }
}

// Function to play final audio files in sequence for Slide 6
function playFinalAudio() {
    const audios = [
        document.getElementById('thank-you-audio-1'),
        document.getElementById('thank-you-audio-2'),
        document.getElementById('thank-you-audio-3'),
        document.getElementById('thank-you-audio-4')
    ];

    let delay = 0;

    audios.forEach((audio) => {
        setTimeout(() => {
            if (currentAudio && !currentAudio.paused) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            currentAudio = audio;
            currentAudio.play();
        }, delay);
        delay += (audio.duration || 2) * 1000; // Use default 2 seconds if duration is not available
    });
}

// Function to finish the quiz and redirect to the home page
function finishQuiz() {
    goToHome(); // Redirect to home page
}

// Function to stop background music and go to home page
function goToHome() {
    const backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reset to the start
    }
    window.location.href = "index.html"; // Redirect to home page
}

// Initial setup when the page loads
window.onload = function() {
    showSlide(currentSlide);
    playAudio(currentSlide);
};

// Event listener for option selection
document.querySelectorAll(".option img").forEach((imgElement) => {
    imgElement.addEventListener("click", function () {
        const slideIndex = currentSlide;
        const selectedImg = this.getAttribute("alt");
        checkAnswer(slideIndex, selectedImg, `audio/${selectedImg}.mp3`);
    });
});

function handleEmoticonClick(emotion) {
    // Play corresponding audio based on the emotion
    const audioSrc = emotion === 'happy' ? 'audio/happy.mp3' : 'audio/sad.mp3';
    const audio = new Audio(audioSrc);
    audio.play();

    // For happy emotion, create exploding stars
    if (emotion === 'happy') {
        explodeStars();
    } else {
        // For sad emotion, create water drops
        createWaterDrops();
    }
}

function explodeStars() {
    const starCount = 10; // Number of stars
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Randomize the position and delay for each star
        const x = Math.random() * 200 - 100; // Random X position
        const delay = Math.random() * 0.5; // Random delay

        star.style.left = `50%`;
        star.style.transform = `translate(-50%, 0) translateX(${x}px)`;
        star.style.animationDelay = `${delay}s`; // Add delay
        document.body.appendChild(star);

        // Remove star after animation ends
        setTimeout(() => {
            star.remove();
        }, 1500); // Adjust timing to match the animation duration
    }
}

function createWaterDrops() {
    const dropCount = 5; // Number of water drops
    for (let i = 0; i < dropCount; i++) {
        const drop = document.createElement('div');
        drop.classList.add('drop');

        // Randomize the position for each drop
        const x = Math.random() * 30 - 15; // Random X position
        drop.style.left = `50%`;
        drop.style.transform = `translateX(-50%) translateX(${x}px)`;
        document.body.appendChild(drop);

        // Remove drop after animation ends
        setTimeout(() => {
            drop.remove();
        }, 1000); // Adjust timing to match the animation duration
    }
}

