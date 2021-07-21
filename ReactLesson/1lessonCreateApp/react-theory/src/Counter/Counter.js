import React from 'react';
import Auxiliary from '../hoc/Auxiliary';
import Counter2 from '../Counter2/Counter2';

// Фрагменты нужны что бы избавиться от корневого div при return jsx кода
// Есть два способа, первый это возвращать в рендере масив из элементов с ключами, а второй это обернуть элементы в <React.Fragment> вместо корневого div, или создать свой компанент обертку (мы для примера создали его в папке hoc)

class Counter extends React.Component {
    state = {
        counter: 0
    }

    addCounter = () => {
        // this.setState({
        //     counter: this.state.counter + 1
        // })

        // Более правильный способ использовать setState (что бы асинхронные изменения state не сломали приложение)
        // Вместо объекта передаем ф-ю с параметром, который точно хранит предыдущее состояние state даже при его асинхронном изменении 
        // Более безопасный подход
        this.setState((prevState) => {
            return {
                counter: prevState.counter + 1
            }
        })
    }

    minusCounter = () => {
        this.setState({
            counter: this.state.counter - 1})
    }

    render() {
        return (
            <Auxiliary>
                <h2>Counter {this.state.counter}</h2>
                <Counter2 />
                <button onClick={this.addCounter}>+</button>
                <button onClick={this.minusCounter}>-</button>
            </Auxiliary>
        )
            // Обходим правила jsx убирая корневой элемент и взамен возвращаем массив элементов с ключами
            // return [
            //     <h2 key={'1'}>Counter {this.state.counter}</h2>, // key обязательно нужен для корректной работы React
            //     <button key={'2'} onClick={this.addCounter}>+</button>,
            //     <button key={'3'} onClick={this.minusCounter}>-</button>
            // ]
    }
}

export default Counter