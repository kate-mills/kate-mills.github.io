var app = {};
app.Book = Backbone.Model.extend({
    defaults: function(){
        return {
            created_at: (function(){return Date();}()),
            title: 'Title of audiobook',
            author: 'Author name',
            reader: 'Reader name',
            published: '-',
            booklist: 'iWant',
            rating: 'noData',
            bookmark:bus.bookmark.iWant,
            wdyt: bus.rating.noData
        };
    },
    changeBookmark: function(list){
        this.save({'bookmark': bus.bookmark[list], 'class': list})
    },
    changeRating: function(rating){
        this.save({rating: rating, wdyt: bus.rating[rating]});
    },
    changeBooklist: function(list){
        this.save({'booklist': list});
        this.changeBookmark(list);
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
