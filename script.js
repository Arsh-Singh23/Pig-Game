'use strict';

const player0Overlay = document.querySelector(`.player--0`)
const player1Overlay = document.querySelector(`.player--1`)

const score0Overlay = document.getElementById(`score--0`)
const score1Overlay = document.getElementById(`score--1`)

const current0Overlay = document.getElementById(`current--0`)
const current1Overlay = document.getElementById(`current--1`)

const diceImage = document.querySelector(`.dice`)

const btnNew = document.querySelector(`.btn--new`)
const btnRoll = document.querySelector(`.btn--roll`)
const btnHold = document.querySelector(`.btn--hold`)

class App {
    #playing = true
    #activePlayer = 0
    #currentNumber;
    #score0 = 0;
    #score1 = 0;
    #current0 = 0;
    #current1 = 0
    constructor() {
        score0Overlay.textContent = this.#score0
        score1Overlay.textContent = this.#score1
        diceImage.classList.add(`hidden`)
        btnRoll.addEventListener(`click`, this.#rollDice.bind(this))
        btnHold.addEventListener(`click`, this.#holdScore.bind(this))
        btnNew.addEventListener(`click`, this.#newGame.bind(this))
    }
    #rollDice() {
        if (this.#playing) {
            this.#currentNumber = Math.floor(Math.random() * 6) + 1
            console.log(this.#currentNumber);
            if (this.#currentNumber !== 1) this.#continueGame.call(this)
            if (this.#currentNumber === 1) this.#changePlayer.call(this)
        }
    }
    #continueGame() {
        if (this.#playing) {
            this.#activePlayer === 0 ? this.#current0 += this.#currentNumber : this.#current1 += this.#currentNumber
            document.getElementById(`current--${this.#activePlayer}`).textContent = this.#activePlayer === 0 ? this.#current0 : this.#current1
        }
    }
    #changePlayer() {
        if (this.#playing) {
            console.log(this.#activePlayer);
            this.#activePlayer === 0 ? this.#current0 = 0 : this.#current1 = 0
            this.#activePlayer === 0 ? current0Overlay.textContent = this.#current0 : current1Overlay.textContent = this.#current1
            this.#activePlayer = this.#activePlayer === 0 ? 1 : 0
            console.log(this.#activePlayer);
            player0Overlay.classList.toggle(`player--active`)
            player1Overlay.classList.toggle(`player--active`)
        }
    }
    #holdScore() {
        if (this.#playing) {
            this.#activePlayer === 0 ? this.#score0 += this.#current0 : this.#score1 += this.#current1
            this.#activePlayer === 0 ? this.#current0 = 0 : this.#current1 = 0
            document.getElementById(`current--${this.#activePlayer}`).textContent = this.#activePlayer === 0 ? this.#current0 : this.#current1
            document.getElementById(`score--${this.#activePlayer}`).textContent = this.#activePlayer === 0 ? this.#score0 : this.#score1
            if (this.#activePlayer === 0) {
                this.#score0 >= 20 ? this.#winningUI.call(this) : this.#changePlayer()
            }
            if (this.#activePlayer === 1) {
                this.#score1 >= 20 ? this.#winningUI.call(this) : this.#changePlayer()
            }
        }
    }
    #winningUI() {
        document.querySelector(`.player--${this.#activePlayer}`).classList.add(`player--winner`)
        this.#playing = false
    }
    #newGame() {
        this.#playing = true
        this.#score0 = this.#score1 = this.#current0 = this.#current1 = 0
        current0Overlay.textContent = current1Overlay.textContent = score0Overlay.textContent = score1Overlay.textContent = 0
        player0Overlay.classList.remove(`player--winner`)
        player1Overlay.classList.remove(`player--winner`)
        this.#activePlayer = 0
        player0Overlay.classList.add(`player--active`)
        player1Overlay.classList.remove(`player--active`)
    }
}

new App()