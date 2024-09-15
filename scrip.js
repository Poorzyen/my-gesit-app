// Fungsi untuk memulai audio welcome ketika halaman dibuka
window.onload = function() {
    const welcomeAudio = document.getElementById('welcome-audio');

    // Browser akan memblokir autoplay kecuali pengguna telah berinteraksi
    document.addEventListener('click', function() {
        if (welcomeAudio.paused) {
            welcomeAudio.play(); // Memainkan audio saat pengguna berinteraksi
        }
    }, { once: true }); // Event listener hanya dipanggil sekali
};

// Fungsi untuk memulai quiz
function startQuiz() {
    window.location.href = 'quiz.html'; // Nanti kita buat halaman kuis di quiz.html
}
