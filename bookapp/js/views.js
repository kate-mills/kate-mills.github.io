app.BookView = Backbone.View.extend({
    tagName: 'tr',
    initialize: function(options){
        this.bus = options.bus;
        this.model = options.model;
        this.model.on('add', this.addOne, this);
        this.model.on('destroy', this.remove, this);
        this.bus.on('onClickRadio', this.onClick, this);
    },

    onClick: function(){
        this.bus.trigger("bookSelected", this.model);
        updateLengths();
    },
    onModelChange: function(options){
     this.bus.trigger('updateBadgeNums');
     updateLengths();
    },
    events: {
        'click': 'onClick',
        'click td.wdyt': 'onClickQuestionmark',
        'click td.glyphicon-thumbs-up': 'onClickThumbsUp',
        'click td.glyphicon-thumbs-down.black': 'onClickThumbsDown',
        'click td.glyphicon.glyphicon-bookmark.green': 'onToggleOrder',
        'click td.glyphicon.glyphicon-bookmark.orange': 'onToggleAvailable',
        'click td.glyphicon.glyphicon-bookmark.blue': 'onToggleRead',
        'click td.glyphicon.glyphicon-bookmark.red': 'onToggleAvailable',
        'click td#destroy': 'destroy'
    },
    render: function(){
        if(this.model){
          // this.model.toJSON();
          this.$el.html(this.model.attributes);
          console.log('hi!');
        }
        this.bus.status = this.model.get('status');
        this.rating = this.model.get('rating');
        this.status = this.model.get('status');
        this.date = this.model.get('created_at');

        this.questionmark = Rating.prototype.questionmark;
        this.thumbsUp  =  Rating.prototype.favorite;
        this.thumbsDown = Rating.prototype.negative;
        this.noData = Rating.prototype.noData;

        this.greenBookmark = Bookmark.prototype.green;
        this.orangeBookmark = Bookmark.prototype.orange;
        this.blueBookmark = Bookmark.prototype.blue;
        this.redBookmark = Bookmark.prototype.red;

        if( this.model.get('iWant')){
           this.bookmark = this.greenBookmark;
           this.rating = this.noData;
           this.alert = "Click " + this.title+ "";
        }
        if( this.model.get('onOrder') ) {
            this.bookmark = this.orangeBookmark;
            this.rating = this.noData;
        }
        if( this.model.get('available') ) {
          this.bookmark = this.blueBookmark;
          this.rating = this.noData;
        }

        if( this.model.get('alreadyRead')  && this.model.get('rating') === 0){
           this.bookmark = this.redBookmark;
           this.rating = this.questionmark;
        }
        if ( this.model.get('alreadyRead') && this.model.get('rating') === 'thumbsup'  || this.model.get('alreadyRead') && this.model.get('rating') === 1) {
            this.bookmark = this.redBookmark;
            this.rating = this.thumbsUp;
        }
        if (this.model.get('alreadyRead') && this.model.get('rating') === 'thumbsdown'){
          this.bookmark = this.redBookmark;
          this.rating = this.thumbsDown;
        }

        this.authorHTML = ('<td>' + this.model.get('author') +'</td>');
        this.readerHTML = ('<td>' + this.model.get('reader') +'</td>');
        this.titleHTML = ('<td>' + this.model.get('title') +'</td>');
        this.publishedHTML = ('<td>' + this.model.get('published') +'</td>');

        this.status = this.model.get("status");
        this.radio = ('<td>' + this.model.get('status') +'</td>');
        this.ex = ('<td id="destroy" class="glyphicon glyphicon-trash '+this.bus.statusClass+'"></td>');


        this.$el.html(  this.authorHTML + this.readerHTML + this.titleHTML + this.publishedHTML  + this.bookmark + this.radioWant + this.radioOrder + this.radioAvailable + this.radioRead   + this.rating + this.ex);
        this.$el.attr({
          id: this.model.cid,
          class: this.status,
      });
        this.$el.attr({id: this.model.cid, status: this.model.status } );
        return this;
    },
    updateOnEnter: function(e){
        if(e.which == 13){
          this.close();
        }
      },
    onClickEmptyStar: function(){
      this.model.giveOneStarRating();
      this.render();
    },
    onClickQuestionmark: function(){
      console.clear();
      this.model.changeRating('thumbsup', true);
      this.render();
    },
    onClickThumbsUp: function() {
      this.model.changeRating('thumbsdown', false);
      this.render();
    },
    onClickThumbsDown: function(){
      this.model.changeRating(0, false);
      this.render();
    },
    onToggleWant: function(){
      old_list = window.filter;
      new_list = 'iWant';
      this.model.changeList(newList, old_list);
      this.render();

      if(window.filter !== 'iWant'){
        if(window.filter !== 'all')
        this.$el.fadeOut('slow');
      }
    },

    onToggleOrder: function(){
      this.model.changeList('onOrder');
      this.render();
      if(window.filter !== 'onOrder'){
        if(window.filter !== 'all')
         this.$el.fadeOut('slow');
      }
    },

    onToggleAvailable: function(){
      this.model.changeList('available');
      this.removeFromFavoriteList(this.model.toJSON());
      this.render();
      if(window.filter !== 'available'){
        if(window.filter !== 'all')
         this.$el.fadeOut('slow');
      }
    },
    onToggleRead: function(e){
      console.log(e.target);
      var w = window.filter;
      console.log(w);
      if (w !== 'all' && w !== 'alreadyRead') {
          this.$(e.target).html('Read').addClass('moving_to_read');
          this.$el.fadeOut('slow');
      }
      this.model.changeList('alreadyRead');
      this.render();
    },
    addToFavoriteList: function(){
      this.model.save('star', true);
      this.model.save('rating', 'thumbsup');
    },
    removeFromFavoriteList: function(model){
      this.model.save('star', false);
      this.model.save('rating', 0);
      updateLengths();
    },
    destroy: function(){
        this.model.destroy();
    },
    updateLengths: function(){
      updateLengths();
    }
}); //close app.BookView
app.BookListView = Backbone.View.extend({

  initialize: function(options){
        this.bus = options.bus;
        this.bus.on("add", this.onBookAdded, this);
  },
  events: { "click": "onClick" },
      onClick:function(){
        this.bus.trigger("bookSelected", this.model);
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

app.AppView = Backbone.View.extend({
  el: '#bookapp',
  initialize: function (options) {
        this.bus = options.bus;
        this.book = this.$('#new-book');
        this.author = this.$('#author');
        this.reader = this.$('#reader');
        this.title = this.$('#title');
        this.published = this.$('#published');

        app.bookList.on('add', this.addAll, this);
        app.bookList.on('reset', this.addAll, this);
        app.bookList.fetch(); // Loads list from local storage
  },
  events: {
        "keydown #author": "onKeypressAuthor",
        "keydown #reader": "onKeypressReader",
        "keydown #title": "onKeypressTitle",
        "keydown #published": "onKeypressPublished",
        "mousedown input": "onMousedownInput",
        "click input#submit": "onSubmit"
  },

testPublishedYear: function(n){
    if ( Number(n) ) {
    return String(n);
    }
  else if ( String(n)  || n === undefined || n === ''){
    return 'null';
    }
  },
 // updateLengths: function(){
 //      updateLengths();
 //    },
  onKeypressReader: function(e) {
      var keyCode = e.keyCode || e.which;
      this.readerValue = $('#reader').val();
      var readerValue = this.readerValue.trim();
      if (keyCode == 9){
        this.reader = readerValue;
        console.log('readerValue', this.reader);
      }
      if (keyCode == 13) {
        this.reader = readerValue;
        console.log('readerValue', this.reader);
      }
    },
  onKeypressTitle: function(e){
      var keyCode = e.keyCode || e.which;
        this.titleValue = $('#title').val();
        var titleValue = this.titleValue.trim();
        if (keyCode == 9){
            this.title = titleValue;
            console.log("BookTitle", this.title);
        }if(keyCode == 13){
             this.title = titleValue;
            console.log("BookTitle", this.title);
        }
  },
  onKeypressAuthor: function(e) {
        var keyCode = e.keyCode || e.which;
        var author = $('#author').val().trim();
        this.author = author;
        console.log('this.author', this.author);
  },
  onKeypressPublished: function(e) {
        var keyCode = e.keyCode || e.which;
        var published = $('#published').val().trim();
        var test = this.testPublishedYear( published );

        if(keyCode == 9 || keyCode == 13) {
          if (  $('#author').val() && $('#title').val()  ) {
            app.bookList.create({
              author: $('#author').val().trim(),
              reader: $('#reader').val().trim(),
              title: $('#title').val().trim(),
              published: test
            });

            $('#author').val('');
            $('#reader').val('');
            $('#title').val('');
            $('#published').val('');
            $('#author').focus();
            updateLengths();
          }
      }
  },
  onSubmit: function(e){
    console.clear();
    console.log(this, e);

    if ( $('#author').val() && $('#title').val() ) {
        var author = $('#author').val().trim();
        var reader = $('#reader').val().trim();
        var title = $('#title').val().trim();
        var published = this.testPublishedYear( $('#published').val().trim() );

        app.bookList.create({ author: author, reader: reader, title: title, published: published });
        $('#author').val('');
        $('#reader').val('');
        $('#title').val('');
        $('#published').val('');
        $('#author').focus();
        updateLengths();
    }
  },
  onMousedownInput: function(e){
    if (e.target.id == 'author') {
      var author= $(e.target).val();
      author = author.trim();
      console.log('FROM onMousedownInput', author);
    }

    if (e.target.id == 'reader') {
      var reader = $(e.target).val();
      reader = reader.trim();
      console.log('FROM onMousedownInput', reader);
    }

    if (e.target.id == 'title') {
      var title = $(e.target).val();
      title = title.trim();
      console.log('FROM onMousedownInput', title);
    }

    if (e.target.id == 'published') {
      var published = $(e.target).val();
      published = published.trim();
      console.log('FROM onMousedownInput', published);
    }

  },
  addAll: function(){
      this.$('#table-body').html(''); // clean the book list

      switch(window.filter){  // filter book item list
         case 'all':
                makeAllGrey();
                $('#nameTitle').text(title.nameAll);
                $('#nameTitle').append('<p id="greyBook" class="glyphicon glyphicon-book"></p>');
                $('tbody').addClass('grey');
                $('span.badge').removeClass('backGreen backFavorite backBlue backOrange backRed').addClass('backGrey');
                _.each(app.bookList.getAllBooks(), this.addOne, this);
                break;
          case 'iWant':
                makeGreen();
                $('#nameTitle').text(title.nameWant);
                 $('#nameTitle').append('<p id="greenBook" class="glyphicon glyphicon-book"></p>');
                 $('span.badge').removeClass('backGrey backFavorite backBlue backOrange backRed').addClass('backGreen');
                 $('span.badge').addClass('backGreen');
                console.log(app.bookList);
                _.each(app.bookList.getBooksIWant(), this.addOne, this);
                break;
          case 'onOrder':
                makeOrange();
                $('#nameTitle').text(title.nameOrder);
                $('#nameTitle').append('<p id="orangeBook" class="glyphicon glyphicon-book"></p>');
                $('span.badge').removeClass('backGrey backGreen backBlue backFavorite backRed').addClass('backOrange');
                console.log(app.bookList);
                _.each(app.bookList.getBooksOnOrder(), this.addOne, this);
                break;
          case 'available':
                makeBlue();
                $('#nameTitle').text(title.nameAvailable);
                $('span.badge').removeClass('backGrey backGreen backFavorite backOrange backRed').addClass('backBlue');
                $('#nameTitle').append('<p id="blueBook" class="glyphicon glyphicon-book"></p>');
                _.each(app.bookList.getBooksAvailable(), this.addOne, this);
                break;
          case 'alreadyRead':
                makeRed();
                $('#nameTitle').text(title.nameRead);
                $('span.badge').removeClass('backGrey backGreen backFavorite backOrange backBlue').addClass('backRed');
                $('#nameTitle').append('<p id="redBook" class="glyphicon glyphicon-book"></p>');
                _.each(app.bookList.getBooksRead(), this.addOne, this);
                break;
          case 'favorites':
                  makePurple();
                  $('#nameTitle').text(title.nameFavorites);
                  $('#nameTitle').append('<p id="favoriteBook" class="glyphicon glyphicon-book"></p>');
                  $('span.badge').removeClass('backGrey backGreen  backRed backOrange backBlue').addClass('backFavorite');
                  _.each(app.bookList.getFavoriteBooks(), this.addOne, this);
                  break;

              default:
              makeAllGrey();
              $('#nameTitle').text(title.nameAll);
              $('#nameTitle').append('<p id="greyBook" class="glyphicon glyphicon-book"></p>');
                _.each(app.bookList, this.addOne, this);
                updateLengths();
                break;
        }
  },

  addOne: function(book){
    this.model = book;
    if(this.model);
    this.model.toJSON();

    this.author = this.model.get('author');
    this.reader = this.model.get('reader');
    this.title= this.model.get('title');
    this.rating = this.model.get('rating');
    this.published = this.model.get('published');
    console.log('adding One model: ', this.author, this.reader, this.title, this.published, this.rating);

        var view = new app.BookView({model: book, bus: bus });
        $('#table-body').prepend(view.render().el);
  }
});//close app.AppView


var bus = _.extend({}, Backbone.Events);
_.extend(app.bookList, Backbone.Events);
_.extend(title, Backbone.Events);


app.Router = Backbone.Router.extend({
    routes: {
        '*filter' : 'setFilter'
      },
    setFilter: function(params) {
        console.log('app.router.params = ' + params);
        window.filter = params.trim() || '';
        console.log('bookList.length', bookList.length);
        bookList.trigger('reset');
        $('#all-length').html(bookList.length);
    }

});

var allBooksView = new app.BookListView({
  el: "#table-body",
  model: bookList,
  bus: bus
});

app.router = new app.Router();
Backbone.history.start();
app.appView = new app.AppView({ bus: bus });
var windowFn = app.appView.addAll;
window.windowFn = windowFn;

