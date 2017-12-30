
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
            console.log('\tVIEWS- AppView -trigger-updateLengths')
            this.bus.trigger('updateLengths', this.model);
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
  addAll: function(){
      this.$('#table-body').html(''); // clean the book list
      switch(window.filter){  // filter book item list
         case 'all':
                $('#nameTitle').text(bus.title.nameAll);
                $('#nameTitle').append('<p id="greyBook" class="glyphicon glyphicon-book"></p>');
                makeAllGrey();
                _.each(app.bookList.getAllBooks(), this.addOne, this);
                break;
          case 'iWant':
                $('#nameTitle').text(bus.title.nameWant);
                $('#nameTitle').append('<p id="greenBook" class="glyphicon glyphicon-book"></p>');
                makeGreen();
                _.each(app.bookList.getBooksIWant(), this.addOne, this);
                break;
          case 'onOrder':
                $('#nameTitle').text(bus.title.nameOrder);
                $('#nameTitle').append('<p id="orangeBook" class="glyphicon glyphicon-book"></p>');
                makeOrange();
                _.each(app.bookList.getBooksOnOrder(), this.addOne, this);
                break;
          case 'available':
                $('#nameTitle').text(bus.title.nameAvailable);
                $('#nameTitle').append('<p id="blueBook" class="glyphicon glyphicon-book"></p>');
                makeBlue();
                _.each(app.bookList.getBooksAvailable(), this.addOne, this);
                break;
          case 'alreadyRead':
                $('#nameTitle').text(bus.title.nameRead);
                $('#nameTitle').append('<p id="redBook" class="glyphicon glyphicon-book"></p>');
                makeRed();
                _.each(app.bookList.getBooksRead(), this.addOne, this);
                break;
          case 'favorites':
                  $('#nameTitle').text(bus.title.nameFavorites);
                  $('#nameTitle').append('<p id="favoriteBook" class="glyphicon glyphicon-book"></p>');
                  makePurple();
                  _.each(app.bookList.getFavoriteBooks(), this.addOne, this);
                  break;

          default:
                $('#nameTitle').text(bus.title.nameAll);
                $('#nameTitle').append('<p id="greyBook" class="glyphicon glyphicon-book"></p>');
                makeAllGrey();
                _.each(app.bookList, this.addOne, this);
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
    // console.log(this.author,'-', this.reader,'-', this.title,'-', this.published);

        var view = new app.BookView({model: book, bus: bus });
        $('#table-body').prepend(view.render().el);
  }
});//close app.AppView

app.appView = new app.AppView({ bus: bus });
window.windowFn  = app.appView.addAll;
