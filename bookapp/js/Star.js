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

    blue: '<td class="glyphicon glyphicon-book blue"></td>',
    green: '<td class="glyphicon glyphicon-book green"></td>',
    orange: '<td class="glyphicon glyphicon-book orange"></td>',
    grey: '<td class="glyphicon glyphicon-book grey”></td>',
    red: '<td style="content:"\e043" class="glyphicon glyphicon-book red"></td>',
});
_.extend(Bookmark, Backbone.Events);

var Star = Backbone.View.extend({

    noData: '<td class="glyphicon glyphicon-play"></td>',
    emptyBlue: '<td class="glyphicon glyphicon-star-empty blue"></td>',
    emptyGreen: '<td class="glyphicon glyphicon-star-empty green"></td>',
    emptyOrange: '<td class="glyphicon glyphicon-star-empty orange"></td>',
    emptyRed: '<td class="glyphicon glyphicon-star-empty red"></td>',
    full: '<td class="glyphicon glyphicon-star"></td>',
    fullRed: '<td class="glyphicon glyphicon-star red"></td>',

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
    greyStar: '<th class="glyphicon glyphicon-star grey"></th>',
    greyTrash: '<th class="glyphicon glyphicon-trash grey"></th>',
});
_.extend(TableHeader, Backbone.Events);
