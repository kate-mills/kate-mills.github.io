var app = {};
app.Book = Backbone.Model.extend({
    defaults: function(){
      return {
        created_at: (function(){return Date();}()),
        title: '',
        author: '',
        reader: '',
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
    changeRating: function(rating, star){

    if (rating === undefined ||  star === undefined) {
        this.save({rating: 0, star: false});
      }
      else {
        this.save({rating: rating, star: star });
      }
    },

    changeList: function(new_list) {
      if (! this.get('iWant') && new_list == 'iWant') {
       this.save({'iWant': true, 'onOrder': false, 'available': false, 'alreadyRead': false});
      }
      if (! this.get('onOrder') && new_list == 'onOrder') {
       this.save({'onOrder': true, 'iWant': false, 'available': false, 'alreadyRead': false});
      }
      if (! this.get('available') && new_list == 'available') {
       this.save({'available': true, 'iWant': false, 'onOrder': false, 'alreadyRead': false});
      }
      if (! this.get('alreadyRead') && new_list == 'alreadyRead') {
       this.save({'alreadyRead': true, 'iWant': false, 'onOrder': false, 'available': false});
      }
      console.log('CHANGE LIST', this);
    },

    // placeOnWant: function(){

    //   if(!this.get('iWant')){
    //     this.save({ 'iWant': true});
    //     this.save({'status': 'listWant'});
    //     console.log("Placed " + this.get("title")+ " on your 'Books I Want List'.");

    //     if(this.get('onOrder')) {
    //       this.save({'onOrder': !this.get('onOrder'), 'star': false});
    //       console.log('Removed ' + this.get("title") + " from your ' Books On Order List.'");
    //     }
    //     if( this.get('available') ){
    //       this.save({'available': false, 'star': false});
    //       console.log('Removed ' + this.get("title") + " from your ' Books Available To Read List.'");
    //     }
    //     if(this.get('alreadyRead')) {
    //       this.save({alreadyRead: false, star: false});
    //       console.log('Removed ' + this.get("title") + " from your ' Books Already Read List.'");
    //     }
    //     console.log( 'iWant: ', this.get('iWant'), " onOrder: ", this.get("onOrder") );
    //     console.log("available: ", this.get("available"), " alreadyRead: ", this.get("alreadyRead"));
    //   }else{
    //     console.log(this.get("title") +" is already on your 'Books I Want List'.");
    //   }
    // },
  //   placeOnOrder: function(){
  //     if(!this.get('onOrder')){
  //       this.save({ "onOrder": true });
  //       this.save({'status': 'listOrder'});
  //       console.log("Placed " + this.get("title")+ " on your 'On Order List'.");

  //       if(this.get('iWant')) {
  //         this.save({ 'iWant': !this.get('iWant') });
  //         console.log("Removed " + this.get("title")+ " from your 'Books I Want List'.");
  //       }
  //       if(this.get('available')){
  //         this.save("available", !this.get('available'));
  //         console.log("Removed " + this.get("title")+ " from your 'Books Available To Read List'.");
  //       }
  //       if(this.get('alreadyRead')) {
  //         this.save('alreadyRead', !this.get('alreadyRead'));
  //         console.log('Removed ' + this.get("title") + " from your ' Books Already Read List.'");
  //       }
  //       console.log("iWant: ", this.get("iWant"), " onOrder: ", this.get("onOrder"));
  //       console.log("available: ", this.get("available"), " alreadyRead: ", this.get("alreadyRead"));
  //       } else{
  //       console.log(this.get("title")+ " is already on your 'Books On Order List'.");
  //       }
  // },

    // placeOnAvailable: function(){
    //   if( !this.get('available') ) {
    //     this.save({ 'available': !this.get('available') , star: false});
    //     this.save({'status': 'listAvailable'});
    //   }
    //     if( this.get('iWant') ) {
    //       this.save( 'iWant', !this.get('iWant') );
    //     }

    //     if(this.get('onOrder')) {
    //       this.save('onOrder', !this.get('onOrder'));
    //     }
    //     if(this.get('alreadyRead')){
    //       this.save('alreadyRead', !this.get('alreadyRead'));
    //     }

    // },

    // placeOnRead: function(){

    //   if(!this.get('alreadyRead')) {
    //     this.save({ 'alreadyRead': true });
    //     this.save({'status': 'alreadyRead'});

    //     if(this.get('iWant')) {
    //       this.save({ 'iWant': false });
    //     }
    //     if(this.get('onOrder')) {
    //       this.save('onOrder', false);
    //     }
    //     if(this.get('available')){
    //       this.save('available',  false);
    //     }
    //     console.log("iWant: ", this.get("iWant"), " onOrder: ", this.get("onOrder"));
    //     console.log("available: ", this.get("available"), " alreadyRead: ", this.get("alreadyRead"));

    //     } else{
    //       console.clear();
    //       console.log("##########" + this.get("title")+ " " + this.get("status"));
    //     }
    // },

    validate: function(attrs){
      if(!attrs.title)
          return "Book needs a title to be Entered.";
      if(!attrs.author)
          return "Book needs an author to be Entered.";
      if(!attrs.published)
          return "Book needs a Date to be Published";
    },

    initialize: function() {
      if(this.isValid()) {
            console.log(this.get("title") + " has been added to your collection.");
      } if(!this.isValid()){
            // var error = this.validate();
            // console.log(error);
            console.log( "\n this.isValid = ", this.isValid() );
            console.log( this.validationError,' \n  ');
      }
    }

});//close app.Book

var returnListLengthToOne = function(list){
  var book = list.create({
    title: 'Add Some Books To Your Collection!',
    author: 'Vince Flynn',
    reader: 'Peter Hermann',
    published: 2016,
    iWant: true,
    onOrder: false,
    available: false,
    alreadyRead: false
  });

  book.set('created_at', Date());
  console.log('book created', book);

};
