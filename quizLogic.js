let quizData = [];
let currentQuestion = 0;
let correctCount = 0; // 正解数をカウントする変数

// JSON データを取得
fetch("./quizData.json")
    .then(response => response.json())
    .then(data => {
        quizData = data;
        displayQuestion();
    })
    .catch(error => console.error("データ取得エラー:", error));

function displayQuestion() {
    if (quizData.length === 0) return; // データが読み込まれる前に実行されるのを防ぐ

    const q = quizData[currentQuestion];
    document.getElementById("question").textContent = q.question;

    const inputContainer = document.getElementById("input-container");
    inputContainer.innerHTML = "";

    q.answer.forEach((_, index) => {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `（${index + 1}）の答え`;
        input.classList.add("answer-input");
        inputContainer.appendChild(input);
    });

    document.getElementById("result").textContent = "";
    document.getElementById("next-button").style.display = "none";
}

function checkAnswer() {
    const userInputs = document.querySelectorAll(".answer-input");
    const correctAnswers = quizData[currentQuestion].answer;
    let allCorrect = true;

    userInputs.forEach((input, index) => {
        const userAnswer = input.value.trim();
        if (userAnswer !== correctAnswers[index]) {
            allCorrect = false;
        }
    });

    if (allCorrect) {
        document.getElementById("result").textContent = "正解！";
        document.getElementById("result").style.color = "green";
        correctCount++; // 正解数を増やす
    } else {
        document.getElementById("result").textContent = `不正解。正解は「${correctAnswers.join("、")}」です。`;
        document.getElementById("result").style.color = "red";
    }

    document.getElementById("next-button").style.display = "inline-block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        // クイズ終了時にスコア表示
        document.getElementById("quiz-container").innerHTML = `
            <h2>最後まで解いてくれてありがとう！テスト頑張ってね！</h2>
            <p>あなたの正解数: ${correctCount} / ${quizData.length} 問</p>
            <button onclick="location.reload()">もう一度挑戦</button>
        `;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.checkAnswer = checkAnswer;
    window.nextQuestion = nextQuestion;
});
     
