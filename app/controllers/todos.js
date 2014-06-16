// This controller will respond to user action by using its newTitle property as the title of a new todo whose isCompleted property is false. 
// Then it will clear its newTitle property which will synchronize to the template and reset the textfield. 
// Finally, it persists any unsaved changes on the todo.
import Ember from 'ember';

export
default Ember.ArrayController.extend({
    actions: {
        createTodo: function() {
            // Get the todo title set by the "New Todo" text field
            var title = this.get('newTitle');
            if (!title.trim()) {
                return;
            }

            // Create the new Todo model
            var todo = this.store.createRecord('todo', {
                title: title,
                isCompleted: false
            });

            // Clear the "New Todo" text field
            this.set('newTitle', '');

            // Save the new model
            todo.save();
        },
        clearCompleted: function() {
            var completed = this.filterBy('isCompleted', true);
            completed.invoke('deleteRecord');
            completed.invoke('save');
        }
    },
    // Returns the number of todos whose isCompleted property is false. 
    // If the isCompleted value of any todo changes, this property will be recomputed. 
    remaining: function() {
        return this.filterBy('isCompleted', false).get('length');
    }.property('@each.isCompleted'),

    // Returns either a plural or singular version of the word "todo" depending on how many todos are currently in the list.
    inflection: function() {
        var remaining = this.get('remaining');
        return remaining === 1 ? 'todo' : 'todos';
    }.property('remaining'),

    // The completed and clearCompleted methods both invoke the filterBy method, 
    // which is part of the ArrayController API and returns an instance of EmberArray which 
    // contains only the items for which the callback returns true. 
    // The clearCompleted method also invokes the invoke method which is part of the EmberArray API. 
    // Invoke will execute a method on each object in the Array if the method exists on that object.
    hasCompleted: function() {
        return this.get('completed') > 0;
    }.property('completed'),

    completed: function() {
        return this.filterBy('isCompleted', true).get('length');
    }.property('@each.isCompleted'),

    // If no value argument is passed this property is being used to populate the current value of the checkbox. 
    // If a value is passed it indicates the checkbox was used by a user and we should set the isCompleted property of each todo to this new value.
    allAreDone: function(key, value) {
        if (value === undefined) {
            return !!this.get('length') && this.everyProperty('isCompleted', true);
        } else {
            this.setEach('isCompleted', value);
            this.invoke('save');
            return value;
        }
    }.property('@each.isCompleted')
});