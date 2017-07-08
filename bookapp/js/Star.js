var title = {
    nameAll: 'All Books',
    nameWant: 'Books I Want',
    nameOrder: 'Books On Order',
    nameAvailable: 'Books Available',
    nameRead: 'Books I Already Read',
    nameFavorites: 'Favorites',

    walk: function(){
        this.trigger('walking',{
            speed: 1,
            date: new Date(),
        });
    },
};

var Bookmark = Backbone.View.extend({

    blue: '<td title="Click to move to Books Read" class="glyphicon glyphicon-bookmark blue">Available</td>',
    green: '<td title="Click to move to Books On Order." class="glyphicon glyphicon-bookmark green">Want</td>',
    orange: '<td title="Click to move to Books Available." class="glyphicon glyphicon-bookmark orange">Order</td>',
    grey: '<td class="glyphicon glyphicon-book grey”>All</td>',
    red: '<td title="Read Again? Click to move to Books Available." style="content:"\e043" class="glyphicon glyphicon-bookmark red">Read</td>',
});
_.extend(Bookmark, Backbone.Events);

var Star = Backbone.View.extend({
    noData: '<td class="glyphicon"></td>',
    // emptyBlue: '<td class="glyphicon glyphicon-star-empty"></td>',
    // emptyGreen: '<td class="glyphicon glyphicon-star-empty "></td>',
    // emptyOrange: '<td class="glyphicon glyphicon-star-empty "></td>',
    fullBlack: '<td title="Click to Favorite" class="glyphicon glyphicon-star black "></td>',
    emptyRed: '<td title="Click to Favorite" class="glyphicon glyphicon-star-empty "></td>',
    full: '<td itle="Click to Favorite" class="glyphicon glyphicon-star grey"></td>',
    fullRed: '<td title="Click to Un-Favorite" class="glyphicon glyphicon-star red"></td>',

    click: function(){
        this.trigger('onClickStar',{
            'data-star': this.model.get('rating'),
        });
  },

});

_.extend(Star, Backbone.Events);
Star.on('onClickStar', function(e){
    console.log('star', e);
    return window.filter;

});

var TableHeader = Backbone.View.extend({
    greyBookmark: '<th class="glyphicon glyphicon-bookmark grey></th>',
    blueOrder: '<th class="glyphicon glyicon-bookmark blue></th>',
    greyStar: '<th title="Click to Favorite" class="glyphicon glyphicon-star"></th>',
    greyTrash: '<th title="Delete Book Forever!" class="glyphicon glyphicon-trash grey"></th>',
});
_.extend(TableHeader, Backbone.Events);
