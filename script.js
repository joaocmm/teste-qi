// Dados das perguntas do teste de QI
const quizData = [
    {
        question: "Qual é o próximo número na sequência: 2, 4, 8, 16, __?",
        options: ["24", "28", "32", "36"],
        answer: "32"
    },
    {
        question: "Se 5 + 3 = 8 e 2 + 6 = 8, quanto é 4 + 7?",
        options: ["10", "11", "12", "13"],
        answer: "11"
    },
    {
        question: "O que tem pescoço mas não tem cabeça?",
        options: ["Garrafa", "Pescoço", "Camisa", "Lápis"],
        answer: "Garrafa"
    },
    {
        question: "Quantos meses têm 28 dias?",
        options: ["Um", "Dois", "Nenhum", "Todos"],
        answer: "Todos"
    }
];

// Seleciona os elementos do HTML
const quizSlider = document.querySelector('.quiz-slider');
const resultContainer = document.querySelector('.result-container');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

// Função para renderizar as perguntas na tela
function renderQuestions() {
    quizData.forEach((question, index) => {
        const questionCard = document.createElement('div');
        questionCard.classList.add('question-card');

        // Cria a pergunta
        const questionText = document.createElement('h2');
        questionText.textContent = question.question;
        questionCard.appendChild(questionText);

        // Cria o grupo de botões de opções
        const optionsGroup = document.createElement('div');
        optionsGroup.classList.add('options-group');

        question.options.forEach(option => {
            const optionBtn = document.createElement('button');
            optionBtn.classList.add('option-btn');
            optionBtn.textContent = option;
            optionBtn.setAttribute('data-answer', option);

            // Adiciona o evento de clique para cada opção
            optionBtn.addEventListener('click', () => handleOptionClick(optionBtn, question.answer, index));
            optionsGroup.appendChild(optionBtn);
        });

        questionCard.appendChild(optionsGroup);

        // Adiciona um botão "Próximo" para avançar, exceto na última pergunta
        if (index < quizData.length - 1) {
            const nextBtn = document.createElement('button');
            nextBtn.textContent = "Próxima Pergunta";
            nextBtn.id = `next-btn-${index}`;
            nextBtn.style.display = 'none'; // Inicialmente escondido
            nextBtn.addEventListener('click', () => nextQuestion());
            questionCard.appendChild(nextBtn);
        } else {
            // Adiciona o botão "Finalizar" na última pergunta
            const finishBtn = document.createElement('button');
            finishBtn.textContent = "Finalizar Teste";
            finishBtn.id = 'finish-btn';
            finishBtn.style.display = 'none';
            finishBtn.addEventListener('click', () => calculateScore());
            questionCard.appendChild(finishBtn);
        }

        quizSlider.appendChild(questionCard);
    });
}

// Lida com o clique na opção da pergunta
function handleOptionClick(selectedBtn, correctAnswer, questionIndex) {
    // Remove a classe 'selected' de todos os botões da pergunta atual
    const options = document.querySelectorAll(`#next-btn-${questionIndex}`).length ? 
        selectedBtn.parentNode.querySelectorAll('.option-btn') :
        document.querySelector(`#finish-btn`).parentNode.querySelectorAll('.option-btn');

    options.forEach(btn => btn.classList.remove('selected'));

    // Adiciona a classe 'selected' ao botão clicado
    selectedBtn.classList.add('selected');

    // Habilita o botão de próxima pergunta ou finalizar
    const nextBtn = document.getElementById(`next-btn-${questionIndex}`) || document.getElementById('finish-btn');
    if (nextBtn) {
        nextBtn.style.display = 'block';
    }

    // Verifica se a resposta está correta e atualiza a pontuação
    if (selectedBtn.getAttribute('data-answer') === correctAnswer) {
        // Incrementa a pontuação SOMENTE se o usuário ainda não tiver respondido.
        // Usamos um atributo para evitar a contagem dupla.
        if (selectedBtn.parentNode.getAttribute('data-answered') !== 'true') {
            score++;
            selectedBtn.parentNode.setAttribute('data-answered', 'true');
        }
    }
}

// Avança para a próxima pergunta
function nextQuestion() {
    currentQuestionIndex++;
    // Move o slider
    quizSlider.style.transform = `translateX(-${currentQuestionIndex * 100}%)`;
}

// Calcula e exibe o resultado final
function calculateScore() {
    // Esconde o slider e o botão de finalizar
    quizSlider.style.display = 'none';
    const finishBtn = document.getElementById('finish-btn');
    if (finishBtn) finishBtn.style.display = 'none';

    // Exibe o contêiner de resultados
    resultContainer.style.display = 'block';

    finalScore.textContent = `Você acertou ${score} de ${quizData.length} perguntas.`;

    // Mensagem baseada na pontuação
    let message = "";
    if (score === quizData.length) {
        message = "Parabéns! Você tem uma mente brilhante!";
    } else if (score >= quizData.length / 2) {
        message = "Muito bom! Você tem um ótimo raciocínio.";
    } else {
        message = "Continue praticando! A dedicação é o caminho para o sucesso.";
    }
    resultMessage.textContent = message;
}

// Reinicia o teste
restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    quizSlider.style.transform = `translateX(0)`;
    quizSlider.style.display = 'flex';
    resultContainer.style.display = 'none';
    // Remove os cartões de pergunta e renderiza novamente para um reinício limpo
    quizSlider.innerHTML = '';
    renderQuestions();
});

// Inicia o teste
document.addEventListener('DOMContentLoaded', () => {
    renderQuestions();
});
