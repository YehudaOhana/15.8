const express = require(`express`);
const app = express();
const port = 3000;
const { v4: uuid } = require(`uuid`);
app.use(express.json());
const bcrypt = require("bcrypt");
const saltRounds = 3;

const users = [
  { id: uuid(), mail: `1@gmail.com`, password: 123 },
  { id: uuid(), mail: `2@gmail.com`, password: 456 },
  { id: uuid(), mail: `3@gmail.com`, password: 789 },
];

app.get(`/`, (req, res) => {
  res.send(users);
});

app.get(`/:id`, (req, res) => {
  const id = req.params.id;
  const UserId = users.find((element) => element.id === id);
  UserId ? res.send(UserId) : res.send(`not find`);
});

app.post(`/`, (req, res) => {
  const { mail, password } = req.body;
  if (!mail || !password) {
    res.status(400).send(`enter mail and password`);
  } else {
    if (users.find((element) => element.mail === mail)) {
      res.status(400).send(`User does exist`);
    } else {
      const newUser = {
        id: uuid(),
        mail,
        password: bcrypt.hashSync(password, saltRounds),
      };
      users.push(newUser);
      res.send(users);
    }
  }
});

app.put(`/:id`, (req, res) => {
  const id = req.params.id;
  const UserId = users.findIndex((element) => element.id === id);
  const { mail, password } = req.body;
  users[UserId] = {
    id: id,
    mail,
    password: bcrypt.hashSync(password, saltRounds),
  };
  res.send(users);
});

app.delete(`/:id`, (req, res) => {
  const id = req.params.id;
  const UserId = users.findIndex((element) => element.id === id);
  users.splice(UserId, 1);
  res.send(users);
});

app.post(`/search`, (req, res) => {
  const { mail, password } = req.body;
  checkPassword = users.find(
    (element) =>
      element.mail === mail && bcrypt.compareSync(password, element.password)
  );
  if (checkPassword) {
    res.send(`User is connected`);
  } else {
    res.send(`wrong credentials`);
  }
});

app.listen(port, () => {
  console.log(`server running ${port}`);
});
