const cabinet = document.getElementById('cabinet');
const wordDisplay = document.getElementById('word-display');
const resetButton = document.getElementById('reset');
const bgMusic = new Audio('sounds/background_music.mp3');
bgMusic.loop = true;

const letters = ['А', 'У', 'Д', 'И', 'О', 'Б', 'В', 'Г', 'Е', 'Ж', 'З', 'К', 'Л', 'М', 'Н', 'П', 'Р', 'С', 'Т', 'Ф'];
const correctWord = 'АУДИО';
let currentWord = '';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createButtons() {
    shuffleArray(letters);
    cabinet.innerHTML = '';
    letters.forEach((letter, index) => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'sound-btn';
        button.dataset.letter = letter;
        button.style.animationDelay = `${index * 0.05}s`;
        button.classList.add('pop-in');
        cabinet.appendChild(button);
    });
}

function playSound(letter) {
    const audio = new Audio(`sounds/${letter.toLowerCase()}.mp3`);
    audio.play();
}

function updateWord(letter) {
    currentWord += letter;
    wordDisplay.textContent = currentWord;
    
    if (currentWord === correctWord) {
        setTimeout(() => {
            bgMusic.pause();
            playSound('success');
            alert('Поздравляем! Вы разгадали загадку! Сейчас вы будете перенаправлены на следующий этап.');
            window.location.href = 'audio_puzzle.html'; // Перенаправление на новую страницу
        }, 500);
    }
}

function resetWord() {
    currentWord = '';
    wordDisplay.textContent = '';
    createButtons();
}

cabinet.addEventListener('click', event => {
    if (event.target.classList.contains('sound-btn')) {
        const letter = event.target.dataset.letter;
        playSound(letter);
        updateWord(letter);
        event.target.classList.remove('pop-in');
        void event.target.offsetWidth;
        event.target.classList.add('pop-in');
    }
});

resetButton.addEventListener('click', resetWord);

document.body.addEventListener('click', () => {
    bgMusic.play();
});

// Инициализация игры
createButtons();