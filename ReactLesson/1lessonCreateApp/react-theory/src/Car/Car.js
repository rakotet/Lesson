// function Car() {
//     return (
//          <h2>This is car component</h2>
//     )
// }

// Тоже самое но короче

// const car = () => {
//     return (
//         <h2>This is car component</h2>
//     )
// }

// Тоже самое но короче

// В {} можно писать простой JS код и он будет работать в JSX
// В компоненты можно передавать параметры (props) которые заполнять в месте вызова компонента 
//  {props.children} еще один способ передавать параметры в компонент
// Компонент всегда должен быть обрамлен корневым <div></div>
// <button onClick={props.onChangeTitle}>Click</button>  // так обрабатываются события в компаненте при его использовании в других компанентах (передаём ссылку на ф-ю, которая потом вызывает ф-ю компанента в который мы передаём наш компанент)
// Что бы превратить функциональный компанент в классовый, надо отнаследоваться от React.Component, перенести всё в ф-ю render() {}, добавить this. ко всем props 
// Класовые компаненты жрут больше ресурсов чем функциональные, поэтому нужно стараться делать только один компанент классовый, а все остальные функциональные, но это в идеале
//Высокие или высшее компаненты, это компаненты которые оборачивают в себя другие компаненты при этом добавляя дополнительный функционал

import './Car.css';
import Radium from 'radium' // Radium это библтотека для работы с псевдоклассами CSS в React
import React from 'react';
import withClass from '../hoc/withClass';

class Car extends React.Component {

    // Новые современные методы состояния 
    // static getDerivedStateFromProps(props, state) { // заменил собой методы componentWillReceiveProps и shouldComponentUpdate
    //     console.log('Car getDerivedStateFromProps', props, state);
    //     return state
    //   }

    //   getSnapshotBeforeUpdate() { // получает DOM дерево до изменения (например нужен для запоминания скрола до перерисовки компанента, что бы его передать на перерисованный компанент)
    //     console.log('Car getSnapshotBeforeUpdate');
    //   }

      // Старые уже не используемые (componentWillReceiveProps, componentWillUpdate, componentWillMount) (вызывают warning) методы состояния
    // componentWillReceiveProps(nextProps) { // служит для подготовки компанента
    //     console.log('Car componentWillReceiveProps', nextProps);
    // }

    // shouldComponentUpdate(nextProps, nextState) { // служит для оптимизации (перерисовыть компанент или нет)
    //     console.log('Car shouldComponentUpdate', nextProps, nextState);
    //     return nextProps.name.trim() !== this.props.name.trim()
    // }

    // componentWillUpdate(nextProps, nextState) {
    //     console.log('Car componentWillUpdate', nextProps, nextState);
    // }

    // componentDidMountUpdate() {
    //     console.log('Car componentDidMountUpdate');
    // }

    // componentWillUnmount() { // вызывается когда компанент удаляется из DOM-дерева
    //     console.log('Car componentWillUnmount');
    // }

    render() {
        console.log('Car render');

        // Генерация рамдомной ошибки для примера отлавливания ошибок компанентом ErrorBoundary
        // if(Math.random() > 0.7) {
        //     throw new Error('Car random failed')
        // }

        const inpetClasses = ['input']

        if(this.props.name !== '') {
            inpetClasses.push('green')
        } else {
            inpetClasses.push('red')
        }

        if(this.props.name.length > 4) {
            inpetClasses.push('bold')
        }

        const style = {
            border: '1px solid #ccc',
            boxShadow: '0 4px 5px 0 rgb(0, 0, 0, .14)',
            ':hover': { // после подключения библиотеки Radium можно в объекте передавать значение псевдоклассов CSS
                border: '1px solid #aaa',
                boxShadow: '0 4px 15px 0 rgb(0, 0, 0, .25)',
                cursor: 'pointer'
            }
        }

        return (
            // <div className="Car" style={style}> // Вместо оборачивающего div используем React.Fragment
            <React.Fragment>
                <h3>Car name: {this.props.name}</h3>
                <p><strong>Year: {this.props.year}</strong></p> 
                <input 
                    type="text" 
                    onChange={this.props.onChangeName} 
                    value={this.props.name}
                    className={inpetClasses.join(' ')} // className понимает только строку, поэтому превращаем массив в строку через метод join
                />
                <button onClick={this.props.onDelete}>Delete</button>
                {/* <button onClick={props.onChangeTitle}>Click</button>  */}
                {this.props.children}
            </React.Fragment>
            // </div>
        )
    }
}


// Функциональный компанент (выше мы переделали его в классовый)

// const car = (props) => { 
//     const inpetClasses = ['input']

//     if(props.name !== '') {
//         inpetClasses.push('green')
//     } else {
//         inpetClasses.push('red')
//     }

//     if(props.name.length > 4) {
//         inpetClasses.push('bold')
//     }

//     const style = {
//         border: '1px solid #ccc',
//         boxShadow: '0 4px 5px 0 rgb(0, 0, 0, .14)',
//         ':hover': { // после подключения библиотеки Radium можно в объекте передавать значение псевдоклассов CSS
//             border: '1px solid #aaa',
//             boxShadow: '0 4px 15px 0 rgb(0, 0, 0, .25)',
//             cursor: 'pointer'
//         }
//     }

//     return (
//         <div className="Car" style={style}>
//             <h3>Car name: {props.name}</h3>
//             <p><strong>Year: {props.year}</strong></p> 
//             <input 
//                 type="text" 
//                 onChange={props.onChangeName} 
//                 value={props.name}
//                 className={inpetClasses.join(' ')} // className понимает только строку, поэтому превращаем массив в строку через метод join
//             />
//             <button onClick={props.onDelete}>Delete</button>
//             {/* <button onClick={props.onChangeTitle}>Click</button>  */}
//             {props.children}
//         </div>
//     )
// }



export default withClass(Radium(Car), 'Car') // что бы библиотека Radium работала нужно в её компанент передать наш компанент гдя мы используем эту библиотеку