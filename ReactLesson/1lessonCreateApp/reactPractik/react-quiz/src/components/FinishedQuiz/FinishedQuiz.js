import React from 'react'
import {Link} from 'react-router-dom' // тоже что и Navlink только не содержит в себе параметров (более простая версия только с параметром "to")
import './FinishedQuiz.css'
import Button from '../UI/Button/Button'

const FinishedQuiz = (props) => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success') {
            total++
        }

        return total
    }, 0)

    return (
        <div className={'FinishedQuiz'}>
            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        props.results[quizItem.id]
                    ]

                    return (
                        <li 
                            key={index}
                        >
                            <strong>{index + 1}</strong>.{' '}
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )

                }) }
            </ul>

            <p>Правильно {successCount} из {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRetry} type={'primary'}>Повторить</Button>
                <Link to="/">
                    <Button type={'successSS'}>Перейти в список тестов</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz