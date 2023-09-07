export default function List(data) {
  console.log('---------')
  console.log(data)
  console.log('---------')
  return (
    <div>
      <ul>
        {data.goods.map((item) => {
          return (
            <li key={item.id}>{item.title}
              <img className="img" src={item.image} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}