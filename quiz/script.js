const correctAnswers = ['C', 'B', 'A', 'A', 'A', 'C'];
const form = document.querySelector('.quiz-form');
const resultBox = document.querySelector('.result-box');
const scoreDisplay = document.getElementById('score-text');

form.addEventListener('submit', e => {
    e.preventDefault();

    let score = 0;
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value, form.q5.value, form.q6.value];

    userAnswers.forEach((answer, index) => {
        const questionNum = index + 1;
        const card = document.getElementById(`card-q${questionNum}`);
        
        // 1. Highlight the Card based on User's Answer
        if(answer === correctAnswers[index]) {
            score++;
            card.classList.add('correct-card');
        } else {
            card.classList.add('wrong-card');
        }

        // 2. Explicitly highlight the CORRECT option in Green
        // We find the radio button with the correct value for this question
        const correctOption = form.querySelector(`input[name="q${questionNum}"][value="${correctAnswers[index]}"]`);
        correctOption.parentElement.classList.add('reveal-correct');
    });

    // Disable all inputs after submission
    form.querySelectorAll('input').forEach(input => input.disabled = true);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    resultBox.classList.remove('hide');
    
    let output = 0;
    const timer = setInterval(() => {
        scoreDisplay.textContent = `You scored ${output}/6!`;
        if(output === score) {
            clearInterval(timer);
        } else {
            output++;
        }
    }, 100);
});
