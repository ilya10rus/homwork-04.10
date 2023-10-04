const express = require("express");
const chalk = require("chalk");
const { addNote, getNote } = require("./notes.controller");

const port = 3004;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNote(),
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNote(),
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port... ${port}`));
});
