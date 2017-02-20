app.BookList = Backbone.Collection.extend({
      model: app.Book,
      localStorage: new Store("backbone-book"),
      getFavoriteBooks: function(){return this.filter(function(book) {return book.get('star');});},
      getAllBooks: function(){ return app.bookList.filter(function(book){ return book.get('all') })},
      getBooksIWant: function(){ return app.bookList.filter(function(book){return book.get('iWant') })},
      getBooksOnOrder: function(){ return app.bookList.filter(function(book){return book.get('onOrder') })},
      getBooksAvailable: function(){ return app.bookList.filter(function(book){return book.get('available')})},
      getBooksRead: function(){ return app.bookList.filter(function(book){return book.get('alreadyRead')})},

});//close app.BookList


app.bookList = new app.BookList();
var bookList = app.bookList;
bookList.fetch();
var num = bookList.length;
if(num < 1){
  returnListLengthToOne(bookList);//var book from line 143 in app.Book.js
  console.log('returnListLengthToOne called', bookList.length);
}


// ***** bookList is what I will be working with in views *******

console.log("bookList collection:", bookList.length, bookList);

var firstbook = bookList.at(0);
var secondbook = bookList.at(1);
var lastbook = bookList.at( bookList.length -1);
var allBooks = bookList;
var booksIWant = bookList.filter(function(book){ return book.get('iWant');});
var booksOnOrder = bookList.filter(function(book){ return book.get('onOrder');});
var booksAvailable = bookList.filter(function(book){ return book.get('available');});
var booksRead = bookList.filter(function(book){ return book.get('read');});
