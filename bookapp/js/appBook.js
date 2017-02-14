var app = {};
app.Book = Backbone.Model.extend({
    defaults: function(){
      return {
        created_at: function(){return getDate();},
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
    placeOnWant: function(){

      if(!this.get('iWant')){
        this.save({ "iWant": true});
        this.save({'status': 'listWant'});
        console.log("Placed " + this.get("title")+ " on your 'Books I Want List'.");

        if(this.get('onOrder')) {
          this.save('onOrder', !this.get('onOrder'));
          console.log('Removed ' + this.get("title") + " from your ' Books On Order List.'");
        }
        if( this.get('available') ){
          this.save('available', false );
          console.log('Removed ' + this.get("title") + " from your ' Books Available To Read List.'");
        }
        if(this.get('alreadyRead')) {
          this.save('alreadyRead', !this.get('alreadyRead'));
          console.log('Removed ' + this.get("title") + " from your ' Books Already Read List.'");
        }
        console.log( 'iWant: ', this.get('iWant'), " onOrder: ", this.get("onOrder") );
        console.log("available: ", this.get("available"), " alreadyRead: ", this.get("alreadyRead"));
      }else{
        console.log(this.get("title") +" is already on your 'Books I Want List'.");
      }
    },

    placeOnOrder: function(){
      if(!this.get('onOrder')){
        this.save({ "onOrder": true });
        this.save({'status': 'listOrder'});
        console.log("Placed " + this.get("title")+ " on your 'On Order List'.");

        if(this.get('iWant')) {
          this.save({ 'iWant': !this.get('iWant') });
          console.log("Removed " + this.get("title")+ " from your 'Books I Want List'.");
        }
        if(this.get('available')){
          this.save('available', !this.get('available'));
          console.log("Removed " + this.get("title")+ " from your 'Books Available To Read List'.");
        }
        if(this.get('alreadyRead')) {
          this.save('alreadyRead', !this.get('alreadyRead'));
          console.log('Removed ' + this.get("title") + " from your ' Books Already Read List.'");
        }
        console.log("iWant: ", this.get("iWant"), " onOrder: ", this.get("onOrder"));
        console.log("available: ", this.get("available"), " alreadyRead: ", this.get("alreadyRead"));
        } else{
        console.log(this.get("title")+ " is already on your 'Books On Order List'.");
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
        console.clear();
        console.log("iWant: ", this.get("iWant"), " onOrder: ", this.get("onOrder"));
        console.log("available: ", this.get("available"), " alreadyRead: ", this.get("alreadyRead"));

        } else{
          console.clear();
          console.log("##########" + this.get("title")+ " " + this.get("status"));
        }
    },

    placeOnRead: function(){

      if(!this.get('alreadyRead')) {
        this.save({ 'alreadyRead': true });
        this.save({'status': 'listAlreadyRead'});

        if(this.get('iWant')) {
          this.save({ 'iWant': false });
        }
        if(this.get('onOrder')) {
          this.save('onOrder', false);
        }
        if(this.get('available')){
          this.save('available',  false);
        }
        console.log("iWant: ", this.get("iWant"), " onOrder: ", this.get("onOrder"));
        console.log("available: ", this.get("available"), " alreadyRead: ", this.get("alreadyRead"));

        } else{
          console.clear();
          console.log("##########" + this.get("title")+ " " + this.get("status"));
        }
    },

    validate: function(attrs){
      if(!attrs.title)
          return "Book needs a title to be Entered.";
      if(!attrs.author)
          return "Book needs an author to be Entered.";
      if(!attrs.published)
          return null;
    },

    initialize: function(){
      if(this.isValid()) {
            // console.log(this.get("title") + " has been added to your collection.");
      } if(!this.isValid()){
            // console.log( "\n this.isValid = ", this.isValid() );
            // console.log( this.validationError,' \n  ');
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
