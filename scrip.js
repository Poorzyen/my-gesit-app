window.onload = function() {
    var audio = document.getElementById('welcome-audio');

    // Hanya memutar audio setelah pengguna mengklik halaman
    document.addEventListener('click', function() {
        audio.play().catch(function(error) {
            console.log("Autoplay diblokir, akan diputar setelah interaksi pengguna.");
        });
    }, { once: true }); // Hanya sekali klik diperlukan
};


// Fungsi untuk memulai quiz
function startQuiz() {
    window.location.href = 'quiz.html'; // Nanti kita buat halaman kuis di quiz.html
}
