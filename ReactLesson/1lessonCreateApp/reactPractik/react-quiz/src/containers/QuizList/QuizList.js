import React from 'react'
import { NavLink } from 'react-router-dom'
import './QuizList.css'

class QuizList extends React.Component {

    renderQuizes() {
        return [1, 2, 3].map((quiz, index) => {
            return (
                <li
                    key={index}
                >
                    <NavLink
                        to={'/quiz/' + quiz}
                    >
                        Тест {quiz}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={'QuizList'}>
                <div>
                    <h1>Список тестов</h1>
                </div>

                <ul>
                    { this.renderQuizes() }
                </ul>
            </div>
        )
    }
}

export default QuizList