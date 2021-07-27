import React from 'react'
import './AnswerItem.css'

const AnswerItem = props => {

    const cls = ['AnswerItem', 'hov']

    if(props.state) {
        cls.splice(1, 1)
        cls.push(props.state + 'SS')
    }

    return (
        <li 
            className={cls.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
}

export default AnswerItem