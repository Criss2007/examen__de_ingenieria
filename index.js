// T// Temporizador de 1 hora y 30 minutos (90 minutos)
var timer = 90 * 120; // 90 minutos en segundos
var timerDisplay = document.getElementById('timer');

function updateTimer() {
    var minutes = Math.floor(timer / 60);
    var seconds = timer % 60;
    timerDisplay.textContent = 
        (minutes < 10 ? "0" : "") + minutes + ":" + 
        (seconds < 10 ? "0" : "") + seconds;

    if (timer > 0) {
        timer--;
        setTimeout(updateTimer, 1000);
    } else {
        alert("El tiempo ha terminado.");
        submitExam();
    }
}

// Comienza el temporizador al cargar la página
window.onload = function() {
    updateTimer();
};

// Función para enviar el examen
function submitExam() {
    var totalQuestions = 300;
    var score = 0;

    // Respuestas correctas en un array (Solo las primeras 70 como ejemplo)
    var correctAnswers = [
        "A", "B", "A", "B", "A", "A", "B", "D", "A", "B", "A", "B", "A", "B", "A", "A", "C", "C", "A", "B", // 1-20

        "A", "B", "B", "B", "B", "B", "A", "B", "A", "B", "C", "A", "C", "A", "C", "B", "D", "A", "D", "D", // 21-40

        "B", "A", "B", "D", "A", "D", "D", "C", "A", "C", "A", "A", "B", "D", "D", "B", "C", "B", "A", "B", // 41-60

        "C", "B", "B", "C", "B", "A", "C", "B", "D", "C", "A", "D", "D", "A", "B", "C", "B", "B", "C", "A", // 61-80

        "A", "B", "C", "D", "D", "C", "B", "A", "B", "D", "B", "C", "D", "A", "B", "C", "B", "A", "B", "B", // 81-100

        "B", "D", "C", "A", "C", "B", "C", "D", "B", "A", "D", "B", "B", "C", "B", "B", "A", "B", "B", "C", // 101-120

        "A", "B", "B", "B", "C", "B", "B", "B", "A", "C", "C", "A", "D", "B", "B", "C", "C", "B", "C", "B", // 121-140

        "C", "C", "B", "B", "C", "B", "C", "B", "B", "A", "B", "B", "C", "B", "A", "B", "C", "C", "C", "B", // 141-160

        "B", "B", "A", "A", "B", "A", "B", "A", "A", "B", "A", "A", "A", "B", "A", "C", "A", "A", "B", "A", // 161-180

        "B", "C", "C", "B", "D", "D", "C", "C", "C", "B", "A", "C", "B", "C", "C", "B", "B", "C", "A", "A", // 181-200

        "C", "B", "B", "A", "C", "B", "C", "B", "B", "B", "C", "B", "B", "A", "B", "D", "C", "C", "B", "C", // 201-220

        "C", "C", "B", "A", "B", "C", "B", "A", "C", "C", "C", "D", "C", "C", "D", "C", "A", "B", "C", "A", // 221-240

        "B", "C", "B", "C", "B", "D", "B", "C", "D", "D", "D", "A", "C", "D", "A", "A", "B", "B", "A", "C", // 241-260

        "B", "A", "A", "B", "A", "A", "A", "B", "A", "A", "A", "A", "B", "A", "A", "A", "B", "B", "C", "D", // 261-280

        "B", "C", "C", "A", "B", "C", "A", "C", "C", "A", "A", "A", "B", "A", "A", "B", "B", "B", "C", "D", // 281-300
];

for (var i = 1; i <= totalQuestions; i++) {
    var selectedOption = document.querySelector('input[name="q' + i + '"]:checked');
    if (selectedOption && correctAnswers[i - 1] === selectedOption.value) {
        score++;
    }
}

var percentage = (score / totalQuestions) * 100;
var resultMessage = "Tu puntuación es: " + score + " de " + totalQuestions + 
                    " (" + percentage.toFixed(2) + "%).";

if (percentage >= 60) {
    alert(resultMessage + "\n✅ ¡Felicidades! Has aprobado el examen.");
} else {
    alert(resultMessage + "\n❌ Lo siento, no has aprobado el examen.");
}

guardarIntento(score, totalQuestions);

window.location.href = "index.html";
}

function guardarIntento(score, totalQuestions) {
let percentage = ((score / totalQuestions) * 100).toFixed(2);
let date = new Date().toLocaleString();
let status = percentage >= 60 ? "Aprobado" : "Desaprobado";

let scores = JSON.parse(localStorage.getItem("examScores")) || [];
scores.push({ score: score, percentage: percentage, status: status, date: date });

localStorage.setItem("examScores", JSON.stringify(scores));
}
