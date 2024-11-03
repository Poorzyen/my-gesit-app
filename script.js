let currentSlide = 1;
let currentAudio = null;
const correctAnswers = {
    1: 'house',
    2: 'ball',
    3: 'bathroom',
    4: 'triangle'
};

// Fungsi untuk menampilkan slide saat ini
function showSlide(slideIndex) {
    const slides = document.getElementsByClassName('slide');
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    slides[slideIndex - 1].classList.add('active');
}

// Fungsi untuk menghentikan semua audio kecuali background
function stopAllAudio() {
    const allAudioElements = document.querySelectorAll('audio');
    allAudioElements.forEach(audio => {
        if (audio.id !== 'background-audio') { // Kecualikan audio latar belakang
            audio.pause();
            audio.currentTime = 0; // Kembali ke awal audio
        }
    });
}

// Fungsi untuk memulai background music
function playBackgroundMusic() {
    const backgroundMusic = document.getElementById('background-audio');
    if (backgroundMusic && backgroundMusic.paused) {
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.1; // Atur volume latar belakang sesuai kebutuhan
        backgroundMusic.play();
    }
}

// Mengatur slide awal dan background music
window.onload = function() {
    showSlide(currentSlide);
    playAudio(currentSlide);
    playBackgroundMusic(); // Panggil fungsi ini sekali di awal untuk memulai background music
};

// Pindah ke slide berikutnya
function nextSlide(nextSlideIndex) {
    stopAllAudio();
    currentSlide = nextSlideIndex;
    showSlide(currentSlide);
    if (currentSlide === 6) {
        playFinalAudio();
    } else {
        playAudio(currentSlide);
    }
}

// Fungsi untuk memutar audio aktivitas dan pertanyaan
function playAudio(slideIndex) {
    if (slideIndex === 6) return;

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
        currentAudio.play();
    }
}

// Fungsi untuk memutar audio jawaban yang dipilih
function playAnswerAudio(audioId) {
    const answerAudio = document.getElementById(audioId);
    if (answerAudio) {
        answerAudio.pause(); // Pastikan audio berhenti sebelum memulai
        answerAudio.currentTime = 0; // Kembali ke awal audio
        answerAudio.play();
    }
}

// Fungsi untuk memeriksa jawaban dan menampilkan feedback
function checkAnswer(slideIndex, answer, audioId) {
    const correctAnswer = correctAnswers[slideIndex];
    
    if (correctAnswer === answer) {
        showFeedback('Jawaban benar!', true);
        document.getElementById(`next-${slideIndex}`).style.display = 'block';
    } else {
        showFeedback('Jawaban salah, coba lagi!', false);
        document.getElementById(`next-${slideIndex}`).style.display = 'none';
    }

    // Putar audio jawaban berdasarkan pilihan
    playAnswerAudio(audioId);
}

// Fungsi untuk menampilkan feedback
function showFeedback(message, isCorrect) {
    const feedbackModal = document.getElementById('feedback-modal');
    const feedbackMessage = document.getElementById('feedback-message');
    const closeButton = document.querySelector('.close-button');

    feedbackMessage.textContent = message;
    feedbackModal.style.display = 'block';

    feedbackModal.style.backgroundColor = isCorrect ? 'rgba(76, 175, 80, 0.7)' : 'rgba(244, 67, 54, 0.7)';

    closeButton.onclick = function() {
        feedbackModal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == feedbackModal) {
            feedbackModal.style.display = 'none';
        }
    };

    setTimeout(() => {
        feedbackModal.style.display = 'none';
    }, 2000);
}

// Fungsi untuk memainkan audio akhir di slide 6
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
            stopAllAudio();
            audio.play();
        }, delay);
        delay += (audio.duration || 2) * 1000;
    });
}

// Fungsi untuk menyelesaikan kuis
function finishQuiz() {
    goToHome();
}

// Fungsi untuk menghentikan musik dan pergi ke halaman beranda
function goToHome() {
    const backgroundMusic = document.getElementById('background-audio');
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
    window.location.href = "index.html";
}
