import React from 'react'
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends React.Component {

    state = {
        quiz: []
    }

    render() {
        return(
            <div className={'Quiz'}>
                <div className={'QuizWrapper'}>
                    <h1>Quiz</h1>

                    <ActiveQuiz/>
                </div>
            </div>
        )
    }
}

export default Quiz
