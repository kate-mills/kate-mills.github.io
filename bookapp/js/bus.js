var bus = _.extend({}, Backbone.Events);

bus.title = {
    nameAll: 'All Audiobooks',
    nameWant: 'Audiobooks I Want',
    nameOrder: 'Audiobooks On Order',
    nameAvailable: 'Audiobooks Available',
    nameRead: 'Audiobooks I Already Read',
    nameFavorites: 'Favorite Audiobooks',
};

var Bookmark = {
    blue: '<td title="Click to move to Books Read" class="glyphicon glyphicon-bookmark blue">Available</td>',
    green: '<td title="Click to move to Books On Order." class="glyphicon glyphicon-bookmark green">Want</td>',
    orange: '<td title="Click to move to Books Available." class="glyphicon glyphicon-bookmark orange">Order</td>',
    grey: '<td class="glyphicon glyphicon-book grey”>All</td>',
    red: '<td title="Read Again? Click to move to Books Available." style="content:"\e043" class="glyphicon glyphicon-bookmark red">Read</td>',
};

bus.rating = {
    noData: '<td class="no_data"></td>',
    negative: '<td style="color:gainsboro" title="click to ??" class="glyphicon glyphicon-thumbs-down"></td>',
    questionmark: '<td style="color:red" title="click to Favorite" class="glyphicon glyphicon-question-sign"></td>',
    favorite: '<td style="color:#009688" title="click to Un-Favorite" class="glyphicon glyphicon-thumbs-up"></td>',
};
bus.on('updateLengths', function(){
    updateLengths();
    console.log('\tSTAR-Updated Lengths!');
})
