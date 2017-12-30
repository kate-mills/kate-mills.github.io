app.BookList = Backbone.Collection.extend({
      model: app.Book,
      localStorage: new Store("backbone-book"),
      getFavoriteBooks: function(){return this.where({'rating': 'thumbsup'})},
      getAllBooks: function(){return this.models},
      getBooksIWant: function(){return this.filter(function(book){return book.get('iWant');});},
      getBooksOnOrder: function(){return this.filter(function(book){return book.get('onOrder');});},
      getBooksAvailable: function(){return this.filter(function(book){return book.get('available');});},
      getBooksRead: function(){return this.filter(function(book){return book.get('alreadyRead');});}

});

app.bookList = new app.BookList({model: app.Book});
app.bookList.fetch();

if(!app.bookList.length){
    var d = new Date();
    var firstbook = app.bookList.create({published: d.getFullYear()});
}
