# Library-Odin

A small client-side library app for the Odin Project.  
You can add books (title, author, pages, read status), toggle read status, and remove books. Data is kept in memory in an array during the session.

- Each book is an object created via a `Book` constructor and stored in the `myLibrary` array.
- Every book has a stable unique id generated with `crypto.randomUUID()`.
- The UI separates data (the array of books) from presentation (DOM rendering functions).
- No backend — all data is ephemeral.
