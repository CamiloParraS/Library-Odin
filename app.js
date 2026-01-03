const form = document.getElementById("newBookForm");
const showFormBtn = document.getElementById("showFormBtn");
const closeFormBtn = document.getElementById("closeFormBtn");
const bookGrid = document.getElementById("bookGrid");
const submitBtn = document.querySelector(".addBook");

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

// Where the Library thingy happens
const myLibrary = [];

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

function addBookToLibrary() {
  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("bookAuthor").value;
  const pages = document.getElementById("bookPages").value;
  const read = document.getElementById("alreadyRead").checked;

  if (title === "" || author === "" || pages === "") {
    alert("Please fill all fields");
    return;
  }

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  createGrid();
  closeForm();
}

function createGrid() {
  bookGrid.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");

    const statusClass = book.read ? "is-read" : "not-read";
    const statusText = book.read ? "Read" : "Not Read";

    bookCard.innerHTML = `
    <h3 class="card_title">'${book.title}'</h3>
    <p class="card__content"><strong>Author:</strong> ${book.author}</p>
    <p class="card__content"><strong>Pages:</strong> ${book.pages}</p>

    <button
      class="status-btn ${statusClass}"
      data-id="${book.id}">
      ${statusText}
    </button>

    <button
    class="cancelBook delete-book"
    id="deleteBookBtn"
    data-id="${book.id}">
    Delete
    </button>

    `;

    bookGrid.appendChild(bookCard);
  });
}

function closeForm() {
  form.classList.remove("active");
  document.getElementById("bookTitle").value = "";
  document.getElementById("bookAuthor").value = "";
  document.getElementById("bookPages").value = "";
  document.getElementById("alreadyRead").checked = false;
}

// I am Messy, the add book button
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

bookGrid.addEventListener("click", (e) => {
  const statusBtn = e.target.closest(".status-btn");
  const deleteBtn = e.target.closest(".delete-book");

  if (statusBtn) {
    const bookId = statusBtn.dataset.id;
    const book = myLibrary.find((b) => b.id === bookId);
    if (!book) return;

    book.read = !book.read;

    statusBtn.textContent = book.read ? "Read" : "Not Read";
    statusBtn.classList.toggle("is-read", book.read);
    statusBtn.classList.toggle("not-read", !book.read);

    return;
  }

  if (deleteBtn) {
    const bookId = deleteBtn.dataset.id;
    const index = myLibrary.findIndex((b) => b.id === bookId);
    if (index === -1) return;

    myLibrary.splice(index, 1);
    deleteBtn.closest(".card").remove();
  }
});
