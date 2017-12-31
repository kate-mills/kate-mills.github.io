app.BookList = Backbone.Collection.extend({
      model: app.Book,
      localStorage: new Store("backbone-book"),
      getAllBooks: function(){return this.models},
      getBooksIWant: function(){return this.where({'booklist':'iWant'})},
      getBooksOnOrder: function(){return this.where({'booklist':'onOrder'})},
      getBooksAvailable: function(){return this.where({'booklist':'available'})},
      getBooksRead: function(){return this.where({'booklist':'read'})},
      getFavoriteBooks: function(){return this.where({'rating':'thumbsup'})},
});

app.bookList = new app.BookList({model: app.Book});
app.bookList.fetch();

if(!app.bookList.length){
    var d = new Date();
    var firstbook = app.bookList.create({published: d.getFullYear()});
}
