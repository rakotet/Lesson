export default function goods(state = [], action) {
  switch (action.type) {
    case 'ADD_GOODS':
      console.log('add goods work')
      console.log(state)
      return [ // необходимо вернуть новый state как в обычном react
        ...state,
        {
          id: action.id,
          title: action.title,
          image: action.image,
        }
      ]

      default:
        return state
  }

}