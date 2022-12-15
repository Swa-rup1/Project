const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})


function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


const quizEnd = () => {
  // console.log(document.getElementsByClassName("container"));
  document.getElementsByClassName("container")[0].innerHTML = `
      <div class="col">
          <h3 class="w-100"> Hii, you've scored ${correct} / ${total} </h3>
      </div>
  `
}
const questions = [
  {
    question: 'which one of these is a JavaScript framework ?',
    answers: [
      {text:'Python', correct : false},
      {text:'Django', correct : false},
      {text:'React', correct : true},
      {text:'Eclipse', correct : false}
    ]
  },
  
  
  {
    question: 'Which of the following is correct about JavaScript?',
    answers:[
        {text:'JavaScript is an Object-Based language', correct : true},
        {text:'JavaScript is Assembly-language', correct : false},
        {text:'JavaScript is an Object-Oriented language', correct : false},
        {text:'JavaScript is a High-level language', correct : false}
    ]
  },

 {
    question: 'Who has the record for scoring the most goals in World Cup history?',
    answers:[
        {text:'Ronaldo', correct : false},
        {text:'Lionel Messi', correct : false},
        {text:'Diego Maradona', correct : false},
        {text:'Miroslav Klose', correct : true}
    ]
  },

 {
    question: 'Who is the only goalkeeper to win the Ballon d`Or?',
    answers:[
        {text:'Lev Yashin', correct : true},
        {text:'Manuel Neuer', correct : false},
        {text:'Gianluigi Buffon', correct : false},
        {text:'Edwin van der Sar', correct : false}
    ]
  }



]