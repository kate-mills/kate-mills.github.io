app.BookList = Backbone.Collection.extend({
      model: app.Book,
      localStorage: new Store("backbone-book"),
      getFavoriteBooks: function(){return this.filter(function(book) {return book.get('star');});},
      getAllBooks: function(){ return app.bookList.filter(function(book){ return book.get('all');});},
      getBooksIWant: function(){ return app.bookList.filter(function(book){return book.get('iWant'); });},
      getBooksOnOrder: function(){ return app.bookList.filter(function(book){return book.get('onOrder'); });},
      getBooksAvailable: function(){ return app.bookList.filter(function(book){return book.get('available'); });},
      getBooksRead: function(){ return app.bookList.filter(function(book){return book.get('alreadyRead'); });}

});//close app.BookList


app.bookList = new app.BookList();
app.bookList.fetch();

var num = app.bookList.length;
if(num < 1){
  returnListLengthToOne(app.bookList);
  console.log('returnListLengthToOne called', app.bookList.length);
}


console.log("bookList collection:",app.bookList.length,app.bookList);

var firstbook =app.bookList.at(0);
var secondbook =app.bookList.at(1);
var lastbook =app.bookList.at(app.bookList.length -1);
var allBooks =app.bookList;
var booksIWant =app.bookList.filter(function(book){ return book.get('iWant');});
var booksOnOrder =app.bookList.filter(function(book){ return book.get('onOrder');});
var booksAvailable =app.bookList.filter(function(book){ return book.get('available');});
var booksRead =app.bookList.filter(function(book){ return book.get('read');});
