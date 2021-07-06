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
const car = (props) => (
    <div>
        <h3>Car name: {props.name}</h3>
        <p><strong>Year: {props.year}</strong></p> 
        <button onClick={props.onChangeTitle}>Click</button> 
        {props.children}
    </div>
)

// export default Car

export default car