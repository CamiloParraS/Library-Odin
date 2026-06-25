import { Library } from "./Library.js";
import { UI } from "./ui.js";

// ====== Initialization ======

const library = new Library();
const ui = new UI(library);

ui.init();

// ====== Testing ======

// function seedLibrary() {
//   const sampleBooks = [
//     ["The Hobbit", "J.R.R. Tolkien", 310, true],
//     ["1984", "George Orwell", 328, false],
//     ["The Great Gatsby", "F. Scott Fitzgerald", 180, true],
//     ["Brave New World", "Aldous Huxley", 268, false],
//     ["Moby Dick", "Herman Melville", 635, false],
//     ["Frankenstein", "Mary Shelley", 280, true],
//   ];
//
//   sampleBooks.forEach((bookData) => {
//     const newBook = new Book(...bookData);
//     myLibrary.push(newBook);
//   });
//
//   renderLibrary();
// }
