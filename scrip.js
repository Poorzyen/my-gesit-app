function startQuiz() {
    window.location.href = 'quiz.html'; // Nanti kita buat halaman kuis di quiz.html
}

window.onload = function() {
    var audio = document.getElementById('welcome-audio');
    audio.play();
};