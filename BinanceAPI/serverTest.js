const express = require('express')
const app = express()
const port = 3002

app.get('/user', (req, res) => {
    res.send('1111111');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})