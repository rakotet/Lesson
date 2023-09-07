export function addGoods(id, title, image) {
  return {
    type: 'ADD_GOODS',
    id,
    title,
    image
  }
}