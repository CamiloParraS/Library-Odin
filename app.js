// ====== Data - The library Array ======

const myLibrary = [];

// ====== Selectors ======

const form = document.getElementById("newBookForm");
const showFormBtn = document.getElementById("showFormBtn");
const closeFormBtn = document.getElementById("closeFormBtn");
const bookGrid = document.getElementById("bookGrid");
const submitBtn = document.querySelector(".addBook");

// ====== Contructor ======

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// ====== Logic Funtions ======

function getBookData() {
  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("bookAuthor").value;
  const pages = parseInt(document.getElementById("bookPages").value, 10);
  const read = document.getElementById("alreadyRead").checked;

  if (title === "" || author === "" || isNaN(pages)) {
    alert("Please fill all fields correctly");
    return;
  }
  addBookToLibrary(title, author, pages, read);
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  renderLibrary();
  closeForm();
}

function updateStats() {
  const stats = myLibrary.reduce(
    (acc, book) => {
      acc.total++;
      acc.totalPages += Number(book.pages);
      if (book.read) acc.read++;
      else acc.notRead++;
      return acc;
    },
    { total: 0, totalPages: 0, read: 0, notRead: 0 },
  );
  renderStats(stats);
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function closeForm() {
  form.classList.remove("active");
  document.getElementById("bookTitle").value = "";
  document.getElementById("bookAuthor").value = "";
  document.getElementById("bookPages").value = "";
  document.getElementById("alreadyRead").checked = false;
}

// ====== Render Functions ======

function renderLibrary() {
  bookGrid.innerHTML = "";

  if (myLibrary.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "empty-message";
    emptyMessage.innerHTML = `
      <p>Your library is empty!</p>
      <span>Click "New Book" to get started.</span>
      `;
    bookGrid.appendChild(emptyMessage);
  } 
  
  else {
    myLibrary.forEach((book, index) => {
      const bookCard = createBookCard(book);
      bookGrid.appendChild(bookCard);
    });
  }
  updateStats();
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "bookCard";
  card.dataset.id = book.id;

  const statusText = book.read ? "Read" : "Not Read";
  const statusClass = book.read ? "is-read" : "not-read";

  card.innerHTML = `
      <h3 class="card_title">'${book.title}'</h3>
      <p class="card__content"><strong>Author:</strong> ${book.author}</p>
      <p class="card__content"><strong>Pages:</strong> ${book.pages}</p>

      <button class="status-btn ${statusClass}" data-id="${book.id}">${statusText}</button>
      <button class="delete-book cancelBook" data-id="${book.id}">Delete</button>
    `;

  return card;
}

function renderStats(stats) {
  document.getElementById("statBooksTotal").textContent = stats.total;
  document.getElementById("statBooksRead").textContent = stats.read;
  document.getElementById("statBooksPending").textContent = stats.notRead;
  document.getElementById("statPages").textContent = stats.totalPages;
}

// ====== Event Listeners ======

// Open the Form
showFormBtn.addEventListener("click", () => {
  form.classList.add("active");
});

// Close the Form
closeFormBtn.addEventListener("click", () => {
  form.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target === form) {
    form.classList.remove("active");
  }
});

// I am Messy, the add book button
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getBookData();
});

bookGrid.addEventListener("click", (e) => {
  const statusBtn = e.target.closest(".status-btn");
  const deleteBtn = e.target.closest(".delete-book");

  if (statusBtn) {
    const bookId = statusBtn.dataset.id;
    const book = myLibrary.find((b) => b.id === bookId);
    if (!book) return;

    book.toggleRead();

    statusBtn.textContent = book.read ? "Read" : "Not Read";
    statusBtn.classList.toggle("is-read", book.read);
    statusBtn.classList.toggle("not-read", !book.read);
    updateStats();

    return;
  }

  if (deleteBtn) {
    const bookId = deleteBtn.dataset.id;
    const index = myLibrary.findIndex((b) => b.id === bookId);
    if (index === -1) return;

    myLibrary.splice(index, 1);
    deleteBtn.closest(".bookCard").remove();
    updateStats();
    renderLibrary();
  }
});

renderLibrary();

// ====== Testing ======
function seedLibrary() {
  const sampleBooks = [
    ["The Hobbit", "J.R.R. Tolkien", 310, true],
    ["1984", "George Orwell", 328, false],
    ["The Great Gatsby", "F. Scott Fitzgerald", 180, true],
    ["Brave New World", "Aldous Huxley", 268, false],
    ["Moby Dick", "Herman Melville", 635, false],
    ["Frankenstein", "Mary Shelley", 280, true],
  ];

  sampleBooks.forEach((bookData) => {
    const newBook = new Book(...bookData);
    myLibrary.push(newBook);
  });

  renderLibrary();
}
