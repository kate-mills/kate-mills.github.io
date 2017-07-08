app.BookView = Backbone.View.extend({

    tagName: 'tr',
    initialize: function(options){
        this.bus = options.bus;
        this.model = options.model;
        options.author = this.model.get('author');
        this.model.on('add', this.addOne, this);
        this.model.on('destroy', this.remove, this);
        this.bus.on('onClickRadio', this.onClick);
    },

    onClick: function(){
        this.bus.trigger("bookSelected", this.model);
        this.updateLengths();
    },
    onModelChange: function(options){
     this.bus.trigger('updateBadgeNums');
     this.updateLengths();

    },
    events: {
        'click': 'onClick',
        'click td.glyphicon-star-empty': 'onClickEmptyStar',
        'click td.glyphicon-star': 'onClickFullStar',
        'click td.glyphicon-star.black': 'onClickBlackStar',
        'click td.glyphicon.glyphicon-bookmark.green': 'onToggleOrder',
        'click td.glyphicon.glyphicon-bookmark.orange': 'onToggleAvailable',
        'click td.glyphicon.glyphicon-bookmark.blue': 'onToggleRead',
        'click td.glyphicon.glyphicon-bookmark.red': 'onToggleAvailable',
        'click td#destroy': 'destroy',
        'dblclick':'onDoubleClick',

    },
    onDoubleClick:function(){
      console.clear();
      console.log( this.model.toJSON() );
      $this = $( this );
      this.bus.trigger("bookSelected", this.model);
      this.bus.trigger("Radios", this.model);
      this.date = this.model.get('created_at');

    },
    render: function(){
        if(this.model){
          this.model.toJSON();
        }
        this.bus.status = this.model.get('status');
        this.rating = this.model.get('rating');
        this.status = this.model.get('status');
        this.date = this.model.get('created_at');

        this.emptyStarRed = Star.prototype.emptyRed;
        this.fullStarRed  =  Star.prototype.fullRed;
        this.negativeRating = Star.prototype.fullBlack;
        this.noData = Star.prototype.noData;

        this.greenBookmark = Bookmark.prototype.green;
        this.orangeBookmark = Bookmark.prototype.orange;
        this.blueBookmark = Bookmark.prototype.blue;
        this.redBookmark = Bookmark.prototype.red;

        if( this.model.get('iWant')){
           this.bookmark = this.greenBookmark;
           this.star = this.noData;
           this.alert = "Click " + this.title+ "";
        }
        if( this.model.get('onOrder') ) {
            this.bookmark = this.orangeBookmark;
            this.star = this.noData;
        }
        if( this.model.get('available') ){
            this.bookmark = this.blueBookmark;
            this.star = this.noData;
        }
        if( this.model.get('alreadyRead')  && this.model.get('rating') === 0){
           this.bookmark = this.redBookmark;
           this.star = this.emptyStarRed;
        }
        if ( this.model.get('alreadyRead') && this.model.get('rating') === 1  ){
            this.bookmark = this.redBookmark;
            this.star = this.fullStarRed;
        }
        if (this.model.get('alreadyRead') && this.model.get('rating') === 2) {
          this.bookmark = this.redBookmark;
          this.star = this.negativeRating;
        }
        console.log(this);

        this.authorHTML = ('<td>' + this.model.get('author') +'</td>');
        this.titleHTML = ('<td>' + this.model.get('title') +'</td>');
        this.publishedHTML = ('<td>' + this.model.get('published') +'</td>');

        this.status = this.model.get("status");
        this.radio = ('<td>' + this.model.get('status') +'</td>');
        this.ex = ('<td id="destroy" class="glyphicon glyphicon-trash '+this.bus.statusClass+'"></td>');


        this.$el.html(  this.authorHTML   + this.titleHTML + this.publishedHTML  + this.bookmark + this.radioWant + this.radioOrder + this.radioAvailable + this.radioRead   + this.star + this.ex);
        this.$el.attr({
          id: this.model.cid,
          class: this.status,
      });
        this.$el.attr({id: this.model.cid, status: this.model.status } );
        // console.log('#########################RENDER', this);
        return this;
    },

     onClickRadio: function(){
      console.dir(document.body);
      console.log('radio clicked', this.bus.status );

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
    onClickFullStar: function() {
      this.model.giveNegativeRating();
      console.log(this.model.get("rating"));
      this.render();
    },
    onClickBlackStar: function(){
      this.model.giveZeroStarRating();
      console.log(this.model.get("rating"));
      this.render();
    },
    onToggleWant: function(){
      this.model.placeOnWant();
      this.onClickRadio();
      this.render();

      if(window.filter !== 'iWant'){
        if(window.filter !== 'all')
        this.$el.fadeOut('slow');
      }
    },

    onToggleOrder: function(){
      this.model.placeOnOrder();
      this.render();
      if(window.filter !== 'onOrder'){
        if(window.filter !== 'all')
         this.$el.fadeOut('slow');
      }
    },

    onToggleAvailable: function(){
      this.model.placeOnAvailable();
      this.render();
      if(window.filter !== 'available'){
        if(window.filter !== 'all')
         this.$el.fadeOut('slow');
      }
    },

    onToggleRead: function(){
      this.model.placeOnRead();
      this.render();
      if(window.filter !== 'alreadyRead'){
        if(window.filter !== 'all')
         this.$el.fadeOut('slow');
      }
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
  events: {"click": "onClick"},
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
        this.title = this.$('#title');
        this.published = this.$('#published');

        app.bookList.on('add', this.addAll, this);
        app.bookList.on('reset', this.addAll, this);
        app.bookList.fetch(); // Loads list from local storage
  },
  events: {
        "keydown #author": "onKeypressAuthor",
        "keydown #title": "onKeypressTitle",
        "keydown #published": "onKeypressPublished"
  },
  updateLengths: function(){
      updateLengths();
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
  onKeypressAuthor: function(e){
        var keyCode = e.keyCode || e.which;
        this.authorValue = $('#author').val();
        var authorValue = this.authorValue.trim();
        if (keyCode == 9){
            this.author = authorValue;
            console.log("AuthorName", this.author);
        }if(keyCode == 13){
             this.author = authorValue;
            console.log("AuthorName", this.author);
        }
  },
  onKeypressPublished: function(e){
        var keyCode = e.keyCode || e.which;
        var publishedValue = $('#published').val().trim();
        var printPublishedValue = 'published: '.concat(this.publishedValue);

        if(keyCode == 9){

          testPublishedValue = testYear( publishedValue );
          publishedValue = testYear( publishedValue );
          console.log("publishedValue2: ", this.publishedValue);
              alert('Hi Dad! Press enter to save this book to your database.');

        } if(keyCode == 13){
          publishedValue = testYear( publishedValue );
            console.log("typeof ( publishedValue): ", typeof( publishedValue ));
            app.bookList.create({ author: this.author, title: $('#title').val(), published: publishedValue });
            $('#author').val('');
            $('#title').val('');
            $('#published').val('');
            $('#author').focus();
            this.updateLengths();
          }

  },


  addAll: function(){
      console.log('this', this);
      this.$('#table-body').html(''); // clean the book list

      switch(window.filter){  // filter book item list
         case 'all':
                makeAllGrey();
                $('#nameTitle').text(title.nameAll);
                $('#nameTitle').append('<p id="greyBook" class="glyphicon glyphicon-book"></p>');
                $('tbody').addClass('grey');
                $('span.badge').removeClass('backGreen backPurple backBlue backOrange backRed').addClass('backGrey');
                _.each(app.bookList.getAllBooks(), this.addOne, this);
                break;
          case 'iWant':
                makeGreen();
                $('#nameTitle').text(title.nameWant);
                 $('#nameTitle').append('<p id="greenBook" class="glyphicon glyphicon-book"></p>');
                 $('span.badge').removeClass('backGrey backPurple backBlue backOrange backRed').addClass('backGreen');
                 $('span.badge').addClass('backGreen');
                console.log(app.bookList);
                _.each(app.bookList.getBooksIWant(), this.addOne, this);
                break;
          case 'onOrder':
                makeOrange();
                $('#nameTitle').text(title.nameOrder);
                $('#nameTitle').append('<p id="orangeBook" class="glyphicon glyphicon-book"></p>');
                $('span.badge').removeClass('backGrey backGreen backBlue backPurple backRed').addClass('backOrange');
                console.log(app.bookList);
                _.each(app.bookList.getBooksOnOrder(), this.addOne, this);
                break;
          case 'available':
                makeBlue();
                $('#nameTitle').text(title.nameAvailable);
                $('span.badge').removeClass('backGrey backGreen backPurple backOrange backRed').addClass('backBlue');
                $('#nameTitle').append('<p id="blueBook" class="glyphicon glyphicon-book"></p>');
                _.each(app.bookList.getBooksAvailable(), this.addOne, this);
                break;
          case 'alreadyRead':
                makeRed();
                $('#nameTitle').text(title.nameRead);
                $('span.badge').removeClass('backGrey backGreen backPurple backOrange backBlue').addClass('backRed');
                $('#nameTitle').append('<p id="redBook" class="glyphicon glyphicon-book"></p>');

                _.each(app.bookList.getBooksRead(), this.addOne, this);
                break;
          case 'favorites':
                  makePurple();
                  $('#nameTitle').text(title.nameFavorites);
                  $('#nameTitle').append('<p id="purpleBook" class="glyphicon glyphicon-book"></p>');
                  $('span.badge').removeClass('backGrey backGreen  backRed backOrange backBlue').addClass('backPurple');
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
    this.title= this.model.get('title');
    this.rating = this.model.get('rating');
    console.log('adding One model: ', this.author, this.title, this.rating);

        var view = new app.BookView({model: book, bus: bus });
        // $('#table-body').append(view.render().el);
        $('#table-body').prepend(view.render().el);
  },

  render: function(){
        this.$el.html('<input id="author" type="text" placeholder="Author" autofocus> <input id="title" type="text" placeholder="Book Title"><input id="published" type="text" maxlength="4" placeholder="Year Published">');
        return this;
  }
});//close app.AppView


//--------------
// Routers
//--------------
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

//--------------
// Initializers
//--------------
var allBooksView = new app.BookListView({
  el: "#table-body",
  model: bookList,
  bus: bus,


});

app.router = new app.Router();
Backbone.history.start();
app.appView = new app.AppView({bus: bus});
var windowFn = app.appView.addAll;
window.windowFn = windowFn;


var UpdateLengths = updateLengths;

_.extend(UpdateLengths, Backbone.Events);
