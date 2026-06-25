// ====== UI Controller ======

class UI {
  constructor(library) {
    this.library = library;

    this.form = document.getElementById("newBookForm");
    this.showFormBtn = document.getElementById("showFormBtn");
    this.closeFormBtn = document.getElementById("closeFormBtn");
    this.bookGrid = document.getElementById("bookGrid");
    this.submitBtn = document.querySelector(".addBook");
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // Open the Form
    this.showFormBtn.addEventListener("click", () => {
      this.form.classList.add("active");
    });

    // Close the Form
    this.closeFormBtn.addEventListener("click", () => {
      this.closeForm();
    });

    window.addEventListener("click", (e) => {
      if (e.target === this.form) {
        this.form.classList.remove("active");
      }
    });

    // I am Messy, the add book button
    this.submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.getBookData();
    });

    this.bookGrid.addEventListener("click", (e) => {
      this.handleGridClick(e);
    });
  }

  handleGridClick(e) {
    const statusBtn = e.target.closest(".status-btn");
    const deleteBtn = e.target.closest(".delete-book");

    if (statusBtn) {
      const bookId = statusBtn.dataset.id;
      const book = this.library.toggleBookRead(bookId);
      if (!book) return;

      statusBtn.textContent = book.read ? "Read" : "Not Read";
      statusBtn.classList.toggle("is-read", book.read);
      statusBtn.classList.toggle("not-read", !book.read);
      this.updateStats();

      return;
    }

    if (deleteBtn) {
      const bookId = deleteBtn.dataset.id;
      const removed = this.library.removeBook(bookId);
      if (!removed) return;

      this.render();
    }
  }

  getBookData() {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const pages = parseInt(document.getElementById("bookPages").value, 10);
    const read = document.getElementById("alreadyRead").checked;

    if (title === "" || author === "" || isNaN(pages)) {
      alert("Please fill all fields correctly");
      return;
    }

    this.library.addBook(title, author, pages, read);
    this.render();
    this.closeForm();
  }

  closeForm() {
    this.form.classList.remove("active");
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookPages").value = "";
    document.getElementById("alreadyRead").checked = false;
  }

  render() {
    this.bookGrid.innerHTML = "";

    if (this.library.length === 0) {
      const emptyMessage = document.createElement("div");
      emptyMessage.className = "empty-message";
      emptyMessage.innerHTML = `
      <p>Your library is empty!</p>
      <span>Click "New Book" to get started.</span>
      `;
      this.bookGrid.appendChild(emptyMessage);
    } else {
      this.library.all.forEach((book) => {
        const bookCard = this.createBookCard(book);
        this.bookGrid.appendChild(bookCard);
      });
    }

    this.updateStats();
  }

  createBookCard(book) {
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

  updateStats() {
    const stats = this.library.getStats();
    document.getElementById("statBooksTotal").textContent = stats.total;
    document.getElementById("statBooksRead").textContent = stats.read;
    document.getElementById("statBooksPending").textContent = stats.notRead;
    document.getElementById("statPages").textContent = stats.totalPages;
  }
}

export { UI };
