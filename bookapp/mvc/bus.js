var bus = _.extend({}, Backbone.Events);

bus.bookmark = {
    available: '<td title="Click to move to Books Read" class="glyphicon glyphicon-bookmark blue">Available</td>',
    iWant: '<td title="Click to move to Books On Order." class="glyphicon glyphicon-bookmark green">Want</td>',
    onOrder: '<td title="Click to move to Books Available." class="glyphicon glyphicon-bookmark orange">Order</td>',
    all: '<td class="glyphicon glyphicon-book grey”>All</td>',
    read: '<td title="Read Again? Click to move to Books Available." style="content:"\e043" class="glyphicon glyphicon-bookmark red">Read</td>',
};

bus.rating = {
    noData: '<td class="no_data"></td>',
    thumbsdown: '<td style="color:gainsboro" title="click to ??" class="glyphicon glyphicon-thumbs-down"></td>',
    questionmark: '<td style="color:red" title="click to Favorite" class="glyphicon glyphicon-question-sign"></td>',
    thumbsup: '<td style="color:#009688" title="click to Un-Favorite" class="glyphicon glyphicon-thumbs-up"></td>',
};

bus.on('updateLengths', function(){
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
    updateLengths();
})
