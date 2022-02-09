const express = require('express');
const UserRouter = require('./Router/user');
const NotesRouter = require('./Router/notes');

const app = express();

app.use(express.json())
app.use(UserRouter)
app.use(NotesRouter)

app.listen(3001, () => console.log(`Listening at PORT ` + 3001))

module.exports = app