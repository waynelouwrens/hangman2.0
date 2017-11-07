import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import addGuess from './actions/addGuess'
import clearGuesses from './actions/clearGuess'


class Hangman extends PureComponent {
  constructor(props) {
    super(props)

    this.words = [
      "pigs",
      "invention",
      "alert",
      "beds",
      "employ",
      "glamorous",
      "dress",
      "scattered",
      "frog",
      "existence",
      "push",
      "hill"
    ]

    this.word = this.words[Math.floor(Math.random()*this.words.length)]

 }

 wrongGuessCount(word, guesses) {
   var count = 0;
   for (var i = 0 ; i < guesses.length ; i++) {
     if (word.indexOf(guesses[i]) === -1)
     count += 1;
   }
   this.isDead(count)
   this.showHangman(count)
   return count

 }

 isDead(guessCount) {
   if (guessCount === this.props.hangman.guessCount){
     alert("You lost")
     this.reset()
   }
 }

 showGuess(word, guesses) {
   var wordArr = word.split("");
   var wordArr2 = wordArr.map(function(el) {
     if (guesses.includes(el)) return el;
     else return "_";
   });
   this.youWon(word, guesses)
   return (<h2>{wordArr2.join(" ")}</h2>)
 }

 youWon(word, guesses) {
   let count = word.split("").filter(guess => {
     return guesses.includes(guess)
   })
   if (count.length === word.length){
     alert("You won")
     this.reset()
   }
 }

 showGuesses(guesses) {
   return (<p>Guessed sofar: {guesses.join(", ")}</p>)
 }

 reset() {
   this.generateWord()
   this.props.clearGuesses()
 }

 generateWord() {
   this.word = this.words[Math.floor(Math.random()*this.words.length)]
 }

 onChange(event) {
   const { guesses } = this.props.hangman
   const { value } = event.target
   if (!guesses.includes(value))
     this.props.addGuess(value)
 }

 handleSubmit(event) {
   event.preventDefault()
 }

 showHangman(wrongs) {
   switch(wrongs) {
     case 1:
     return (<pre>
         ___________<br />
        |  /        ||<br />
        | /        ----<br />
        |/        | ++ |<br />
        |          ----<br />
        |<br />
        |<br />
        |<br />
   ___________
       </pre>)
     case 2:
     return (<pre>
         ___________<br />
        |  /        ||<br />
        | /        ----<br />
        |/        | ++ |<br />
        |          ----<br />
        |           ||<br />
        |<br />
        |<br />
   ___________
       </pre>)
     case 3:
     return (<pre>
         ___________<br />
        |  /        ||<br />
        | /        ----<br />
        |/        | ++ |<br />
        |          ----<br />
        |         \_||<br />
        |<br />
        |<br />
   ___________
       </pre>)
     case 4:
     return (<pre>
         ___________<br />
        |  /        ||<br />
        | /        ----<br />
        |/        | ++ |<br />
        |          ----<br />
        |         \_||_/<br />
        |<br />
        |<br />
   ___________
       </pre>)
     case 5:
     return (<pre>
         ___________<br />
        |  /        ||<br />
        | /        ----<br />
        |/        | ++ |<br />
        |          ----<br />
        |         \_||_/<br />
        |           |<br />
        |          /<br />
   ___________
       </pre>)
     case 6:
     return (<pre>
         ___________<br />
        |  /        ||<br />
        | /        ----<br />
        |/        | ++ |<br />
        |         | /\ |<br />
        |          ----<br />
        |         \_||_/<br />
        |           ||<br />
        |          /  \<br />
        ___________
       </pre>)
     default:
     return (<pre>
               ___________<br />
              |  /        ||<br />
              | / <br />
              |/ <br />
              |<br />
              |<br />
              |<br />
              |<br />
             ___________
       </pre>)
   }

 }

 render() {
   const {guesses} = this.props.hangman

   const guessCount = this.wrongGuessCount(this.word, guesses)
   const showGuess = this.showGuess(this.word, guesses)
   const showGuesses = this.showGuesses(guesses)
   return (
     <div className="hangman">
       {this.showHangman(guessCount)}
       {showGuess}
       <form onSubmit={this.handleSubmit}>
         <label>
           Enter letter:
           <input type="text" value="" onChange={this.onChange.bind(this)} />
         </label>
       </form>
       {showGuesses}
     </div>
   )
 }
}

const mapStateToProps = ({ hangman }) => ({ hangman })
const mapDispatchToProps = { addGuess, clearGuesses }

export default connect(mapStateToProps, mapDispatchToProps)(Hangman)
