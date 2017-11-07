import hangman from '../fixtures/hangman'
import {ADD_GUESS} from '../actions/guesses/add'
import {CLEAR_GUESSES} from '../actions/guesses/clear'

export default (currentState = hangman, { type, payload } = {}) => {
  switch(type) {
    case ADD_GUESS:
      return {
        ...currentState,
        guesses: [...currentState.guesses, payload]
      }
    case CLEAR_GUESSES:
      return {
        guesses: []
      }

    default :
      return currentState
  }
}
