app.AppView = Backbone.View.extend({
    el: '#bookapp',
    initialize: function (options) {
        this.bus = options.bus;
        app.bookList.on('add', this.addAll, this);
        app.bookList.on('reset', this.addAll, this);
        app.bookList.fetch();
    },
    events: {
        "keydown #published": "onKeypressPublished",
        "click input#submit": "onSubmit"
    },
    testPublishedYear: function(year){
        var today = new Date();
        var next_year = today.getFullYear() + 1;
        if (!(Number(year))){
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
    onKeypressPublished: function(e) {
        var keyCode = e.keyCode || e.which;
        if(keyCode == 9 || keyCode == 13) {
            this.onSubmit();
        }
    },
    onSubmit: function(){
        if (this.$('#author').val() && this.$('#title').val()){
            var yr = this.testPublishedYear($('#published').val().trim());
            app.bookList.create({
                author: $('#author').val().trim(),
                reader: $('#reader').val().trim(),
                title: $('#title').val().trim(),
                published: yr
            });
            $('#author').val('');
            $('#reader').val('');
            $('#title').val('');
            $('#published').val('');
            $('#author').focus();
            this.bus.trigger('updateLengths', this.model);
        }
    },
    addAll: function(){
        this.$('#table-body').html('');
        switch(window.filter){
            case 'iWant':
                $('#nameTitle').text("Audiobooks I want");
                $('#nameTitle').append('<p id="greenBook" class="glyphicon glyphicon-book"></p>');
                makeGreen();
                _.each(app.bookList.getBooksIWant(), this.addOne, this);
                break;
            case 'onOrder':
                $('#nameTitle').text("Audiobooks on order");
                $('#nameTitle').append('<p id="orangeBook" class="glyphicon glyphicon-book"></p>');
                makeOrange();
                _.each(app.bookList.getBooksOnOrder(), this.addOne, this);
                break;
            case 'available':
                $('#nameTitle').text("Audiobooks available");
                $('#nameTitle').append('<p id="blueBook" class="glyphicon glyphicon-book"></p>');
                makeBlue();
                _.each(app.bookList.getBooksAvailable(), this.addOne, this);
                break;
            case 'alreadyRead':
                $('#nameTitle').text("Audiobooks read");
                $('#nameTitle').append('<p id="redBook" class="glyphicon glyphicon-book"></p>');
                makeRed();
                _.each(app.bookList.getBooksRead(), this.addOne, this);
                break;
            case 'favorites':
                $('#nameTitle').text("Favorite Audiobooks");
                $('#nameTitle').append('<p id="favoriteBook" class="glyphicon glyphicon-book"></p>');
                makePurple();
                _.each(app.bookList.getFavoriteBooks(), this.addOne, this);
                break;
            default:
                $('#nameTitle').text("All Audiobooks");
                $('#nameTitle').append('<p id="greyBook" class="glyphicon glyphicon-book"></p>');
                makeAllGrey();
                _.each(app.bookList.getAllBooks(), this.addOne, this);
        }
    },
    addOne: function(book){
        var view = new app.BookView({model: book, bus: bus });
        $('#table-body').prepend(view.render().el);
    }
});
app.appView = new app.AppView({ bus: bus });
