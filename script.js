const data = {
  Maths: [
    { title: "Pythagorean Theorem", content: "a² + b² = c²" },
    { title: "Area of Circle", content: "A = πr²" }
  ],
  English: [
    { title: "Parts of Speech", content: "Noun, Verb, Adjective, etc." },
    { title: "Tenses", content: "Past, Present, Future" }
  ]
};

let currentSubject = "Maths";
let filteredNotes = [];

const subjectSelect = document.getElementById("subject-select");
const noteList = document.getElementById("note-list");
const searchInput = document.getElementById("search");
const noteDetail = document.getElementById("note-detail");
const noteTitle = document.getElementById("note-title");
const noteBody = document.getElementById("note-body");
const noteSection = document.querySelector("main#note-list");

function init() {
  for (let subject in data) {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  }
  subjectSelect.value = currentSubject;
  renderNotes();
}

function switchSubject() {
  currentSubject = subjectSelect.value;
  searchInput.value = "";
  renderNotes();
}

function renderNotes() {
  filteredNotes = data[currentSubject];
  noteList.innerHTML = "";

  if (filteredNotes.length === 0) {
    noteList.innerHTML = "<p>No notes available.</p>";
    return;
  }

  filteredNotes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note-item";
    div.textContent = note.title;
    div.onclick = () => showNoteDetail(note);
    noteList.appendChild(div);
  });
}

function showNoteDetail(note) {
  noteSection.classList.add("hidden");
  noteDetail.classList.remove("hidden");
  noteTitle.textContent = note.title;
  noteBody.textContent = note.content;
}

function goBack() {
  noteDetail.classList.add("hidden");
  noteSection.classList.remove("hidden");
}

function filterNotes() {
  const term = searchInput.value.toLowerCase();
  filteredNotes = data[currentSubject].filter(note =>
    note.title.toLowerCase().includes(term)
  );
  renderNotes();
}

init();
