// Do I need this??
app.BookListView = Backbone.View.extend({
    initialize: function(options){
        this.bus = options.bus;
        this.bus.on("add", this.onBookAdded, this);
    },
    onBookAdded: function(book){
        app.bookView = new app.BookView({ model: book });
        this.$el.append(app.bookView.render().$el);
    },
    onBookRemoved: function(book){
        this.$el.find("tr#" + book.cid).remove();
        this.$("tr#" + book.cid).remove();
    },
    render: function(){
        var self = this;
        this.model.each(function(book){
            var view = new app.BookView({ model: book, bus: self.bus});
            self.$el.append(view.render().$el);
        });
    }
});

var allBooksView = new app.BookListView({
  el: "#table-body",
  model: app.bookList,
  bus: bus
});
