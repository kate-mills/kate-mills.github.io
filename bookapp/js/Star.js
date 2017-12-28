var title = {
    nameAll: 'All Audiobooks',
    nameWant: 'Audiobooks I Want',
    nameOrder: 'Audiobooks On Order',
    nameAvailable: 'Audiobooks Available',
    nameRead: 'Audiobooks I Already Read',
    nameFavorites: 'Favorite Audiobooks',
};

var Bookmark = Backbone.View.extend({
    blue: '<td title="Click to move to Books Read" class="glyphicon glyphicon-bookmark blue">Available</td>',
    green: '<td title="Click to move to Books On Order." class="glyphicon glyphicon-bookmark green">Want</td>',
    orange: '<td title="Click to move to Books Available." class="glyphicon glyphicon-bookmark orange">Order</td>',
    grey: '<td class="glyphicon glyphicon-book grey”>All</td>',
    red: '<td title="Read Again? Click to move to Books Available." style="content:"\e043" class="glyphicon glyphicon-bookmark red">Read</td>',
});
_.extend(Bookmark, Backbone.Events);

var Rating = Backbone.View.extend({
    noData: '<td class="no_data"></td>',
    negative: '<td title="Click to give book a new rating." class="glyphicon glyphicon-thumbs-down black "></td>',
    questionmark: '<td style="" title="What do you think?" class="wdyt">?</td>',
    full: '<td title="" class="glyphicon glyphicon-star grey"></td>',
    favorite: '<td title="Click if you didn\'t like this book." class="glyphicon glyphicon-thumbs-up purple"></td>',
});
