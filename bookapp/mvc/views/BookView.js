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
        'click td.glyphicon-question-sign': 'onClickQuestionmark',
        'click td.glyphicon-thumbs-up': 'onClickThumbsUp',
        'click td.glyphicon-thumbs-down': 'onClickThumbsDown',
        'click td.glyphicon.glyphicon-bookmark.green': 'onToggleOrder',
        'click td.glyphicon.glyphicon-bookmark.orange': 'onToggleAvailable',
        'click td.glyphicon.glyphicon-bookmark.blue': 'onToggleRead',
        'click td.glyphicon.glyphicon-bookmark.red': 'onToggleWant',
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
    checkRender: function(){
        if(window.filter !== 'all'){
            this.$el.fadeOut('fast');
        }
        this.render();
    },
    onClickQuestionmark: function(){
        this.model.changeRating('thumbsup');
        this.render();
    },
    onClickThumbsUp: function() {
         this.model.changeRating('thumbsdown');
         if(window.filter === 'favorites'){
             this.$el.fadeOut('fast');
         }
         this.render();
     },
     onClickThumbsDown: function(){
         this.model.changeRating('questionmark');
         this.render();
     },
     onToggleWant: function(){
         this.model.changeBooklist('iWant');
         this.model.changeRating('noData');
         this.checkRender();
     },
     onToggleOrder: function(){
         this.model.changeBooklist('onOrder');
         this.checkRender();
     },
     onToggleAvailable: function(){
         this.model.changeBooklist('available');
         this.checkRender();
     },
     onToggleRead: function(){
         this.model.changeBooklist('read');
         this.model.changeRating('questionmark');
         this.checkRender();
     },
     destroy: function(){
         this.model.destroy();
     }
 });
