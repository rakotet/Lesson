import search from './image/Search.png'

export default function Search({margin = true}) {
  return(
    <div className={margin ? "search-wrapper" : "search-wrapper search-wrapper-margin"}>
      <img src={search} alt="" />
      <input type="text" placeholder="Поиск"/>
    </div>
  )
}