/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const phrases = [
    'A Busy Body',
    'Under The Weather',
    'No Brainer',
    'Under Your Nose',
    'Flea Market'
]

const game = new Game();

//set Global event listeners
const setEventListeners = () => {
    const resetBtn = document.getElementById('btn__reset')
    resetBtn.addEventListener('click', e => {
        game.startGame()
    })

    //Add Keyboard Functionality
    document.addEventListener('keyup', e => {
        const keyButtons = document.querySelectorAll('.key')
        for (let btn of keyButtons) {
            if (btn.innerHTML === e.key) {
                btn.click()
                break;
            }
        }

    })

    //keyboard event listeners
    const keyboard = document.getElementById('qwerty')
    keyboard.addEventListener('click', e => game.handleInteraction(e.target))
}

//Initialize the App
const initizializeApp = () => {
    game.createPhrases(phrases)
    setEventListeners()
}


//Call Functions
initizializeApp()