app.BookView = Backbone.View.extend({
    tagName: 'tr',
    initialize: function(options){
        this.bus = options.bus;
        this.model = options.model;
        this.model.on('add', this.addOne, this);
        this.model.on('destroy', this.remove, this);
    },
    onClick: function(){
        console.log('\n\tVIEWS- BookView -trigger-updateLengths')
        this.bus.trigger('updateLengths', this.model);
    },
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
        if(!this.model.get('alreadyRead')){
            this.rating = this.bus.rating.noData;
        }
        if( this.model.get('iWant')){
           this.bookmark = this.bus.bookmark.green;
           this.class = 'iWant';
        }
        if( this.model.get('onOrder') ) {
            this.bookmark = this.bus.bookmark.orange;
            this.class = 'onOrder';
        }
        if( this.model.get('available') ) {
          this.bookmark = this.bus.bookmark.blue;
          this.class = 'available';
        }
        if( this.model.get('alreadyRead')  && this.model.get('rating') === 0){
           this.bookmark = this.bus.bookmark.red;
           this.rating = this.bus.rating.questionmark;
           this.class = 'read';
        }
        if ( this.model.get('alreadyRead') && this.model.get('rating') === 'thumbsup'  || this.model.get('alreadyRead') && this.model.get('rating') === 1) {
            this.bookmark = this.bus.bookmark.red;
            this.rating = this.bus.rating.favorite;
            this.class = 'read';
        }
        if (this.model.get('alreadyRead') && this.model.get('rating') === 'thumbsdown'){
          this.bookmark = this.bus.bookmark.red;
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
    onClickQuestionmark: function(e){
        this.model.changeRating('thumbsup', true);
        this.render();
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
         this.model.changeList('iWant');
         if(this.model.get('rating')){
             this.model.save({'star': false, 'rating': 0});
         }
         this.renderList(this.model);
     },
     renderList: function(){
         this.render();this.render();
         if(window.filter !== 'all'){
             this.$el.fadeOut('fast');
         }
     },
     onToggleOrder: function(){
         this.model.changeList('onOrder');
         this.renderList(this.model);
     },
     onToggleAvailable: function(){
         this.model.changeList('available');
         this.renderList(this.model);
     },
     onToggleRead: function(){
         this.model.changeList('alreadyRead');
         this.renderList(this.model);
     },
    destroy: function(){
        this.model.destroy();
    },
}); //close app.BookView
