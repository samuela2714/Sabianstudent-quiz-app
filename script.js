    
    let subject = '';

        let num1, num2, operator, correctAnswer;
        let score = 0;
        let timer;
        let timeLeft = 30;
        let min = 1, max = 10;
        let studentName = "";
        let difficultyLevel = "";

        function startQuiz() {
            subject = document.getElementById("subject").value;

            studentName = document.getElementById("studentName").value.trim();
            difficultyLevel = document.getElementById("difficulty").value;

            if (!studentName) {
                alert("Please enter your name.");
                return;
            }

            if (difficultyLevel === 'easy') {
                min = 1; max = 10;
            } else if (difficultyLevel === 'medium') {
                min = 10; max = 50;
            } else {
                min = 50; max = 100;
            }

            score = 0;
            document.getElementById('score').textContent = `Score: ${score}`;
            document.getElementById('setup').style.display = 'none';
            document.getElementById('quiz-content').style.display = 'block';

            generateQuestion();
        }

function generateQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  updateTimer();

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      clearInterval(timer);
      document.getElementById('feedback').textContent = "⏰ Time's up!";
      setTimeout(generateQuestion, 1500);
    }
  }, 1000);

  if (subject === 'math') {
    num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    const operators = ['+', '-', '*', '/'];
    operator = operators[Math.floor(Math.random() * operators.length)];
    if (operator === '/') {
      num1 = num1 * num2;
    }

    switch (operator) {
      case '+': correctAnswer = num1 + num2; break;
      case '-': correctAnswer = num1 - num2; break;
      case '*': correctAnswer = num1 * num2; break;
      case '/': correctAnswer = num1 / num2; break;
    }

    document.getElementById('question').textContent = `What is ${num1} ${operator} ${num2}?`;

  } else if (subject === 'english') {
    const words = [
      { q: "Spell the word for a baby cat", a: "kitten" },
      { q: "What’s the opposite of 'hot'?", a: "cold" },
      { q: "Fill in the blank: She ___ to school.", a: "goes" },
      { q: "What is the plural of 'child'?", a: "children" }
    ];
    const selected = words[Math.floor(Math.random() * words.length)];
    correctAnswer = selected.a.toLowerCase();
    document.getElementById('question').textContent = selected.q;

  } else if (subject === 'logic') {
    const logicQuestions = [
      { q: "A triangle has 3 sides. (true/false)", a: "true" },
      { q: "5 is greater than 10. (true/false)", a: "false" },
      { q: "All dogs are mammals. (true/false)", a: "true" }
    ];
    const selected = logicQuestions[Math.floor(Math.random() * logicQuestions.length)];
    correctAnswer = selected.a.toLowerCase();
    document.getElementById('question').textContent = selected.q;
  }

  document.getElementById('answer').value = '';
  document.getElementById('feedback').textContent = '';
}

        function checkAnswer() {
            
            let userAnswer = document.getElementById('answer').value.trim().toLowerCase();

if (subject === 'math') {
  userAnswer = Number(userAnswer);
}


            if (userAnswer === correctAnswer) {
                document.getElementById('feedback').textContent = "✅ Correct!";
                score++;
            } else {
                document.getElementById('feedback').textContent = "❌ Try Again!";
            }

            document.getElementById('score').textContent = `Score: ${score}`;

            // Save result after 5 questions
            if (score >= 5) {
                saveResult();
                document.getElementById('quiz-content').style.display = 'none';
                document.getElementById('setup').style.display = 'block';
                alert("🎉 Quiz complete! Your score was saved.");
            } else {
                setTimeout(generateQuestion, 1500);
            }
        }

        function updateTimer() {
            document.getElementById('timer').textContent = `⏳ Time left: ${timeLeft}s`;
        }

        function saveResult() {
            const date = new Date().toLocaleDateString();
const result = {
  name: studentName,
  score: score,
  level: difficultyLevel,
  subject: subject,
  date: date
};


            let scores = JSON.parse(localStorage.getItem('quizScores')) || [];
            scores.push(result);
            localStorage.setItem('quizScores', JSON.stringify(scores));

            showScores();
        }

        function showScores() {
            const tableBody = document.querySelector("#scoreTable tbody");
            tableBody.innerHTML = '';
            const scores = JSON.parse(localStorage.getItem('quizScores')) || [];

            scores.forEach(score => {
                const row = `<tr>
                
                            <td>${score.subject}</td>
                <td>${score.name}</td>
                <td>${score.score}</td>
                <td>${score.level}</td>
                <td>${score.date}</td>
                </tr>`;
                tableBody.innerHTML += row;
        });
    }

    showScores(); // Show scores on load
