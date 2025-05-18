// Sample data
const notesData = [
  {
    subject: "Genetics",
    title: "DNA Replication",
    description: "Basics of DNA synthesis and replication fork.",
    link: "https://example.com/genetics/dna-replication.pdf"
  },
  {
    subject: "Biochemistry",
    title: "Carbohydrate Metabolism",
    description: "Overview of glycolysis, Krebs cycle, and more.",
    link: "https://example.com/biochem/carb-metabolism.pdf"
  },
  {
    subject: "Microbiology",
    title: "Bacterial Cell Structure",
    description: "Structure and function of bacterial organelles.",
    link: "https://example.com/microbio/bacterial-structure.pdf"
  },
  {
    subject: "Genetics",
    title: "Mendelian Inheritance",
    description: "Mendel's laws and genetic ratios.",
    link: "https://example.com/genetics/mendel.pdf"
  },
  {
    subject: "Molecular Biology",
    title: "Transcription and Translation",
    description: "mRNA synthesis and protein translation explained.",
    link: "https://example.com/molbio/central-dogma.pdf"
  }
];

const searchInput = document.getElementById("searchInput");
const subjectButtons = document.querySelectorAll(".subject-bar button");
const notesGrid = document.getElementById("notesGrid");

let currentFilter = "All";

// Render notes
function renderNotes() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredNotes = notesData.filter(note => {
    const matchesSubject = currentFilter === "All" || note.subject === currentFilter;
    const matchesSearch = note.title.toLowerCase().includes(searchTerm) || note.description.toLowerCase().includes(searchTerm);
    return matchesSubject && matchesSearch;
  });

  notesGrid.innerHTML = "";

  if (filteredNotes.length === 0) {
    notesGrid.innerHTML = "<p style='text-align:center; color:#999;'>No notes found.</p>";
    return;
  }

  filteredNotes.forEach(note => {
    const card = document.createElement("div");
    card.className = "note-card";

    card.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.description}</p>
      <a href="${note.link}" target="_blank">Access</a>
    `;

    notesGrid.appendChild(card);
  });
}

// Subject filter
subjectButtons.forEach(button => {
  button.addEventListener("click", () => {
    subjectButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.textContent;
    renderNotes();
  });
});

// Search filter
searchInput.addEventListener("input", renderNotes);

// Initial render
renderNotes();
