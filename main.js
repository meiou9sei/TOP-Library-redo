let myLibrary = [];

// constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      read ? "read" : "not read yet" + "."
    }`;
  };
}

const form = document.getElementById("addBookForm");
form.addEventListener("submit", submitNewBook);
function submitNewBook(e) {
  e.preventDefault();

  const title = document.getElementById("bookTitle");
  const author = document.getElementById("bookAuthor");
  const pages = document.getElementById("bookPages");
  const isBookRead = document.querySelector(
    "input[name=isBookRead]:checked"
  ).value;

  let newBook = new Book(title.value, author.value, pages.value, isBookRead);
  addBookToLibrary(newBook);

  title.value = "";
  author.value = "";
  pages.value = "";
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

let exampleBook = new Book("my awesome life", "cameron", "2000", true);

console.log(exampleBook.info());
