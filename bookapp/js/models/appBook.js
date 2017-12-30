var app = {};
app.Book = Backbone.Model.extend({
    defaults: function(){
      return {
        created_at: (function(){return Date();}()),
        title: 'Title',
        author: 'Your Favorite Author',
        reader: 'Reader',
        published: '2017',
        all: true,
        iWant:true,
        onOrder:false,
        available:false,
        read:false,
        rating: 0
      };

    },
    changeRating: function(rating){
        this.save({rating: rating});
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
    },

    validate: function(attrs){
      if(!attrs.title)
          return "Book needs a title to be Entered.";
      if(!attrs.author)
          return "Book needs an author to be Entered.";
      if(!attrs.published)
          return "Book needs a Date to be Published";
    },

    initialize: function() {
      if(!this.isValid()) {
        console.log( this.validationError,' \n  ');
      }
    }
});//close app.Book
