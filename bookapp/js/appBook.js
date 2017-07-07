var app = {};
app.Book = Backbone.Model.extend({
    defaults: function(){
      return {
        created_at: (function(){return Date();}()),
        title: '',
        author: '',
        published: null,
        all: true,
        iWant:true,
        onOrder:false,
        available:false,
        read:false,
          rating: 0,
          star: false,
          status: 'listWant',
      };
    },
    toggleWant: function(){
      this.save({ iWant: !this.get('iWant')});
    },
    giveOneStarRating: function(){
      this.save({rating: 1, star: true });
      console.log('rating', this.get('rating'));
    },
     giveZeroStarRating: function(){
      this.save({rating: 0, star: false });
      console.log('rating', this.get('rating'));
    },
    placeOnWant: function() {
        if(!this.get('iWant')) {
          this.save({ "iWant": true});
          this.save({'status': 'listWant'});

          if(this.get('onOrder')) {
            this.save('onOrder', !this.get('onOrder'));
          }
          if( this.get('available') ){
            this.save('available', false );
          }
          if(this.get('alreadyRead')) {
            this.save('alreadyRead', !this.get('alreadyRead'));
          }
      }
    },
    placeOnOrder: function(){
        if(!this.get('onOrder')) {
          this.save({ "onOrder": true });
          this.save({'status': 'listOrder'});

          if(this.get('iWant')) {
            this.save({ 'iWant': !this.get('iWant') });
          }
          if(this.get('available')){
            this.save('available', !this.get('available'));
          }
          if(this.get('alreadyRead')) {
            this.save('alreadyRead', !this.get('alreadyRead'));
          }
        }
      },
      placeOnAvailable: function(){
        if( !this.get('available') ) {
          this.save({ 'available': true });
          this.save({'status': 'listAvailable'});

          if( this.get('iWant') ) {
            this.save( 'iWant', !this.get('iWant') );
          }

          if(this.get('onOrder')) {
            this.save('onOrder', !this.get('onOrder'));
          }
          if(this.get('alreadyRead')){
            this.save('alreadyRead', !this.get('alreadyRead'));
          }
        }
    },
    placeOnRead: function(){
      if(!this.get('alreadyRead') ) {
        this.save({
          'alreadyRead': true,
          'status': 'listAlreadyRead'
        });

        if(this.get('iWant')) {
          this.save({ 'iWant': false });
        }
        if(this.get('onOrder')) {
          this.save('onOrder', false);
        }
        if(this.get('available')) {
          this.save('available',  false);
        }
      }

    },

    validate: function(attrs){
      if(!attrs.title)
          return "Book needs a title to be Entered.";
      if(!attrs.author)
          alert( "Book needs an author to be Entered.");
    },

    initialize: function() {
      if(this.isValid()) {
            console.log(this.get("title") + " has been added to your collection.");
      }
      else {
          console.log( 'validationError', this.validationError,' \n  ');

      }
    }
});//close app.Book

var returnListLengthToOne = function(list){
  var book = list.create({
    title: 'Add Some Books To Your Collection!',
    author: 'Dad',
    published: 2016,
    iWant: true,
    onOrder: false,
    available: false,
    alreadyRead: false
  });

  book.set('created_at', Date());
  console.log('book created', book);
};
