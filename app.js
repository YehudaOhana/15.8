const users = [{id:`1`, mail:`1@gmail.com`, password:123}, {id:`2`, mail:`2@gmail.com`, password:456}, {id:`3`, mail:`3@gmail.com`, password:789}]
const express = require(`express`)
const app = express()
const port = 3000
const { v4: uuid } = require(`uuid`);
app.use(express.json())
app.get(`/`, (req, res) => {
    res.send(users)
})

app.get(`/:id`, (req, res) => {
    const id = req.params.id
    const UserId = users.find((element) => element.id === id)
    !UserId ? res.send(`not find`):res.send(UserId)
})

app.post(`/`, (req, res) => {
    const { mail, password } = req.body;
    const newUser = { id: uuid(), mail, password };
    users.push(newUser);
    res.send(users);
  });


app.put(`/:id`, (req, res) => {
    const id = req.params.id
    const UserId = users.find((element) => element.id === id)
    UserId = req.body
    res.send(users)
})

app.delete(`/`, (req, res) => {
    res.send(`hello`)
})

app.listen(port, () => {
    console.log(`server running ${port}`)
})
