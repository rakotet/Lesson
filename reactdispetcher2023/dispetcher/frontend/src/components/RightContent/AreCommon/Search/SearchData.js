import search from './image/Search.png'

export default function Search() {
  return(
    <div className="search-wrapper">
      <img src={search} alt="" />
      <input type="text" placeholder="Поиск"/>
    </div>
  )
}