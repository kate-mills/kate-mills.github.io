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

if(!app.bookList.length){
    var firstbook = app.bookList.create({
        title: 'Add Some Books To Your Collection!',
        author: 'Vince Flynn',
        reader: 'Peter Hermann',
        published: 2016,
        iWant: true,
        onOrder: false,
        available: false,
        alreadyRead: false
      });
      firstbook.set('created_at', Date());
      console.log('book created', firstbook);
}


var allBooks =app.bookList;
var booksIWant =app.bookList.filter(function(book){ return book.get('iWant');});
var booksOnOrder =app.bookList.filter(function(book){ return book.get('onOrder');});
var booksAvailable =app.bookList.filter(function(book){ return book.get('available');});
var booksRead =app.bookList.filter(function(book){ return book.get('read');});
