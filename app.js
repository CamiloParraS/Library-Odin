const form = document.getElementById("newBookForm");
const showFormBtn = document.getElementById("showFormBtn");
const closeFormBtn = document.getElementById("closeFormBtn");

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

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  const readStatus = this.read ? "read" : "not read yet";
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
};

// // === MODERN WAY ES6+ ===
// class  {
//   constructor(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
//   }
//   infoM() {
//     const readStatus = this.read ? "read" : "not read yet";
//     return `CLASSES ${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
//   }
// }
