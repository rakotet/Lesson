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
    <div style={{
        border: '1px solid #ccc',
        marginBottom: '10px',
        display: 'block',
        padding: '10px',
        boxShadow: '0 4px 5px 0 rgba(0, 0, 0, .14)',
        borderRadius: '5px'
    }}>
        <h3>Car name: {props.name}</h3>
        <p><strong>Year: {props.year}</strong></p> 
        <input type="text" onChange={props.onChangeName} value={props.name}/>
        <button onClick={props.onDelete}>Delete</button>
        {/* <button onClick={props.onChangeTitle}>Click</button>  */}
        {props.children}
    </div>
)

// export default Car

export default car