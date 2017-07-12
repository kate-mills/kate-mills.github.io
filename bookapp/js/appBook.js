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
      console.log('changing list', this);
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
