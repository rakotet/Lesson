import { url } from "./core"

export const userDataFetch = () => {
  const id = document.querySelector('#user').textContent

  fetch(url.urlBack1, {
  method: 'POST',
  header: {
    'content-type': 'application/x-www-form-urlencoded',
  },
  body: JSON.stringify({userData: id})

  })
  .then(data => {
    return data.text()
  })
  .then(data => {
    return JSON.parse(data)
  })
  .catch((er) => {
    console.log(er)
  })
}