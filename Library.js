import { Book } from "./Book.js";

// ====== Library Class ======

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    this.books.push(newBook);
    return newBook;
  }

  removeBook(id) {
    const index = this.books.findIndex((b) => b.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
      return true;
    }
    return false;
  }

  getBook(id) {
    return this.books.find((b) => b.id === id);
  }

  toggleBookRead(id) {
    const book = this.getBook(id);
    if (book) {
      book.toggleRead();
      return book;
    }
    return null;
  }

  getStats() {
    return this.books.reduce(
      (acc, book) => {
        acc.total++;
        acc.totalPages += Number(book.pages);
        if (book.read) acc.read++;
        else acc.notRead++;
        return acc;
      },
      { total: 0, totalPages: 0, read: 0, notRead: 0 },
    );
  }

  seed(booksData) {
    booksData.forEach(([title, author, pages, read]) => {
      this.books.push(new Book(title, author, pages, read));
    });
  }

  get all() {
    return [...this.books];
  }

  get length() {
    return this.books.length;
  }
}

export { Library };
