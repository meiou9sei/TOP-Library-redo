export default function runApp() {
  let myLibrary = [];
  let bookIndex = 0;

  // declarations
  const booksDisplay = document.getElementById("booksDisplay");
  const form = document.getElementById("addBookForm");
  form.addEventListener("submit", submitNewBook);

  // constructor
  function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookIndex = bookIndex;
    bookIndex++;
  }

  Book.prototype.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      read ? "read" : "not read yet" + "."
    }`;
  };

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
    addBookToDisplay(newBook);
  }

  function addBookToDisplay(newBook) {
    let newBookCard = createBookCard(newBook);
    booksDisplay.appendChild(newBookCard);
  }

  function createBookCard(newBook) {
    const bookCard = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const readStatus = document.createElement("p");

    title.textContent = newBook.title;
    author.textContent = newBook.author;
    pages.textContent = newBook.pages;
    readStatus.textContent = `Book read: ${newBook.read}`;

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readStatus);

    // remove book button
    const discardBook = document.createElement("button");
    discardBook.textContent = "remove book";
    bookCard.dataset.bookindex = newBook.bookIndex;
    discardBook.addEventListener("click", function (e) {
      // removes book from myLibrary
      const removeIndex = myLibrary.findIndex(
        (book) => book.bookIndex === newBook.bookIndex
      );
      myLibrary.splice(removeIndex, 1);
      // removes book from display
      e.target.parentNode.remove();
    });
    bookCard.appendChild(discardBook);

    // toggle read button
    const toggleRead = document.createElement("button");
    toggleRead.textContent = "toggle read";
    toggleRead.addEventListener("click", function (e) {
      newBook.read = !newBook.read;
      readStatus.textContent = `Book read: ${newBook.read}`;
      if (newBook.read)
        bookCard.classList.replace("bookCardNotRead", "bookCardRead");
      else bookCard.classList.replace("bookCardRead", "bookCardNotRead");
    });
    bookCard.appendChild(toggleRead);

    // sets bookCard bg color class
    if (newBook.read) bookCard.classList.add("bookCardRead");
    else bookCard.classList.add("bookCardNotRead");

    return bookCard;
  }

  // example books - remove these later?
  let exampleBook1 = new Book("my awesome life", "cameron", "2000", true);
  let exampleBook2 = new Book("my life sucks now", "jeffrey", "10", false);
  let exampleBook3 = new Book("actually its cool", "tim", "20", false);
  let exampleBook4 = new Book("my awesome life 4", "cameron", "30", true);
  addBookToLibrary(exampleBook1);
  addBookToLibrary(exampleBook2);
  addBookToLibrary(exampleBook3);
  addBookToLibrary(exampleBook4);
}
