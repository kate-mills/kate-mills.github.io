app.Router = Backbone.Router.extend({
    routes: {
        '*filter' : 'setFilter'
      },
    setFilter: function(params) {
        window.filter = params.trim() || '';
        app.bookList.trigger('reset');
        $('#all-length').html(app.bookList.length);
    }
});

app.router = new app.Router();
Backbone.history.start();
