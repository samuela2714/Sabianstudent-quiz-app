
let totalQuestions = 5;
let questionsAnswered = 0;
let subject = '', studentName = '', difficultyLevel = '';
let correctAnswer = '';
let score = 0, timer, timeLeft = 30;
let currentQuestion = {};
let questionBank = [];

const questions = {
  html: [
    {
      question: "What does HTML stand for?",
      choices: ["Hyperlink and Text Markup Language", "HyperText Markup Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"],
      answer: "HyperText Markup Language"
    },
    {
      question: "Which tag is used to create a hyperlink?",
      choices: ["a", "link", "href", "url"],
      answer: "a"
    },
    {
      question: "Which tag inserts an image?",
      choices: ["img", "src", "image", "pic"],
      answer: "img"
    }
  ],
  css: [
    {
      question: "What does CSS stand for?",
      choices: ["Cascading Style Sheets", "Colorful Style Syntax", "Computer Style System", "Creative Styling Structure"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "Which symbol is used for ID selector?",
      choices: [".", "#", "*", "@"],
      answer: "#"
    }
  ],
  js: [
    {
      question: "What does JS stand for?",
      choices: ["Java Style", "Just Script", "JavaScript", "JumpStart"],
      answer: "JavaScript"
    },
    {
      question: "Which function shows an alert box?",
      choices: ["msg()", "alert()", "show()", "popup()"],
      answer: "alert()"
    }
  ]
};

function loginStudent() {
  const name = document.getElementById('loginName').value.trim();
  if (!name) return alert("Please enter your name!");
  document.getElementById('displayStudentName').textContent = name;
  document.getElementById('quizName').value = name;
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('quizPage').style.display = 'block';
}

function logout() {
  location.reload();
}

function startQuiz() {
  subject = document.getElementById("subject").value;
  studentName = document.getElementById("quizName").value.trim();
  difficultyLevel = document.getElementById("difficulty").value;

  if (!studentName) {
    alert("Please enter your name before starting.");
    return;
  }

  questionBank = [...questions[subject]];
  score = 0;
  questionsAnswered = 0;
  document.getElementById("score").textContent = "Score: 0";
  document.getElementById("quiz-content").style.display = "block";
  generateQuestion();
}

function generateQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  updateTimer();

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById('feedback').textContent = "⏰ Time's up!";
      questionsAnswered++;
      if (questionsAnswered >= totalQuestions) {
        endQuiz();
      } else {
        setTimeout(generateQuestion, 1500);
      }
    }
  }, 1000);

  currentQuestion = questionBank[Math.floor(Math.random() * questionBank.length)];
  correctAnswer = currentQuestion.answer.toLowerCase();
  document.getElementById('question').textContent = currentQuestion.question;

  const choicesHTML = currentQuestion.choices.map(choice => `
    <label>
      <input type="radio" name="choice" value="${choice}">
      ${choice}
    </label>
  `).join('');
  document.getElementById('choicesContainer').innerHTML = choicesHTML;

  document.getElementById('feedback').textContent = '';
  updateProgress();
}

function updateTimer() {
  document.getElementById("timer").textContent = `⏳ Time left: ${timeLeft}s`;
}

function checkAnswer() {
  const selected = document.querySelector('input[name="choice"]:checked');
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  const userAnswer = selected.value.trim().toLowerCase();

  clearInterval(timer);

  if (userAnswer === correctAnswer) {
    document.getElementById('feedback').textContent = "✅ Correct!";
    score++;
  } else {
    document.getElementById('feedback').textContent = `❌ Wrong. Correct: ${correctAnswer}`;
  }

  document.getElementById('score').textContent = `Score: ${score}`;
  questionsAnswered++;

  if (questionsAnswered >= totalQuestions) {
    setTimeout(endQuiz, 1500);
  } else {
    setTimeout(generateQuestion, 1500);
  }
}

function updateProgress() {
  const progress = Math.round((questionsAnswered / totalQuestions) * 100);
  document.getElementById("progressBar").style.width = `${progress}%`;
}

function endQuiz() {
  clearInterval(timer);
  const date = new Date().toLocaleString();
  const table = document.getElementById("scoreTable").querySelector("tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${subject.toUpperCase()}</td>
    <td>${studentName}</td>
    <td>${score}/${totalQuestions}</td>
    <td>${difficultyLevel}</td>
    <td>${date}</td>
  `;
  table.appendChild(row);

  // Reset
  document.getElementById('quiz-content').style.display = "none";
  document.getElementById('choicesContainer').innerHTML = "";
  document.getElementById('question').textContent = "";
  document.getElementById('feedback').textContent = "";
}
