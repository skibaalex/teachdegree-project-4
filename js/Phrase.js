/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */


/**
 * 
 */
class Phrase {
    /**
     * @param {string} phrase 
     */
    constructor(phrase) {
        this.phrase = phrase
    }

    /**
     * Display phrase on game board
     */
    addPhraseToDisplay() {
        const ul = document.getElementById('phrase').firstElementChild;
        ul.innerHTML = ''
        for (let letter of this.phrase) {
            const li = document.createElement('li')
            li.innerText = letter
            li.className = `${letter === ' ' ? 'space': 'letter hide'} ${letter}`
            ul.appendChild(li)
        }
    };

    /**
     * Check if a letter is in the phrase
     * @param {string} letter 
     */
    checkLetter(letter) {
        const regex = new RegExp(letter, 'gi')
        const accure = this.phrase.match(regex)
        return Boolean(accure)
    }

    showMatchedLetter(letter) {
        const ul = document.getElementById('phrase').firstElementChild;
        const listItems = ul.children
        for (let item of listItems) {
            if (letter === item.innerHTML.toLocaleLowerCase()) {
                item.classList.remove('hide')
                item.classList.add('show')
            }
        }
    }
}