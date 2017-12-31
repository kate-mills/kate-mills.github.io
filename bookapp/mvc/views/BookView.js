app.BookView = Backbone.View.extend({
    tagName: 'tr',
    initialize: function(options){ // options -> model, bus
        this.bus = options.bus;
        this.model.on('add', this.addOne, this);
        this.model.on('destroy', this.remove, this);
    },
    onClick: function(){},
    events: {
        'click': 'onClick',
        'click td.glyphicon-question-sign': 'toggle2ThumbsUp',
        'click td.glyphicon-thumbs-up': 'toggle2ThumbsDown',
        'click td.glyphicon-thumbs-down': 'toggle2Questionmark',
        'click td.glyphicon.glyphicon-bookmark.green': 'toggle2Order',
        'click td.glyphicon.glyphicon-bookmark.orange': 'toggle2Available',
        'click td.glyphicon.glyphicon-bookmark.blue': 'toggle2Read',
        'click td.glyphicon.glyphicon-bookmark.red': 'toggle2Want',
        'click td#destroy': 'destroy'
    },
    render: function(){
        this.authorHTML = ('<td>' + this.model.get('author') +'</td>');
        this.readerHTML = ('<td>' + this.model.get('reader') +'</td>');
        this.titleHTML = ('<td>' + this.model.get('title') +'</td>');
        this.publishedHTML = ('<td>' + this.model.get('published') +'</td>');
        this.trashcan = ('<td id="destroy" class="glyphicon glyphicon-trash"></td>');

        this.$el.html(  this.authorHTML + this.readerHTML + this.titleHTML + this.publishedHTML  + this.model.get('bookmark') + this.model.get('wdyt') + this.trashcan);
        this.$el.attr({ id: this.model.cid, class: this.class});
        this.bus.trigger('updateLengths', this.model);
        return this;
    },
    checkWindowThenRender: function(){
        if(window.filter !== 'all'){
            this.$el.fadeOut('fast');
        }
        this.render();
    },
    toggle2ThumbsUp: function(){
        this.model.changeRating('thumbsup');
        this.render();
    },
    toggle2ThumbsDown: function() {
         this.model.changeRating('thumbsdown');
         if(window.filter === 'favorites'){
             this.$el.fadeOut('fast');
         }
         this.render();
     },
     toggle2Questionmark: function(){
         this.model.changeRating('questionmark');
         this.render();
     },
     toggle2Want: function(){
         this.model.changeBooklist('iWant');
         this.model.changeRating('noData');
         this.checkWindowThenRender();
     },
     toggle2Order: function(){
         this.model.changeBooklist('onOrder');
         this.checkWindowThenRender();
     },
     toggle2Available: function(){
         this.model.changeBooklist('available');
         this.checkWindowThenRender();
     },
     toggle2Read: function(){
         this.model.changeBooklist('read');
         this.model.changeRating('questionmark');
         this.checkWindowThenRender();
     },
     destroy: function(){
         this.model.destroy();
     }
 });
