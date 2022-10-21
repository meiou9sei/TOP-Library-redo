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

function addBookToLibrary() {
  console.log("hiya");
}

let exampleBook = new Book("my awesome life", "cameron", "2000", true);

console.log(exampleBook.info());
