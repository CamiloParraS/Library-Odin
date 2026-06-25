// ====== Constructor ======

// function Book(title, author, pages, read) {
//   if (!new.target) {
//     throw Error("You must use the 'new' operator to call the constructor");
//   }
//   this.id = crypto.randomUUID();
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// Book.prototype.toggleRead = function () {
//   this.read = !this.read;
// };

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

export { Book };
