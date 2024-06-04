const express = require('express');
const cors = require('cors')

const PORT = 5010;

const app = express();

app.use(cors())

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`)
});

app.get('/chat', (req, res) => {
  res.json({
    message: 'Hello from backend express.js'
  })
  // res.send('hello world')
})