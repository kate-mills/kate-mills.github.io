function updateLengths(){
    this.allBooks = app.bookList;
    this.booksIWant = app.bookList.getBooksIWant();
    this.favoriteBooks = app.bookList.getFavoriteBooks();
    this.booksOnOrder = app.bookList.getBooksOnOrder();
    this.booksAvailable = app.bookList.getBooksAvailable();
    this.booksRead = app.bookList.getBooksRead();
    $('#all-length.badge').html(this.allBooks.length);
    $('#favorites-length.badge').html(this.favoriteBooks.length);
    $('#want-length.badge').html(this.booksIWant.length);
    $('#order-length.badge').html(this.booksOnOrder.length);
    $('#available-length.badge').html(this.booksAvailable.length);
    $('#read-length.badge').html(this.booksRead.length);
}
