let currentSlide = 1;
const correctAnswers = {
    1: 'house',     // Slide 1 correct answer
    2: 'ball',      // Slide 2 correct answer
    3: 'bathroom',  // Slide 3 correct answer
    4: 'triangle'   // Slide 4 correct answer
};

// Function to show the current slide
function showSlide(slideIndex) {
    const slides = document.getElementsByClassName('slide');
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    slides[slideIndex - 1].classList.add('active');
    
    // Display the "Selanjutnya" button for Slide 5
    const nextButton = document.getElementById(`next-${slideIndex}`);
    if (nextButton) {
        nextButton.style.display = slideIndex === 5 ? 'block' : 'none';
    }
}

// Function to play audio for activity and question (except for Slide 6)
function playAudio(slideIndex) {
    if (slideIndex === 6) return; // Skip audio for Slide 6

    const audioActivity = document.getElementById(`activity-audio-${slideIndex}`);
    const audioQuestion = document.getElementById(`question-audio-${slideIndex}`);

    if (audioActivity) {
        audioActivity.play();
        audioActivity.onended = () => {
            if (audioQuestion) audioQuestion.play();
        };
    } else if (audioQuestion) {
        audioQuestion.play(); // Play question audio directly if no activity audio
    }
}

// Function to play answer audio
function playAnswerAudio(audioSrc) {
    const answerAudio = new Audio(audioSrc); // Use Audio constructor with the source
    answerAudio.play();
}

// Function to check the answer
function checkAnswer(slideIndex, answer, audioId) {
    const correctAnswer = correctAnswers[slideIndex];
    const answerAudio = document.getElementById(audioId);
    
    if (answerAudio) {
        answerAudio.play();
    }

    if (correctAnswer === answer) {
        showFeedback('Jawaban benar!', true);
        document.getElementById(`next-${slideIndex}`).style.display = 'block';
    } else {
        showFeedback('Jawaban salah, coba lagi!', false);
        document.getElementById(`next-${slideIndex}`).style.display = 'none';
    }
}

// Function to show interactive feedback
function showFeedback(message, isCorrect) {
    const feedbackContainer = document.createElement('div');
    feedbackContainer.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackContainer.innerHTML = `<p>${message}</p>`;
    
    document.body.appendChild(feedbackContainer);
    
    setTimeout(() => {
        feedbackContainer.remove();
    }, 2000); // Remove feedback after 2 seconds
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

    audios.forEach((audio, index) => {
        setTimeout(() => {
            audio.play();
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
