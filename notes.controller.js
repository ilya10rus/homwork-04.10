const fs = require("fs/promises");
const path = require("path");

const notesPath = path.join(__dirname, "db.json");

async function getNote() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function addNote(title) {
  const notes = await getNote();

  const note = {
    title,
    id: notes.length + 1,
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function removeNote({ id }) {
  const notes = await getNote();

  const editingNotes = notes.filter((note) => note.id !== id);

  await fs.writeFile(notesPath, JSON.stringify(editingNotes));
}

module.exports = {
  getNote,
  addNote,
  removeNote,
};
