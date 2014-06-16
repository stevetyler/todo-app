// import DS from 'ember-data';

// Create new class Todo within applications namespace
var Todo = DS.Model.extend({
    title: DS.attr('string'),
    isCompleted: DS.attr('boolean')
});

// Add fixture data
// http://emberjs.com/api/classes/Ember.Object.html#method_reopenClass
Todo.reopenClass = ({

    FIXTURES: [{
        id: 1,
        title: 'Learn Ember.js',
        isCompleted: true
    }, {
        id: 2,
        title: '...',
        isCompleted: false
    }, {
        id: 3,
        title: 'Profit!',
        isCompleted: false
    }]
});

export
default Todo;