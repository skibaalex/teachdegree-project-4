/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */


/**
 * 
 */
class Game {
    constructor() {
        this.missed = 0
        this.phrases = []
        this.activePhrase = null
    }

    /**
     * 
     * @param {array} phrases array of phrases strings
     */
    createPhrases(phrases) {
        this.phrases = phrases.map((phrase) => new Phrase(phrase))
    };

    /**
     * Selects random phrase from phrases property
     * @return {Object} Phrase object chosen to be used
     */
    getRandomPhrase() {
        const randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)]
        this.activePhrase = randomPhrase
        return randomPhrase
    };

    /**
     * Resets the game board
     */
    resetGame() {
        const ul = document.getElementById('phrase').firstElementChild;
        ul.innerHTML = ''
        const buttons = document.querySelectorAll('.key')
        this.missed = 0
        const images = document.querySelectorAll('.tries img')
        for (let img of images) {
            img.setAttribute('src', `images/liveHeart.png`)
        }
        for (let btn of buttons) {
            btn.className = 'key'
        }

    }

    /**
     * Begins game by selecting a random phrase and displaying it to user
     */
    startGame() {
        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay()
        document.getElementById('overlay').style.display = 'none';

    };

    /**
     * Checks for winning move
     * @return {boolean} True if game has been won, false if game wasn't won
     */
    checkForWin() {
        const hiddenLetter = document.querySelectorAll('.hide')
        return !Boolean(hiddenLetter.length)
    }

    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if player is out
     */
    removeLife() {
        this.missed += 1;
        const images = document.querySelectorAll('.tries img')
        for (let i = 0; i < this.missed; i++) {
            images[i].setAttribute('src', `images/lostHeart.png`)
        }
        if (this.missed >= 5) {
            this.gameOver(false)
        }
    };

    /**
     * Displays game over message
     * @param {boolean} gameWon - Whether or not the user won the game
     */
    gameOver(gameWon) {
        const gameOverMessage = document.getElementById('game-over-message')
        const finalMessage = gameWon ? 'Good Job You Won!' : 'Better Luck Next Time';
        const overlay = gameOverMessage.parentElement
        gameOverMessage.innerText = finalMessage;
        overlay.classList.add(gameWon ? 'win' : 'lose')
        overlay.classList.remove(gameWon ? 'lose' : 'win')
        overlay.style.display = 'block'
        this.resetGame()
    };

    /**
     * Handles onscreen keyboard button clicks
     * @param {HTMLButtonElement} button - The clicked button element
     */
    handleInteraction(button) {
        if (button.tagName !== 'BUTTON') return
        const {
            activePhrase
        } = this
        const letter = button.innerText;
        const correctGuess = activePhrase.checkLetter(letter)
        if (correctGuess) {
            button.classList.add('chosen')
            activePhrase.showMatchedLetter(letter)
            if (this.checkForWin()) this.gameOver(true)
        } else {
            button.classList.add('wrong')
            this.removeLife()
        }
    };
}