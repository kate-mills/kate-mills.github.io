app.BookView = Backbone.View.extend({
    tagName: 'tr',
    initialize: function(options){
        this.bus = options.bus;
        this.model = options.model;
        this.model.on('add', this.addOne, this);
        this.model.on('destroy', this.remove, this);
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
        'click td.glyphicon-question-sign': 'onClickQuestionmark',
        'click td.glyphicon-thumbs-up': 'onClickThumbsUp',
        'click td.glyphicon-thumbs-down': 'onClickThumbsDown',
        'click td.glyphicon.glyphicon-bookmark.green': 'onToggleOrder',
        'click td.glyphicon.glyphicon-bookmark.orange': 'onToggleAvailable',
        'click td.glyphicon.glyphicon-bookmark.blue': 'onToggleRead',
        'click td.glyphicon.glyphicon-bookmark.red': 'onToggleAvailable',
        'click td#destroy': 'destroy'
    },
    render: function(){
        if(this.model){
            this.$el.html(this.model.toJSON());
        }
        this.greenBookmark = Bookmark.green;
        this.orangeBookmark = Bookmark.orange;
        this.blueBookmark = Bookmark.blue;
        this.redBookmark = Bookmark.red;

        if( this.model.get('iWant')){
           this.bookmark = this.greenBookmark;
           this.rating = this.bus.rating.noData;
           this.class = 'iWant';
        }
        if( this.model.get('onOrder') ) {
            this.bookmark = this.orangeBookmark;
            this.rating = this.bus.rating.noData;
            this.class = 'onOrder';
        }
        if( this.model.get('available') ) {
          this.bookmark = this.blueBookmark;
          this.rating =  this.bus.rating.noData;
          this.class = 'available';
        }
        if( this.model.get('alreadyRead')  && this.model.get('rating') === 0){
           this.bookmark = this.redBookmark;
           this.rating = this.bus.rating.questionmark;
           this.class = 'read';
        }
        if ( this.model.get('alreadyRead') && this.model.get('rating') === 'thumbsup'  || this.model.get('alreadyRead') && this.model.get('rating') === 1) {
            this.bookmark = this.redBookmark;
            this.rating = this.bus.rating.favorite;
            this.class = 'read';
        }
        if (this.model.get('alreadyRead') && this.model.get('rating') === 'thumbsdown'){
          this.bookmark = this.redBookmark;
          this.rating = this.bus.rating.negative;
          this.class = 'read';
        }
        this.authorHTML = ('<td>' + this.model.get('author') +'</td>');
        this.readerHTML = ('<td>' + this.model.get('reader') +'</td>');
        this.titleHTML = ('<td>' + this.model.get('title') +'</td>');
        this.publishedHTML = ('<td>' + this.model.get('published') +'</td>');
        this.trashcan = ('<td id="destroy" class="glyphicon glyphicon-trash '+this.bus.statusClass+'"></td>');

        this.$el.html(  this.authorHTML + this.readerHTML + this.titleHTML + this.publishedHTML  + this.bookmark + this.rating + this.trashcan);
        this.$el.attr({ id: this.model.cid, class: this.class});
        return this;
    },
    updateOnEnter: function(e){
        if(e.which == 13){
            this.close();
        }
    },
    onClickQuestionmark: function(e){
        $(e.target).removeClass('glyphicon-question-sign');
        $(e.target).addClass('glyphicon-thumbs-up').tealify();
        this.model.changeRating('thumbsup', true);
    },
    onClickThumbsUp: function() {
         this.model.changeRating('thumbsdown', false);
         this.render();
         if(window.filter === 'favorites'){
             this.$el.fadeOut('fast');
         }
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
        var w = window.filter;
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
  testPublishedYear: function(year){
      var today = new Date();
      var next_year = today.getFullYear() + 1;

      if ( !(Number(year)) ){
          return 'null';
      }
      else if ( year < 1900  || year > next_year ){
          $('#error-alert').text('Published in ' + year).addClass('alert_warning').show().fadeOut(1500);
          return 'null';
      }
      else{
          return String(year);
      }
  },
  onKeypressReader: function(e) {
      var keyCode = e.keyCode || e.which;
      this.readerValue = $('#reader').val();
      var readerValue = this.readerValue.trim();
      if (keyCode == 9){
        this.reader = readerValue;
      }
      if (keyCode == 13) {
        this.reader = readerValue;
      }
    },
  onKeypressTitle: function(e){
      var keyCode = e.keyCode || e.which;
        this.titleValue = $('#title').val();
        var titleValue = this.titleValue.trim();
        if (keyCode == 9){
            this.title = titleValue;
        }if(keyCode == 13){
             this.title = titleValue;
        }
  },
  onKeypressAuthor: function(e) {
        var keyCode = e.keyCode || e.which;
        var author = $('#author').val().trim();
        this.author = author;
  },
  onKeypressPublished: function(e) {
        var keyCode = e.keyCode || e.which;
        var published = $('#published').val().trim();

        if(keyCode == 9 || keyCode == 13) {
          if (  this.$('#author').val() && this.$('#title').val()  ) {
            app.bookList.create({
              author: $('#author').val().trim(),
              reader: $('#reader').val().trim(),
              title: $('#title').val().trim(),
              published: this.testPublishedYear( published )
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
    }

    if (e.target.id == 'reader') {
      var reader = $(e.target).val();
      reader = reader.trim();
    }

    if (e.target.id == 'title') {
      var title = $(e.target).val();
      title = title.trim();
    }

    if (e.target.id == 'published') {
      var published = $(e.target).val();
      published = published.trim();
    }

  },
  addAll: function(){
      this.$('#table-body').html(''); // clean the book list
      switch(window.filter){  // filter book item list
         case 'all':
                $('#nameTitle').text(title.nameAll);
                $('#nameTitle').append('<p id="greyBook" class="glyphicon glyphicon-book"></p>');
                makeAllGrey();
                _.each(app.bookList.getAllBooks(), this.addOne, this);
                break;
          case 'iWant':
                $('#nameTitle').text(title.nameWant);
                $('#nameTitle').append('<p id="greenBook" class="glyphicon glyphicon-book"></p>');
                makeGreen();
                _.each(app.bookList.getBooksIWant(), this.addOne, this);
                break;
          case 'onOrder':
                $('#nameTitle').text(title.nameOrder);
                $('#nameTitle').append('<p id="orangeBook" class="glyphicon glyphicon-book"></p>');
                makeOrange();
                _.each(app.bookList.getBooksOnOrder(), this.addOne, this);
                break;
          case 'available':
                $('#nameTitle').text(title.nameAvailable);
                $('#nameTitle').append('<p id="blueBook" class="glyphicon glyphicon-book"></p>');
                makeBlue();
                _.each(app.bookList.getBooksAvailable(), this.addOne, this);
                break;
          case 'alreadyRead':
                $('#nameTitle').text(title.nameRead);
                $('#nameTitle').append('<p id="redBook" class="glyphicon glyphicon-book"></p>');
                makeRed();
                _.each(app.bookList.getBooksRead(), this.addOne, this);
                break;
          case 'favorites':
                  $('#nameTitle').text(title.nameFavorites);
                  $('#nameTitle').append('<p id="favoriteBook" class="glyphicon glyphicon-book"></p>');
                  makePurple();
                  _.each(app.bookList.getFavoriteBooks(), this.addOne, this);
                  break;

          default:
                $('#nameTitle').text(title.nameAll);
                $('#nameTitle').append('<p id="greyBook" class="glyphicon glyphicon-book"></p>');
                makeAllGrey();
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
    console.log(this.author,'-', this.reader,'-', this.title,'-', this.published);

        var view = new app.BookView({model: book, bus: bus });
        $('#table-body').prepend(view.render().el);
  }
});//close app.AppView


_.extend(app.bookList, Backbone.Events);
_.extend(title, Backbone.Events);


app.Router = Backbone.Router.extend({
    routes: {
        '*filter' : 'setFilter'
      },
    setFilter: function(params) {
        console.log('app.router.params = ' + params);
        window.filter = params.trim() || '';
        console.log('app.bookList.length', app.bookList.length);
        app.bookList.trigger('reset');
        $('#all-length').html(app.bookList.length);
    }

});

var allBooksView = new app.BookListView({
  el: "#table-body",
  model: app.bookList,
  bus: bus
});

app.appView = new app.AppView({ bus: bus });
window.windowFn  = app.appView.addAll;

app.router = new app.Router();
Backbone.history.start();
