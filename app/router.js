import Ember from 'ember';

var Router = Ember.Router.extend({
    location: TodoAppENV.locationType
});

Router.map(function() {
    this.resource('todos', {
        path: '/'
    }, function() {
        // Additional child routes go here
        this.route('active');
        this.route('completed');
    });


});

export
default Router;