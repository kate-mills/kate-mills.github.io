app.BookList = Backbone.Collection.extend({
      model: app.Book,
      localStorage: new Store("backbone-book"),
      getFavoriteBooks: function(){return this.where({'rating': 'thumbsup'})},
      getAllBooks: function(){ return app.bookList.filter(function(book){ return book;});},
      getBooksIWant: function(){ return app.bookList.filter(function(book){return book.get('iWant'); });},
      getBooksOnOrder: function(){ return app.bookList.filter(function(book){return book.get('onOrder'); });},
      getBooksAvailable: function(){ return app.bookList.filter(function(book){return book.get('available'); });},
      getBooksRead: function(){ return app.bookList.filter(function(book){return book.get('alreadyRead'); });}

});//close app.BookList


app.bookList = new app.BookList({model: app.Book});
app.bookList.fetch();

if(!app.bookList.length){
    var firstbook = app.bookList.create();
     console.log('firstbook created', firstbook);
}
