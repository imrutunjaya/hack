// Sample book data to demonstrate functionality
const books = [
    {
        id: 1,
        title: "Introduction to Algorithms",
        language: "English",
        category: "Syllabus",
        image: "https://images-na.ssl-images-amazon.com/images/I/41SN9ZH44VL._SX379_BO1,204,203,200_.jpg",
        notes: "Comprehensive algorithms book covering a wide range of topics.",
        whatsInside: "Sorting, Searching, Graph Algorithms, Dynamic Programming",
        topicsCovered: "Basic Algorithms, Data Structures, Advanced Algorithms",
        moreDetails: "This book is essential for computer science students and professionals.",
        downloadUrl: "https://example.com/download/intro-to-algorithms.pdf",
        readUrl: "https://example.com/read/intro-to-algorithms.pdf"
    },
    {
        id: 2,
        title: "Design Patterns",
        language: "English",
        category: "Notes",
        image: "https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL.jpg",
        notes: "Well known design patterns explained with examples.",
        whatsInside: "Creational, Structural, Behavioral Design Patterns",
        topicsCovered: "Singleton, Factory, Observer, Strategy, Decorator and more",
        moreDetails: "Great for software engineers to improve code reusability and design.",
        downloadUrl: "https://example.com/download/design-patterns.pdf",
        readUrl: "https://example.com/read/design-patterns.pdf"
    },
    // Add more books as needed
];

// Elements
const bookListElem = document.querySelector('.book-list');
const fullWidthNotesElem = document.querySelector('.full-width-notes');
const bookNameElem = document.querySelector('.book-info .book-name');
const whatsInsideElem = document.querySelector('.book-info .whats-inside');
const topicsCoveredElem = document.querySelector('.book-info .topics-covered');
const moreDetailsElem = document.querySelector('.book-info .more-details');
const languageElems = document.querySelectorAll('.language');
const categoryElems = document.querySelectorAll('.category');
const downloadButton = document.querySelector('.download-button');
const readButton = document.querySelector('.read-button');

let currentBook = null;

// Populate book list dynamically
function renderBookList() {
    bookListElem.innerHTML = ''; // Clear existing
    books.forEach(book => {
        const item = document.createElement('div');
        item.classList.add('book-item');
        item.setAttribute('data-id', book.id);

        item.innerHTML = `
            <div class="book-image">
                <img src="${book.image}" alt="Book Cover">
            </div>
            <div class="book-details">
                <div class="language" style="color:blue;">${book.language}</div>
                <div class="category">${book.category}</div>
                <div class="book-title">${book.title}</div>
                <hr class="item-divider">
                <div class="essential-topics">${book.notes}</div>
            </div>
        `;

        // Add click event to show details when clicked
        item.addEventListener('click', () => {
            showBookDetails(book.id);
        });

        bookListElem.appendChild(item);
    });
}

// Show book details in the detail view
function showBookDetails(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    currentBook = book;

    fullWidthNotesElem.textContent = book.notes;
    bookNameElem.textContent = book.title;
    whatsInsideElem.textContent = "What's inside book: " + book.whatsInside;
    topicsCoveredElem.textContent = "Books covers the topics: " + book.topicsCovered;
    moreDetailsElem.textContent = "More details overview: " + book.moreDetails;

    // Update language and category visually on the detail view (if needed)
    // The top right "English" with blue text:
    // I will add these to the top bar of detail view below notes
    // Actually, per user, language is at top right and category beside it - for simplicity I keep them in notes area for now

    // Remove any previous download progress info if present
    resetDownloadProgress();

    // Enable buttons
    downloadButton.disabled = false;
    readButton.disabled = false;
}

function resetDownloadProgress() {
    downloadButton.textContent = 'Download';
}

// Simulate download with percentage update
function simulateDownload() {
    if (!currentBook) return;

    downloadButton.disabled = true;
    readButton.disabled = true;

    let progress = 0;
    downloadButton.textContent = `Downloading: ${progress}%`;

    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
            downloadButton.textContent = 'Download Complete';
            downloadButton.disabled = false;
            readButton.disabled = false;
            alert(`Download of "${currentBook.title}" completed! (Simulated)`);
        } else {
            progress += 10;
            downloadButton.textContent = `Downloading: ${progress}%`;
        }
    }, 500);
}

// Simulate read button action – open new window or tab with book read URL
function openBookRead() {
    if (!currentBook) return;

    // Open the read url in a new tab (simulate reading)
    if (currentBook.readUrl && currentBook.readUrl !== '') {
        window.open(currentBook.readUrl, '_blank');
    } else {
        alert('Read content not available for this book.');
    }
}

// Initialization
function init() {
    renderBookList();
    // Show first book details by default
    if (books.length > 0) {
        showBookDetails(books[0].id);
    }

    downloadButton.addEventListener('click', simulateDownload);
    readButton.addEventListener('click', openBookRead);
}

init();

