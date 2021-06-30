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
const car = (props) => (
    <div>
        <h3>Car name: {props.name}</h3>
        <p><strong>Year: {props.year}</strong></p> 
        {props.children}
    </div>
)

// export default Car

export default car