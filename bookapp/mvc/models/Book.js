var app = {};
app.Book = Backbone.Model.extend({
    defaults: function(){
        return {
            created_at: (function(){return Date();}()),
            title: 'Title of audiobook',
            author: 'Author name',
            reader: 'Reader name',
            published: '-',
            iWant:true,
            onOrder:false,
            available:false,
            read:false,
            booklist: 'iWant',
            rating: 0,
            bookmark:bus.bookmark.green
        };
    },
    changeRating: function(rating){
        this.save({rating: rating});
    },
    changeList: function(list_name){
        if(!this.get('iWant') && list_name == 'iWant'){
            this.save({'iWant': true, 'onOrder': false, 'available': false, 'alreadyRead': false});
            this.save({'bookmark': bus.bookmark.green});
        }
        if (!this.get('onOrder') && list_name == 'onOrder'){
            this.save({'iWant': false,'onOrder': true,  'available': false, 'alreadyRead': false});
            this.save({'bookmark': bus.bookmark.orange});
        }
        if(!this.get('available') && list_name == 'available'){
            this.save({'iWant': false,'onOrder': false, 'available': true,  'alreadyRead': false});
            this.save({'bookmark': bus.bookmark.blue});
        }
        if(!this.get('alreadyRead') && list_name == 'alreadyRead'){
            this.save({'iWant': false,'onOrder': false, 'available': false, 'alreadyRead':  true});
            this.save({'bookmark': bus.bookmark.red});
        }
    },
    validate: function(attrs){
        if(!attrs.title){return "Book needs a title to be Entered.";}
        if(!attrs.author){return "Book needs an author to be Entered.";}
        if(!attrs.published){return "Book needs a Date to be Published";}
    },
    initialize: function(){
        if(!this.isValid()){
            console.log( this.validationError,' \n');
        }
    }
});
